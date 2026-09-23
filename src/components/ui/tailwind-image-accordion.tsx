import Image from "next/image";
import { cn } from "@/lib/utils";

export type ImageAccordionItem = {
  title: string;
  /** Linha curta abaixo do título (ex.: cargo). */
  subtitle?: string;
  /** Texto que aparece no hover/foco (desktop). No mobile fica sempre visível. */
  description?: string;
  /** Sem imagem, o painel mostra as iniciais do título sobre um fundo de marca. */
  image?: string | null;
  alt?: string;
};

const FALLBACK_BG = [
  "bg-gradient-to-br from-fm-indigo via-[#3d3390] to-[#1f1850]",
  "bg-gradient-to-br from-[#1d6b43] to-[#21734e]",
  "bg-gradient-to-br from-action-600 to-action-700",
];

const initials = (name: string) => {
  const parts = name.split(" ").filter(Boolean);
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const reveal =
  "transition duration-200 motion-reduce:transition-none md:translate-y-2 md:opacity-0 md:group-hover/item:translate-y-0 md:group-hover/item:opacity-100 md:group-focus-within/item:translate-y-0 md:group-focus-within/item:opacity-100";

/**
 * Faixa de painéis que expande no hover/foco (desktop). No mobile empilha e mostra tudo.
 * `persistentTitle`: título e subtítulo ficam sempre visíveis (só a descrição aparece no hover).
 */
export function TailwindImageAccordion({
  items,
  persistentTitle = false,
  heightClass = "h-72 md:h-[420px]",
}: {
  items: readonly ImageAccordionItem[];
  persistentTitle?: boolean;
  heightClass?: string;
}) {
  return (
    <ul className="group flex justify-center gap-2 max-md:flex-col">
      {items.map((item, i) => (
        <li
          key={item.title}
          tabIndex={0}
          className={cn(
            "group/item relative w-full overflow-hidden rounded-[24px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:z-10 before:h-3/5 before:bg-linear-to-t before:from-black/70 before:transition-opacity focus-visible:outline-offset-4 motion-reduce:transition-none md:not-[&:hover]:group-hover:w-[20%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[20%]",
            !persistentTitle && "md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100",
            heightClass,
            !item.image && FALLBACK_BG[i % FALLBACK_BG.length],
          )}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.alt ?? item.title}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-8 text-center text-7xl font-extrabold text-white/25 md:top-10"
            >
              {initials(item.title)}
            </span>
          )}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 text-white">
            <h3 className={cn("text-xl font-bold !text-white md:truncate md:whitespace-nowrap", !persistentTitle && reveal)}>
              {item.title}
            </h3>
            {item.subtitle && (
              <p
                className={cn(
                  "mt-1 text-xs font-bold uppercase tracking-[0.08em] text-white/85 md:truncate md:whitespace-nowrap",
                  !persistentTitle && reveal,
                )}
              >
                {item.subtitle}
              </p>
            )}
            {item.description && (
              <p className={cn("mt-3 text-sm leading-relaxed text-white/90 md:max-h-0 md:overflow-hidden md:group-hover/item:max-h-64 md:group-focus-within/item:max-h-64", "md:transition-[max-height,opacity] md:duration-300 motion-reduce:transition-none", "md:opacity-0 md:group-hover/item:opacity-100 md:group-focus-within/item:opacity-100")}>
                {item.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
