import { type CSSProperties, type MouseEvent, type ReactNode, useRef } from "react";
import { usePauseOffscreen } from "../../../hooks/usePauseOffscreen";

const CAN_TILT = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const TILT_VARS = ["--ai-px", "--ai-py", "--ai-tilt-x", "--ai-tilt-y"];

/* Card sempre escuro, nos dois temas, como o painel da abertura. */
const CARD_STYLE = {
  "--ai-accent": "#A78BFA",
  "--ai-soft": "rgb(167 139 250 / 0.16)",
  "--ai-glow": "rgb(167 139 250 / 0.35)",
  "--ai-glow-strong": "rgb(167 139 250 / 0.6)",
  "--ai-line": "rgb(167 139 250 / 0.35)",
  "--ai-px": "0.25",
  "--ai-py": "-0.05",
  backgroundImage:
    "radial-gradient(circle at calc((var(--ai-px) + 0.5) * 100%) calc((var(--ai-py) + 0.5) * 100%), rgb(167 139 250 / 0.11), transparent 35%), radial-gradient(#1A1A21 1px, transparent 1px)",
  backgroundSize: "100% 100%, 22px 22px",
} as CSSProperties;

/** Card com luz e inclinação 3D que seguem o mouse (só em aparelhos com mouse). */
export function AICardRoot({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  usePauseOffscreen(cardRef);

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || !window.matchMedia(CAN_TILT).matches) return;

    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width - 0.5).toFixed(3);
      const y = ((clientY - rect.top) / rect.height - 0.5).toFixed(3);
      card.dataset.hover = "true";
      card.style.setProperty("--ai-px", x);
      card.style.setProperty("--ai-py", y);
      card.style.setProperty("--ai-tilt-x", x);
      card.style.setProperty("--ai-tilt-y", y);
    });
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    cancelAnimationFrame(frame.current);
    delete card.dataset.hover;
    card.style.setProperty("--ai-px", "0.25");
    card.style.setProperty("--ai-py", "-0.05");
    TILT_VARS.slice(2).forEach((name) => card.style.removeProperty(name));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={CARD_STYLE}
      className="group/card relative mb-[clamp(40px,6vw,64px)] grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border border-[#27272F] bg-[#0B0B0F] px-6 pt-8 pb-2 text-[#F4F4F5] md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-6 md:p-14"
    >
      {children}
    </div>
  );
}
