import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import { fileExt, normalizePhone, validateForm } from "@/lib/prescription";

export const runtime = "nodejs";

// ponytail: rate limit em memória, por instância; trocar por store compartilhado (Redis/Upstash) se houver abuso.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: NextRequest) {
  if (process.env.RECEITA_FORM_ENABLED !== "true") return fail("Formulário indisponível.", 404);
  const destino = process.env.RECEITA_DESTINO?.trim();
  // Destino ainda não definido pela cliente (A-012): nunca descarta a receita em silêncio.
  if (!destino) return fail("Envio indisponível no momento. Fale com a equipe pelo WhatsApp.", 503);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return fail("Muitas tentativas. Tente novamente em alguns minutos.", 429);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Não foi possível ler o envio.", 400);
  }
  // Honeypot: bots preenchem; responde "ok" sem guardar nada.
  if (String(form.get("website") ?? "")) return NextResponse.json({ ok: true });

  const files = form.getAll("files").filter((f): f is File => typeof f !== "string" && f.size > 0);
  const input = {
    name: String(form.get("name") ?? ""),
    whatsapp: String(form.get("whatsapp") ?? ""),
    email: String(form.get("email") ?? ""),
    consent: form.get("consent") === "on",
    files: files.map((f) => ({ name: f.name, type: f.type, size: f.size })),
  };
  const errors = validateForm(input);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  if (destino === "local") {
    // Só para teste ponta a ponta. Receita é dado sensível: nunca gravar em disco de produção.
    if (process.env.NODE_ENV === "production") return fail("Destino local não é permitido em produção.", 503);
    const id = randomUUID();
    const dir = path.join(process.cwd(), ".data", "receitas", id);
    await mkdir(dir, { recursive: true });
    for (const f of files) {
      await writeFile(path.join(dir, `${randomUUID()}.${fileExt(f.name)}`), Buffer.from(await f.arrayBuffer()));
    }
    await writeFile(
      path.join(dir, "meta.json"),
      JSON.stringify({ name: input.name.trim(), whatsapp: normalizePhone(input.whatsapp), email: input.email.trim() || null, consentAt: new Date().toISOString() }),
    );
    return NextResponse.json({ ok: true });
  }

  // TODO(A-012): destinos reais (storage privado + webhook, e-mail). Ver PENDENCIAS.md.
  return fail("Destino de envio não suportado.", 503);
}
