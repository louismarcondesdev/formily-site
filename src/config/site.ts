/**
 * Conteúdo e configuração centralizados da Formily.
 *
 * Tudo que ainda é desconhecido usa o formato "[PREENCHER: ...]".
 * Para listar os pendentes: `grep -rn "PREENCHER\|VALIDAR" src/config`.
 * Nada aqui deve ser inventado: preencha apenas com dados fornecidos pela Formily.
 */

import type { Testimonial } from "@/components/ui/testimonials-columns-1";

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
  title: "Formily Farmácia de Manipulação | Cuidado personalizado em Campinas",
  description:
    "Farmácia de manipulação em Campinas com atendimento personalizado, precisão técnica e cuidado em cada etapa. Solicite seu orçamento pelo WhatsApp.",
  locale: "pt_BR",
} as const;

/**
 * WhatsApp oficial: +55 19 99920-4440. Fixo no código (sem variável de ambiente) para que
 * todos os botões e links enviem sempre para este número. Formato: DDI+DDD+número, só dígitos.
 */
export const whatsapp = {
  number: "5519999204440",
  defaultMessage:
    "Olá! Gostaria de solicitar um orçamento na Formily Farmácia de Manipulação.",
  /** Número formatado para exibição (opcional). */
  display: "(19) 99920-4440",
};

const addressLine1 = env("NEXT_PUBLIC_CONTACT_ADDRESS_1") ?? "Avenida Ruy Rodrigues, 4440";
const addressLine2 = env("NEXT_PUBLIC_CONTACT_ADDRESS_2") ?? "Parque Universitário de Viracopos";

// Coordenadas só existem se definidas por env (nunca inventadas). Sem elas, mapa e rota usam o endereço.
const latitude = coordinate("NEXT_PUBLIC_MAP_LATITUDE", 90);
const longitude = coordinate("NEXT_PUBLIC_MAP_LONGITUDE", 180);
const mapPlace =
  latitude !== null && longitude !== null
    ? `${latitude},${longitude}`
    : encodeURIComponent([addressLine1, addressLine2, "Campinas - SP"].join(", "));

/**
 * Dados do negócio (fonte única para conteúdo exibido e JSON-LD).
 * Valores não configurados ficam `null` e NÃO são renderizados (nada de placeholder em produção).
 * Configure editando aqui ou pelas variáveis NEXT_PUBLIC_* (ver docs/FORMILY_CONTACT_SETUP.md).
 */
export const contact = {
  companyName: site.name,
  city: "Campinas",
  state: "SP",
  addressLine1,
  addressLine2,
  phone: env("NEXT_PUBLIC_CONTACT_PHONE") ?? null,
  email: env("NEXT_PUBLIC_CONTACT_EMAIL") ?? "atendimento@formily.com.br",
  // Briefing não informa canal de privacidade: usa o e-mail de atendimento (confirmar com a Formily).
  privacyEmail: env("NEXT_PUBLIC_CONTACT_PRIVACY_EMAIL") ?? "atendimento@formily.com.br",
  /** Texto exibido, ex.: "Segunda a sexta, das 8h às 18h". */
  openingHours:
    env("NEXT_PUBLIC_CONTACT_HOURS") ?? "Segunda a sexta, das 9h às 18h · Sábado, das 8h às 12h",
  /** URL "Abrir rota" do Google Maps. Padrão: rota para o endereço da unidade; a env sobrescreve. */
  directionsUrl:
    env("NEXT_PUBLIC_MAPS_DIRECTIONS_URL") ??
    `https://www.google.com/maps/dir/?api=1&destination=${mapPlace}`,
  /**
   * Coordenadas da unidade (NEXT_PUBLIC_MAP_LATITUDE / NEXT_PUBLIC_MAP_LONGITUDE, graus decimais).
   * Opcionais: sem elas o mapa e a rota usam o endereço e o JSON-LD não emite `geo`.
   */
  latitude,
  longitude,
  /**
   * Embed do Google Maps (sem API key). Padrão: gerado do endereço (ou das coordenadas, se definidas).
   * NEXT_PUBLIC_MAPS_EMBED_URL sobrescreve (Compartilhar > Incorporar um mapa > copiar o src do iframe).
   */
  mapsEmbedUrl:
    env("NEXT_PUBLIC_MAPS_EMBED_URL") ??
    `https://www.google.com/maps?q=${mapPlace}&z=16&hl=pt-BR&output=embed`,
  /** Dados legais: só são exibidos no rodapé se TODOS de cada grupo estiverem preenchidos. */
  legal: {
    // Não afirmar licença/alvará sanitário: VISA com deferimento em andamento (briefing).
    legalName: "SOUZA EMILIANO FARMACIA DE MANIPULACAO LTDA" as string | null,
    cnpj: "56.045.245/0001-90" as string | null,
    pharmacistName: "Dayene Souza Emiliano" as string | null,
    pharmacistCrf: "CRF-SP 66.834" as string | null, // UF SP assumida (confirmar com a Formily)
  },
  /** Redes sociais oficiais e ativas: { label: "Instagram", href: "https://..." }. Vazio = não exibe. */
  socialLinks: [] as { label: string; href: string }[],
  /** Campos estruturados para o JSON-LD (devem ser idênticos ao exibido). Telefone e e-mail vêm dos campos acima. */
  schema: {
    streetAddress: null as string | null,
    city: null as string | null,
    postalCode: null as string | null,
    openingHours: ["Mo-Fr 09:00-18:00", "Sa 08:00-12:00"] as string[] | null,
  },
};

