---
name: Formily Farmácia de Manipulação
description: Vitrine acolhedora de farmácia familiar, com índigo de marca, uma única CTA azul e cantos generosos.
colors:
  indigo-brand: "#30266e"
  indigo-title: "#26205e"
  indigo-support: "#342a78"
  indigo-tint: "#f1f0fa"
  action: "#0880a6"
  action-hover: "#06779c"
  action-tint: "#e8f8fc"
  care: "#21734e"
  care-tint: "#edf9f1"
  green-brand: "#59bf84"
  green-deep: "#1d6b43"
  mint: "#90dfa7"
  mint-soft: "#e9f8ee"
  cyan-brand: "#36b9e2"
  ink: "#20203a"
  text-body: "#24213a"
  text-muted: "#5e6074"
  text-meta: "#74768a"
  surface: "#ffffff"
  surface-soft: "#f7f8fa"
  border-subtle: "#e4e7ec"
  border-secondary: "#cac8d9"
  indigo-deep: "#1f1850"
  indigo-mid: "#3d3390"
  indigo-gradient-end: "#29366d"
  action-glow: "rgba(7, 138, 182, 0.42)"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 5.4vw, 5.8rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.08em"
  caption:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
  nav:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
  body-compact:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
  lead:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  lead-large:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.6
  wordmark:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.62rem"
    fontWeight: 600
    letterSpacing: "0.14em"
  button-small:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
  dev-note:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    letterSpacing: "0.025em"
rounded:
  chip: "999px"
  focus: "6px"
  sm: "8px"
  md: "12px"
  secondary: "16px"
  panel-sm: "20px"
  card: "22px"
  panel: "24px"
  hero: "32px"
spacing:
  gutter-mobile: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "32px"
  section-mobile: "80px"
  section-desktop: "112px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.surface}"
    rounded: "{rounded.chip}"
    padding: "14px 28px"
    height: "54px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.indigo-title}"
    rounded: "{rounded.secondary}"
    padding: "14px 28px"
    height: "54px"
  button-secondary-hover:
    backgroundColor: "{colors.indigo-tint}"
  card-area:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "28px"
  chip-category:
    backgroundColor: "{colors.indigo-tint}"
    textColor: "{colors.indigo-title}"
    rounded: "{rounded.chip}"
    padding: "8px 16px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: Formily Farmácia de Manipulação

## Overview

**Creative North Star: "O Balcão da Família"**

O site é um balcão de farmácia familiar aberto na web: o visitante é recebido com calma, vê quem cuida da fórmula e é conduzido a uma conversa. O rigor de laboratório aparece na precisão do detalhe (contraste calculado, um só botão dominante), não em frieza. O índigo do logo dá autoridade; o verde e o ciano, também tirados do logo, entram como apoio de acolhimento.

A densidade é baixa e respirada: seções alternam branco e cinza muito claro, com títulos grandes e texto corrido confortável. A interface nunca compete com a ação principal. Existe um único preenchido azul por região (WhatsApp); todo o resto é secundário, branco ou tintado.

**Key Characteristics:**
- Índigo de marca para autoridade e títulos; azul-petróleo (`action`) exclusivo para a CTA primária.
- Cantos generosos (22–32px) e pílula só na CTA de WhatsApp.
- Sombras difusas e baixas; nada de contornos pesados.
- Ilustrações do topo e logo são aprovados e intocáveis (decisão da cliente em 23/09/2026).
- Nada depende de hover: tudo funciona por toque e teclado.

## Colors

Paleta tirada do logo: índigo profundo, verde-menta e ciano sobre brancos levemente azulados. O azul de ação é a única cor "de clique".

### Primary
- **Índigo da Marca** (`#30266e`): cor do logo, fundo da faixa do topo e do CTA final. Autoridade.
- **Índigo dos Títulos** (`#26205e`): `h1`–`h3` e texto de botão secundário (14,5:1 sobre branco).
- **Índigo de Apoio** (`#342a78`) e **Índigo Névoa** (`#f1f0fa`): hover do secundário, chip de categoria, fundos de apoio.

### Secondary
- **Azul de Ação** (`#0880a6`): fundo da CTA primária; branco sobre ele dá 4,52:1. Hover em **Azul de Ação Profundo** (`#06779c`, 5,1:1). Tom de apoio `#e8f8fc`.
- **Verde Acolhimento** (`#21734e`) sobre **Névoa Verde** (`#edf9f1`): confirmações, rótulos de cuidado, chips da categoria "Nutrição e performance".

