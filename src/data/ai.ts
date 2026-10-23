export interface AIPoint {
  title: string;
  description: string;
}

export interface AITag {
  label: string;
  /** Canais RGB separados por espaço, ex.: "240 160 127". */
  color: string;
  text: string;
}

export const aiPoints: AIPoint[] = [
  {
    title: "RAG para a empresa",
    description:
      "Desenvolvi um RAG que responde às perguntas do time a partir do conhecimento interno da empresa.",
  },
  {
    title: "Obsidian como cérebro",
    description:
      "Estruturei um vault que centraliza processos, decisões e documentação. Ele é a base do RAG.",
  },
  {
    title: "Sprint e docs em dia",
    description:
      "O Claude Code acompanha o sprint e mantém a documentação do dia a dia e a técnica atualizadas.",
  },
];

export const aiTags: AITag[] = [
  { label: "Claude Code", color: "240 160 127", text: "#F0A07F" },
  { label: "RAG", color: "167 139 250", text: "#C4B5FD" },
  { label: "Obsidian", color: "103 232 249", text: "#67E8F9" },
  { label: "Documentação técnica", color: "134 239 172", text: "#86EFAC" },
];
