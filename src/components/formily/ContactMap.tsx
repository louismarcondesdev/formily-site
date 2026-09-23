"use client";

import { useState } from "react";
import { ArrowRight, MapPin, Hand } from "lucide-react";
import { contact, hasBusinessValue } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

const label = `Mapa com a localização da ${contact.companyName}`;

/**
 * Mapa do Google Maps via embed oficial (sem API key), gerado das coordenadas de src/config/site.ts.
 * - Proporção fixa (celular 1/1 para o pin não colidir com a legenda; tablet 4/3; desktop 520px), raio 24px, borda `border-subtle`, sem sombra.
 * - Legenda discreta no canto inferior esquerdo, acima do logo/controles do Google (não os cobre).
 * - Em telas de toque, uma camada "Toque para interagir" evita que a rolagem da página fique presa no mapa.
 * O pin vermelho é o padrão do embed do Google (não estilizável em iframe).
 */
export function ContactMap() {
  const [active, setActive] = useState(false);

  return (
    <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-[24px] border border-border-subtle bg-care-50 lg:aspect-auto lg:h-[520px] lg:w-full">
      {hasBusinessValue(contact.mapsEmbedUrl) ? (
        <>
          <iframe
            title={label}
            src={contact.mapsEmbedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />

          {/* Toque para interagir: só aparece em ponteiro "coarse" (celular/tablet) até o primeiro toque. */}
          {!active && (
            <button
              type="button"
              onClick={() => setActive(true)}
              aria-label="Ativar o mapa para arrastar e ampliar"
              className="absolute inset-0 z-10 hidden items-start justify-center bg-transparent pt-4 pointer-coarse:flex"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-brand-950 shadow-soft">
                <Hand className="size-4" aria-hidden="true" />
                Toque para interagir com o mapa
              </span>
            </button>
          )}

          <div className="pointer-events-none absolute bottom-16 left-3 z-20 sm:left-4">
            <div className="pointer-events-auto flex max-w-[15rem] flex-col gap-1 rounded-2xl bg-white/95 px-4 py-3 shadow-soft">
              <p className="text-sm font-bold leading-snug text-brand-950">{contact.companyName}</p>
              {hasBusinessValue(contact.directionsUrl) && (
                <a
                  href={contact.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("directions_click", { placement: "map_caption" })}
                  aria-label={`Como chegar à ${contact.companyName} (abre o Google Maps em uma nova aba)`}
                  className="inline-flex w-fit items-center gap-1 text-sm font-bold text-care-700 underline-offset-4 hover:underline"
                >
                  Como chegar
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-3 p-8 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-white text-brand-950 ring-1 ring-border-subtle">
            <MapPin className="size-7" aria-hidden="true" />
          </span>
          <p className="font-bold text-brand-950">{contact.companyName}</p>
          {process.env.NODE_ENV !== "production" && (
            <p className="max-w-xs text-sm text-text-650">Configure a localização da unidade para exibir o mapa.</p>
          )}
        </div>
      )}
    </div>
  );
}
