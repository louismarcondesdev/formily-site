import { WhatsAppButton } from "./WhatsAppButton";

/**
 * Barra fixa mobile. O <body> recebe padding-bottom equivalente (ver layout.tsx)
 * para que ela nunca cubra o rodapé ou CTAs.
 */
export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-fm-line bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <WhatsAppButton event="whatsapp_click_mobile_sticky" size="lg" className="w-full">
        Solicitar orçamento
      </WhatsAppButton>
    </div>
  );
}
