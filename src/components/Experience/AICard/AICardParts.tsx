import type { CSSProperties, ReactNode } from "react";
import type { AIPoint, AITag } from "../../../data/ai";
import type { GraphData } from "../graphData";
import { Graph } from "./Graph";

export function AICardContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

interface AICardIntroProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export function AICardIntro({ eyebrow, title, children }: AICardIntroProps) {
  return (
    <>
      <span className="text-[0.8125rem] font-semibold tracking-[0.08em] text-(--ai-accent) uppercase">{eyebrow}</span>
      <h3 className="mt-2.5 text-[clamp(1.5rem,2.6vw,1.875rem)] font-bold">{title}</h3>
      <p className="mt-3.5 text-[clamp(0.9375rem,1.4vw,1.0625rem)] text-[#A1A1AA]">{children}</p>
    </>
  );
}

export function AICardPoints({ items }: { items: AIPoint[] }) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:gap-6">
      {items.map((point) => (
        <li key={point.title} className="border-t-2 border-[#27272F] pt-4">
          <strong className="block text-[0.9375rem] font-semibold">{point.title}</strong>
          <p className="mt-1.5 text-[0.875rem] text-[#A1A1AA]">{point.description}</p>
        </li>
      ))}
    </ul>
  );
}

export function AICardTags({ items }: { items: AITag[] }) {
  return (
    <ul aria-label="Ferramentas" className="mt-8 flex flex-wrap gap-2.5">
      {items.map((tag, index) => (
        <li
          key={tag.label}
          style={{ "--tag": tag.color, "--delay": `${index * 0.35}s`, color: tag.text } as CSSProperties}
          className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[rgb(var(--tag)/0.4)] bg-[rgb(var(--tag)/0.1)] py-1.5 pr-3.5 pl-3 text-[0.8125rem] font-semibold shadow-[0_0_18px_rgb(var(--tag)/0.12)] before:size-[7px] before:animate-dot-pulse before:rounded-full before:bg-[rgb(var(--tag))] before:text-[rgb(var(--tag))] before:content-[''] after:absolute after:inset-y-0 after:-left-[60%] after:w-[45%] after:-skew-x-20 after:animate-shine after:bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.22),transparent)] after:content-[''] after:[animation-delay:var(--delay)]"
        >
          {tag.label}
        </li>
      ))}
    </ul>
  );
}

interface AICardGraphProps {
  /** Grafo usado a partir do tablet. */
  desktop: GraphData;
  /** Grafo usado no celular. */
  mobile: GraphData;
}

export function AICardGraph({ desktop, mobile }: AICardGraphProps) {
  return (
    <div aria-hidden="true" className="-mx-2 flex items-center self-stretch md:-my-14 md:-mr-14 md:ml-0">
      <div className="hidden w-full md:block">
        <Graph data={desktop} />
      </div>
      <div className="mx-auto block w-full max-w-[390px] md:hidden">
        <Graph data={mobile} />
      </div>
    </div>
  );
}
