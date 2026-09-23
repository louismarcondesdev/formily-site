import Image from "next/image";
import Link from "next/link";
import type { FC, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  /** Sem `href`, o item é exibido como texto (ex.: linhas de contato). */
  href?: string;
  badge?: string;
}

interface FooterColumn {
  title: string;
  /** Rótulo acessível da <nav> da coluna; omita para colunas que não são navegação. */
  navLabel?: string;
  links: FooterLink[];
  /** Texto curto abaixo da lista (ex.: aviso institucional). */
  note?: ReactNode;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface FooterProps {
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  description: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright: string;
  /** Linhas legais (razão social/CNPJ, responsável técnico). Só passe se confirmadas. */
  legalLines?: string[];
  /** Aviso institucional exibido na linha inferior. */
  disclaimer?: ReactNode;
  className?: string;
}

/** Links internos usam next/link; tel:, mailto: e URLs externas usam <a>. */
function FooterAnchor({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={className} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {external && <span className="sr-only"> (abre em uma nova aba)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export const Footer: FC<FooterProps> = ({
  logoSrc,
  logoAlt,
  logoWidth,
  logoHeight,
  description,
  columns,
  socialLinks = [],
  copyright,
  legalLines = [],
  disclaimer,
  className,
}) => {
  return (
    <footer className={cn("w-full border-t border-border-subtle bg-white", className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1.25fr_1fr] lg:gap-12">
          {/* Marca: logo + frase curta + redes sociais (só se houver) */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label={logoAlt} className="inline-flex w-fit">
              <Image src={logoSrc} alt={logoAlt} width={logoWidth} height={logoHeight} className="h-14 w-auto object-contain" />
            </Link>
            <p className="max-w-xs leading-relaxed text-text-650">{description}</p>
            {socialLinks.length > 0 && (
              <div className="mt-1 flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-xl border border-border-subtle text-brand-950 transition-colors hover:bg-brand-50"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {columns.map((col) => {
            const list = (
              <ul className="mt-3 space-y-0.5">
                {col.links.map(({ label, href, badge }) => (
                  <li key={label}>
                    {href ? (
                      <FooterAnchor href={href} className="inline-flex min-h-10 items-center gap-2 text-text-650 underline-offset-4 transition-colors hover:text-brand-950 hover:underline">
                        {label}
                        {badge && <span className="rounded bg-care-50 px-1.5 text-xs font-semibold text-care-700">{badge}</span>}
                      </FooterAnchor>
                    ) : (
                      <span className="inline-flex min-h-10 items-center text-text-650">{label}</span>
                    )}
                  </li>
                ))}
                {col.note && <li className="max-w-[16rem] pt-1 text-sm leading-relaxed text-text-650">{col.note}</li>}
              </ul>
            );
            return (
              <div key={col.title}>
                <h2 className="text-xs font-bold uppercase tracking-[0.08em] text-brand-950">{col.title}</h2>
                {col.navLabel ? <nav aria-label={col.navLabel}>{list}</nav> : list}
              </div>
            );
          })}
        </div>

        {/* Linha inferior: divisória + copyright + aviso institucional */}
        <div className="mt-12 flex flex-col gap-2 border-t border-border-subtle pt-6 text-sm text-text-650">
          <p>{copyright}</p>
          {legalLines.map((l) => (
            <p key={l}>{l}</p>
          ))}
          {disclaimer && <p className="max-w-3xl leading-relaxed">{disclaimer}</p>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
