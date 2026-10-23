import { type CSSProperties, type ReactElement, type ReactNode, useRef } from "react";
import type { CoverVariant } from "../../data/projects";
import { usePauseOffscreen } from "../../hooks/usePauseOffscreen";
import { cn } from "../../lib/cn";
import { ScaleToFit } from "../ui/ScaleToFit";

const WIDTH = 560;

const THEMES: Record<CoverVariant, { accent: string; glowAt: string }> = {
  calendar: { accent: "#00B37E", glowAt: "50% 55%" },
  timer: { accent: "#FB7185", glowAt: "65% 35%" },
  finance: { accent: "#38BDF8", glowAt: "40% 40%" },
  store: { accent: "#DBAC2C", glowAt: "50% 50%" },
};

function rgba(hex: string, alpha: number) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

function themeVars(variant: CoverVariant) {
  const { accent, glowAt } = THEMES[variant];
  const [r, g, b] = [1, 3, 5].map((i) => Math.round(parseInt(accent.slice(i, i + 2), 16) * 0.62));

  return {
    "--cv-accent": accent,
    "--cv-soft": rgba(accent, 0.14),
    "--cv-line": rgba(accent, 0.5),
    "--cv-glow": rgba(accent, 0.45),
    "--cv-deep": `rgb(${r} ${g} ${b})`,
    backgroundImage: `radial-gradient(circle at ${glowAt}, var(--cv-soft), transparent 52%), radial-gradient(#17171D 1px, transparent 1px)`,
    backgroundSize: "100% 100%, 18px 18px",
  } as CSSProperties;
}

/* ---------------------------------------------------------------------------
 * Peças das capas
 * ------------------------------------------------------------------------- */
interface PieceProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

type Float = "a" | "b";
const floatClass = (float?: Float) => (float === "a" ? "animate-float" : float === "b" ? "animate-float-alt" : "");

/** Piso quadriculado em perspectiva isométrica, esmaecido nas bordas. */
function Floor({ style }: PieceProps) {
  return (
    <div
      className="absolute size-120 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-size-[24px_24px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)] [transform:rotateX(58deg)_rotateZ(-42deg)]"
      style={style}
    />
  );
}

/** Plano isométrico onde as peças ganham profundidade (translateZ). */
function Plane({ style, children }: PieceProps) {
  return (
    <div className="absolute size-90 transform-3d [transform:rotateX(58deg)_rotateZ(-42deg)]" style={style}>
      {children}
    </div>
  );
}

function Abs({ className, style, children }: PieceProps) {
  return (
    <div className={cn("absolute", className)} style={style}>
      {children}
    </div>
  );
}

function Glass({ float, accent, style, children }: PieceProps & { float?: Float; accent?: boolean }) {
  return (
    <div
      className={cn(
        "absolute box-border rounded-[14px] border bg-[rgb(19_19_24/0.9)] shadow-[0_20px_40px_rgb(0_0_0/0.55)]",
        accent ? "border-(--cv-line)" : "border-[#2A2A33]",
        floatClass(float),
      )}
      style={style}
    >
      {children}
    </div>
  );
}

/** Barra "esqueleto" que representa texto sem conteúdo real. */
function Sk({ style }: PieceProps) {
  return <span className="block rounded-full bg-[#27272F]" style={style} />;
}

function Tile({ style }: PieceProps) {
  return <div className="absolute box-border rounded-lg" style={style} />;
}

const check = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B0B0F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/* ---------------------------------------------------------------------------
 * Agendamento: calendário isométrico, relógio e confirmação.
 * ------------------------------------------------------------------------- */
type CellState = "" | "soft" | "pick";

const cellState: Record<CellState, string> = {
  "": "",
  soft: "border-(--cv-line) bg-(--cv-soft) [transform:translateZ(10px)]",
  pick: "animate-lift-26 border-(--cv-accent) bg-(--cv-accent) shadow-[0_0_24px_var(--cv-glow),0_0_60px_var(--cv-glow)] [transform:translateZ(26px)]",
};

