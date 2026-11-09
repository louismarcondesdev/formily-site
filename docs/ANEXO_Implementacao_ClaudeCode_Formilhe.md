# ANEXO — Plano de Implementação (Claude Code) — Site Formilhe
Referência: ATA de 23/09/2026 (IDs RF/RNF/D/A citados abaixo vêm dela).
Uso: colar o **Prompt Mestre** no Claude Code e, em seguida, executar as tarefas **na ordem**. Cada tarefa tem copy exata, comportamento, critérios de aceite e bloqueios.

---

## 0. PROMPT MESTRE (colar primeiro)

```
Você vai implementar ajustes no site institucional da Formilhe (farmácia de manipulação, Campinas/SP).
Regras inegociáveis:
1. PASSO 0 — descubra a stack: leia package.json, estrutura de pastas, framework, roteamento, estilos e como o conteúdo atual está organizado. Resuma em 10 linhas antes de editar. Siga os padrões existentes (não migre framework, não troque bibliotecas).
2. Trabalhe em uma branch (feat/ajustes-reuniao-2026-09-23). Commits pequenos, um por tarefa, mensagem convencional (feat:, fix:, content:, chore:).
3. NÃO invente: nomes de produtos/ativos, alegações terapêuticas, preços, dosagens, CRF/registros, números de telefone, CEP, URLs de redes sociais, depoimentos. Se faltar dado, use constante marcada [CONFIRMAR] e liste em PENDENCIAS.md.
4. Este site NÃO vende produtos. Não crie carrinho, preço, checkout nem páginas de produto.
5. Todo conteúdo editável (categorias, subitens, número WhatsApp, endereço, horários, textos de FAQ) deve ficar em UM arquivo de conteúdo/config (ex.: src/content/site.config.ts + src/content/categorias.ts ou .json), não espalhado no JSX/HTML.
6. Tom/idioma: português do Brasil. Mantenha a identidade visual e as ilustrações do topo (a cliente aprovou — não alterar).
7. Mobile-first. Nada pode depender de hover para funcionar (ver T-06).
8. Ao final de cada tarefa: rode build/lint/testes existentes, verifique no navegador (375px e 1280px) e atualize PENDENCIAS.md.
9. Imagens mockup/geradas por IA são PLACEHOLDER: mantenha-as, mas registre cada uma em PENDENCIAS.md para substituição antes do go-live.
```

---

## 1. VISÃO GERAL E ORDEM DE EXECUÇÃO

| Ordem | Tarefa | ATA | Prioridade | Bloqueio |
|-------|--------|-----|-----------|----------|
| 1 | T-01 Config central + conteúdo data-driven | RNF-003, RNF-004 | M | — |
| 2 | T-02 Verificar/aplicar textos (Como funciona, FAQ, confiança, CTA) | RF-010, D-004/007/008/009 | M | Louis declarou ter aplicado parte ao vivo → **auditar** |
| 3 | T-03 Contato, endereço, mapa | RF-011, D-010 | M | Telefone completo (A-009) |
| 4 | T-04 Helper WhatsApp + CTA "Falar com o farmacêutico" | RF-002, RF-005 | M | Telefone |
| 5 | T-05 Páginas de categoria + subitens | RF-001, RF-002 | M | **Lista validada (A-004)** — implementar com rascunho atrás de flag |
| 6 | T-06 Formulário de receita | RF-003, RF-004, RNF-001 | M | Destino (A-012), política de privacidade |
| 7 | T-07 Equipe com foto/hover | RF-007 | S | Fotos (A-006) |
| 8 | T-08 "Soluções personalizadas" em etiquetas | RF-006, D-006 | S | Lista validada |
| 9 | T-09 Seção "cuidado antes da fórmula" + personalização | RF-009 | S | A-010 (Louis apresenta opção) |
| 10 | T-10 YouTube/Instagram | RF-008 | C | Canal/perfil |
| 11 | T-11 Placeholders → fotos reais + PENDENCIAS.md | RF-012 | S | Fotos 07–14/10 |
| 12 | T-12 QA final e checklist de go-live | — | M | Todas |

