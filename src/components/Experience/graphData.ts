export interface GraphNode {
  x: number;
  y: number;
}

export interface FocusNode extends GraphNode {
  name: string;
  caption: string;
  filled?: boolean;
  label: "below" | "left";
}

export interface NoteNode extends GraphNode {
  label: string;
  position: "below" | "above" | "left" | "right";
}

export interface FarDot extends GraphNode {
  size: number;
  twinkle?: boolean;
}

export interface GraphData {
  width: number;
  height: number;
  origin: string;
  packetPath: string;
  focus: FocusNode[];
  notes: NoteNode[];
  dots: GraphNode[];
  far: FarDot[];
  links: [number, number, number, number][];
  focusLinks: [number, number, number, number][];
}

// TODO: trocar os nomes das notas pelos do vault real.
export const desktopGraph: GraphData = {
  width: 496,
  height: 600,
  origin: "240px 300px",
  packetPath: "M160 170 L330 300 L200 450",
  focus: [
    { x: 160, y: 170, name: "Obsidian", caption: "vault · cérebro", label: "below" },
    { x: 330, y: 300, name: "RAG", caption: "busca + contexto", label: "left", filled: true },
    { x: 200, y: 450, name: "Time", caption: "respostas confiáveis", label: "below" },
  ],
  notes: [
    { x: 80, y: 90, label: "Processos", position: "below" },
    { x: 220, y: 80, label: "Decisões", position: "above" },
    { x: 70, y: 220, label: "Onboarding", position: "below" },
    { x: 280, y: 150, label: "ADRs", position: "above" },
    { x: 120, y: 300, label: "Reuniões", position: "below" },
    { x: 420, y: 220, label: "Sprint atual", position: "below" },
    { x: 430, y: 360, label: "Docs técnicos", position: "below" },
    { x: 380, y: 440, label: "Backlog", position: "below" },
    { x: 100, y: 520, label: "Produto", position: "below" },
    { x: 280, y: 530, label: "Dev", position: "below" },
    { x: 80, y: 420, label: "Comercial", position: "left" },
  ],
  dots: [
    { x: 20, y: 140 },
    { x: 400, y: 110 },
    { x: 50, y: 360 },
    { x: 440, y: 500 },
    { x: 360, y: 190 },
  ],
  far: [
    { x: 32, y: 64, size: 4, twinkle: true },
    { x: 308, y: 40, size: 5 },
    { x: 452, y: 72, size: 4, twinkle: true },
    { x: 470, y: 170, size: 5 },
    { x: 10, y: 280, size: 4 },
    { x: 260, y: 230, size: 3, twinkle: true },
    { x: 470, y: 290, size: 4 },
    { x: 170, y: 380, size: 3, twinkle: true },
    { x: 320, y: 370, size: 4 },
    { x: 460, y: 430, size: 5 },
    { x: 20, y: 480, size: 4, twinkle: true },
    { x: 140, y: 576, size: 4 },
    { x: 330, y: 560, size: 3 },
    { x: 410, y: 566, size: 4, twinkle: true },
    { x: 270, y: 470, size: 4 },
    { x: 80, y: 170, size: 3 },
  ],
  links: [
    [160, 170, 80, 90], [160, 170, 220, 80], [160, 170, 70, 220], [160, 170, 280, 150],
    [160, 170, 120, 300], [280, 150, 360, 190], [80, 90, 20, 140], [220, 80, 280, 150],
    [330, 300, 420, 220], [330, 300, 430, 360], [330, 300, 380, 440], [420, 220, 400, 110],
    [360, 190, 420, 220], [200, 450, 100, 520], [200, 450, 280, 530], [200, 450, 80, 420],
    [80, 420, 50, 360], [430, 360, 440, 500], [120, 300, 200, 450], [280, 150, 330, 300],
    [120, 300, 50, 360],
  ],
  focusLinks: [
    [160, 170, 330, 300],
    [330, 300, 200, 450],
  ],
};

export const mobileGraph: GraphData = {
  width: 390,
  height: 470,
  origin: "195px 220px",
  packetPath: "M120 78 L280 208 L150 338",
  focus: [
    { x: 120, y: 78, name: "Obsidian", caption: "vault · cérebro", label: "below" },
    { x: 280, y: 208, name: "RAG", caption: "busca + contexto", label: "left", filled: true },
    { x: 150, y: 338, name: "Time", caption: "respostas confiáveis", label: "below" },
  ],
  notes: [
    { x: 50, y: 28, label: "Processos", position: "below" },
    { x: 200, y: 18, label: "Decisões", position: "below" },
    { x: 250, y: 108, label: "ADRs", position: "right" },
    { x: 60, y: 178, label: "Reuniões", position: "below" },
    { x: 350, y: 148, label: "Sprint atual", position: "below" },
    { x: 340, y: 278, label: "Docs técnicos", position: "below" },
    { x: 290, y: 358, label: "Backlog", position: "below" },
    { x: 70, y: 408, label: "Produto", position: "below" },
    { x: 230, y: 418, label: "Dev", position: "below" },
  ],
  dots: [
    { x: 20, y: 108 },
    { x: 370, y: 48 },
    { x: 30, y: 288 },
    { x: 370, y: 408 },
  ],
  far: [
    { x: 160, y: 40, size: 3, twinkle: true },
    { x: 310, y: 70, size: 4 },
    { x: 20, y: 230, size: 4, twinkle: true },
    { x: 200, y: 250, size: 3 },
    { x: 370, y: 320, size: 4, twinkle: true },
    { x: 110, y: 450, size: 4 },
  ],
  links: [
    [120, 78, 50, 28], [120, 78, 200, 18], [120, 78, 250, 108], [120, 78, 60, 178],
    [200, 18, 250, 108], [50, 28, 20, 108], [280, 208, 350, 148], [280, 208, 340, 278],
    [280, 208, 290, 358], [250, 108, 280, 208], [350, 148, 370, 48], [60, 178, 150, 338],
    [60, 178, 30, 288], [150, 338, 70, 408], [150, 338, 230, 418], [290, 358, 370, 408],
  ],
  focusLinks: [
    [120, 78, 280, 208],
    [280, 208, 150, 338],
  ],
};
