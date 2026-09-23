# Formily — Guia de configuração

## Arquivos principais
- `src/config/site.ts` — todo o conteúdo e configuração (textos, contatos, áreas de atendimento, imagens, FAQ).
- `src/config/legal.tsx` — textos iniciais das páginas legais.
- `src/lib/whatsapp.ts` — montagem da URL `wa.me` com mensagem pré-preenchida.
- `src/lib/analytics.ts` — `trackEvent()` (dataLayer/gtag/CustomEvent `formily:track`).
- `src/lib/schema.ts` + `components/formily/JsonLd.tsx` — JSON-LD (só campos preenchidos).
- `src/components/formily/*` — seções da home; `src/app/{page,layout,sitemap,robots}.ts(x)`; rotas legais em `src/app/{politica-de-privacidade,politica-de-cookies,termos-de-uso}`.
- `src/app/globals.css` — tokens de marca (`--formily-*`) e utilitários `fm-*`.

## Variáveis de ambiente (opcionais; `.env.local`, nunca commitar)
| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Domínio (canonical, sitemap, robots, OG, JSON-LD). Ex.: `https://formily.com.br` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | DDI+DDD+número, só dígitos (ex.: `5511999999999`) |
| `NEXT_PUBLIC_WHATSAPP_DISPLAY` | Texto exibido do WhatsApp (ex.: `(11) 99999-9999`) |
| `NEXT_PUBLIC_MAPS_DIRECTIONS_URL` | Link "Abrir rota no Google Maps" |
| `NEXT_PUBLIC_MAPS_EMBED_URL` | (Opcional) URL de embed do Google Maps (Compartilhar → Incorporar um mapa → copiar o `src` do iframe). Padrão: gerada das coordenadas. Não usa API key |
| `NEXT_PUBLIC_MAP_LATITUDE` / `NEXT_PUBLIC_MAP_LONGITUDE` | Coordenadas da unidade (padrão: as do link do Google Maps informado pela Formily) |

## WhatsApp
Defina `NEXT_PUBLIC_WHATSAPP_NUMBER`. Sem ele, todos os botões apontam para `https://wa.me/PREENCHER_NUMERO_WHATSAPP?text=...` (placeholder identificável). A mensagem padrão está em `whatsapp.defaultMessage`; cada card de área usa `careAreaMessage()`.
Eventos: `whatsapp_click_header|hero|process|care_area|final_cta|mobile_sticky` e `directions_click`.

## Endereço e mapa
Edite `contact` em `src/config/site.ts` (`addressLine`, `cityLine`, `phone`, `email`, `hours`, `privacyEmail`) e as variáveis de mapa acima. Para o schema, preencha `contact.schema` (`streetAddress`, `city`, `postalCode`, `telephone`, `email`, `openingHours`).

## Imagens
Ver `docs/FORMILY_IMAGE_BRIEF.md`.

## Validar SEO e schema
1. `npm run build && npm start`; abra `/robots.txt` e `/sitemap.xml`.
2. Ver-fonte da home: `<title>`, `meta description`, `og:*`, `link rel=canonical` e `script[type="application/ld+json"]`.
3. Validar o JSON-LD em https://validator.schema.org e https://search.google.com/test/rich-results após configurar o domínio.
4. O JSON-LD só inclui `address`, `telephone`, `email`, `openingHours` e `url` quando preenchidos com dados reais.

## Placeholders pendentes
`grep -rn "PREENCHER\|VALIDAR" src` lista todos. Principais: endereço, cidade/CEP, WhatsApp, telefone, e-mail, e-mail de privacidade, horários, URL de embed do mapa, dados do controlador/finalidades/retenção/foro/data de vigência nas páginas legais, e `[VALIDAR DISPONIBILIDADE]` das 8 áreas de atendimento.

## Antes de ir ao ar (checklist)
- Definir `NEXT_PUBLIC_SITE_URL` **no build** (é embutida). Sem ela, o `robots.txt` de produção bloqueia a indexação (`Disallow: /`) e canonical/sitemap apontam para localhost.
- Definir `NEXT_PUBLIC_WHATSAPP_NUMBER` (sem ela os botões usam URL placeholder e não abrem conversa).
- Zerar `grep -rn "PREENCHER\|VALIDAR" src`, adicionar `og:image` e remover o aviso de validação jurídica só após revisão jurídica.
