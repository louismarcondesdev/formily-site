# PENDÊNCIAS — Site Formily (ajustes da reunião 23/09/2026)

Marque `[x]` ao resolver. Flags e variáveis: ver `.env.example` (todas desligadas por padrão; são lidas **no build**).

## 1. Bloqueios de go-live
- [ ] **Destino do formulário de receita** (A-012): Opção A (storage privado + notificação), B (e-mail) ou C (só WhatsApp). Hoje só existe `RECEITA_DESTINO=local` (teste; recusado em produção). Sem destino, manter `RECEITA_FORM_ENABLED=false` (o "clicando aqui" cai no WhatsApp).
- [ ] **Política de privacidade**: a página existe, mas é rascunho (aviso "validação jurídica/LGPD"). Com `RECEITA_FORM_ENABLED=true` a seção 2 já descreve o formulário (texto factual, a revisar). Seções de finalidades/bases legais e retenção estão ocultas no site público até a assessoria definir o texto. Revisão jurídica obrigatória antes de ligar o formulário. Definir retenção/rotina de exclusão (RNF-001).
- [ ] **Limite de 4 MB** no formulário (corpo de função da Vercel = 4,5 MB). Para 10 MB, usar upload direto ao storage (Opção A).
- [ ] **Revisão regulatória** (A-014): termos como "emagrecedor", "inibidor de apetite", "sacietógenos", "termogênico" nos subitens, e a remoção do aviso "não oferecemos aconselhamento médico" do FAQ (feita ao vivo em 23/09).
- [ ] **Lista de categorias/subitens validada** (A-001/A-004) e nomes finais. Hoje é rascunho em `careAreas` (`src/config/site.ts`) e só aparece com `MOSTRAR_RASCUNHO_SUBITENS=true`.
- [ ] **Logística de entrega nacional** (FAQ "Sim, para todo o Brasil"; Correios/Cedex em greve na reunião).
- [ ] Texto da loja/café (A-011): FAQ mantém "Sim, temos uma loja física a sua disposição…". Só citar "cafezinho" se o café existir na abertura.

## 2. Dados [CONFIRMAR]
- [ ] **Endereço**: código usa "Avenida Ruy Rodrigues, 4440" (commit ao vivo c4c18dc); ATA diz "Avenida Rui Rodriguez, 440". Confirmar grafia e número (o mapa busca por esse texto).
- [ ] **CEP** (`contact.schema.postalCode`): sem ele o JSON-LD não emite `address`.
- [ ] **Grafia da marca**: código/logo usam "Formily"; ATA e anexo escrevem "Formilhe" (provável erro de transcrição). Mantido "Formily".
- [ ] Razão social: código usa "SOUZA EMILIANO FARMACIA DE MANIPULACAO LTDA"; ATA diz [PENDENTE]. UF do CRF-SP assumida.
- [ ] Cargos e exibição de CRF da equipe (Rodrigo "Sócio-proprietário", Dayene "Farmacêutica responsável técnica", Gabryelle "Social media" vêm do briefing; ATA cita "Gabriele").
- [ ] Sujeito da frase de confiança: "a Formily foi pensada…" ou "a fórmula foi pensada…" (D-007).
- [ ] URLs do YouTube/Instagram (`videos` em `site.ts`) e se a seção entra já (`SECAO_VIDEOS`).
- [ ] E-mail de retorno do formulário (hoje opcional no formulário).
- [ ] Frase removida ao vivo do bloco de contato/CTA final: era `finalCta.support` = "Atendimento em Campinas • Consulte horários e modalidades de retirada ou entrega" (commit c4c18dc). Confirmar que é essa.

## 3. Decisões abertas (não decididas sozinho)
- [ ] Variação do pilar de personalização (A-010): `PILAR_PERSONALIZACAO=a` ("Fórmulas personalizadas — O cuidado com o que você realmente precisa.") ou `b` ("Feita para você — Cada fórmula nasce da escuta…"). Desligada.
- [ ] "Soluções personalizadas" em chips (D-006): `SECAO_SOLUCOES_CHIPS=true` (exige `MOSTRAR_RASCUNHO_SUBITENS`). Chips não clicáveis; perguntar se devem abrir o WhatsApp. Reversível: desligar a flag.
- [ ] YouTube/Instagram: sem URLs. A seção só tem links (sem embed/facade; adicionar player só se houver vídeos).

## 4. Imagens placeholder (trocar pelas fotos reais, previstas ≈ 07–14/10/2026)
| Arquivo | Onde aparece |
|---|---|
| `public/images/day.webp` | Equipe (Dayene) — **gerada por IA** a partir de prints |
| `public/images/formily-manifesto.webp` | Aba "Atendimento individualizado", seção Sobre, variações do pilar |
| `public/images/formily_laboratorio.webp` | Aba "Excelência técnica" (balança/rigor técnico), Estrutura |
| `public/images/formily_fachada.webp` | Aba "Segurança e rastreabilidade", Estrutura (fachada ainda não instalada) |
| `public/images/formily_equipe.webp` | Aba "Proximidade", Estrutura |
| `public/images/hero_carrossel/*.webp` | Cards do topo (aprovados; não alterar) |
| Rodrigo e Gabryelle | Sem foto (avatar com iniciais): fotos pendentes (A-006) |
Registrar autorização de uso de imagem da equipe.

## 5. Backlog
2º número de WhatsApp (adicionar item em `whatsapp.numbers`) · "i" do logotipo em outra cor · canal YouTube próprio · fórmulas/mixes por categoria · fachada com painel maior.