### Tertiary
- **Verde da Marca** (`#59bf84`), **Menta** (`#90dfa7`), **Menta Suave** (`#e9f8ee`) e **Ciano da Marca** (`#36b9e2`): brilhos de fundo (hero, CTA final), anel de foco e ícones de apoio. **Verde Profundo** (`#1d6b43`) é o texto verde sobre menta (eyebrow).

### Neutral
- **Tinta** (`#20203a`) e **Texto** (`#24213a`): texto corrido e controles.
- **Cinza Quieto** (`#5e6074`, 6,2:1): texto secundário. **Metadado** (`#74768a`, 4,5:1) só para texto não essencial.
- **Branco** (`#ffffff`), **Cinza Névoa** (`#f7f8fa`) e **Fio** (`#e4e7ec`): fundos de seção e bordas finas. **Fio Índigo** (`#cac8d9`): borda do botão secundário.
- **Índigo Profundo** (`#1f1850`) e **Índigo Médio** (`#3d3390`): só como pontas do degradê de fundo de painéis sem foto (equipe, placeholders) e do CTA final (`#26205e → #30266e → #29366d`). Nunca em texto.

### Named Rules
**The One Blue Rule.** O azul de ação preenche só a CTA primária (WhatsApp/orçamento), uma por região visual. Qualquer outro botão é secundário.
**The Calculated Contrast Rule.** Todo par texto/fundo novo precisa de razão calculada AA (≥ 4,5:1). `text-meta` não carrega informação essencial.

## Typography

