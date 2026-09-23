import type { TrackEventName } from "@/lib/analytics";
import { WhatsAppTextLink } from "./WhatsAppTextLink";

/** Se `linkLabel` aparecer em `text`, essa parte vira link para o WhatsApp. */
export function LinkedText({ text, linkLabel, event }: { text: string; linkLabel?: string; event: TrackEventName }) {
  const i = linkLabel ? text.indexOf(linkLabel) : -1;
  if (!linkLabel || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <WhatsAppTextLink event={event}>{linkLabel}</WhatsAppTextLink>
      {text.slice(i + linkLabel.length)}
    </>
  );
}
