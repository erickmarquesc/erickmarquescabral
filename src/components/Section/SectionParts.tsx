import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Reveal } from "../ui/Reveal";

interface SectionRootProps extends HTMLAttributes<HTMLElement> {
  id: string;
}

/** Seção da página com respiro vertical e o container centralizado. */
export function SectionRoot({ id, className, children, ...props }: SectionRootProps) {
  return (
    <section id={id} className={cn("py-[clamp(56px,7vw,96px)]", className)} {...props}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <header className="mb-[clamp(40px,6vw,64px)] max-w-160">{children}</header>
    </Reveal>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3 inline-block text-[0.8125rem] font-semibold tracking-[0.08em] text-accent uppercase">
      {children}
    </span>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-[clamp(1.875rem,4vw,2.75rem)] font-bold">{children}</h2>;
}

export function SectionDescription({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[1.0625rem] text-muted">{children}</p>;
}