**Display Font:** Plus Jakarta Sans (com `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Plus Jakarta Sans
**Label/Mono Font:** Plus Jakarta Sans (sem mono; `ui-monospace` só como fallback)

**Character:** Uma única família geométrica e amigável em pesos 400–800. A hierarquia vem do peso e da escala, não de um par tipográfico.

### Hierarchy
- **Display** (700, `clamp(3rem, 5.4vw, 5.8rem)`, 0,98, -0,055em): título do hero.
- **Headline** (800, 30→44px, 1,15, -0,02em): títulos de seção (`h2`).
- **Title** (800, 24px, -0,02em): cards e blocos de contato.
- **Body** (400, 18px, 1,625): texto corrido e subtítulos; `text-muted` para apoio.
- **Label** (700, 12px, +0,08–0,12em, caixa-alta): eyebrows, títulos de bloco de contato e colunas do rodapé.
- **Nav** (600, 0,95rem): links do menu e botões de navegação. **Body compact** (400, 0,9375rem, 1,625): textos do bloco de contato no mobile (sobe para 1rem a partir de 640px). **Lead** (400, 1,0625rem → 1,25rem → 1,375rem): subtítulo do hero. **Wordmark** (600, 0,62rem, +0,14em, caixa-alta): linha "Farmácia de Manipulação" sob o logo, ajuste óptico do logotipo. **Button small** (500, 0,8rem): botão `sm` do shadcn, hoje sem uso. **Dev note** (600, 0,7rem): selo `[VALIDAR DISPONIBILIDADE]`, só em desenvolvimento.
- **Caption** (600, 14px, 1,5): notas, mensagens de erro do formulário, legendas e metadados. Não usar abaixo de 12px, exceto o selo `[VALIDAR DISPONIBILIDADE]` (11,2px), que só aparece em desenvolvimento.

### Named Rules
**The Balanced Headline Rule.** Títulos usam `text-wrap: balance` e tracking negativo; nunca centralizar parágrafos longos.

## Layout

Container de 1280px com gutter 16/24/32px (mobile/≥640/≥1024). Seções com respiro vertical de 80px (mobile) e 112px (desktop), alternando branco e `surface-soft`. Grades de 1 coluna no mobile, 2 no tablet e 3 no desktop; o contato vira duas colunas só a partir de 1024px (`grid-cols-1` explícito no mobile para evitar overflow). Breakpoints são os do Tailwind (640/768/1024/1280). Uma barra fixa de WhatsApp ocupa o rodapé do mobile; o `<body>` reserva 96px de padding inferior.

## Elevation & Depth

Híbrido plano: as superfícies ficam planas em repouso e a profundidade vem de fundos alternados mais sombras difusas e baixas em cards, header e CTAs.

### Shadow Vocabulary
- **Soft** (`0 1px 2px rgb(32 32 58 / .03), 0 6px 18px -8px rgb(48 38 110 / .08)`): cards em repouso.
- **Lift** (`0 2px 4px rgb(32 32 58 / .04), 0 16px 32px -16px rgb(48 38 110 / .16)`): cards em hover.
- **Header** (`0 10px 30px rgba(34,31,70,.08)`, blur 14px): barra de navegação; ao rolar (`.is-sticky`) vira `0 10px 24px rgba(34, 31, 70, 0.1)`.
- **CTA** (`0 8px 20px rgba(7,138,182,.16)`): botão primário; no hover vira `0 12px 24px rgba(7, 138, 182, 0.22)`.
- **Brilho do CTA final** (`radial-gradient` de `rgba(7, 138, 182, 0.42)` a 92%/82%, mais um toque verde `rgba(89, 191, 132, 0.1)`): só no fundo do CTA final, sobre o degradê `#26205e → #30266e → #29366d`.

### Named Rules
**The Quiet Shadow Rule.** Sombra é difusa e colorida pelo índigo; nunca preta pura nem com contorno duro.

## Shapes

Cantos generosos. Cards 22–24px (`.faq-help` e variantes menores, 20px); anel de foco com raio de 6px; painéis de contato 24px; hero e CTA final 28–32px; botão secundário 16px; campos 12px; chips e CTA primária em pílula (999px). Eyebrows usam 8px. Cuidado: `rounded-xl` do tema vale 22px, então raios pequenos devem ser explícitos (`rounded-[8px]`, `rounded-[12px]`).

## Components

### Buttons
- **Shape:** CTA primária em pílula (999px); secundária com 16px.
- **Primary:** `#0880a6`, texto branco, 54px de altura (46px no header), sombra de CTA. Variante `onDark` ganha filete branco translúcido sobre o CTA final.
- **Hover / Focus:** hover escurece para `#06779c` e sobe 1px (só sem `prefers-reduced-motion`); foco com anel de 3px verde translúcido e offset 3px.
- **Secondary / Ghost:** branco 72%, borda `#cac8d9`, texto índigo; hover `#f1f0fa` com borda índigo.

### Chips
- **Style:** pílula de texto, sem ícone, uma cor por categoria (índigo, verde, menta, rosa, violeta) com borda de 1px a 15–20% de opacidade e texto escuro (AA).
- **State:** não clicáveis (experimento reversível D-006); a categoria é lida por leitor de tela em `sr-only`.

### Cards / Containers
- **Corner Style:** 22–24px.
- **Background:** branco sobre `surface-soft`.
- **Shadow Strategy:** Soft em repouso, Lift em hover (sem zoom).
- **Border:** `border-subtle`.
- **Internal Padding:** 24–36px.

### Inputs / Fields
- **Style:** fundo branco, borda `border-subtle`, raio 12px, padding 12×16px, label sempre visível acima.
- **Focus:** contorno global de 3px ciano (`#36b9e2`) com offset 3px.
- **Error / Disabled:** borda vermelha (`aria-invalid`) com mensagem em vermelho 700; botão de envio a 60% enquanto envia.

### Navigation
Barra flutuante "pill" translúcida (`rgba(255,255,255,.88)`, blur 14px, raio 22px) sobre o conteúdo; 76px → 68px ao rolar. Item ativo com sublinhado verde de 2px. No mobile, um menu em painel com foco gerenciado e botão WhatsApp.

### Carrossel de áreas (componente de assinatura)
Cards 2:3 com ilustração em tela cheia e degradê branco na base para o texto; ícone em chip branco de 48px; leva à página da categoria ou ao WhatsApp com a categoria na mensagem. Intocável: as ilustrações foram aprovadas pela cliente.

## Do's and Don'ts

### Do:
- **Do** usar o azul de ação só para a CTA primária, uma por região.
- **Do** calcular contraste de qualquer par novo (mínimo 4,5:1 para texto normal).
- **Do** manter cantos de 22–24px em cards e 999px apenas na CTA de WhatsApp.
- **Do** garantir que tudo funcione por toque e teclado, sem depender de hover.
- **Do** alternar `surface` e `surface-soft` entre seções.

### Don't:
- **Don't** alterar ícones/ilustrações do topo, o logo ou os horários de funcionamento.
- **Don't** usar preço, carrinho ou imagem de produto: o site é vitrine, não loja.
- **Don't** inventar fotos, depoimentos ou números; o que falta é placeholder marcado.
- **Don't** usar sombras pretas ou contornos duros, nem faixa colorida lateral em cards (`border-left` grosso).
- **Don't** usar zoom no hover de cards nem easing com bounce.
