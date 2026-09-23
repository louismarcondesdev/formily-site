# Formily — tokens de design e regras de uso

Tokens em `src/app/globals.css` (`:root` e `@theme`). Use as classes Tailwind `text-brand-950`, `bg-action-600`, `bg-surface-50`, `border-border-subtle` etc.

## Hierarquia de cor
- **Índigo (`brand-950/800/50`)**: autoridade, marca, títulos e conteúdo de alta confiança.
- **Azul de ação (`action-600/700/50`)**: **único** preenchimento de CTA primário (WhatsApp/orçamento).
- **Verde (`care-700/50`, `--formily-green`)**: acolhimento, confirmação, ícones de apoio, item ativo do menu.
- **Neutros (`surface-0/50`, `border-subtle`, `text-950/650/500`)**: respiro. Seções alternam `surface-0` e `surface-50`.

| Token | Valor | Uso |
|---|---|---|
| `--brand-950` | `#26205E` | títulos, texto de botão secundário |
| `--brand-800` / `--brand-50` | `#342A78` / `#F1F0FA` | apoio índigo / hover secundário |
| `--action-600` | `#0880A6` | fundo do CTA primário |
| `--action-700` | `#06779C` | hover do CTA primário |
| `--action-50` | `#E8F8FC` | fundos de apoio da ação |
| `--care-700` / `--care-50` | `#21734E` / `#EDF9F1` | ícones e rótulos de cuidado |
| `--surface-0` / `--surface-50` | `#FFFFFF` / `#F7F8FA` | fundos de seção |
| `--border-subtle` | `#E4E7EC` | bordas finas |
| `--text-950` / `--text-650` / `--text-500` | `#24213A` / `#5E6074` / `#74768A` | texto; `text-500` só para metadados não essenciais |

> **Desvio registrado:** o valor pedido para `--action-600` era `#078AB6`, mas branco sobre ele dá 3,95:1 (abaixo de 4,5:1 para texto normal). Usamos `#0880A6` (4,52:1), quase igual visualmente. Para voltar, altere só esse token.

## Botões
- **Primário** (`.btn-primary`, `WhatsAppButton variant="primary"`): fundo `action-600`, texto/ícone branco, raio 999px, sombra `0 8px 20px rgba(7,138,182,.16)`, hover `action-700` + `translateY(-1px)` (200 ms, só sem `prefers-reduced-motion`), foco `3px rgba(89,191,132,.55)` com offset 3px. Altura: header 46px (`size="md"`), hero/CTA 54px (`size="lg"`).
- **Primário sobre fundo escuro** (`variant="onDark"`, `.btn-on-cta`): mesmo estilo, com filete claro.
- **Secundário** (`.btn-secondary`, `variant="ghost"`): branco translúcido, borda `#CAC8D9`, texto `brand-950`, hover `brand-50` + borda `brand-950`, raio 16px (não pill).
- Regra: **um** primário por região visual (header e hero); demais ações usam secundário.

## Raios
Cards 20–24px · hero/CTA 28–32px · botões secundários 14–16px · CTA WhatsApp 999px · header 22px (desktop) / 20px (mobile).

## Header
`.site-header` (fundo `rgba(255,255,255,.88)`, borda `rgba(48,38,110,.08)`, blur 14px). Desktop 76px → 68px ao rolar (`.is-sticky`: fundo .95, borda inferior levemente mais firme). Container máx. 1200px. Item de menu ativo (rota atual, links sem `#`): sublinhado verde de 2px + `aria-current="page"`.

## Áreas de cuidado
`careAreas.items[].enabled` em `src/config/site.ts`. Só habilitadas aparecem; habilite apenas categorias **confirmadas** pela Formily. `< 4` habilitadas = seção institucional (sem citar categorias); `4–6` = grade 3/2/1; `7+` = bento com card principal. O selo `[VALIDAR DISPONIBILIDADE]` aparece apenas em desenvolvimento. Hoje: 5 habilitadas (as 3 restantes ficam `enabled: false`) e `confirmed: false` em todas — **validar com a Formily antes de publicar**.

## Contraste validado (WCAG 2.2, calculado)
| Par | Razão | Resultado |
|---|---|---|
| Branco sobre `action-600` `#0880A6` | 4,52:1 | AA texto normal |
| Branco sobre `action-700` `#06779C` | 5,09:1 | AA |
| `brand-950` sobre branco | 14,5:1 | AAA |
| `text-650` sobre branco / `surface-50` | 6,17 / 5,81:1 | AA |
| `text-950` sobre branco | 15,5:1 | AAA |
| `care-700` sobre `care-50` / branco | 5,35 / 5,79:1 | AA |
| `brand-950` sobre `brand-50` | 12,8:1 | AAA |
| Branco sobre `#30266E` (CTA final) | 12,9:1 | AAA |
| `text-500` sobre branco | 4,47:1 | limite — só metadados não essenciais |
| `border-subtle` sobre branco | 1,24:1 | decorativo (não carrega informação) |

## Decisões de marca em uso (a confirmar com a Formily)
- **Cor de marca:** índigo `#30266E` (cor do logo) — decisão real de marca, não o índigo padrão do Tailwind.
- **Tipografia:** Plus Jakarta Sans (`src/app/layout.tsx`). Em uso; **confirmar** se é a fonte oficial e registrar o motivo aqui.
- **Referência de layout:** ainda não definida. Registrar aqui quando houver.
- **Formas:** cantos de 20–24px em cards; **pílula só no CTA de WhatsApp**. Chips, setas e botões pequenos usam raio 8–12px (raios explícitos de 8–12px (`rounded-[8px]`, `rounded-[12px]`); atenção: `rounded-xl` do tema vale 22px).
- **Movimento:** sem zoom no hover de cards; reveals conforme `docs/FORMILY_MOTION.md`.
