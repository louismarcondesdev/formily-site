import { flags, isFilled, videos } from "@/config/site";
import { Container, SectionHeading } from "./Section";

/** Só links (sem embeds): nada de cookies/peso de terceiros. Oculta sem flag ou sem URL real. */
export function VideosSection() {
  const links = [
    { label: "Ver nosso YouTube", href: videos.youtubeChannelUrl },
    { label: "Seguir no Instagram", href: videos.instagramUrl },
  ].filter((l) => isFilled(l.href));
  if (!flags.videos || links.length === 0) return null;

  return (
    <section aria-labelledby="videos-title" className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading id="videos-title" title={videos.title} subtitle={videos.subtitle} />
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex min-h-[54px] items-center justify-center rounded-2xl px-7 py-3.5 text-base font-bold"
            >
              {l.label}
              <span className="sr-only"> (abre em uma nova aba)</span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
