"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  // Se a tela ampliar para desktop com o menu aberto, fecha (evita scroll travado).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape fecha o menu; bloqueia scroll do body enquanto aberto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "border-fm-line shadow-soft" : "border-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[padding] duration-300 sm:px-6 lg:px-8",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <Logo />

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[0.95rem] font-semibold text-fm-indigo transition-colors hover:text-fm-green-dark">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton event="whatsapp_click_header" className="hidden lg:inline-flex">
            Solicitar orçamento
          </WhatsAppButton>
          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full text-fm-indigo hover:bg-fm-indigo/5 lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-fm-line bg-white lg:hidden"
      >
        <nav aria-label="Navegação mobile" className="mx-auto max-w-7xl px-4 pb-6 pt-2 sm:px-6">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => close()}
                  className="block rounded-xl px-2 py-3.5 text-lg font-semibold text-fm-indigo hover:bg-fm-mint-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <WhatsAppButton event="whatsapp_click_header" size="lg" className="mt-4 w-full" eventParams={{ placement: "mobile_menu" }}>
            Solicitar orçamento
          </WhatsAppButton>
        </nav>
      </div>
    </header>
  );
}
