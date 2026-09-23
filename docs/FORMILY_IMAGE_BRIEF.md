# Formily — Brief de imagens

Como trocar qualquer imagem: coloque o arquivo em `public/images/` e defina `src` no slot correspondente em `src/config/site.ts` (objeto `images`), por exemplo `src: "/images/formily-hero.jpg"`. Enquanto `src` for `null`, o site mostra um placeholder abstrato (em desenvolvimento, com o nome do arquivo esperado; em produção, sem rótulo).

> **Fotos REAIS obrigatórias:** fachada/recepção, equipe/farmacêutico responsável e ambiente/laboratório **devem ser fotografias reais da Formily**. Não publicar imagens geradas por IA como se fossem o espaço físico ou a equipe. Os prompts abaixo servem para hero, ilustrações e fundos conceituais, e como referência de estilo para a sessão de fotos. Respeitar ainda autorização de imagem das pessoas fotografadas e não exibir rótulos/embalagens de medicamentos.

| # | Seção | Slot (`images.*`) | Arquivo sugerido | Proporção / tamanho | Real ou IA |
|---|---|---|---|---|---|
| 1 | Hero | `hero` | `formily-hero.jpg` | ~4:4.2 (mobile) a 4:3; mín. 1600×1400 | IA/banco permitido (não simular fachada real) |
| 2 | Como funciona | `process` | `formily-como-funciona.png` | 1:1; 1200×1200 | Ilustração/IA |
| 3 | Manifesto | `about` | `formily-manifesto.jpg` | ~4:3.4; 1600×1360 | **FOTO REAL** (equipe, recepção ou ambiente) |
| 4a | Estrutura — grande | `structureFacade` | `formily-fachada-recepcao.jpg` | 4:3 (ocupa 2 linhas no desktop); 1800×1350 | **FOTO REAL** |
| 4b | Estrutura — equipe | `structureTeam` | `formily-equipe.jpg` | 4:3; 1200×900 | **FOTO REAL** |
| 4c | Estrutura — laboratório | `structureLab` | `formily-laboratorio.jpg` | 4:3; 1200×900 | **FOTO REAL** (apenas área permitida) |
| 5 | CTA final (opcional) | `finalCta` | `formily-cta-final.png` | 16:9; 2400×1350 | Ilustração/IA (hoje o fundo é feito em CSS) |

## Seção "Cuidado que começa antes da fórmula" (abas verticais)
Usa `src/components/ui/vertical-tabs.tsx`. Os 4 diferenciais ficam em `trust.cards` (`src/config/site.ts`), cada um com `image` e `alt`. Hoje reaproveitam fotos da Formily já em `public/images/` (manifesto, laboratório, fachada, equipe); para trocar, altere `image`/`alt` do card. Não há troca automática: o visitante navega por clique ou setas do teclado.

## Textos alternativos recomendados
1. Hero: "Farmacêutica em laboratório de manipulação" (ajustar se for outra cena).
2. Como funciona: `""` (decorativa).
3. Manifesto: descrever a foto real (ex.: "Equipe da Formily na recepção").
4. Estrutura: "Fachada ou recepção da Formily", "Farmacêutico responsável e equipe da Formily", "Área do laboratório da Formily" — ajustar à foto real.
5. CTA final: `""` (decorativa).

## Prompts (inglês)

**1. Hero** — `formily-hero.jpg`
> Editorial premium photograph of a Brazilian female pharmacist in a contemporary compounding pharmacy laboratory, navy blue and mint green visual accents, soft natural daylight, organized clean workspace, laboratory glassware subtly visible, warm approachable expression, sophisticated healthtech branding, realistic photography, shallow depth of field, horizontal website hero composition, no text, no logos, no visible medicine labels

**2. Como funciona** — `formily-como-funciona.png`
> Minimal 3D illustration representing personalized pharmaceutical compounding, elegant capsules, glass vial, subtle molecule lines and organic shapes, indigo navy, mint green and cyan color palette, white background, premium Brazilian healthtech aesthetic, soft shadows, clean composition, no text, no logos

**3. Manifesto** — `formily-manifesto.jpg` (referência de estilo; publicar foto real)
> Authentic editorial lifestyle photography of a diverse Brazilian family sharing a calm everyday moment at home, subtle sense of care and wellbeing, natural light, elegant neutral clothing, refined modern aesthetic, navy blue, mint and cyan accents, horizontal composition with negative space for website text, no text, no logos

**4. Estrutura / laboratório** — `formily-laboratorio.jpg` (referência de estilo; publicar foto real)
> High-end editorial photograph of a clean pharmaceutical compounding workspace, gloved hands measuring ingredients with precision, stainless steel equipment and glass containers, no readable labels, no medication packaging, strong attention to cleanliness and process, indigo and mint green color accents, realistic lighting, premium, trustworthy, horizontal composition

**5. Atendimento** — `formily-fachada-recepcao.jpg` (referência de estilo; publicar foto real da recepção)
> Realistic editorial photo of a Brazilian pharmacy professional warmly assisting an adult customer at a minimalist modern reception, private and respectful interaction, clean white and navy blue space, subtle mint green details, natural daylight, premium service experience, no brand logos, no text

**6. CTA final** — `formily-cta-final.png`
> Abstract premium 3D visual for a modern personalized healthcare brand, flowing organic shapes inspired by liquid, molecules and care, deep indigo background, mint green and cyan translucent elements, soft glow, subtle depth, generous empty space for headline and call to action, no text, no logos

## Logo
O wordmark em `src/components/formily/Logo.tsx` é **provisório** (o arquivo do logo não estava no repositório). Substituir pelo SVG oficial em `public/images/` e atualizar o componente.
