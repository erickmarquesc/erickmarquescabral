import { featuredProjects, otherProjects } from "../../data/projects";
import { profile } from "../../data/profile";
import { Section } from "../Section";
import { TextLink } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Project } from "./Project";

const otherLink =
  "touch-target inline-flex items-center gap-0.5 text-[0.875rem] font-semibold text-muted transition-colors duration-200 ease-brand hover:text-accent";

export function Projects() {
  return (
    <Section.Root id="projetos">
      <Section.Header>
        <Section.Eyebrow>Projetos</Section.Eyebrow>
        <Section.Title>Projetos de estudo.</Section.Title>
        <Section.Description>
          Aplicações que desenvolvi para aprofundar React, Next.js e TypeScript. Cada uma exercita decisões técnicas
          que levo para o trabalho no dia a dia.
        </Section.Description>
      </Section.Header>

      <div className="flex flex-col gap-[clamp(64px,9vw,112px)]">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.title}>
            <Project.Root reverse={index % 2 === 1}>
              <Project.Cover variant={project.cover} />
              <Project.Info>
                <Project.Header
                  kind={project.kind}
                  year={project.year}
                  title={project.title}
                  summary={project.summary}
                />
                <Project.Details challenge={project.challenge} solution={project.solution} />
                <Project.Highlights items={project.highlights} />
                <Project.Stack items={project.stack} />
                <Project.Links demo={project.links.demo} code={project.links.code} />
              </Project.Info>
            </Project.Root>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-[clamp(64px,8vw,96px)] flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <h3 className="text-[1.375rem] font-bold">Outros projetos</h3>
          <TextLink href={profile.links.github} target="_blank" rel="noreferrer">
            Todos no GitHub <Icon name="arrowUpRight" size={16} />
          </TextLink>
        </div>

        <ul>
          {otherProjects.map((project) => (
            <li
              key={project.title}
              className="grid grid-cols-1 gap-2 border-b border-line py-5 md:grid-cols-[1fr_200px_auto] md:items-center md:gap-6"
            >
              <div>
                <h4 className="font-sans text-[1rem] font-semibold tracking-normal">{project.title}</h4>
                <p className="text-[0.9375rem] text-muted">{project.description}</p>
              </div>
              <span className="text-[0.8125rem] text-subtle">{project.stack.join(" · ")}</span>
              <div className="flex flex-wrap justify-start gap-4 md:min-w-[150px] md:justify-end">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title}: ver online`}
                    className={otherLink}
                  >
                    Online <Icon name="arrowUpRight" size={14} />
                  </a>
                )}
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title}: código`}
                  className={otherLink}
                >
                  Código <Icon name="arrowUpRight" size={14} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section.Root>
  );
}