Regra: **T-01 → T-04 destravam tudo**. Se algo bloqueado, entregue a estrutura funcionando com dado `[CONFIRMAR]` e siga.

---

## T-01 — Config central e conteúdo editável (RNF-003, RNF-004)

**Objetivo:** Louis disse que não quer "ficar mexendo no código o tempo todo". Tudo que muda vira dado.

**Criar** `site.config` com:
```
brand.nome = "Formilhe"            // [CONFIRMAR grafia no logotipo]
whatsapp.numeros = [{ id: "principal", numero: "55" + DDD + número, rotulo: "Atendimento" }]   // [CONFIRMAR] telefone incompleto na reunião
whatsapp.padrao = "principal"      // preparado para 2º número (Dayene prevê)
endereco = { logradouro: "Avenida Rui Rodriguez", numero: "440", bairro: "Parque Universitário de Viracopos", cidade: "Campinas", uf: "SP", cep: "[CONFIRMAR]" }
horarios = <manter exatamente os atuais do código — foram conferidos com o briefing; NÃO alterar>
formulario.destino = "[CONFIRMAR]" // ver T-06
```
**Criar** `categorias` como lista de objetos: `{ slug, nome, icone (existente), descricao_curta, subitens: [{ slug, nome, descricao? }], cor }`. Subitem pode aparecer em mais de uma categoria (sobreposição aceita pela cliente) — usar referência por slug ou duplicar sem lógica extra.

**Aceite:**
- Trocar o número em 1 lugar atualiza TODOS os botões/links/FAQ/rodapé (grep não deve achar o número hardcoded fora da config).
- Adicionar um subitem = editar só o arquivo de categorias.
- Build passa.

---

## T-02 — Auditar e aplicar textos aprovados (D-004, D-007, D-008, D-009)

**Status declarado por Louis:** textos de etapas, FAQ, confiança e CTA foram alterados ao vivo e "commitados". **Passo 1: leia o código atual e compare linha a linha com a copy abaixo; corrija divergências.** Não reescreva o que já está igual.

### 2.1 "Como funciona" — título da seção mantido ("simples, seguro e feito para você / da sua prescrição ao recebimento, acompanhamos cada etapa com responsabilidade")
| # | Título | Texto final |
|---|--------|-------------|
| 1 | Envie sua receita | Compartilhe sua prescrição pelo **WhatsApp** ou **clicando aqui** e, se necessário, fale com o nosso farmacêutico. |
| 2 | Receba seu orçamento | Analisamos as informações necessárias e retornamos com orientações personalizadas para o seu pedido. |
| 3 | Aprove seu pedido | Com o orçamento aprovado, iniciamos o processo conforme os critérios técnicos e farmacêuticos aplicáveis. |
| 4 | Retire ou receba | Retire presencialmente ou receba diretamente no conforto da sua casa. |

- "WhatsApp" = link `wa.me` (T-04) com mensagem de receita; "clicando aqui" = âncora/rota do formulário (T-06). "Fale com o nosso farmacêutico" **não** precisa ser link (opcional: link WhatsApp farmacêutico).
- Remover qualquer "consulte a equipe sobre modalidades de entrega". Sem lista de modalidades de frete.

### 2.2 Seção de confiança ("Confiança você constrói em cada detalhe")
- Texto: "Da escuta no atendimento à atenção dedicada aos processos, **[a Formilhe | a fórmula — CONFIRMAR com Dayene]** foi pensada para unir acolhimento, personalização, precisão e responsabilidade farmacêutica."
  - O original dizia "foi pensado" (masculino) com sujeito oculto; Dayene falou "A fórmula foi pensada…". Manter como está no código se já aplicado; registrar dúvida em PENDENCIAS.md.
- Adicionar bullet/selo: **"Fórmulas personalizadas"** (exatamente assim, não "Personalização das fórmulas").
- Fotos desta seção: fachada, equipe completa, interior → placeholders por ora (T-11).

