import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { Chip, ChipList, TextLink } from "../../ui/Button";
import { Icon } from "../../ui/Icon";

interface ProjectRootProps {
  /** Inverte a ordem a partir do tablet: capa à direita e texto à esquerda. */
  reverse?: boolean;
  children: ReactNode;
}

export function ProjectRoot({ reverse = false, children }: ProjectRootProps) {
  return (
    <article
      className={cn(
        "group/project grid grid-cols-1 items-center gap-[clamp(32px,5vw,64px)] md:grid-cols-[1.05fr_1fr]",
        reverse && "md:[&>:first-child]:order-1",
      )}
    >
      {children}
    </article>
  );
}

export function ProjectInfo({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

interface ProjectHeaderProps {
  kind: string;
  year: number;
  title: string;
  summary: string;
}

export function ProjectHeader({ kind, year, title, summary }: ProjectHeaderProps) {
  return (
    <>
      <span className="text-[0.8125rem] font-semibold tracking-[0.04em] text-accent uppercase">
        {kind} · {year}
      </span>
      <h3 className="mt-2 text-[clamp(1.625rem,3vw,2rem)] font-bold">{title}</h3>
      <p className="mt-2 text-[1.0625rem] text-muted">{summary}</p>
    </>
  );
}

interface ProjectDetailsProps {
  challenge: string;
  solution: string;
}

export function ProjectDetails({ challenge, solution }: ProjectDetailsProps) {
  return (
    <dl className="mt-6 grid gap-4 border-y border-line py-5">
      <div>
        <dt className="mb-1 text-[0.8125rem] font-semibold text-ink">Proposta</dt>
        <dd className="text-[0.9375rem] text-muted">{challenge}</dd>
      </div>
      <div>
        <dt className="mb-1 text-[0.8125rem] font-semibold text-ink">O que construí</dt>
        <dd className="text-[0.9375rem] text-muted">{solution}</dd>
      </div>
    </dl>
  );
}

export function ProjectHighlights({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-2 text-[0.9375rem]">
      {items.map((highlight) => (
        <li key={highlight} className="flex items-start gap-2.5">
          <Icon name="check" size={16} className="mt-1 shrink-0 text-accent" />
          {highlight}
        </li>
      ))}
    </ul>
  );
}

export function ProjectStack({ items }: { items: string[] }) {
  return (
    <ChipList aria-label="Tecnologias" className="mt-6">
      {items.map((tech) => (
        <Chip key={tech}>{tech}</Chip>
      ))}
    </ChipList>
  );
}

interface ProjectLinksProps {
  demo?: string;
  code: string;
}

export function ProjectLinks({ demo, code }: ProjectLinksProps) {
  return (
    <div className="mt-7 flex flex-wrap gap-6">
      {demo && (
        <TextLink href={demo} target="_blank" rel="noreferrer">
          Ver online <Icon name="arrowUpRight" size={16} />
        </TextLink>
      )}
      <TextLink href={code} target="_blank" rel="noreferrer">
        Código <Icon name="arrowUpRight" size={16} />
      </TextLink>
    </div>
  );
}
