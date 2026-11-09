/**
 * Jornada de emagrecimento e página de saúde capilar.
 * Fonte: Formily_Mapa_Site_V06.xlsx, abas "GLP1 JORNADA SITE" (linhas 6–13) e "TRILHA EMAGRECIMENTO CABELO" (linhas 5–11).
 * Textos da cliente, sem edição. Só aparecem com MOSTRAR_RASCUNHO_SUBITENS=true.
 * Conteúdo educativo: sem fórmulas, medicamentos, doses ou promessas (aba REGRAS DE PUBLICACAO).
 */

export const emagrecimentoSlug = "emagrecimento";

export const jornadaEntrada = {
  titulo: "Sua jornada de emagrecimento também merece cuidado",
  descricao: "Informações e atendimento farmacêutico durante mudanças de peso.",
} as const;

export type EtapaJornada = {
  momento: string;
  /** Mesmo `titulo` do subgrupo em `subgrupos.ts`, quando existe (evita duplicar o card). */
  subgrupo: string;
  titulo: string;
  descricao: string;
  cta: string;
  mensagem: string;
};

export const jornadaEtapas: readonly EtapaJornada[] = [
  {
    momento: "Antes",
    subgrupo: "Cuidados antes de iniciar um tratamento",
    titulo: "Vai iniciar um tratamento para emagrecer?",
    descricao: "Organize suas dúvidas sobre alimentação, rotina e medicamentos com os profissionais que acompanham você.",
    cta: "Quero orientação",
    mensagem: "Olá! Vim pelo site da Formily e gostaria de conversar sobre cuidados antes de iniciar um tratamento para emagrecer.",
  },
  {
    momento: "Durante",
    subgrupo: "Proteínas e massa muscular",
    titulo: "Mudanças de peso e cuidados com a massa muscular",
    descricao: "O acompanhamento nutricional e a atividade física adaptada são importantes durante a perda de peso.",
    cta: "Conversar com a Formily",
    mensagem: "Olá! Vim pelo site da Formily e gostaria de conversar sobre nutrição e massa muscular durante o emagrecimento.",
  },
  {
    momento: "Durante",
    subgrupo: "Enjoo e desconfortos digestivos no emagrecimento",
    titulo: "Seu intestino mudou durante o emagrecimento?",
    descricao: "Converse sobre sinais que merecem atenção, hábitos e quando procurar o profissional responsável pelo tratamento.",
    cta: "Quero orientação",
    mensagem: "Olá! Vim pelo site da Formily e gostaria de conversar sobre desconfortos digestivos durante o emagrecimento.",
  },
  {
    momento: "Durante e após",
    subgrupo: "Saúde capilar durante e após o emagrecimento",
    titulo: "Notou queda ou enfraquecimento dos cabelos?",
    descricao: "Mudanças nutricionais, perda rápida de peso e outros fatores podem influenciar os fios. Cada caso merece avaliação.",
    cta: "Falar sobre meu cabelo",
    mensagem: "Olá! Vim pelo site da Formily e gostaria de conversar sobre saúde capilar durante ou após o emagrecimento.",
  },
  {
    momento: "Durante e após",
    subgrupo: "Mudanças da pele durante e após o emagrecimento",
    titulo: "Como cuidar da pele durante a mudança de peso?",
    descricao: "A hidratação e uma rotina de cuidados personalizada podem integrar o autocuidado.",
    cta: "Conversar com a Formily",
    mensagem: "Olá! Vim pelo site da Formily e gostaria de conversar sobre cuidados com a pele durante ou após emagrecimento.",
  },
  {
    momento: "Após",
    subgrupo: "Manutenção dos cuidados após emagrecimento",
    titulo: "Os cuidados continuam depois da perda de peso",
    descricao: "Alimentação, movimento, sono e acompanhamento fazem parte da manutenção de hábitos.",
    cta: "Quero orientação",
    mensagem: "Olá! Vim pelo site da Formily e gostaria de conversar sobre continuidade dos cuidados após o emagrecimento.",
  },
];

/**
 * Página canônica de saúde capilar: uma única URL com duas portas de entrada
 * (Emagrecimento → "Saúde capilar durante e após o emagrecimento" e Cabelos, pele e unhas → "Queda de cabelo").
 */
export const saudeCapilar = {
  path: "/cuidados/saude-capilar-emagrecimento",
  titulo: "Seu cabelo mudou durante o emagrecimento?",
  descricao:
    "A perda de peso rápida, a alimentação e outros fatores podem influenciar a saúde dos cabelos. Uma avaliação individualizada ajuda a entender o que merece atenção.",
  cta: "Quero orientação sobre a saúde dos meus cabelos",
  mensagem:
    "Olá! Vim pelo site da Formily e percebi queda ou afinamento capilar durante/após o emagrecimento. Gostaria de orientação.",
  /** Títulos de subgrupos que levam a esta página (além do botão de WhatsApp deles). */
  entradas: ["Saúde capilar durante e após o emagrecimento", "Queda de cabelo"],
  linkTexto: "Abrir saúde capilar",
} as const;

export const linkCapilar = (titulo: string): string | null =>
  (saudeCapilar.entradas as readonly string[]).includes(titulo) ? saudeCapilar.path : null;
