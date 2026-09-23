# Formily — contato, localização e rodapé

Fonte única: `contact` em `src/config/site.ts` (vale para o card de contato, o rodapé e o JSON-LD). Valor não configurado = `null` = **não é renderizado** (nunca aparece `[PREENCHER]` no site público). Use `hasBusinessValue(valor)` antes de renderizar qualquer dado do negócio.

## 1. Onde inserir cada dado
Edite o valor em `contact` **ou** defina a variável de ambiente (Vercel/`.env.local`, não versionado):

| Dado | Campo | Variável |
|---|---|---|
| WhatsApp (DDI+DDD+número, só dígitos, ex. `5511999999999`) | `whatsapp.number` | `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| WhatsApp formatado (opcional) | `whatsapp.display` | `NEXT_PUBLIC_WHATSAPP_DISPLAY` |
| Endereço (linha 1 / linha 2) | `addressLine1` / `addressLine2` | `NEXT_PUBLIC_CONTACT_ADDRESS_1` / `_2` |
| Telefone | `phone` | `NEXT_PUBLIC_CONTACT_PHONE` |
| E-mail | `email` | `NEXT_PUBLIC_CONTACT_EMAIL` |
| E-mail de privacidade | `privacyEmail` | `NEXT_PUBLIC_CONTACT_PRIVACY_EMAIL` |
| Horários (texto) | `openingHours` | `NEXT_PUBLIC_CONTACT_HOURS` |
| Rota (Google Maps) | `directionsUrl` | `NEXT_PUBLIC_MAPS_DIRECTIONS_URL` |
| Mapa (embed) | `mapsEmbedUrl` | `NEXT_PUBLIC_MAPS_EMBED_URL` |
| Coordenadas | `latitude` / `longitude` | `NEXT_PUBLIC_MAP_LATITUDE` / `_LONGITUDE` |
| Razão social + CNPJ; responsável técnico + CRF | `legal.*` | (editar no arquivo) |
| Redes sociais oficiais e ativas | `socialLinks` | (editar no arquivo) |

## 2. WhatsApp, `tel:` e `mailto:`
- O CTA "Solicitar orçamento pelo WhatsApp" do card de contato **só aparece** se o número do WhatsApp estiver configurado (evento `whatsapp_click_contact_section`).
- Telefone vira `tel:+...` (mantém dígitos e `+`); e-mail vira `mailto:`. Ambos com `aria-label` descritivo.

## 3. Rota e mapa
- **Rota:** cole a URL "Abrir no Google Maps" da unidade em `NEXT_PUBLIC_MAPS_DIRECTIONS_URL`. Padrão: `https://www.google.com/maps/dir/?api=1&destination=LAT,LNG`.
- **Mapa:** padrão = embed do Google gerado das coordenadas (sem API key). Para usar o embed do Perfil da Empresa: Google Maps → Compartilhar → Incorporar um mapa → copie só o `src` do iframe para `NEXT_PUBLIC_MAPS_EMBED_URL`.
- **Coordenadas atuais** vêm do link enviado pela Formily (`https://maps.app.goo.gl/DvonaAPJwjyaoNy47` → -22.925729, -47.050642, região de Campinas). Confirme com a unidade e ajuste se necessário.
- **Fallback:** sem `mapsEmbedUrl` o mapa não é exibido; aparece um estado neutro (ícone + nome). Em desenvolvimento, uma dica técnica.
- **Legenda** do mapa ("Como chegar") só aparece se `directionsUrl` existir. Em celular há a camada "Toque para interagir" para não prender a rolagem.

## 4. JSON-LD (`src/lib/schema.ts`)
Emitido só com dados reais e idênticos ao HTML: `name`, `telephone`/`email` (de `contact`), `address` (exige `schema.streetAddress`, `schema.city` e `schema.postalCode`), `openingHours` (`schema.openingHours`, formato `Mo-Fr 08:00-18:00`) e `geo` (latitude/longitude). Sem rating, CNPJ, AFE ou licença.

## 5. Rodapé
4 colunas: Marca · Navegação · Atendimento (cidade/UF + WhatsApp/telefone/e-mail/horários **se configurados**) · Institucional (Privacidade, Cookies, Termos). Linha inferior: © ano + aviso institucional; razão social/CNPJ e responsável técnico/CRF só aparecem se **todos** os valores do grupo estiverem preenchidos.

## Checklist antes de publicar
- [ ] Endereço e mapa correspondem ao mesmo local (e ao Perfil da Empresa no Google: endereço, horário, categoria).
- [ ] WhatsApp e telefone funcionam (teste os links).
- [ ] Horários atualizados.
- [ ] Rotas `/politica-de-privacidade`, `/politica-de-cookies` e `/termos-de-uso` existem e foram revisadas (as páginas legais ainda têm campos `[PREENCHER]` de responsabilidade jurídica).
- [ ] Nenhum `[PREENCHER]` aparece no site: `grep -rn "PREENCHER" src` e navegue a home em produção.
- [ ] Dados do site e do Perfil da Empresa no Google consistentes.
