import { type CSSProperties, type ReactNode, useRef } from "react";
import { useFitScale } from "../../hooks/useFitScale";
import { usePauseOffscreen } from "../../hooks/usePauseOffscreen";
import { cn } from "../../lib/cn";
import { Icon } from "../ui/Icon";

/* O painel é sempre escuro, nos dois temas: funciona como uma vitrine. */
const PANEL_VARS = {
  "--sx-bg": "#0B0B0F",
  "--sx-surface": "#101015",
  "--sx-surface-2": "#131318",
  "--sx-chip": "#1B1B22",
  "--sx-line": "#1F1F27",
  "--sx-grid": "#191920",
  "--sx-border": "#27272F",
  "--sx-border-2": "#3F3F48",
  "--sx-dash": "#52525B",
  "--sx-text": "#F4F4F5",
  "--sx-muted": "#A1A1AA",
  "--sx-subtle": "#8B8B95",
  "--sx-ink": "#18181B",
  "--sx-red": "#E11D48",
  "--sx-green": "#4ADE80",
  "--sx-accent": "#A78BFA",
  "--sx-accent-soft": "rgb(167 139 250 / 0.14)",
  "--sx-accent-line": "rgb(167 139 250 / 0.55)",
  "--sx-glow": "rgb(167 139 250 / 0.35)",
  "--sx-glow-strong": "rgb(167 139 250 / 0.6)",
  "--sx-hover": "rgb(180 156 251)",
  "--sx-pressed": "rgb(144 120 215)",
} as CSSProperties;

const mono = "font-mono";

interface ShowcaseRootProps {
  /** "fixed": desenhado em 960px e reduzido por fora. "fluid": se reorganiza para a largura da tela. */
  layout?: "fixed" | "fluid";
  /** Descrição para leitores de tela; o desenho em si é decorativo. */
  caption: string;
  children: ReactNode;
}

export function ShowcaseRoot({ layout = "fluid", caption, children }: ShowcaseRootProps) {
  const panelRef = useRef<HTMLElement>(null);
  usePauseOffscreen(panelRef);

  return (
    <figure
      ref={panelRef}
      data-layout={layout}
      style={PANEL_VARS}
      className="relative m-0 overflow-hidden rounded-3xl border border-(--sx-border) bg-(--sx-bg) bg-[radial-gradient(circle_at_15%_10%,var(--sx-accent-soft),transparent_40%),radial-gradient(circle_at_75%_35%,var(--sx-accent-soft),transparent_35%),radial-gradient(var(--sx-line)_1px,transparent_1px)] bg-size-[100%_100%,100%_100%,20px_20px] font-sans text-(--sx-text) shadow-lift"
    >
      <figcaption className="sr-only">{caption}</figcaption>
      <div aria-hidden="true">{children}</div>
    </figure>
  );
}

interface ShowcaseTopBarProps {
  title: string;
  meta: string;
}

export function ShowcaseTopBar({ title, meta }: ShowcaseTopBarProps) {
  return (
    <div className="flex h-13 items-center justify-between gap-4 border-b border-(--sx-line) px-6">
      <div className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-(--sx-muted)">
        <span className="size-2 rotate-45 border-[1.5px] border-(--sx-accent)" />
        {title}
      </div>
      <p className={cn(mono, "text-[0.75rem] text-(--sx-subtle) in-data-[layout=fluid]:max-sm:hidden")}>{meta}</p>
    </div>
  );
}

export function ShowcaseBody({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[424px_468px] justify-between gap-6 p-6 in-data-[layout=fluid]:max-lg:grid-cols-1 in-data-[layout=fluid]:max-lg:gap-8 in-data-[layout=fluid]:max-sm:p-4">
      {children}
    </div>
  );
}