function Scheduling() {
  const soft = new Set(["1-1", "2-1", "3-2", "1-3", "4-0"]);
  const cells = Array.from({ length: 20 }, (_, index) => {
    const col = index % 5;
    const row = Math.floor(index / 5);
    const key = `${col}-${row}`;
    const state: CellState = key === "2-2" ? "pick" : soft.has(key) ? "soft" : "";
    return { key, state, left: 76 + col * 42, top: 104 + row * 42 };
  });

  return (
    <>
      <Floor style={{ left: 40, top: -20 }} />
      <Plane style={{ left: 100, top: 40 }}>
        <Tile style={{ left: 64, top: 66, width: 240, height: 240, borderRadius: 22, background: "rgb(0 0 0 / 0.6)", filter: "blur(16px)" }} />
        <Tile style={{ left: 60, top: 60, width: 240, height: 240, borderRadius: 20, border: "1px solid #2A2A33", background: "#131318", transform: "translateZ(2px)" }} />
        <Tile style={{ left: 76, top: 76, width: 110, height: 12, borderRadius: 6, background: "#27272F", transform: "translateZ(4px)" }} />
        <Tile style={{ left: 256, top: 76, width: 28, height: 12, borderRadius: 6, background: "var(--cv-line)", transform: "translateZ(4px)" }} />
        {cells.map((cell) => (
          <div
            key={cell.key}
            className={cn("absolute box-border size-[34px] rounded-lg border border-[#2A2A33] bg-[#1F1F27]", cellState[cell.state])}
            style={{ left: cell.left, top: cell.top }}
          />
        ))}
      </Plane>

      <Glass float="a" style={{ left: 396, top: 34, width: 128, height: 128, borderRadius: "50%", display: "grid", placeItems: "center", boxShadow: "0 20px 40px rgb(0 0 0 / 0.55), 0 0 40px var(--cv-soft)" }}>
        <svg width="104" height="104" viewBox="0 0 104 104" fill="none">
          <circle cx="52" cy="52" r="42" stroke="#27272F" strokeWidth="6" />
          <circle cx="52" cy="52" r="42" stroke="var(--cv-accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray="198 66" transform="rotate(-90 52 52)" />
          <circle cx="52" cy="52" r="30" stroke="#1F1F27" strokeDasharray="2 5" />
        </svg>
        <span className="absolute top-[34px] left-[63px] h-[30px] w-0.5 origin-[1px_30px] animate-spin-slow rounded-xs bg-[#F4F4F5]" />
        <Abs style={{ left: 60, top: 60, width: 8, height: 8, borderRadius: "50%", background: "var(--cv-accent)", boxShadow: "0 0 10px var(--cv-accent)" }} />
      </Glass>

      <Glass float="b" style={{ left: 28, top: 262, width: 150, padding: 12, display: "flex", flexDirection: "column", gap: 7 }}>
        <Sk style={{ width: 60, height: 7 }} />
        <Abs style={{ position: "static", height: 20, borderRadius: 6, border: "1px solid #27272F" }} />
        <Abs style={{ position: "static", height: 20, borderRadius: 6, background: "var(--cv-accent)", boxShadow: "0 0 18px var(--cv-glow)" }} />
        <Abs style={{ position: "static", height: 20, borderRadius: 6, border: "1px solid #27272F" }} />
      </Glass>

      <Glass float="a" accent style={{ left: 380, top: 300, width: 140, padding: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <Abs style={{ position: "static", width: 28, height: 28, flexShrink: 0, borderRadius: "50%", background: "var(--cv-accent)", display: "grid", placeItems: "center", boxShadow: "0 0 16px var(--cv-glow)" }}>
          {check}
        </Abs>
        <Abs style={{ position: "static", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <Sk style={{ width: "80%", height: 7, background: "#3F3F48" }} />
          <Sk style={{ width: "55%", height: 6 }} />
        </Abs>
      </Glass>
    </>
  );
}

/* ---------------------------------------------------------------------------
 * Foco: mostrador do ciclo, ciclos concluídos em degraus e histórico.
 * ------------------------------------------------------------------------- */
const TICKS = Array.from({ length: 60 }, (_, index) => index);

const HISTORY = [
  { status: "#4ADE80", width: "80%" },
  { status: "#4ADE80", width: "62%" },
  { status: "#FBBF24", width: "70%" },
  { status: "var(--cv-accent)", width: "54%" },
];

const CYCLES = [
  { left: 70, z: 10 },
  { left: 136, z: 20 },
  { left: 202, z: 30 },
];

function CycleTile({ z, next, style }: PieceProps & { z: number; next?: boolean }) {
  return (
    <div
      className={cn(
        "absolute box-border size-14 rounded-[14px]",
        next
          ? "animate-breathe-soft border-[1.5px] border-dashed border-(--cv-accent) bg-(--cv-soft)"
          : "border border-(--cv-line) bg-[linear-gradient(135deg,var(--cv-accent),var(--cv-deep))] shadow-[0_0_22px_var(--cv-glow)]",
      )}
      style={{ ...style, transform: `translateZ(${z}px)` }}
    />
  );
}

function Focus() {
  return (
    <>
      <Floor style={{ left: 20, top: 40 }} />
      <Plane style={{ left: 10, top: 150 }}>
        {CYCLES.map((tile) => (
          <Tile
            key={`shadow-${tile.left}`}
            style={{ left: tile.left + 4, top: 156, width: 56, height: 56, borderRadius: 14, background: "rgb(0 0 0 / 0.55)", filter: "blur(10px)" }}
          />
        ))}
        {CYCLES.map((tile) => (
          <CycleTile key={tile.left} z={tile.z} style={{ left: tile.left, top: 150 }} />
        ))}
        <CycleTile z={4} next style={{ left: 268, top: 150 }} />
      </Plane>

      <Glass style={{ left: 300, top: 42, width: 220, height: 220, borderRadius: "50%", boxShadow: "0 24px 50px rgb(0 0 0 / 0.6), 0 0 60px var(--cv-soft)" }}>
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" style={{ position: "absolute", left: -1, top: -1 }}>
          {TICKS.map((tick) => (
            <line
              key={tick}
              x1="110"
              y1="12"
              x2="110"
              y2={tick % 5 === 0 ? 22 : 17}
              stroke={tick < 42 ? "var(--cv-line)" : "#27272F"}
              strokeWidth={tick % 5 === 0 ? 2 : 1}
              transform={`rotate(${tick * 6} 110 110)`}
            />
          ))}
          <circle cx="110" cy="110" r="76" stroke="#1F1F27" strokeWidth="10" />
          <circle cx="110" cy="110" r="76" stroke="var(--cv-accent)" strokeWidth="10" strokeLinecap="round" strokeDasharray="335 143" transform="rotate(-90 110 110)" opacity=".3" style={{ filter: "blur(6px)" }} />
          <circle cx="110" cy="110" r="76" stroke="var(--cv-accent)" strokeWidth="10" strokeLinecap="round" strokeDasharray="335 143" transform="rotate(-90 110 110)" />
        </svg>
        <span className="absolute top-5 left-[109px] h-[90px] w-0.5 origin-[1px_90px] animate-spin-sweep rounded-xs bg-[linear-gradient(var(--cv-accent),transparent)]" />
        <Abs style={{ left: 81, top: 81, width: 58, height: 58, borderRadius: "50%", background: "var(--cv-accent)", boxShadow: "0 0 24px var(--cv-glow)", display: "grid", placeItems: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B0B0F">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        </Abs>
      </Glass>

      <Glass float="b" style={{ left: 26, top: 40, width: 172, padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        <Sk style={{ width: 70, height: 7, background: "#3F3F48" }} />
        {HISTORY.map((row, index) => (
          <Abs key={index} style={{ position: "static", display: "flex", alignItems: "center", gap: 8 }}>
            <Abs style={{ position: "static", width: 8, height: 8, flexShrink: 0, borderRadius: "50%", background: row.status, boxShadow: `0 0 8px ${row.status}` }} />
            <Sk style={{ width: row.width, height: 6 }} />
            <Sk style={{ marginLeft: "auto", width: 22, height: 6, background: "#1F1F27" }} />
          </Abs>
        ))}
      </Glass>

      <Glass float="a" accent style={{ left: 330, top: 318, width: 180, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Abs style={{ position: "static", width: 32, height: 32, borderRadius: "50%", border: "1px solid #27272F", display: "grid", placeItems: "center", color: "#A1A1AA" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </Abs>
        <Abs style={{ position: "static", width: 40, height: 40, borderRadius: "50%", background: "var(--cv-accent)", boxShadow: "0 0 18px var(--cv-glow)", display: "grid", placeItems: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0B0B0F">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
        </Abs>
        <Abs style={{ position: "static", width: 32, height: 32, borderRadius: "50%", border: "1px solid #27272F", display: "grid", placeItems: "center", color: "#A1A1AA" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 4 10 8-10 8V4Z" />
            <path d="M19 5v14" />
          </svg>
        </Abs>
      </Glass>
    </>
  );
}

/* ---------------------------------------------------------------------------
 * Finanças: gráfico luminoso, moedas e indicadores.
 * ------------------------------------------------------------------------- */
function Trend({ up, style }: { up: boolean; style: CSSProperties }) {
  const color = up ? "#4ADE80" : "#F87171";

  return (
    <Glass float="b" style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 9, ...style }}>
      <Abs style={{ position: "static", width: 24, height: 24, flexShrink: 0, borderRadius: "50%", background: rgba(color, 0.16), display: "grid", placeItems: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {up ? <path d="m5 12 7-7 7 7M12 19V5" /> : <path d="m19 12-7 7-7-7M12 5v14" />}
        </svg>
      </Abs>
      <Abs style={{ position: "static", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <Sk style={{ width: "60%", height: 5 }} />
        <Sk style={{ width: up ? "90%" : "75%", height: 7, background: color, opacity: 0.8 }} />
      </Abs>
    </Glass>
  );
}

function Coin({ small, style }: PieceProps & { small?: boolean }) {
  return (
    <span
      className={cn(
        "absolute rounded-full bg-[radial-gradient(ellipse_at_40%_35%,#FDE68A,#FBBF24_55%,#D69E2E)] shadow-[0_6px_0_#A16207,0_8px_14px_rgb(0_0_0/0.45)] after:absolute after:inset-x-3.5 after:inset-y-1.5 after:rounded-full after:border-[1.5px] after:border-[rgb(161_98_7/0.55)] after:content-['']",
        small ? "h-6 w-16" : "h-[30px] w-21",
      )}
      style={style}
    />
  );
}

function Finance() {
  const line = "M4 112 L44 96 L84 104 L124 72 L164 80 L204 48 L244 58 L304 22";

  return (
    <>
      <Floor style={{ left: 40, top: 60, transform: "rotateX(62deg) rotateZ(-38deg)" }} />

      <Glass style={{ left: 36, top: 56, width: 340, height: 226, padding: 16, boxShadow: "0 24px 50px rgb(0 0 0 / 0.6), 0 0 50px var(--cv-soft)" }}>
        <Abs style={{ position: "static", display: "flex", alignItems: "center", gap: 8 }}>
          <Sk style={{ width: 70, height: 8, background: "#3F3F48" }} />
          <Abs style={{ position: "static", marginLeft: "auto", display: "flex", gap: 4, padding: 3, borderRadius: 7, background: "#0F0F14" }}>
            {["var(--cv-accent)", "#27272F", "#27272F"].map((color, index) => (
              <Abs key={index} style={{ position: "static", width: 22, height: 12, borderRadius: 4, background: color }} />
            ))}
          </Abs>
        </Abs>
        <Sk style={{ marginTop: 10, width: 120, height: 14, borderRadius: 6, background: "#F4F4F5", opacity: 0.85 }} />
        <svg width="308" height="140" viewBox="0 0 308 140" fill="none" style={{ marginTop: 12, overflow: "visible" }}>
          <defs>
            <linearGradient id="cover-finance-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--cv-accent)" stopOpacity=".35" />
              <stop offset="1" stopColor="var(--cv-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 30H308M0 65H308M0 100H308" stroke="#1F1F27" strokeDasharray="3 5" />
          <path d={`${line} L304 138 L4 138 Z`} fill="url(#cover-finance-fill)" />
          <path d={line} stroke="var(--cv-accent)" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" opacity=".25" style={{ filter: "blur(4px)" }} />
          <path className="animate-draw [stroke-dasharray:520]" d={line} stroke="var(--cv-accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M204 48 V138" stroke="var(--cv-line)" strokeDasharray="3 4" />
          <circle cx="204" cy="48" r="5" fill="#0B0B0F" stroke="var(--cv-accent)" strokeWidth="2.5" />
        </svg>
        <Abs style={{ left: 182, top: 66, width: 92, padding: 8, boxSizing: "border-box", borderRadius: 8, border: "1px solid var(--cv-line)", background: "#0F0F14", display: "flex", flexDirection: "column", gap: 5 }}>
          <Sk style={{ width: 40, height: 5 }} />
          <Sk style={{ width: 64, height: 8, background: "var(--cv-accent)" }} />
        </Abs>
      </Glass>

      <Abs className="animate-float" style={{ left: 418, top: 150, width: 100, height: 140 }}>
        {[106, 94, 82, 70, 58, 46].map((top) => (
          <Coin key={top} style={{ left: 8, top }} />
        ))}
      </Abs>
      <Abs className="animate-float-alt" style={{ left: 470, top: 236, width: 70, height: 70 }}>
        {[40, 30, 20].map((top) => (
          <Coin key={top} small style={{ left: -6, top }} />
        ))}
      </Abs>

      <Trend up style={{ left: 396, top: 60, width: 130 }} />

      <Glass float="a" style={{ left: 36, top: 300, width: 230, padding: 12, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
        {[
          { bg: "#1B1B22", top: "#27272F", value: "#3F3F48", width: "85%" },
          { bg: "#1B1B22", top: "#27272F", value: "#3F3F48", width: "70%" },
          { bg: "var(--cv-accent)", top: "rgb(11 11 15 / 0.35)", value: "rgb(11 11 15 / 0.7)", width: "85%" },
        ].map((card, index) => (
          <Abs
            key={index}
            style={{
              position: "static",
              padding: 8,
              borderRadius: 8,
              background: card.bg,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              boxShadow: index === 2 ? "0 0 20px var(--cv-glow)" : undefined,
            }}
          >
            <Sk style={{ width: "60%", height: 5, background: card.top }} />
            <Sk style={{ width: card.width, height: 7, background: card.value }} />
          </Abs>
        ))}
      </Glass>

      <Trend up={false} style={{ left: 284, top: 318, width: 120 }} />
    </>
  );
}

/* ---------------------------------------------------------------------------
 * E-commerce: vitrine isométrica, sacola e etapas do pedido.
 * ------------------------------------------------------------------------- */
const PRODUCTS = [
  { left: 70, top: 110, color: "#DDD6FE, #A78BFA 60%, #6D4BD8" },
  { left: 160, top: 110, color: "#CFFAFE, #67E8F9 60%, #2B9AAE" },
  { left: 250, top: 110, color: "#FFE4D6, #F0A07F 60%, #B8694B" },
  { left: 70, top: 200, color: "#DCFCE7, #86EFAC 60%, #3E9F63" },
  { left: 160, top: 200, color: "#FFF7D6, var(--cv-accent) 60%, var(--cv-deep)", selected: true },
  { left: 250, top: 200, color: "#FCE7F3, #F472B6 60%, #B83E7E" },
];

function Commerce() {
  const accentBall = "radial-gradient(circle at 35% 30%, #FFF7D6, var(--cv-accent) 60%, var(--cv-deep))";

  return (
    <>
      <Floor style={{ left: 30, top: -10 }} />
      <Plane style={{ left: 90, top: 50 }}>
        {PRODUCTS.map((product) => (
          <span
            key={`s-${product.left}-${product.top}`}
            className="absolute size-20 rounded-2xl bg-[rgb(0_0_0/0.55)] blur-[10px]"
            style={{ left: product.left + 4, top: product.top + 6 }}
          />
        ))}
        {PRODUCTS.map((product) => (
          <div
            key={`${product.left}-${product.top}`}
            className={cn(
              "absolute box-border size-20 rounded-2xl bg-[#131318] transform-3d",
              product.selected
                ? "animate-lift-24 border-[1.5px] border-(--cv-accent) shadow-[0_0_30px_var(--cv-glow)] [transform:translateZ(24px)]"
                : "border border-[#2A2A33] [transform:translateZ(4px)]",
            )}
            style={{ left: product.left, top: product.top }}
          >
            <span
              className="absolute top-[17px] left-[17px] size-11 rounded-full [transform:translateZ(12px)]"
              style={{
                background: `radial-gradient(circle at 35% 30%, ${product.color})`,
                boxShadow: product.selected ? "0 0 24px var(--cv-glow)" : undefined,
              }}
            />
          </div>
        ))}
      </Plane>

      <Glass float="b" style={{ left: 26, top: 40, width: 156, padding: 12, display: "flex", flexDirection: "column", gap: 9 }}>
        <Abs style={{ position: "static", height: 64, borderRadius: 10, background: "#1B1B22", display: "grid", placeItems: "center" }}>
          <Abs style={{ position: "static", width: 40, height: 40, borderRadius: "50%", background: accentBall, boxShadow: "0 0 20px var(--cv-glow)" }} />
        </Abs>
        <Sk style={{ width: "80%", height: 7, background: "#3F3F48" }} />
        <Sk style={{ width: "55%", height: 6 }} />
        <Abs style={{ position: "static", display: "flex", alignItems: "center", gap: 6 }}>
          <Sk style={{ width: 40, height: 9, background: "#F4F4F5", opacity: 0.8 }} />
          <Abs style={{ position: "static", marginLeft: "auto", width: 26, height: 22, borderRadius: 6, background: "var(--cv-accent)", display: "grid", placeItems: "center" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0B0B0F" strokeWidth="3" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Abs>
        </Abs>
      </Glass>

      <Glass float="a" style={{ left: 444, top: 44, width: 76, height: 76, borderRadius: "50%", display: "grid", placeItems: "center", color: "var(--cv-accent)", boxShadow: "0 20px 40px rgb(0 0 0 / 0.55), 0 0 40px var(--cv-soft)" }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <span className="absolute top-1.5 right-1.5 size-4 animate-pop rounded-full bg-(--cv-accent) shadow-[0_0_12px_var(--cv-glow)]" />
      </Glass>

      <Glass float="a" style={{ left: 300, top: 318, width: 230, padding: "14px 16px" }}>
        <Abs style={{ position: "relative", height: 24 }}>
          <Abs style={{ left: 12, right: 12, top: 11, height: 2, background: "#27272F" }} />
          <Abs style={{ left: 12, width: "50%", top: 11, height: 2, background: "linear-gradient(90deg, var(--cv-accent), var(--cv-line))" }} />
          <Abs style={{ left: 0, top: 0, width: 24, height: 24, borderRadius: "50%", background: "var(--cv-accent)", display: "grid", placeItems: "center" }}>
            {check}
          </Abs>
          <Abs style={{ left: "50%", top: 0, marginLeft: -12, width: 24, height: 24, boxSizing: "border-box", borderRadius: "50%", border: "2px solid var(--cv-accent)", background: "#131318", boxShadow: "0 0 14px var(--cv-glow)" }} />
          <Abs style={{ right: 0, top: 0, width: 24, height: 24, boxSizing: "border-box", borderRadius: "50%", border: "2px solid #3F3F48", background: "#131318" }} />
          <span className="absolute top-2 left-3.5 size-2 animate-travel rounded-full bg-white shadow-[0_0_10px_var(--cv-accent)]" />
        </Abs>
        <Abs style={{ position: "static", marginTop: 10, display: "flex", justifyContent: "space-between" }}>
          <Sk style={{ width: 36, height: 5 }} />
          <Sk style={{ width: 36, height: 5, background: "var(--cv-line)" }} />
          <Sk style={{ width: 36, height: 5 }} />
        </Abs>
      </Glass>
    </>
  );
}

const SCENES: Record<CoverVariant, () => ReactElement> = {
  calendar: Scheduling,
  timer: Focus,
  finance: Finance,
  store: Commerce,
};

/** Capa ilustrada do projeto: palco de 560 × 420 reduzido para caber no card. */
export function ProjectCover({ variant }: { variant: CoverVariant }) {
  const Scene = SCENES[variant];
  const frameRef = useRef<HTMLDivElement>(null);
  usePauseOffscreen(frameRef);

  return (
    <div ref={frameRef} aria-hidden="true" className="overflow-hidden rounded-[20px] border border-[#27272F] bg-[#0B0B0F]">
      <ScaleToFit width={WIDTH}>
        <div
          className="relative h-105 w-140 overflow-hidden bg-[#0B0B0F] font-sans text-[#F4F4F5] transition-transform duration-600 ease-brand group-hover/project:scale-[1.03]"
          style={themeVars(variant)}
        >
          <Scene />
        </div>
      </ScaleToFit>
    </div>
  );
}
