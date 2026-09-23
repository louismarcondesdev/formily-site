import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * TODO(logo): substituir pelo arquivo oficial do logo Formily (SVG) quando
 * disponível em public/images/. Este wordmark é um provisório com a paleta da marca.
 */
export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Formily Farmácia de Manipulação – página inicial"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <svg viewBox="0 0 40 40" className="size-9" aria-hidden="true">
        <defs>
          <linearGradient id={light ? "fm-lg-l" : "fm-lg"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#59bf84" />
            <stop offset="1" stopColor="#36b9e2" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="12" fill={light ? "#ffffff" : "#30266e"} />
        <path
          d="M14 30V12h11M14 20.5h8"
          stroke={`url(#${light ? "fm-lg-l" : "fm-lg"})`}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="28" cy="27.5" r="3" fill="#90dfa7" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn("text-xl font-extrabold tracking-tight", light ? "text-white" : "text-fm-indigo")}>
          formily
        </span>
        <span className={cn("mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em]", light ? "text-fm-mint" : "text-fm-green-dark")}>
          Farmácia de Manipulação
        </span>
      </span>
    </Link>
  );
}
