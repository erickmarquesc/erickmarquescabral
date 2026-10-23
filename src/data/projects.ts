export type CoverVariant = "calendar" | "timer" | "finance" | "store";

export interface FeaturedProject {
  title: string;
  kind: string;
  year: number;
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
  stack: string[];
  cover: CoverVariant;
  links: { demo?: string; code: string };
}

export interface OtherProject {
  title: string;
  description: string;
  stack: string[];
  links: { demo?: string; code: string };
}

const GITHUB = "https://github.com/erickmarquesc";

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Ignite Call",
    kind: "Agendamento online",
    year: 2023,
    summary: "Agenda compartilhável integrada ao Google Agenda.",
    challenge:
      "Eliminar a troca de mensagens para marcar reunião: a pessoa vê os horários livres e agenda sozinha.",
    solution:
      "O usuário conecta a conta Google, define a disponibilidade da semana e compartilha um link. Quem acessa escolhe um horário livre e o evento vai direto para a agenda.",
    highlights: [
      "Login com Google via OAuth (NextAuth)",
      "Eventos criados pela API do Google Calendar",
      "Interface montada sobre um design system próprio",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "NextAuth", "React Query", "Zod"],
    cover: "calendar",
    links: { demo: "https://ignitecalle.vercel.app/", code: `${GITHUB}/IgniteCall` },
  },
  {
    title: "Pomodoro Timer",
    kind: "Produtividade",
    year: 2022,
    summary: "Timer de foco com ciclos de trabalho e histórico.",
    challenge:
      "Ajudar a manter o foco em blocos de tempo e registrar no que cada ciclo foi usado.",
    solution:
      "A pessoa informa a tarefa e a duração, acompanha a contagem regressiva (também no título da aba) e consulta o histórico de ciclos concluídos ou interrompidos.",
    highlights: [
      "Estado dos ciclos com useReducer, Context e Immer",
      "Formulário validado com React Hook Form e Zod",
      "Ciclos salvos no navegador com localStorage",
    ],
    stack: ["React", "TypeScript", "Vite", "Immer", "Zod", "styled-components"],
    cover: "timer",
    links: { demo: "https://pomodorotimerecom.vercel.app/", code: `${GITHUB}/Pomodoro-Timer` },
  },
  {
    title: "DT Money",
    kind: "Finanças pessoais",
    year: 2022,
    summary: "Controle de entradas e saídas com resumo sempre atualizado.",
    challenge:
      "Substituir a planilha de gastos por um app simples, com o saldo sempre visível.",
    solution:
      "Aplicação de transações com cadastro rápido em modal, busca e um resumo de entradas, saídas e saldo, consumindo uma API.",
    highlights: [
      "Modal e seleção de tipo acessíveis com Radix UI",
      "Menos re-renderizações com use-context-selector",
      "Formulários com React Hook Form e Zod",
    ],
    stack: ["React", "TypeScript", "Vite", "Radix UI", "Zod", "styled-components"],
    cover: "finance",
    links: { demo: "https://dt-money-one-rust.vercel.app", code: `${GITHUB}/DTMoney` },
  },
  {
    title: "Coffee Delivery",
    kind: "E-commerce",
    year: 2023,
    summary: "Loja de cafés do catálogo ao pedido confirmado.",
    challenge:
      "Levar o cliente do catálogo até o pedido confirmado com o mínimo de atrito, sem perder o carrinho pelo caminho.",
    solution:
      "Catálogo com carrinho, checkout com endereço e forma de pagamento, e carrinho salvo no navegador para o cliente continuar de onde parou.",
    highlights: [
      "Carrinho global com Context API e localStorage",
      "Checkout com React Hook Form",
      "Feedback das ações com notificações",
    ],
    stack: ["React", "TypeScript", "Vite", "React Router", "styled-components"],
    cover: "store",
    links: { demo: "https://coffeedeliveryecom.vercel.app/", code: `${GITHUB}/CoffeeDelivery` },
  },
];

export const otherProjects: OtherProject[] = [
  {
    title: "Ignite UI",
    description: "Design system com componentes documentados, em monorepo com Turborepo e Changesets.",
    stack: ["React", "TypeScript", "Turborepo"],
    links: { code: `${GITHUB}/ignitecallUIDesignSystem` },
  },
  {
    title: "14Py",
    description: "Análise dos dados de um condomínio a partir de planilhas XLS.",
    stack: ["Python"],
    links: { code: `${GITHUB}/14Py` },
  },
  {
    title: "Empy Bank",
    description: "Gestão da carteira de clientes de um time comercial, com API REST própria.",
    stack: ["Next.js", "Prisma", "Zod"],
    links: { code: `${GITHUB}/EmpyBank` },
  },
  {
    title: "GitHub Blog",
    description: "Blog que lista repositórios a partir da API do GitHub.",
    stack: ["React", "TypeScript"],
    links: { demo: "https://githubblogecom.vercel.app/", code: `${GITHUB}/GitHub-Blog` },
  },
  {
    title: "DevLinks",
    description: "Página de links para usar como cartão de visitas online.",
    stack: ["React", "styled-components"],
    links: { demo: "https://devecomlinks.vercel.app/", code: `${GITHUB}/DevLinks` },
  },
];