### 2.3 FAQ — nesta ordem exata
1. **Como solicito um orçamento?** → "Pelo WhatsApp, envie sua receita ou clique aqui." (WhatsApp + "clique aqui" → formulário). *Remover* "Nossa equipe orientará você pelo WhatsApp".
2. **Posso enviar minha receita pelo WhatsApp?** → "Sim, o WhatsApp é o nosso canal para iniciar atendimento. As informações compartilhadas são tratadas com cuidado e conforme política de privacidade." (link "política de privacidade" → ver T-06.6; não deixar link morto).
3. **Não tenho receita, mas quero uma fórmula. Posso?** → "Entre em contato pelo WhatsApp com a nossa equipe e o farmacêutico responsável irá te orientar sobre a fórmula desejada."
4. **Preciso de receita para solicitar uma manipulação?** → "As exigências variam conforme a preparação e a legislação aplicável. Nossa equipe orientará você pelo WhatsApp sobre o que é necessário no seu caso." **Remover** a frase "não oferecemos aconselhamento médico…".
5. **Posso retirar meu pedido na loja?** → "Sim, temos uma loja física **[texto final PENDENTE]**." Proposta para validação (não publicar sem OK): "Sim! Temos uma loja física e um cafezinho esperando por você. Venha nos conhecer." — o "cafezinho" só vale se o café existir na abertura; usar versão sem café se não confirmado.
6. **Vocês realizam entregas?** → "Sim, para todo o Brasil. Fale com a nossa equipe pelo WhatsApp." (**alerta logístico**: Correios/Cedex em greve; registrar em PENDENCIAS.md para a cliente validar).
7. **Como acompanho o meu pedido?** → "Nossa equipe está sempre à disposição pelo WhatsApp para falar sobre o status do seu pedido."
8. **Posso tirar dúvidas com o farmacêutico?** → "Sim, temos um atendimento farmacêutico personalizado para auxiliar em dúvidas e solicitações."
9. **Onde fica a Formilhe?** → "Avenida Rui Rodriguez, 440 — Parque Universitário de Viracopos, Campinas/SP." (ler da config)
- **Remover** o fechamento genérico "Ainda tem dúvidas? Fale com a nossa equipe" do FAQ **somente se** for a frase de "aconselhamento médico" — Louis e Dayene concordaram em tirar o trecho de aconselhamento; confirmar no código qual frase era.

### 2.4 CTA final (seção "Seu cuidado pode começar por uma conversa")
- Título: **Seu cuidado pode começar por uma conversa.**
- Texto: "Fale com um dos nossos farmacêuticos, tire suas dúvidas e conheça as possibilidades de personalização da sua fórmula. Estamos aqui para orientar você em cada etapa."
- Botão: **Falar com o farmacêutico** (antes era "falar no WhatsApp"). Mensagem pré-preenchida: ver T-04.
- Havia uma frase no bloco de contato removida ao vivo ("pode tirar") que a transcrição não identifica: verifique `git log -p` do último commit e anote em PENDENCIAS.md.

**Aceite T-02:** diff entre copy acima e site renderizado = zero; nenhum texto "Consulte a equipe", "modalidades", "aconselhamento médico" restante.

---

## T-03 — Contato, endereço, mapa (RF-011, D-010)
1. Bloco de contato lê tudo da config (T-01).
2. Endereço exibido: **Avenida Rui Rodriguez, 440 — Parque Universitário de Viracopos, Campinas/SP**. Não usar "Jardim Shangai" em lugar nenhum (decisão de marca da cliente).
3. **Mapa/geolocalização:** apontar o embed/link do Google Maps para esse endereço (Louis disse que a geolocalização estava sendo atualizada no deploy — verifique se o embed antigo ainda aparece). Link "Como chegar" abrindo Maps com o endereço codificado (encodeURIComponent).
4. Horários: **não alterar**; apenas garantir que vêm da config.
5. Se existir JSON-LD/`LocalBusiness`/meta de endereço, atualizar para o mesmo endereço; se não existir, não criar (fora do combinado).
6. CEP: deixar `[CONFIRMAR]` — não preencher "de cabeça".

