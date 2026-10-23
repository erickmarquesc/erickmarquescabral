import type { ReactNode } from "react";
import { Reveal } from "../ui/Reveal";

export function HeroRoot({ children }: { children: ReactNode }) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-[clamp(40px,8vw,96px)] pb-[clamp(24px,4vw,48px)] before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(var(--border-strong)_1px,transparent_1px)] before:bg-size-[24px_24px] before:opacity-60 before:[mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,#000_20%,transparent_75%)]"
    >
      <div className="container-page xl:grid xl:grid-cols-[minmax(0,470px)_minmax(0,1fr)] xl:items-center xl:gap-14">
        {children}
      </div>
    </section>
  );
}

export function HeroContent({ children }: { children: ReactNode }) {
  return <div className="max-w-205">{children}</div>;
}

export function HeroBadge({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-3 text-[0.875rem] font-medium text-muted">
        <span aria-hidden="true" className="size-2 animate-pulse-ring rounded-full bg-success" />
        {children}
      </p>
    </Reveal>
  );
}

export function HeroTitle({ children }: { children: ReactNode }) {
  return (
    <Reveal delay={80}>
      <h1 className="text-[clamp(2.375rem,6vw,4rem)] font-bold tracking-[-0.035em] xl:text-[3.25rem]">{children}</h1>
    </Reveal>
  );
}

export function HeroLead({ children }: { children: ReactNode }) {
  return (
    <Reveal delay={160}>
      <p className="mt-6 max-w-140 text-[clamp(1.0625rem,1.6vw,1.1875rem)] text-muted">{children}</p>
    </Reveal>
  );
}

export function HeroActions({ children }: { children: ReactNode }) {
  return (
    <Reveal delay={240}>
      <div className="mt-9 flex flex-wrap gap-3 *:w-full sm:*:w-auto">{children}</div>
    </Reveal>
  );
}

export function HeroStack({ items }: { items: string[] }) {
  return (
    <Reveal delay={320}>
      <ul
        aria-label="Principais tecnologias"
        className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem] font-medium text-subtle"
      >
        {items.map((item) => (
          <li
            key={item}
            className="after:ml-5 after:text-line-strong after:content-['·'] last:after:content-none"
          >
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function HeroVisual({ children }: { children: ReactNode }) {
  return (
    <div className="mt-[clamp(48px,7vw,80px)] min-w-0 xl:mt-0">
      <Reveal delay={200}>{children}</Reveal>
    </div>
  );
}
