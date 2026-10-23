import type { ReactNode } from "react";
import { formatDuration, formatMonth } from "../../../utils/date";
import { Chip, ChipList } from "../../ui/Button";
import { Reveal } from "../../ui/Reveal";

export function TimelineRoot({ children }: { children: ReactNode }) {
  return <ol className="relative">{children}</ol>;
}

interface TimelineItemProps {
  /** Cargo atual: ganha o selo "Atual" e marcadores na cor de destaque. */
  current?: boolean;
  children: ReactNode;
}

export function TimelineItem({ current = false, children }: TimelineItemProps) {
  return (
    <li data-current={current} className="group/item relative">
      <Reveal>
        <div className="grid grid-cols-1 gap-3 border-t border-line py-7 group-last/item:border-b sm:grid-cols-[200px_1fr] sm:gap-12 sm:py-8">
          {children}
        </div>
      </Reveal>
    </li>
  );
}

interface TimelinePeriodProps {
  /** Formato "AAAA-MM". */
  start: string;
  /** Formato "AAAA-MM". Ausente quando é o cargo atual. */
  end?: string;
}

export function TimelinePeriod({ start, end }: TimelinePeriodProps) {
  return (
    <p className="text-[0.875rem] font-medium text-muted">
      <time dateTime={start}>{formatMonth(start)}</time>
      {" — "}
      {end ? <time dateTime={end}>{formatMonth(end)}</time> : "atual"}
      <span className="ml-2 inline text-[0.8125rem] font-normal text-subtle before:content-['·_'] sm:mt-0.5 sm:ml-0 sm:block sm:before:content-none">
        {formatDuration(start, end)}
      </span>
    </p>
  );
}

export function TimelineBody({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

interface TimelineTitleProps {
  role: string;
  current?: boolean;
}

export function TimelineTitle({ role, current = false }: TimelineTitleProps) {
  return (
    <header className="flex flex-wrap items-center gap-3">
      <h3 className="text-[1.375rem] font-bold">{role}</h3>
      {current && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-[0.75rem] font-semibold text-accent">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
          Atual
        </span>
      )}
    </header>
  );
}

interface TimelineCompanyProps {
  company: string;
  type: string;
  location: string;
}

export function TimelineCompany({ company, type, location }: TimelineCompanyProps) {
  return (
    <p className="mt-1 text-[0.9375rem] text-muted">
      <strong className="font-semibold text-ink">{company}</strong> · {type} · {location}
    </p>
  );
}

export function TimelineHighlights({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 mb-6 grid max-w-170 gap-2 text-[0.9375rem] text-muted">
      {items.map((highlight) => (
        <li
          key={highlight}
          className="relative pl-5 before:absolute before:top-[0.7em] before:left-0.5 before:size-1.5 before:rounded-full before:bg-line-strong group-data-[current=true]/item:before:bg-accent"
        >
          {highlight}
        </li>
      ))}
    </ul>
  );
}

export function TimelineSkills({ items }: { items: string[] }) {
  return (
    <ChipList aria-label="Competências">
      {items.map((skill) => (
        <Chip key={skill}>{skill}</Chip>
      ))}
    </ChipList>
  );
}
