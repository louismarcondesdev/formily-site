import type { LegalSection } from "@/components/formily/LegalPage";
import { contact } from "@/config/site";

/** Conteúdo inicial — sujeito à validação jurídica/LGPD antes da publicação definitiva. */

export const privacy = {
  title: "Política de Privacidade",
  description: "Como a Formily trata as informações compartilhadas por meio deste site e do atendimento.",
  intro:
    "A Formily Farmácia de Manipulação valoriza a sua privacidade. Esta política descreve, de forma resumida, como as informações podem ser tratadas ao usar este site e ao iniciar um atendimento.",
  sections: [
    {
      title: "1. Quem é o controlador",
      body: <p>{contact.companyName}. Dados da empresa (razão social, CNPJ e endereço): [PREENCHER: DADOS DO CONTROLADOR].</p>,
    },
    {
      title: "2. Quais informações podem ser tratadas",
      body: (
        <p>
          Este site é institucional e não possui formulários de cadastro. As informações são compartilhadas por você ao entrar em contato
          pelo WhatsApp, telefone ou e-mail (por exemplo, nome, telefone e o conteúdo de mensagens e receitas enviadas).
        </p>
      ),
    },
    {
      title: "3. Dados relacionados à saúde",
      body: (
        <p>
          Prescrições e informações de saúde são dados que exigem tratamento cuidadoso. Elas devem ser utilizadas apenas para viabilizar o
          atendimento e o orçamento solicitados, com acesso restrito às pessoas necessárias, conforme a legislação aplicável, incluindo a LGPD.
        </p>
      ),
    },
    {
      title: "4. Finalidades e bases legais",
      body: <p>[PREENCHER: FINALIDADES E BASES LEGAIS — a definir com assessoria jurídica].</p>,
    },
    {
      title: "5. Compartilhamento e retenção",
      body: <p>[PREENCHER: COMPARTILHAMENTO COM TERCEIROS E PRAZOS DE RETENÇÃO — a definir com assessoria jurídica].</p>,
    },
    {
      title: "6. Direitos do titular",
      body: <p>Você poderá solicitar acesso, correção, exclusão e demais direitos previstos na LGPD, entrando em contato pelo canal {contact.privacyEmail ?? "[PREENCHER: E-MAIL PRIVACIDADE]"}.</p>,
    },
    {
      title: "7. Contato sobre privacidade",
      body: <p>Canal: {contact.privacyEmail ?? "[PREENCHER: E-MAIL PRIVACIDADE]"}.</p>,
    },
  ] satisfies LegalSection[],
};

export const cookies = {
  title: "Política de Cookies",
  description: "Informações sobre o uso de cookies e tecnologias semelhantes neste site.",
  intro:
    "Cookies são pequenos arquivos armazenados no seu navegador. Esta política explica como este site pode utilizá-los.",
  sections: [
    {
      title: "1. Cookies estritamente necessários",
      body: <p>Podem ser usados para o funcionamento básico do site (por exemplo, segurança e desempenho), sem finalidade de rastreamento.</p>,
    },
    {
      title: "2. Cookies de análise e marketing",
      body: (
        <p>
          Caso a Formily adote ferramentas de métricas ou publicidade, elas serão listadas aqui e, quando exigido, dependerão do seu
          consentimento. Ferramentas em uso: [PREENCHER: FERRAMENTAS DE ANALYTICS/MARKETING, SE HOUVER].
        </p>
      ),
    },
    {
      title: "3. Como gerenciar",
      body: <p>Você pode bloquear ou apagar cookies nas configurações do seu navegador. Isso pode afetar algumas funcionalidades.</p>,
    },
    {
      title: "4. Contato",
      body: <p>Dúvidas: {contact.privacyEmail ?? "[PREENCHER: E-MAIL PRIVACIDADE]"}.</p>,
    },
  ] satisfies LegalSection[],
};

export const terms = {
  title: "Termos de Uso",
  description: "Condições gerais de uso do site institucional da Formily.",
  intro: "Ao acessar este site, você concorda com as condições gerais abaixo.",
  sections: [
    {
      title: "1. Caráter institucional",
      body: <p>As informações deste site têm caráter institucional e não substituem a orientação de profissionais de saúde. O site não realiza vendas nem divulga fórmulas ou produtos.</p>,
    },
    {
      title: "2. Atendimento e orçamentos",
      body: <p>O atendimento e a elaboração de orçamentos ocorrem por canais indicados no site, como o WhatsApp, e dependem de análise da equipe, da prescrição e da legislação aplicável. Prazos, retirada e entrega serão informados pela equipe.</p>,
    },
    {
      title: "3. Uso adequado",
      body: <p>Você concorda em usar o site de forma lícita e em não tentar comprometer sua segurança ou disponibilidade.</p>,
    },
    {
      title: "4. Propriedade intelectual",
      body: <p>Marcas, textos e demais conteúdos pertencem à Formily ou a seus licenciantes e não podem ser reproduzidos sem autorização.</p>,
    },
    {
      title: "5. Links externos",
      body: <p>Este site pode direcionar para serviços de terceiros (como WhatsApp e Google Maps), que possuem seus próprios termos e políticas.</p>,
    },
    {
      title: "6. Alterações e foro",
      body: <p>Estes termos podem ser atualizados. Foro e demais disposições: [PREENCHER: FORO E DISPOSIÇÕES — a definir com assessoria jurídica].</p>,
    },
  ] satisfies LegalSection[],
};
