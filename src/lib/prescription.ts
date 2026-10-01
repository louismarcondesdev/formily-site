/** Validação do formulário de receita. Pura (sem alias) para rodar no cliente, no servidor e em `node --test`. */

export const MAX_FILES = 3;
// Limite de corpo de função da Vercel é 4,5 MB; com upload direto ao storage (Opção A) dá para subir para 10 MB.
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

const MIME_BY_EXT: Record<string, string[]> = {
  pdf: ["application/pdf"],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
  webp: ["image/webp"],
  heic: ["image/heic", "image/heif"],
};
export const ACCEPT = Object.keys(MIME_BY_EXT).map((e) => `.${e}`).join(",");

/** Só dígitos, sem o DDI 55. */
export function normalizePhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  return d.length >= 12 && d.startsWith("55") ? d.slice(2) : d;
}

/** DDD (11–99) + 8 dígitos (fixo) ou 9 dígitos começando em 9 (celular). */
export function isValidBrPhone(raw: string): boolean {
  return /^[1-9][1-9](9\d{8}|[2-8]\d{7})$/.test(normalizePhone(raw));
}

/** Máscara de exibição: (19) 99999-9999. */
export function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  const split = d.length > 10 ? 7 : 6;
  return `(${d.slice(0, 2)}) ${d.slice(2, split)}${d.length > 2 + (split - 2) ? "-" + d.slice(split) : ""}`;
}

export type FileMeta = { name: string; type: string; size: number };

export function fileExt(name: string): string {
  const i = name.lastIndexOf(".");
  return i < 0 ? "" : name.slice(i + 1).toLowerCase();
}

export function validateFiles(files: FileMeta[]): string | null {
  if (files.length === 0) return "Anexe a foto ou o PDF da receita.";
  if (files.length > MAX_FILES) return `Envie no máximo ${MAX_FILES} arquivos.`;
  for (const f of files) {
    const mimes = MIME_BY_EXT[fileExt(f.name)];
    // Alguns navegadores deixam o MIME vazio em HEIC; a extensão continua obrigatória.
    if (!mimes || (f.type && !mimes.includes(f.type))) return "Formato não aceito. Use PDF, JPG, PNG, WEBP ou HEIC.";
    if (f.size === 0) return "Um dos arquivos está vazio.";
  }
  if (files.reduce((n, f) => n + f.size, 0) > MAX_TOTAL_BYTES) {
    return `Os arquivos somam mais de ${MAX_TOTAL_BYTES / 1024 / 1024} MB. Envie arquivos menores.`;
  }
  return null;
}

export type FormErrors = Partial<Record<"name" | "whatsapp" | "email" | "files" | "consent", string>>;

export function validateForm(input: { name: string; whatsapp: string; email: string; consent: boolean; files: FileMeta[] }): FormErrors {
  const e: FormErrors = {};
  if (input.name.trim().length < 2) e.name = "Informe seu nome.";
  if (!isValidBrPhone(input.whatsapp)) e.whatsapp = "Informe um WhatsApp válido com DDD.";
  if (input.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) e.email = "E-mail inválido.";
  const f = validateFiles(input.files);
  if (f) e.files = f;
  if (!input.consent) e.consent = "É necessário autorizar o uso dos dados para enviar.";
  return e;
}