/** Palco de tamanho fixo (coordenadas do estudo no canvas), reduzido para caber quando necessário. */
function Fit({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const { ref, scale } = useFitScale<HTMLDivElement>(width);

  return (
    <div ref={ref} className="relative mx-auto w-full min-w-0" style={{ maxWidth: width, height: height * scale }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

const LAYERS = [
  { number: "04", title: "Focus ring", spec: "2px · offset 4", top: 50 },
  { number: "03", title: "Conteúdo", spec: "ícone 20 · gap 8", top: 134 },
  { number: "02", title: "Container", spec: "radius 8 · 12 × 20", top: 218 },
  { number: "01", title: "Elevação", spec: "glow 0 8 24 · 35%", top: 302 },
];

const layer = "absolute h-14 w-50 rounded-[14px] transform-[rotateX(60deg)_rotateZ(-35deg)]";

/** Camadas do botão explodidas em perspectiva, com as anotações ao lado. */
export function ShowcaseLayers() {
  return (
    <Fit width={424} height={380}>
      <div className="absolute border-l border-dashed border-(--sx-border-2)" style={{ left: 135, top: 28, height: 330 }} />
      <div
        className="absolute h-0.5 animate-scan bg-[linear-gradient(90deg,transparent,var(--sx-accent),transparent)] opacity-0 shadow-[0_0_16px_var(--sx-glow-strong)] motion-reduce:hidden"
        style={{ left: 16, top: 28, width: 240 }}
      />

      <div className={cn(layer, "bg-(--sx-glow-strong) blur-[14px]")} style={{ left: 36, top: 294 }} />
      <div className={cn(layer, "border border-dashed border-(--sx-accent-line)")} style={{ left: 36, top: 294 }} />
      <div
        className={cn(layer, "bg-(--sx-accent) shadow-[inset_0_2px_0_rgb(255_255_255/0.4),0_0_0_1px_rgb(255_255_255/0.08)]")}
        style={{ left: 36, top: 210 }}
      />
      <div
        className={cn(
          layer,
          "flex items-center justify-center gap-2 border border-dashed border-(--sx-dash) bg-[rgb(19_19_24/0.7)] font-display text-[15px] font-bold",
        )}
        style={{ left: 36, top: 126 }}
      >
        <Icon name="calendar" size={18} />
        Agendar reunião
      </div>
      <div
        className={cn(
          layer,
          "rounded-[18px] border-2 border-(--sx-accent) shadow-[0_0_0_6px_var(--sx-accent-soft),0_0_24px_var(--sx-glow)]",
        )}
        style={{ left: 36, top: 42 }}
      />

      {LAYERS.map((item, index) => {
        const active = index === 0;
        return (
          <div key={item.number}>
            <div
              className={cn(
                "absolute size-[7px] rounded-full",
                active ? "bg-(--sx-accent) shadow-[0_0_10px_var(--sx-accent)]" : "bg-(--sx-muted)",
              )}
              style={{ left: 230, top: item.top + 17 }}
            />
            <div
              className={cn(
                "absolute h-px w-6.5",
                active ? "bg-[linear-gradient(90deg,var(--sx-accent),var(--sx-border-2))]" : "bg-(--sx-border-2)",
              )}
              style={{ left: 240, top: item.top + 20 }}
            />
            <div className="absolute w-37.5" style={{ left: 274, top: item.top }}>
              <div className="flex items-baseline gap-1.5 text-[0.875rem] font-semibold">
                <span className={cn(mono, "text-[11px] font-normal text-(--sx-accent)")}>{item.number}</span>
                {item.title}
              </div>
              <p className={cn(mono, "mt-[3px] text-[11px] text-(--sx-muted)")}>{item.spec}</p>
            </div>
          </div>
        );
      })}
    </Fit>
  );
}

const HANDLES = [
  [85, 145], [230, 145], [375, 145],
  [85, 179], [375, 179],
  [85, 213], [230, 213], [375, 213],
];

const pill =
  "absolute flex items-center gap-2 rounded-md border border-(--sx-border) bg-(--sx-chip) px-2.5 py-[3px] font-mono text-[11px] tracking-[0.06em] text-(--sx-muted)";
const redLine = "absolute bg-(--sx-red)";
const redTag = "absolute rounded bg-(--sx-red) py-px text-center font-mono text-[10px] leading-[15px] text-white";
const hatch = "absolute bg-[repeating-linear-gradient(135deg,rgb(225_29_72/0.42)_0_2px,rgb(225_29_72/0.14)_2px_6px)]";

/** O botão montado, visto no inspector com zoom de 150%: seleção, medidas e linha de base. */
export function ShowcaseInspector() {
  return (
    <Fit width={468} height={380}>
      <div className="absolute inset-0 overflow-hidden rounded-2xl border border-(--sx-border) bg-(--sx-surface) bg-[linear-gradient(var(--sx-grid)_1px,transparent_1px),linear-gradient(90deg,var(--sx-grid)_1px,transparent_1px)] bg-size-[12px_12px] shadow-[0_24px_60px_rgb(0_0_0/0.45)]">
        <div className={cn(pill, "tracking-normal")} style={{ left: 12, top: 12 }}>
          150%
        </div>
        <div className={pill} style={{ right: 12, top: 12 }}>
          <span className="size-1.5 animate-blink rounded-full bg-(--sx-green)" />
          RESULTADO
        </div>

        <div className={redLine} style={{ left: 90, top: 118, width: 288, height: 1 }} />
        <div className={redLine} style={{ left: 90, top: 113, width: 1, height: 11 }} />
        <div className={redLine} style={{ left: 377, top: 113, width: 1, height: 11 }} />
        <div className={redTag} style={{ left: 204, top: 110, width: 60 }}>hug</div>

        <div className={redLine} style={{ left: 64, top: 150, width: 1, height: 66 }} />
        <div className={redLine} style={{ left: 59, top: 150, width: 11, height: 1 }} />
        <div className={redLine} style={{ left: 59, top: 215, width: 11, height: 1 }} />
        <div className={redTag} style={{ left: 38, top: 174, width: 22 }}>44</div>

        <div
          className="absolute flex h-16.5 w-72 animate-breathe items-center justify-center gap-3 rounded-xl bg-(--sx-accent) text-[22px] leading-[30px] font-semibold text-(--sx-ink) shadow-[0_10px_30px_var(--sx-glow),inset_0_1px_0_rgb(255_255_255/0.35)]"
          style={{ left: 90, top: 150 }}
        >
          <Icon name="calendar" size={26} />
          Agendar reunião
        </div>

        <div className={cn(hatch, "rounded-l-xl")} style={{ left: 90, top: 150, width: 30, height: 66 }} />
        <div className={hatch} style={{ left: 120, top: 150, width: 228, height: 18 }} />
        <div className={redTag} style={{ left: 94, top: 174, width: 22 }}>20</div>
        <div className={cn(redTag, "py-0")} style={{ left: 223, top: 151, width: 22 }}>12</div>

        <div
          className="absolute h-px animate-march bg-[linear-gradient(90deg,rgb(244_244_245/0.55)_50%,transparent_50%)] bg-size-[8px_1px]"
          style={{ left: 74, top: 191, width: 320 }}
        />
        <div className="absolute font-mono text-[10px] text-(--sx-subtle)" style={{ left: 398, top: 184 }}>
          baseline
        </div>

        <div className="absolute rounded-xs border border-(--sx-accent)" style={{ left: 89, top: 149, width: 290, height: 68 }} />
        {HANDLES.map(([left, top]) => (
          <div
            key={`${left}-${top}`}
            className="absolute size-2 border-[1.5px] border-(--sx-accent) bg-white"
            style={{ left, top }}
          />
        ))}
        <div
          className="absolute rounded bg-(--sx-accent) py-0.5 text-center font-mono text-[11px] text-(--sx-ink)"
          style={{ left: 189, top: 230, width: 90 }}
        >
          192 × 44
        </div>

        <div className="absolute font-mono text-[11px] text-(--sx-subtle)" style={{ left: 16, bottom: 14 }}>
          auto layout · horizontal · gap 8
        </div>
      </div>
    </Fit>
  );
}

const STATES = [
  { label: "default", className: "" },
  {
    label: "hover · −2px",
    className: "-translate-y-0.5 bg-(--sx-hover) shadow-[0_8px_24px_var(--sx-glow),inset_0_1px_0_rgb(255_255_255/0.4)]",
  },
  { label: "pressed · 97%", className: "scale-[0.97] bg-(--sx-pressed) shadow-[inset_0_2px_4px_rgb(0_0_0/0.25)]" },
  {
    label: "focus · ring",
    className: "shadow-[0_0_0_2px_var(--sx-surface),0_0_0_4px_var(--sx-accent),0_0_18px_var(--sx-glow)]",
  },
  { label: "disabled", className: "border border-(--sx-border-2) bg-(--sx-chip) text-[#71717A] shadow-none" },
];

/** Os cinco estados de interação do botão. */
export function ShowcaseStates() {
  return (
    <div className="px-6 pb-6 in-data-[layout=fluid]:max-sm:px-4 in-data-[layout=fluid]:max-sm:pb-4">
      <p className="mb-3.5 text-[0.6875rem] font-semibold tracking-[0.08em] text-(--sx-subtle) uppercase">Estados</p>
      <ul className="grid grid-cols-5 gap-3 in-data-[layout=fluid]:max-md:grid-cols-3 in-data-[layout=fluid]:max-sm:grid-cols-2">
        {STATES.map((state) => (
          <li
            key={state.label}
            className="flex h-27 flex-col items-center justify-center gap-3 rounded-xl border border-(--sx-border) bg-(--sx-surface)"
          >
            <span
              className={cn(
                "inline-flex rounded-lg bg-(--sx-accent) px-4 py-2.5 text-[0.875rem] font-semibold text-(--sx-ink) shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]",
                state.className,
              )}
            >
              Agendar
            </span>
            <p className={cn(mono, "text-[11px] text-(--sx-muted)")}>{state.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const TOKENS = ["accent/400", "radius 8", "12 × 20", "Inter 600/15", "ease 200ms"];

/** Faixa final: o componente em código e os tokens usados. */
export function ShowcaseStrip() {
  return (
    <div className="flex flex-wrap items-center gap-4 px-6 pb-6 in-data-[layout=fluid]:max-sm:px-4 in-data-[layout=fluid]:max-sm:pb-4">
      <code className="flex min-h-14.5 max-w-full min-w-0 flex-[1_1_380px] items-center overflow-x-auto rounded-xl border border-(--sx-border) bg-[rgb(15_15_20/0.85)] px-4 font-mono text-[13px] whitespace-nowrap text-[#E4E4E7] in-data-[layout=fluid]:max-sm:flex-wrap in-data-[layout=fluid]:max-sm:px-4 in-data-[layout=fluid]:max-sm:py-3.5 in-data-[layout=fluid]:max-sm:text-[0.75rem] in-data-[layout=fluid]:max-sm:whitespace-normal">
        <span className="text-[#C4B5FD]">&lt;Button</span>&nbsp;<span className="text-[#93C5FD]">variant</span>=
        <span className="text-[#86EFAC]">"primary"</span>&nbsp;<span className="text-[#93C5FD]">icon</span>=
        {"{Calendar}"}&nbsp;<span className="text-[#C4B5FD]">/&gt;</span>
      </code>
      <ul className="flex flex-[1_1_320px] flex-wrap gap-2">
        {TOKENS.map((token) => (
          <li
            key={token}
            className="rounded-full border border-(--sx-border) bg-(--sx-surface-2) px-2.5 py-1 font-mono text-[11px] text-(--sx-muted)"
          >
            {token}
          </li>
        ))}
      </ul>
    </div>
  );
}