**Aceite:** endereço idêntico em contato, FAQ e (se houver) JSON-LD; mapa aponta para Campinas, não para localização antiga.

---

## T-04 — Helper WhatsApp e mensagens pré-preenchidas (RF-002, RF-005)
Criar função única `waLink(mensagem, numeroId = "principal")` → `https://wa.me/<numero>?text=<encodeURIComponent(mensagem)>`. `target="_blank" rel="noopener noreferrer"`.

Mensagens (editáveis na config):
| Contexto | Mensagem |
|----------|----------|
| Subitem | `Olá! Vim pelo site e tenho interesse em manipulados para {subitem} ({categoria}).` |
| Categoria (CTA geral da página) | `Olá! Vim pelo site e tenho interesse em manipulados da área de {categoria}.` |
| Falar com o farmacêutico | `Olá! Vim pelo site e gostaria de falar com um farmacêutico.` |
| Enviar receita pelo WhatsApp | `Olá! Vim pelo site e gostaria de enviar minha receita para orçamento.` |
| Dúvidas (FAQ) | `Olá! Vim pelo site e tenho uma dúvida.` |

Objetivo da cliente: ao chegar a mensagem, a Dayene **já sabe o que o visitante clicou** (ela responde com fórmula/mix pronto). Por isso a mensagem **precisa conter categoria/subitem** — não usar texto genérico nos botões de categoria.

**Aceite:** todos os botões WhatsApp usam `waLink`; teste manual no desktop (WhatsApp Web) e no celular; acentos e `&`/`?` no texto não quebram o link; nenhum botão com número hardcoded.

---

## T-05 — Categorias e subitens (RF-001, RF-002, D-001, D-002)

### 5.1 Comportamento (combinado)
- Cada card de categoria no topo (ícones **mantidos**) deixa de levar a "converse com a equipe" e passa a abrir **uma página própria da categoria** (rota `/categoria/<slug>` ou equivalente na stack): título, 1 linha de contexto, **lista de subitens**, cada um com botão → `waLink` (T-04). Rodapé da página: "Não encontrou o que procura? Fale com a nossa equipe" (WhatsApp) e link voltar.
- Sem preço, sem carrinho, sem produto individual.
- Dayene quer ver "o que a farmácia faz" por tema (referência: site de saúde capilar com subtópicos — ela enviará o link no grupo).

### 5.2 Categorias candidatas (**RASCUNHO — usar também como doc de validação A-001; NÃO publicar sem OK da Dayene**)
Todos os itens abaixo foram **ditos pela Dayene** na reunião; nada foi acrescentado. Categorias existentes no topo (citadas): Nutrição e Performance, Longevidade, Pele e Cabelo, Sono e Rotina — **conferir no código a lista real**.

| Categoria | Subitens citados | Observação |
|-----------|------------------|------------|
| Emagrecimento | acelerador de metabolismo, gordura localizada, inibidor de apetite, desintoxicação do organismo, perda de medidas, sacietógenos, fonte de fibra, emagrecedor | **Revisão regulatória dos termos** (A-014) |
| Treino / Atividade física (nome PENDENTE: "Treino", "Atividade e treino", "Potencialização de treino") | termogênico, energia e resistência, pré-treino, pós-treino, desempenho físico | Sobrepõe Emagrecimento (aceito) |
| Pele (nome PENDENTE: "Pele", "Wellness") | saúde da pele, fotoproteção, antiacne, hidratantes, rejuvenescimento, firmeza da pele | |
| Cabelo e unhas (ou dentro de "Pele e Cabelo") | antiqueda, brilho, fortalecimento de unha e cabelo | Já existe card "Pele e Cabelo" |
| Saúde / Memória e concentração | memória e concentração, alívio dos sintomas de TPM | Dayene quer títulos que "chamem atenção" |
| Sono e rotina | melhorar o sono / "durma melhor", o que usar ao acordar | |
| Longevidade | — nenhum item citado | PENDENTE |
| (exemplo citado) ômega | — | Dayene deu como exemplo de fórmula/ativo para etiquetas |

