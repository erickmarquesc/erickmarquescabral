export interface Experience {
  role: string;
  company: string;
  type: string;
  location: string;
  /** Formato "AAAA-MM". */
  start: string;
  /** Formato "AAAA-MM". Ausente quando é o cargo atual. */
  end?: string;
  highlights: string[];
  skills: string[];
}

export const experiences: Experience[] = [
  {
    role: "UI Developer",
    company: "empy",
    type: "Contrato PJ",
    location: "Remoto",
    start: "2024-05",
    highlights: [
      "Defino a interface e a interação visual do produto, com pesquisa visual e testes de usabilidade.",
      "Crio e mantenho o design system: componentes reutilizáveis e padrões visuais.",
      "Prototipo em alta fidelidade no Figma, com wireframes e fluxos de UX para validar as soluções.",
      "Desenvolvo as funcionalidades de ponta a ponta como full stack, do front-end ao back-end.",
      "Conduzo o handoff entre design e desenvolvimento, garantindo clareza na implementação.",
      "Gerencio e priorizo o backlog do produto e planejo sprints com stakeholders e o time de desenvolvimento.",
    ],
    skills: ["Figma", "Design system", "Full stack", "UX research", "Product backlog"],
  },
  {
    role: "Desenvolvedor web",
    company: "Satel Brasil",
    type: "Estágio",
    location: "Rio de Janeiro · Híbrido",
    start: "2023-05",
    end: "2023-09",
    highlights: [
      "Refatorei o site institucional, fortalecendo a identidade digital da empresa.",
      "Implementei design responsivo e otimizações de performance, reduzindo o tempo de carregamento.",
      "Criei componentes reutilizáveis em React com foco em padronização e acessibilidade.",
      "Apliquei SEO on-page para aumentar a visibilidade orgânica do site.",
    ],
    skills: ["React", "Performance", "SEO", "Acessibilidade"],
  },
  {
    role: "Desenvolvedor de software",
    company: "Incentive.me",
    type: "Tempo integral",
    location: "Rio de Janeiro",
    start: "2021-06",
    end: "2022-12",
    highlights: [
      "Desenvolvi e mantive funcionalidades da plataforma com foco em escalabilidade e qualidade de código.",
      "Implementei melhorias de interface e usabilidade que contribuíram para o aumento da conversão.",
      "Transformei wireframes e protótipos do time de design em interfaces responsivas e acessíveis.",
    ],
    skills: ["UI", "Front-end", "Usabilidade", "Testes"],
  },
  {
    role: "Desenvolvedor Python",
    company: "Six Creative",
    type: "Tempo integral",
    location: "Rio de Janeiro",
    start: "2020-12",
    end: "2021-06",
    highlights: [
      "Desenvolvi aplicações web e scripts em Python para automatizar processos internos.",
      "Criei rotinas de manipulação de dados e integração entre sistemas, reduzindo o tempo de processamento.",
    ],
    skills: ["Python", "Automação", "Integrações", "Node.js"],
  },
  {
    role: "Desenvolvedor web e mobile",
    company: "Freelance",
    type: "Projetos sob demanda",
    location: "Rio de Janeiro",
    start: "2020-09",
    end: "2020-12",
    highlights: [
      "Criei sites e aplicações responsivas com layouts personalizados e integrações com APIs.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    role: "Técnico de suporte de informática",
    company: "Colégio Lemos de Castro",
    type: "Estágio",
    location: "Rio de Janeiro",
    start: "2013-10",
    end: "2014-12",
    highlights: [
      "Liderei a criação e a documentação de um sistema online de candidatura de estudantes, que automatizou o processo e reduziu a burocracia.",
    ],
    skills: ["Delphi", "SQL", "HTML", "CSS"],
  },
];
