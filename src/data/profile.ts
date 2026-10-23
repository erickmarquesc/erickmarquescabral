const WHATSAPP_NUMBER = "5521976818468";
const WHATSAPP_MESSAGE =
  "Olá, Erick! Vi seu portfólio e gostaria de conversar sobre um projeto.";

export const profile = {
  name: "Erick Marques",
  role: "Desenvolvedor front-end & UI designer",
  links: {
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    github: "https://github.com/erickmarquesc",
    linkedin: "https://www.linkedin.com/in/erick-marques-cabral-999b151b4/",
  },
};

export const services = [
  {
    icon: "layout",
    title: "Interfaces no Figma",
    description:
      "Fluxos, wireframes e telas de alta fidelidade, montados com componentes reutilizáveis e prontos para desenvolvimento.",
  },
  {
    icon: "code",
    title: "Front-end em produção",
    description:
      "Aplicações em React e Next.js com TypeScript, integradas a APIs, responsivas e com atenção a performance e acessibilidade.",
  },
  {
    icon: "layers",
    title: "Design systems",
    description:
      "Bibliotecas de componentes documentadas que mantêm o produto consistente e deixam o time mais rápido.",
  },
] as const;

export const processSteps = [
  {
    title: "Entender",
    description:
      "Briefing, objetivos e público. Defino o que é sucesso para o projeto antes de desenhar qualquer tela.",
  },
  {
    title: "Prototipar",
    description:
      "Fluxos e protótipos navegáveis no Figma para validar a solução cedo, quando mudar ainda é barato.",
  },
  {
    title: "Validar",
    description:
      "Ajustes com o cliente e, quando possível, com usuários reais. O protótipo só avança depois de aprovado.",
  },
  {
    title: "Desenvolver",
    description:
      "Código tipado, componentizado e responsivo, publicado com deploy contínuo e pronto para evoluir.",
  },
];

export const skillGroups = [
  {
    title: "Front-end",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS / Sass", "styled-components"],
  },
  {
    title: "Dados e back-end",
    items: ["Node.js", "Prisma", "APIs REST", "React Query", "Zod"],
  },
  {
    title: "Design",
    items: ["Figma", "Design systems", "Prototipação", "Pesquisa com usuários"],
  },
  {
    title: "IA",
    items: ["Claude Code", "RAG", "Obsidian"],
  },
  {
    title: "Ferramentas",
    items: ["Git", "Vite", "ESLint", "Vercel"],
  },
];