/** Verdadeiro se o valor do negócio existe (não vazio e não é placeholder). Use antes de renderizar. */
export const hasBusinessValue = isFilled;

/** "Cidade – UF" curto (ex.: "Campinas – SP"). */
export const cityState = `${contact.city} – ${contact.state}`;

export const nav = [
  { label: "A Formily", href: "/#a-formily" },
  { label: "Equipe", href: "/#equipe" },
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
  "Atendimento personalizado em Campinas",
  "Envie sua receita pelo WhatsApp",
  "Consulte a equipe sobre retirada e modalidades de entrega.",
] as const;

export const hero = {
  eyebrow: "Farmácia de manipulação em Campinas",
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
      text: "Compartilhe sua prescrição pelo WhatsApp ou clicando aqui, e se necessário fale com o nosso farmacêutico",
      linkLabel: "clicando aqui",
    },
    {
      title: "Receba seu orçamento",
      text: "Analisamos as informações necessárias e retornamos com as orientações personalizadas para o seu pedido.",
    },
    {
      title: "Aprove seu pedido",
      text: "Com o orçamento aprovado, iniciamos o processo conforme os critérios técnicos e farmacêuticos aplicáveis.",
    },
    {
      title: "Retire ou receba",
      text: "Retire presencialmente ou receba diretamente no conforto da sua casa",
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
    // Foco do briefing: emagrecimento, saúde metabólica, longevidade, bem-estar e performance (sem limitar ao público esportivo).
    // TODO(imagem): criar ilustração de "Emagrecimento e saúde metabólica" em public/images/hero_carrossel/ e informar `image` (entra no carrossel do hero).
    { label: "Emagrecimento e saúde metabólica", icon: "gauge", enabled: true, confirmed: true },
    { label: "Longevidade", icon: "hourglass", enabled: true, confirmed: true, image: "/images/hero_carrossel/care-longevidade.webp" },
    { label: "Nutrição e performance", icon: "activity", enabled: true, confirmed: true, image: "/images/hero_carrossel/care-nutricao-performance.webp" },
    { label: "Saúde e bem-estar", icon: "leaf", enabled: true, confirmed: true },
    { label: "Pele e cabelos", icon: "sparkles", enabled: true, confirmed: true, image: "/images/hero_carrossel/care-pele-cabelos.webp" },
    { label: "Sono e rotina", icon: "moon", enabled: true, confirmed: true, image: "/images/hero_carrossel/care-sono-rotina.webp" },
    // Fora do briefing: mantidas desabilitadas.
    { label: "Saúde da mulher", icon: "flower", enabled: false, confirmed: false, image: "/images/hero_carrossel/care-saude-mulher.webp" },
    { label: "Saúde do homem", icon: "compass", enabled: false, confirmed: false, image: "/images/hero_carrossel/care-saude-homem.webp" },
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

/** Equipe (bios do briefing). `photo: null` mostra avatar com iniciais; informe /images/... quando as fotos chegarem. */
export const team = {
  title: "Conheça quem cuida da sua fórmula.",
  subtitle: "Uma equipe próxima, com farmacêuticos à frente da análise da prescrição e da orientação ao paciente.",
  members: [
    {
      name: "Rodrigo dos Santos Emiliano",
      role: "Sócio-proprietário",
      bio: "Farmacêutico formado pela Universidade São Francisco (USF) e sócio proprietário da Formily. Acredito que cuidar da saúde também é construir relações de confiança e proximidade. Meu compromisso é contribuir para que cada pessoa que faça parte da nossa história se sinta acolhida e bem cuidada, refletindo os valores e o propósito que nos inspiraram a tornar esse sonho em realidade.",
      photo: null as string | null,
    },
    {
      name: "Dayene Priscila de Almeida Souza Emiliano",
      role: "Farmacêutica responsável técnica",
      bio: "Farmacêutica formada pela Universidade São Francisco (USF), atuo há 14 anos na área farmacêutica e acredito que cuidar da saúde vai muito além da manipulação de fórmulas. Meu compromisso é oferecer um olhar individualizado, aliando excelência técnica, segurança e proximidade para desenvolver soluções personalizadas que acompanhem cada paciente em sua jornada de cuidado e bem-estar.",
      photo: "/images/day.webp" as string | null,
    },
    {
      name: "Gabryelle de Almeida Souza",
      role: "Social media",
      bio: "Responsável pela estratégia e presença digital da Formily, atuando no planejamento, criação de conteúdo e posicionamento da marca. Trabalha para transformar a essência da farmácia em uma comunicação estratégica, humana e próxima do público.",
      photo: null as string | null,
    },
  ],
} as const;

/**
 * Depoimentos REAIS e autorizados por escrito (briefing: nenhum ainda). Vazio = a seção não é exibida.
 * Nunca usar textos de exemplo. Depoimento não pode citar ativo/indicação terapêutica (RDC).
 */
export const testimonials = {
  title: "O que dizem sobre a Formily",
  subtitle: "Relatos de quem já foi atendido pela nossa equipe.",
  items: [] as Testimonial[],
};

export const structure = {
  title: "Confiança se constrói em cada detalhe.",
  text: "Da escuta no atendimento à atenção dedicada aos processos, a Formily foi pensada para unir acolhimento, personalização, precisão e responsabilidade farmacêutica.",
  bullets: [
    "Atendimento próximo e respeitoso",
    "Processos orientados por critérios técnicos",
    "Compromisso com qualidade e segurança",
    "Fórmulas personalizadas",
  ],
} as const;

export const faq = {
  title: "Dúvidas frequentes",
  items: [
    {
      q: "Como solicito um orçamento?",
      a: "Pelo WhatsApp envie sua receita ou clique aqui.",
      linkLabel: "clique aqui",
    },
    {
      q: "Posso enviar minha receita pelo WhatsApp?",
      a: "Sim, o WhatsApp é o nosso canal para iniciar o atendimento. As informações compartilhadas são tratadas com cuidado e conforme a Política de Privacidade.",
    },
    {
      q: "Não tenho receita",
      a: "Entre em contato pelo WhatsApp com a nossa equipe, e o farmacêutico responsável irá te orientar sobre a fórmula desejada",
    },
    {
      q: "Preciso de receita para solicitar uma manipulação?",
      a: "As exigências variam conforme a preparação e a legislação aplicável. Nossa equipe orientará você pelo WhatsApp sobre o que é necessário no seu caso.",
    },
    {
      q: "Posso retirar meu pedido na loja?",
      a: "Sim, temos uma loja física a sua disposição, venha conhecer nossa loja",
    },
    {
      q: "Vocês realizam entregas?",
      a: "Sim, para todo o Brasil, fale com a nossa equipe pelo WhatsApp",
    },
    {
      q: "Como acompanho meu pedido?",
      a: "Nossa equipe está sempre a disposição para falar sobre o status do seu pedido",
    },
    {
      q: "Posso tirar dúvidas com um farmacêutico?",
      a: "Sim, temos um atendimento farmacêutico personalizado para auxiliar em dúvidas e solicitações",
    },
    {
      q: "Onde fica a Formily?",
      a: "Avenida Ruy Rodrigues, 4440, Parque Universitário de Viracopos",
    },
  ],
} as const;

export const finalCta = {
  title: "Seu cuidado pode começar por uma conversa.",
  text: "Fale com um dos nossos farmacêuticos, tire suas dúvidas e conheça as possibilidades de personalização da sua fórmula. Estamos aqui para orientá-lo em cada etapa",
  cta: "Falar com o farmacêutico",
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
