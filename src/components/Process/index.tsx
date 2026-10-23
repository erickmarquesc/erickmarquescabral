import { processSteps } from "../../data/profile";
import { Section } from "../Section";
import { Reveal } from "../ui/Reveal";

export function Process() {
  return (
    <Section.Root id="processo" className="border-y border-line bg-surface">
      <Section.Header>
        <Section.Eyebrow>Processo</Section.Eyebrow>
        <Section.Title>Do problema ao produto, sem surpresas.</Section.Title>
        <Section.Description>
          Um fluxo simples, com entregas claras em cada etapa, para reduzir retrabalho e manter você por dentro
          do andamento.
        </Section.Description>
      </Section.Header>

      <ol className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-8 md:grid-cols-4">
        {processSteps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 80}>
              <div className="relative border-t-2 border-line pt-6 pb-8 before:absolute before:-top-0.5 before:left-0 before:h-0.5 before:w-10 before:bg-accent sm:pt-5 sm:pb-0">
                <span className="font-mono text-[0.8125rem] text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[1.25rem] font-bold">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{step.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section.Root>
  );
}
