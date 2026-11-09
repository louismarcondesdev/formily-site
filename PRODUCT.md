# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Paciente local de Campinas/SP, com ou sem receita, que quer um orçamento e um atendimento farmacêutico personalizado. O visitante chega pelo celular ou desktop e quer iniciar contato pelo WhatsApp ou enviando a receita, sem precisar saber de antemão qual fórmula pedir. Inclui quem não tem receita e quer uma fórmula.

## Product Purpose
Vitrine institucional da Formily Farmácia de Manipulação. O site não vende: conduz o visitante ao WhatsApp (ou ao formulário de envio de receita) para atendimento com farmacêutico, e mostra o que a farmácia faz por área de cuidado. Sucesso = o visitante abrir uma conversa já identificando o interesse (categoria, subitem, receita ou farmacêutico), para a equipe responder com a fórmula e o orçamento.

## Positioning
Cuidado familiar com atendimento farmacêutico próximo: o nome une Form (fórmula) e ily (family), com sócios, farmacêutica responsável e equipe visíveis. Acolhimento na escuta, precisão no processo.

## Operating Context
Farmácia de manipulação em pré-abertura (setembro/2026), em Campinas, Av. Ruy Rodrigues, 4440, Parque Universitário de Viracopos (grafia e número a confirmar). Documentação da Vigilância Sanitária em andamento. Um único número de WhatsApp, preparado para um segundo. Fachada, sinalização e fotos reais ainda não existem (previstas ≈ 07–14/10/2026). Entregas para todo o Brasil em validação.

## Capabilities and Constraints
- Sem e-commerce, preço, carrinho, checkout ou páginas de produto.
- Ícones/ilustrações do topo e horários de funcionamento não mudam.
- Receita é dado sensível de saúde (LGPD): o formulário exige consentimento, armazenamento privado e política de privacidade revisada antes do go-live.
- Categorias e subitens são rascunho e só aparecem com a flag `MOSTRAR_RASCUNHO_SUBITENS`, até a cliente validar. Termos como "emagrecedor" e "inibidor de apetite" aguardam revisão regulatória.
- Conteúdo editável em `src/config/site.ts`; número de WhatsApp único e centralizado.
- Pendentes: destino do formulário, grafia da marca (Formily × Formilhe), CEP, texto da loja/café, URLs de YouTube/Instagram. Ver `PENDENCIAS.md`.

## Brand Commitments
Nome "Formily". Português do Brasil, tom acolhedor e direto ("o mínimo complexo possível"). Logo e ilustrações do topo aprovados pela cliente. O "i" do logotipo em outra cor é uma ideia de branding futuro.

## Evidence on Hand
Fotos mockup em `public/images/` (fachada, equipe, laboratório, atendimento) e retrato da Dayene gerado por IA: todas placeholder até as fotos reais. Bios, cargos e CRF da equipe vêm do briefing. Não há depoimentos, canal de YouTube nem perfil de Instagram confirmados; nada disso pode ser inventado.

## Product Principles
1. Vender experiência, não manipulado: toda ação termina em conversa com o farmacêutico.
2. O clique já diz o que o visitante quer: mensagens pré-preenchidas com categoria, subitem ou intenção.
3. Nenhum dado, número ou alegação inventados: o que falta vira `[CONFIRMAR]`.
4. Fluxo mínimo: poucos cliques da home até a conversa aberta.
5. Mobile-first: nada depende de hover.

## Accessibility & Inclusion
Sem padrão formal exigido pela cliente. O código trabalha com contraste AA, foco visível e formulário acessível; manter esse nível.
