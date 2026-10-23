import { aiPoints, aiTags } from "../../data/ai";
import { experiences } from "../../data/experience";
import { Section } from "../Section";
import { Reveal } from "../ui/Reveal";
import { AICard } from "./AICard";
import { desktopGraph, mobileGraph } from "./graphData";
import { Timeline } from "./Timeline";

const firstStart = experiences
  .filter((item) => item.company !== "Colégio Lemos de Castro")
  .map((item) => item.start)
  .sort()[0];

export function Experience() {
  return (
    <Section.Root id="experiencia">
      <Section.Header>
        <Section.Eyebrow>Experiência</Section.Eyebrow>
        <Section.Title>Do código ao produto.</Section.Title>
        <Section.Description>
          {`Desenvolvendo produtos digitais desde ${firstStart.slice(0, 4)}, passando por automação em Python, front-end e, hoje, UI, design system e IA aplicada ao produto.`}
        </Section.Description>
      </Section.Header>

      <Reveal>
        <AICard.Root>
          <AICard.Content>
            <AICard.Intro eyebrow="IA aplicada" title="Claude Code como ferramenta de trabalho">
              Desenvolvo com o Claude Code e uso a IA para dar velocidade ao time sem perder a organização:
              conhecimento centralizado, sprint acompanhado e documentação que não fica para depois.
            </AICard.Intro>
            <AICard.Points items={aiPoints} />
            <AICard.Tags items={aiTags} />
          </AICard.Content>
          <AICard.Graph desktop={desktopGraph} mobile={mobileGraph} />
        </AICard.Root>
      </Reveal>

      <Timeline.Root>
        {experiences.map((item) => (
          <Timeline.Item key={`${item.company}-${item.start}`} current={!item.end}>
            <Timeline.Period start={item.start} end={item.end} />
            <Timeline.Body>
              <Timeline.Title role={item.role} current={!item.end} />
              <Timeline.Company company={item.company} type={item.type} location={item.location} />
              <Timeline.Highlights items={item.highlights} />
              <Timeline.Skills items={item.skills} />
            </Timeline.Body>
          </Timeline.Item>
        ))}
      </Timeline.Root>
    </Section.Root>
  );
}
