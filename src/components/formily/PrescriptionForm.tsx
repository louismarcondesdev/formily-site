"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ACCEPT, MAX_FILES, maskPhone, validateForm, type FormErrors } from "@/lib/prescription";
import { WhatsAppButton } from "./WhatsAppButton";

const field = "mt-1.5 w-full rounded-xl border border-border-subtle bg-white px-4 py-3 text-base aria-[invalid=true]:border-red-600";
const order = ["name", "whatsapp", "email", "files", "consent"] as const;

export function PrescriptionForm({ pharmacistMessage }: { pharmacistMessage: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const focusFirst = (e: FormErrors) => {
    const first = order.find((k) => e[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first === "files" ? "files" : first}"]`)?.focus();
  };

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const files = data.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    const errs = validateForm({
      name: String(data.get("name") ?? ""),
      whatsapp: String(data.get("whatsapp") ?? ""),
      email: String(data.get("email") ?? ""),
      consent: data.get("consent") === "on",
      files,
    });
    setErrors(errs);
    setServerError("");
    if (Object.keys(errs).length) return focusFirst(errs);

    setStatus("sending");
    try {
      const res = await fetch("/api/receita", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: FormErrors };
      if (res.ok && json.ok) return setStatus("done");
      setStatus("idle");
      if (json.errors) {
        setErrors(json.errors);
        return focusFirst(json.errors);
      }
      setServerError(json.error ?? "Não foi possível enviar. Tente novamente.");
    } catch {
      setStatus("idle");
      setServerError("Sem conexão. Seus dados continuam preenchidos; tente novamente.");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl border border-care-700/20 bg-care-50 p-6">
        <p className="text-xl font-bold text-care-700">Recebemos sua receita!</p>
        <p className="mt-2 text-fm-ink/90">Nossa equipe entrará em contato pelo WhatsApp.</p>
        <WhatsAppButton event="whatsapp_click_process" variant="ghost" message={pharmacistMessage} className="mt-5">
          Falar com o farmacêutico
        </WhatsAppButton>
      </div>
    );
  }

  const err = (k: keyof FormErrors) => (errors[k] ? <p id={`${k}-err`} className="mt-1 text-sm font-semibold text-red-700">{errors[k]}</p> : null);
  const aria = (k: keyof FormErrors) => ({ "aria-invalid": Boolean(errors[k]), "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-8 space-y-6">
      {/* Honeypot: invisível para pessoas. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>Não preencha<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div>
        <label htmlFor="name" className="font-bold">Nome</label>
        <input id="name" name="name" autoComplete="name" required className={field} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="whatsapp" className="font-bold">WhatsApp</label>
        <input
          id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(19) 99999-9999"
          value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} required className={field} {...aria("whatsapp")}
        />
        {err("whatsapp")}
      </div>
      <div>
        <label htmlFor="email" className="font-bold">E-mail <span className="font-normal text-fm-muted">(opcional)</span></label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="files" className="font-bold">Anexo da receita</label>
        <input id="files" name="files" type="file" accept={ACCEPT} multiple required className={field} {...aria("files")} />
        <p className="mt-1 text-sm text-fm-muted">PDF, JPG, PNG, WEBP ou HEIC. Até {MAX_FILES} arquivos, somando no máximo 4 MB.</p>
        {err("files")}
      </div>
      <div>
        <label className="flex min-h-11 items-start gap-3">
          <input type="checkbox" name="consent" className="mt-0.5 size-6 shrink-0 accent-[var(--action-600)]" {...aria("consent")} />
          <span>
            Autorizo a Formily a usar meus dados e minha receita <strong>apenas</strong> para elaborar meu orçamento e retornar o contato.{" "}
            <Link href="/politica-de-privacidade" className="font-semibold text-action-700 underline underline-offset-4">Política de privacidade</Link>
          </span>
        </label>
        {err("consent")}
      </div>

      {serverError && <p role="alert" className="font-semibold text-red-700">{serverError}</p>}

      <button type="submit" disabled={status === "sending"} className="btn-primary min-h-[54px] rounded-full px-7 py-3.5 text-base font-bold disabled:opacity-60">
        {status === "sending" ? "Enviando…" : "Enviar receita"}
      </button>
    </form>
  );
}
