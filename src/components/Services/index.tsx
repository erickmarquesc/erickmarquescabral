import { services } from "../../data/profile";
import { Section } from "../Section";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

export function Services() {
  return (
    <Section.Root id="servicos">
      <Section.Header>
        <Section.Eyebrow>Serviços</Section.Eyebrow>
        <Section.Title>Como posso ajudar o seu produto.</Section.Title>
        <Section.Description>
          Trabalho nas duas pontas: desenho a interface e escrevo o código. Assim as decisões de design já
          nascem pensando em como serão implementadas.
        </Section.Description>
      </Section.Header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 80}>
            <div className="h-full rounded-[20px] border border-line bg-surface p-7 transition-[border-color,transform] duration-200 ease-brand hover:-translate-y-0.5 hover:border-line-strong">
              <span className="mb-6 grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon name={service.icon} size={22} />
              </span>
              <h3 className="text-[1.25rem] font-bold">{service.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{service.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section.Root>
  );
}
