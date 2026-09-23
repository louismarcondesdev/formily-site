# Formily — transições de seção

Sistema leve, reutilizável e acessível, feito com `motion` (já instalado; nada novo foi adicionado).

## Componentes
- `src/components/ui/scroll-reveal.tsx`
  - `<Reveal>`: fade + deslocamento vertical (padrão 16px, máx. 20px), `scale` opcional (ex.: `0.98`), `delay`, `duration`. Roda **uma vez** ao entrar na tela.
  - `<RevealGroup>` + `<RevealItem>`: stagger dos filhos (padrão 0.08 s; faixa 0.06–0.10).
- `src/components/ui/text-reveal.tsx`: `<TextReveal text>` palavra por palavra (opacity + 10px). O texto completo fica em `sr-only`; as palavras animadas são `aria-hidden`.
- `SectionHeading` aceita `textReveal` para animar o título.

## Regras de motion
Duração 0.35–0.5 s (padrão 0.45 s), easing `[0.22, 1, 0.36, 1]`, só `opacity`/`transform`, sem rotação, bounce, blur, parallax ou animação contínua.

## Onde é usado
Hero (título, texto, CTAs, indicadores, carrossel) · Cuidado que começa antes da fórmula (**Text Reveal** no título + abas) · Como funciona (título, etapas, CTA) · Áreas de cuidado (grade com stagger + CTA) · FAQ (título, acordeão, caixa de dúvidas) · Contato (card e mapa em stagger) · CTA final (**Text Reveal** no título + texto, botão e apoio em stagger).
Text Reveal fica limitado a no máximo 3 títulos institucionais (hoje 2; o 3º, "Como funciona a manipulação?", depende da página `/como-funciona`).

## Acessibilidade e desempenho
- `prefers-reduced-motion`: fade curto (0,15 s), sem translate/scale; Text Reveal aparece direto.
- Sem JavaScript, o conteúdo fica visível: `<noscript>` no `layout.tsx` neutraliza `[data-reveal]`.
- Sem listeners de scroll globais (usa `whileInView`/IntersectionObserver do Motion). Sem layout shift (só transform/opacity).

## Ainda não implementado
Animated Cards Stack / timeline progressiva na página `/como-funciona` e Container Scroll Animation (opcional) — a página `/como-funciona` ainda não existe.