Louis pediu que ela use o material da **Galena** para completar. Implementar a lista como **dados** (T-01) e subitens vazios exibem apenas o CTA geral.

### 5.3 Estratégia de entrega (para não travar)
1. Implementar toda a mecânica (rotas, template, botões, SEO básico: `<title>` e meta description por categoria) usando o rascunho acima **atrás de uma flag** (`MOSTRAR_RASCUNHO_SUBITENS=false` em produção).
2. Quando a Dayene validar (A-004), preencher o arquivo de dados e ligar a flag.
3. Cards sem categoria publicada continuam apontando para o CTA geral do WhatsApp (nunca para 404).

**Aceite:** 404 tratado; slug inválido redireciona; cada subitem abre WhatsApp com categoria+subitem na mensagem; página funciona a 375px; navegação por teclado.

---

## T-06 — Formulário de envio de receita (RF-003, RF-004, RNF-001)

### 6.1 UX
- Local: nova seção/rota `/enviar-receita` (e âncora na home). "clicando aqui" (Como funciona e FAQ #1) leva para cá.
- Campos: **Nome** (obrigatório), **WhatsApp** (obrigatório, máscara BR, DDD+9 dígitos, validação), **Anexo da receita** (obrigatório; imagem/PDF), **E-mail** (opcional — Dayene falou em "WhatsApp, o e-mail para retorno"; manter opcional até ela decidir), **Consentimento** (checkbox, **desmarcado por padrão**).
- Texto de consentimento (proposta; revisar com jurídico): "Autorizo a Formilhe a usar meus dados e minha receita **apenas** para elaborar meu orçamento e retornar o contato. [Política de privacidade]".
- Sucesso: "Recebemos sua receita! Nossa equipe entrará em contato pelo WhatsApp." + botão opcional "Falar com o farmacêutico".
- Erro: mensagem clara + mantém dados digitados; permitir reenvio.
- Racional da Dayene: não gosta de abrir conversa fria ("Olá, tudo bem?") para só receber a receita; prefere já receber o anexo e iniciar ela a conversa.

### 6.2 Regras técnicas (valores = sugestão do implementador; ajustar se a cliente discordar)
- Tipos: PDF, JPG, PNG, HEIC/WEBP; tamanho máx. **10 MB**; até 3 arquivos [CONFIRMAR]. Validar **no cliente e no servidor** (tipo MIME + extensão + tamanho). Nome do arquivo sanitizado/renomeado (UUID).
- Anti-spam: honeypot + rate limit por IP (+ Turnstile/hCaptcha só se houver abuso).
- Sem analytics/pixel enviando conteúdo do formulário. Sem logar o arquivo nem telefone em logs de aplicação.
- Acessibilidade: labels, `aria-invalid`, foco no primeiro erro, botão com estado de carregamento.

### 6.3 Destino — DECISÃO PENDENTE (A-012). Opções (máx. 3):
| Opção | Como | Prós | Contras |
|-------|------|------|---------|
| **A (recomendada)** | Upload para **storage privado** (ex.: Supabase Storage, bucket **privado**) + registro em tabela (`id, nome, whatsapp, email?, arquivo_path, consentimento_em, created_at, status`) + webhook (n8n) que **notifica a equipe** (e-mail e/ou WhatsApp) com **link assinado temporário** | Dado sensível fica fora de caixas de e-mail; auditável; casa com a stack da KOER | Mais peças; definir retenção |
| B | Função serverless envia **e-mail com anexo** à Formilhe (Resend/SMTP) | Simples e rápido | Receita (dado de saúde) circulando em inboxes; difícil controlar retenção |
| C | Só coleta nome+WhatsApp e abre `wa.me` pedindo que o cliente anexe a receita na conversa | Zero infraestrutura | Não atende o pedido da Dayene (anexo no formulário) |

Observação técnica: enviar o **anexo** direto "para o WhatsApp deles" (como Louis comentou) exige API de WhatsApp com mídia (Evolution/Oficial) e número remetente; é viável, mas aumenta risco de bloqueio de número se for API não oficial. Recomendação: **A com notificação por e-mail primeiro**; WhatsApp interno como fase 2.

### 6.4 LGPD (a receita é dado sensível de saúde)
- Consentimento específico registrado (timestamp + versão do texto).
- Bucket privado, URLs assinadas curtas (sugestão: 24–72 h), acesso só de pessoas autorizadas, HTTPS.
- Prazo de retenção e rotina de exclusão **[ESPECIFICAR com a cliente]**.
- Esta orientação é técnica, **não parecer jurídico**; recomendar revisão da política pela cliente/assessoria.

### 6.5 Dados que a Claude Code NÃO deve inventar
Credenciais, URLs de webhook, e-mail de destino, domínio de envio: pedir ao Louis e usar variáveis de ambiente (`.env.example` documentado, nunca commitar segredos).

### 6.6 Política de privacidade
O FAQ cita "política de privacidade". **Verifique se existe página.** Se não existir: criar rota `/politica-de-privacidade` com texto-modelo marcado visivelmente "[RASCUNHO — revisão jurídica obrigatória antes do go-live]" e registrar como **bloqueio de go-live** em PENDENCIAS.md. Não publicar o formulário em produção sem ela.

**Aceite:** envio ponta a ponta em ambiente de teste (arquivo chega no destino escolhido); erro de tipo/tamanho tratado; checkbox obrigatório; sem arquivo acessível por URL pública; link "clicando aqui" (2 locais) abre o formulário.

---

## T-07 — Equipe com foto e informações (RF-007)
- Seção "Conheça quem cuida da sua fórmula": fotos de **Rodrigo, Gabriele e Dayene** (Dayene ao centro, como já está).
- **Hover não existe no celular:** implementar `hover` (desktop) + `focus` (teclado) + **toque** (alterna card/overlay no mobile). Informação do card: nome, cargo, 1–2 linhas. **Cargos [CONFIRMAR]** (Rodrigo: sócio/proprietário? Dayene: farmacêutica? — a transcrição é ambígua); não exibir registro profissional (CRF) sem dado fornecido.
- Fotos atuais da Dayene são **imagens geradas por IA** a partir de prints; manter só como placeholder. Ao receber as fotos reais: recortar proporção única (ex.: 4:5), WebP/AVIF, `alt` com nome e função, lazy-load.
- Louis perguntou qual foto a Dayene prefere para ser reproduzida: aguardar A-006.

**Aceite:** funciona só com toque; leitor de tela lê nome+cargo; sem salto de layout (dimensões reservadas).

---

## T-08 — "Soluções personalizadas" em etiquetas coloridas (RF-006, D-006)
- Título/subtítulo: "Soluções personalizadas para diferentes momentos da vida".
- Conteúdo: **etiquetas (chips) só com texto**, **sem ícones/desenhos**, uma cor por categoria (cores da paleta da farmácia, já definidas no site; sem inventar novas cores fora do tema). Exemplos ditos pela Dayene: "fórmulas antiacne", "fórmulas hidratantes", "fórmulas antiqueda", "fortalecimento de unha e cabelo", "ômega", "fórmula para crescimento capilar", "fórmula para queda capilar", "melhora do sono".
- Ordem: itens de categorias diferentes **misturados** (efeito de "bater o olho e achar algo interessante"); as cores é que identificam a categoria.
- Chips **não clicáveis** por padrão (Dayene: "só com a escrita mesmo"). Registrar em PENDENCIAS.md: perguntar se querem que levem ao WhatsApp (decisão aberta).
- Fecho: "Não encontrou o que procura? Fale com a nossa equipe." (botão WhatsApp T-04).
- **Experimento reversível:** implementar com flag `SECAO_SOLUCOES_CHIPS=true`; se a cliente reprovar, desligar sem apagar código.
- Cor não pode ser única informação (contraste AA; chip tem texto).
- Dados: reaproveitar a lista de subitens (T-01), não duplicar texto.

**Aceite:** a seção renderiza a partir da config; flag desliga/ligam; contraste AA; quebra de linha ok a 375px.

---

## T-09 — "O cuidado começa antes da fórmula" + personalização (RF-009)
- Pilares atuais mantidos: atendimento individualizado, excelência técnica, segurança e rastreabilidade, precisão, matérias-primas selecionadas, proximidade. (Louis falou "quatro" e listou seis — **preservar o que está no código**.)
- Dayene quer **personalização** sem repetir "atendimento individualizado": preparar **2 variações** do pilar (ex.: "Fórmulas personalizadas — o cuidado com o que você realmente precisa") e apresentá-las para escolha; **não decidir sozinho** (A-010). Implementar a escolhida atrás de flag ou em branch separada.
- Imagem de "rigor técnico" (balança): usar mockup até a foto real.

---

## T-10 — YouTube / Instagram (RF-008, prioridade C)
- Seção ao final: "Veja nosso YouTube" (e, se existir, Instagram). Referência: Artesanal e site da amiga da Dayene (links serão enviados no grupo — A-005).
- **Hoje não há canal nem vídeos.** Implementar como componente **oculto por flag** (`SECAO_VIDEOS=false`) que recebe `youtubeChannelUrl`, `instagramUrl` e lista opcional de IDs de vídeo.
- Preferir **links/botões** + (se houver vídeos) embed leve com **youtube-nocookie** e facade (carrega o player só no clique). Evitar embed de Instagram (peso + cookies de terceiros).
- URLs: **[CONFIRMAR]**; nunca inventar handle.

---

## T-11 — Placeholders e PENDENCIAS.md (RF-012)
Criar `PENDENCIAS.md` na raiz com:
1. **Bloqueios de go-live:** telefone completo; destino do formulário + política de privacidade; revisão regulatória dos termos de categoria e remoção do aviso; logística de entrega nacional.
2. **Dados [CONFIRMAR]:** razão social; CEP; grafia "Formilhe"; cargos; sujeito da frase de confiança; texto da loja/café; frase removida do contato.
3. **Imagens placeholder (lista com arquivo e onde é usada):** fachada, interior/atendimento, equipe, balança/rigor técnico, retratos gerados por IA. Fotos reais previstas **≈ 07–14/10/2026**.
4. **Ideias de backlog:** 2º WhatsApp; "i" do logotipo em outra cor (branding futuro); canal YouTube próprio.
Ao chegar cada foto: otimizar, trocar, remover o mockup e riscar o item.

---

## T-12 — QA final / checklist de go-live
- [ ] Build, lint e testes passam; zero erros de console.
- [ ] 375px / 768px / 1280px sem scroll horizontal.
- [ ] Todos os botões WhatsApp abrem a mensagem certa (categoria/subitem/farmacêutico/receita).
- [ ] Nenhum número, endereço ou horário hardcoded fora da config.
- [ ] Formulário: sucesso, erro, arquivo inválido, arquivo grande, sem consentimento.
- [ ] Nenhuma receita acessível por URL pública.
- [ ] FAQ conforme T-02.3 (ordem e texto).
- [ ] Sem "Jardim Shangai", sem "aconselhamento médico", sem "consulte a equipe sobre modalidades".
- [ ] Sem lorem/placeholders visíveis ao público (exceto imagens mockup listadas).
- [ ] Lighthouse mobile: sem regressão vs. versão atual (acessibilidade e performance).
- [ ] Sitemap/robots/título/descrição das novas rotas (categorias, enviar-receita, privacidade).
- [ ] PENDENCIAS.md atualizado; link de preview enviado a Dayene e Gaby.

---

## 2. ITENS QUE EXIGEM RESPOSTA DA CLIENTE (para Louis cobrar)
1. Telefone completo do WhatsApp (transcrição trouxe só parte) e e-mail de retorno.
2. Lista de categorias/subitens validada (+ nomes finais).
3. Destino do formulário e política de privacidade existente.
4. Fotos (Rodrigo, Gabriele, Dayene preferida; fachada/interior/equipe).
5. Cargos e exibição de registro profissional.
6. Texto da loja/café e logística de entrega nacional.
7. Validação regulatória dos termos de emagrecimento e da remoção do aviso no FAQ.
8. Canal do YouTube/Instagram.
