/**
 * Conteúdo e configuração centralizados da Formily.
 *
 * Tudo que ainda é desconhecido usa o formato "[PREENCHER: ...]".
 * Para listar os pendentes: `grep -rn "PREENCHER\|VALIDAR" src/config`.
 * Nada aqui deve ser inventado: preencha apenas com dados fornecidos pela Formily.
 */

export const PLACEHOLDER_MARK = "[PREENCHER";

/** Verdadeiro somente se o valor existe e não é um placeholder. */
export function isFilled(value: string | null | undefined): value is string {
  return Boolean(value && value.trim() && !value.includes(PLACEHOLDER_MARK));
}

const env = (name: string): string | undefined => {
  const v = process.env[name]?.trim();
  return v ? v : undefined;
};

/** Lê uma coordenada de env. Retorna null se ausente ou fora do intervalo válido (nunca inventa valores). */
const coordinate = (name: string, limit: number): number | null => {
  const raw = env(name);
  if (raw === undefined) return null;
  const n = Number(raw.replace(",", "."));
  return Number.isFinite(n) && Math.abs(n) <= limit ? n : null;
};

export const site = {
  name: "Formily Farmácia de Manipulação",
  shortName: "Formily",
  /** Domínio público. Defina NEXT_PUBLIC_SITE_URL em produção (canonical, sitemap, OG, JSON-LD). */
  url: env("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000",
  urlIsConfigured: Boolean(env("NEXT_PUBLIC_SITE_URL")),
  title: "Formily Farmácia de Manipulação | Cuidado personalizado em São Paulo",
  description:
    "Farmácia de manipulação em São Paulo com atendimento personalizado, precisão técnica e cuidado em cada etapa. Solicite seu orçamento pelo WhatsApp.",
  locale: "pt_BR",
} as const;

/**
 * WhatsApp. Configure NEXT_PUBLIC_WHATSAPP_NUMBER com DDI+DDD+número, só dígitos
 * (ex.: 5511999999999). Sem a variável, os botões usam uma URL placeholder
 * claramente identificável (PREENCHER_NUMERO_WHATSAPP).
 */
export const whatsapp = {
  number: env("NEXT_PUBLIC_WHATSAPP_NUMBER"),
  defaultMessage:
    "Olá! Gostaria de solicitar um orçamento na Formily Farmácia de Manipulação.",
  /** Número formatado para exibição (opcional). */
  display: env("NEXT_PUBLIC_WHATSAPP_DISPLAY") ?? null,
};

const latitude = coordinate("NEXT_PUBLIC_MAP_LATITUDE", 90) ?? -22.925729;
const longitude = coordinate("NEXT_PUBLIC_MAP_LONGITUDE", 180) ?? -47.050642;

/**
 * Dados do negócio (fonte única para conteúdo exibido e JSON-LD).
 * Valores não configurados ficam `null` e NÃO são renderizados (nada de placeholder em produção).
 * Configure editando aqui ou pelas variáveis NEXT_PUBLIC_* (ver docs/FORMILY_CONTACT_SETUP.md).
 */
export const contact = {
  companyName: site.name,
  city: "Campinas",
  state: "SP",
  addressLine1: env("NEXT_PUBLIC_CONTACT_ADDRESS_1") ?? null,
  addressLine2: env("NEXT_PUBLIC_CONTACT_ADDRESS_2") ?? null, // ex.: "Campinas – SP, 13000-000"
  phone: env("NEXT_PUBLIC_CONTACT_PHONE") ?? null,
  email: env("NEXT_PUBLIC_CONTACT_EMAIL") ?? null,
  privacyEmail: env("NEXT_PUBLIC_CONTACT_PRIVACY_EMAIL") ?? null,
  /** Texto exibido, ex.: "Segunda a sexta, das 8h às 18h". */
  openingHours: env("NEXT_PUBLIC_CONTACT_HOURS") ?? null,
  /** URL "Abrir rota" do Google Maps. Padrão: rota para as coordenadas da unidade; a env sobrescreve. */
  directionsUrl:
    env("NEXT_PUBLIC_MAPS_DIRECTIONS_URL") ??
    `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
  /**
   * Coordenadas da unidade (NEXT_PUBLIC_MAP_LATITUDE / NEXT_PUBLIC_MAP_LONGITUDE, graus decimais).
   * Padrão: coordenadas do link do Google Maps informado pela Formily (https://maps.app.goo.gl/DvonaAPJwjyaoNy47).
   */
  latitude,
  longitude,
  /**
   * Embed do Google Maps (sem API key). Padrão: gerado das coordenadas acima.
   * NEXT_PUBLIC_MAPS_EMBED_URL sobrescreve (Compartilhar > Incorporar um mapa > copiar o src do iframe).
   */
  mapsEmbedUrl:
    env("NEXT_PUBLIC_MAPS_EMBED_URL") ??
    `https://www.google.com/maps?q=${latitude},${longitude}&z=16&hl=pt-BR&output=embed`,
  /** Dados legais: só são exibidos no rodapé se TODOS de cada grupo estiverem preenchidos. */
  legal: {
    legalName: null as string | null,
    cnpj: null as string | null,
    pharmacistName: null as string | null,
    pharmacistCrf: null as string | null, // ex.: "CRF-SP 00000"
  },
  /** Redes sociais oficiais e ativas: { label: "Instagram", href: "https://..." }. Vazio = não exibe. */
  socialLinks: [] as { label: string; href: string }[],
  /** Campos estruturados para o JSON-LD (devem ser idênticos ao exibido). Telefone e e-mail vêm dos campos acima. */
  schema: {
    streetAddress: null as string | null,
    city: null as string | null,
    postalCode: null as string | null,
    openingHours: null as string[] | null, // ex.: ["Mo-Fr 08:00-18:00"]
  },
};

/** Verdadeiro se o valor do negócio existe (não vazio e não é placeholder). Use antes de renderizar. */
export const hasBusinessValue = isFilled;

/** "Cidade – UF" curto (ex.: "São Paulo – SP"). */
export const cityState = `${contact.city} – ${contact.state}`;

export const nav = [
  { label: "A Formily", href: "/#a-formily" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Nossos cuidados", href: "/#nossos-cuidados" },
  { label: "Dúvidas", href: "/#duvidas" },
  { label: "Contato", href: "/#contato" },
] as const;

export const legalLinks = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
] as const;

export const topBarMessages = [
  "Atendimento personalizado em São Paulo",
  "Envie sua receita pelo WhatsApp",
  "Consulte a equipe sobre retirada e modalidades de entrega.",
] as const;

export const hero = {
  eyebrow: "Farmácia de manipulação em São Paulo",
  title: "Sua fórmula é única. Seu cuidado também.",
  text: "Cada preparo é desenvolvido com precisão técnica, matérias-primas selecionadas e atenção às necessidades de cada paciente.",
  primaryCta: "Enviar receita pelo WhatsApp",
  secondaryCta: "Como funciona a manipulação",
  trustLine: ["Atendimento farmacêutico", "Fórmulas personalizadas", "Cuidado em cada etapa"],
} as const;

/** Diferenciais da seção "Cuidado que começa antes da fórmula" (abas verticais). `image`/`alt`: fotos da Formily em public/images. */
export const trust = {
  title: "Cuidado que começa antes da fórmula.",
  cards: [
    {
      icon: "heart",
      title: "Atendimento individualizado",
      text: "Cada solicitação é acolhida e analisada com atenção à sua prescrição e às suas necessidades.",
      image: "/images/formily-manifesto.webp",
      alt: "Farmacêutica da Formily entregando uma sacola a uma cliente no balcão da recepção",
    },
    {
      icon: "flask",
      title: "Excelência técnica",
      text: "Rigor técnico, responsabilidade farmacêutica e busca contínua por qualidade.",
      image: "/images/formily_laboratorio.webp",
      alt: "Farmacêutica manipulando com balança de precisão no laboratório da Formily",
    },
    {
      icon: "shield",
      title: "Segurança e rastreabilidade",
      text: "Precisão, matérias-primas selecionadas e atenção em todas as etapas.",
      image: "/images/formily_fachada.webp",
      alt: "Fachada e recepção da Formily Farmácia de Manipulação",
    },
    {
      icon: "users",
      title: "Proximidade",
      text: "Uma equipe disponível para orientar você com clareza, respeito e atenção.",
      image: "/images/formily_equipe.webp",
      alt: "Equipe e farmacêutico responsável da Formily",
    },
  ],
} as const;

export const howItWorks = {
  title: "Simples, seguro e feito para você.",
  subtitle:
    "Da sua prescrição ao recebimento, acompanhamos cada etapa com atenção e responsabilidade.",
  steps: [
    {
      title: "Envie sua receita",
      text: "Compartilhe sua prescrição pelo WhatsApp ou fale com nossa equipe para tirar dúvidas.",
    },
    {
      title: "Receba seu orçamento",
      text: "Nossa equipe analisa as informações necessárias e retorna com as orientações para o seu pedido.",
    },
    {
      title: "Aprove seu pedido",
      text: "Com o orçamento aprovado, iniciamos o processo conforme os critérios técnicos e farmacêuticos aplicáveis.",
    },
    {
      title: "Retire ou receba",
      text: "Consulte a equipe sobre retirada na unidade ou modalidades de entrega disponíveis para sua região.",
    },
  ],
  cta: "Quero solicitar meu orçamento",
} as const;

/** Áreas de atendimento (NÃO são produtos nem fórmulas). Sem descrições terapêuticas. `image` (opcional): ilustração do carrossel do hero em public/images/hero_carrossel/. */
/**
 * `enabled`: só áreas habilitadas aparecem no site. Habilite apenas categorias CONFIRMADAS pela Formily.
 * < 4 habilitadas => a seção vira uma versão institucional que não cita categorias.
 * 4–6 => grade de 3 colunas (desktop) / 2 (tablet) / 1 (mobile). 7+ => bento assimétrico com card principal.
 * O selo [VALIDAR DISPONIBILIDADE] (quando `confirmed: false`) só aparece em desenvolvimento, nunca em produção.
 */
export const careAreas = {
  title: "Soluções personalizadas para diferentes momentos da vida.",
  subtitle:
    "Converse com nossa equipe sobre as possibilidades de atendimento para sua prescrição.",
  items: [
    { label: "Saúde e bem-estar", icon: "leaf", enabled: true, confirmed: false },
    { label: "Nutrição e performance", icon: "activity", enabled: true, confirmed: false, image: "/images/hero_carrossel/care-nutricao-performance.webp" },
    { label: "Pele e cabelos", icon: "sparkles", enabled: true, confirmed: false, image: "/images/hero_carrossel/care-pele-cabelos.webp" },
    { label: "Sono e rotina", icon: "moon", enabled: true, confirmed: false, image: "/images/hero_carrossel/care-sono-rotina.webp" },
    { label: "Saúde da mulher", icon: "flower", enabled: true, confirmed: false, image: "/images/hero_carrossel/care-saude-mulher.webp" },
    { label: "Saúde do homem", icon: "compass", enabled: false, confirmed: false, image: "/images/hero_carrossel/care-saude-homem.webp" },
    { label: "Longevidade", icon: "hourglass", enabled: false, confirmed: false, image: "/images/hero_carrossel/care-longevidade.webp" },
    { label: "Cuidado veterinário", icon: "paw", enabled: false, confirmed: false, image: "/images/hero_carrossel/care-veterinario.webp" },
  ],
} as const;

export const about = {
  title: "Uma fórmula carrega ciência. Um cuidado carrega história.",
  paragraphs: [
    "A Formily nasceu da união entre propósito, cuidado e família. Acreditamos que a saúde não deve ser tratada de forma genérica, porque cada pessoa vive uma história, uma rotina e necessidades próprias.",
    "Nosso nome une Form, de fórmula, a ily, inspirado em family. Ele representa o encontro entre a excelência da manipulação magistral e o cuidado próximo que queremos oferecer em cada relação.",
    "Mais do que preparar fórmulas, buscamos acolher pessoas, compreender necessidades e atuar com precisão, ética e responsabilidade em todas as etapas do atendimento.",
  ],
} as const;

export const structure = {
  title: "Confiança se constrói em cada detalhe.",
  text: "Da escuta no atendimento à atenção dedicada aos processos, a Formily foi pensada para unir acolhimento, precisão e responsabilidade farmacêutica.",
  bullets: [
    "Atendimento próximo e respeitoso",
    "Processos orientados por critérios técnicos",
    "Compromisso com qualidade e segurança",
  ],
} as const;

export const faq = {
  title: "Dúvidas frequentes",
  items: [
    {
      q: "Como solicito um orçamento?",
      a: "Pelo WhatsApp: envie sua receita ou fale com a nossa equipe e informe o que precisa. Nossa equipe orientará você pelo WhatsApp sobre as próximas etapas.",
    },
    {
      q: "Posso enviar minha receita pelo WhatsApp?",
      a: "Sim, o WhatsApp é o nosso canal para iniciar o atendimento. As informações compartilhadas são tratadas com cuidado e conforme a Política de Privacidade.",
    },
    {
      q: "Preciso de receita para solicitar uma manipulação?",
      a: "As exigências variam conforme a preparação e a legislação aplicável. Nossa equipe orientará você pelo WhatsApp sobre o que é necessário no seu caso. Não oferecemos aconselhamento médico: dúvidas sobre tratamento devem ser conversadas com o profissional que prescreveu.",
    },
    {
      q: "Posso retirar meu pedido na loja?",
      a: "Nossa equipe orientará você pelo WhatsApp sobre as opções de retirada disponíveis.",
    },
    {
      q: "Vocês realizam entregas?",
      a: "Nossa equipe orientará você pelo WhatsApp sobre as modalidades de entrega disponíveis para a sua região, se houver.",
    },
    {
      q: "Como acompanho meu pedido?",
      a: "Nossa equipe orientará você pelo WhatsApp sobre como acompanhar o andamento do seu pedido.",
    },
    {
      q: "Posso tirar dúvidas com um farmacêutico?",
      a: "Sim. Fale com a nossa equipe pelo WhatsApp para tirar dúvidas sobre o atendimento e sobre a sua solicitação.",
    },
    {
      q: "Onde fica a Formily?",
      a: "Atendemos em São Paulo. O endereço completo e os horários estão na seção de contato desta página.",
    },
  ],
} as const;

export const finalCta = {
  title: "Seu cuidado pode começar por uma conversa.",
  text: "Envie sua receita ou fale com a nossa equipe para solicitar seu orçamento de forma simples, segura e personalizada.",
  cta: "Falar no WhatsApp",
  support: "Atendimento em São Paulo • Consulte horários e modalidades de retirada ou entrega",
} as const;

export const footer = {
  tagline: "Fórmulas personalizadas, cuidado próximo e responsabilidade em cada etapa.",
  disclaimer:
    "As informações deste site têm caráter institucional e não substituem a orientação de profissionais de saúde.",
} as const;

/**
 * Imagens. `src: null` renderiza um placeholder. Para trocar: coloque o arquivo
 * em public/images/ e informe o caminho (ex.: "/images/formily-hero.jpg").
 * Detalhes em docs/FORMILY_IMAGE_BRIEF.md.
 */
export type ImageSlot = {
  src: string | null;
  file: string;
  alt: string;
  /** Slots que devem ser fotos reais da Formily (não geradas por IA). */
  realPhoto: boolean;
};

export const images = {
  hero: {
    src: null,
    file: "formily-hero.jpg",
    alt: "Farmacêutica em laboratório de manipulação",
    realPhoto: false,
  },
  process: {
    src: null,
    file: "formily-como-funciona.png",
    alt: "",
    realPhoto: false,
  },
  about: {
    src: "/images/formily-manifesto.webp",
    file: "formily-manifesto.webp",
    alt: "Farmacêutica da Formily atendendo uma cliente no balcão da recepção",
    realPhoto: true,
  },
  structureFacade: {
    src: "/images/formily_fachada.webp",
    file: "formily_fachada.webp",
    alt: "Fachada ou recepção da Formily",
    realPhoto: true,
  },
  structureTeam: {
    src: "/images/formily_equipe.webp",
    file: "formily_equipe.webp",
    alt: "Farmacêutico responsável e equipe da Formily",
    realPhoto: true,
  },
  structureLab: {
    src: "/images/formily_laboratorio.webp",
    file: "formily_laboratorio.webp",
    alt: "Área do laboratório da Formily",
    realPhoto: true,
  },
  finalCta: {
    src: null,
    file: "formily-cta-final.png",
    alt: "",
    realPhoto: false,
  },
} satisfies Record<string, ImageSlot>;

/** Mensagem contextual para um card de área de atendimento. */
export const careAreaMessage = (area: string) =>
  `Olá! Gostaria de conversar com a equipe da Formily Farmácia de Manipulação sobre atendimento na área de "${area}".`;
