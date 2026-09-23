"use client";

import { Navigation } from "lucide-react";
import { contact, hasBusinessValue } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Botão secundário "Abrir rota no Google Maps". Só renderiza se `directionsUrl` estiver configurada. */
export function DirectionsLink({ className }: { className?: string }) {
  if (!hasBusinessValue(contact.directionsUrl)) return null;
  return (
    <a
      href={contact.directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("directions_click")}
      className={cn(
        "btn-secondary inline-flex min-h-12 items-center justify-center gap-2.5 rounded-2xl px-6 py-3 font-bold",
        className,
      )}
    >
      <Navigation className="size-5" aria-hidden="true" />
      Abrir rota no Google Maps
      <span className="sr-only"> (abre em uma nova aba)</span>
    </a>
  );
}
