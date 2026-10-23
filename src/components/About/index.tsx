import type { ReactNode } from "react";
import { skillGroups } from "../../data/profile";
import { Section } from "../Section";
import { Chip, ChipList } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

function Subtitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 font-sans text-[0.8125rem] font-semibold tracking-[0.08em] text-subtle uppercase">
      {children}
    </h3>
  );
}

export function About() {
  return (
    <Section.Root id="sobre">
      <Section.Header>
        <Section.Eyebrow>Sobre</Section.Eyebrow>
        <Section.Title>Design e código, no mesmo profissional.</Section.Title>
      </Section.Header>

      <div className="grid grid-cols-1 gap-[clamp(40px,6vw,80px)] md:grid-cols-2">
        <Reveal>
          <div className="space-y-4 text-[1.0625rem] text-muted">
            <p>
              Sou desenvolvedor front-end e UI designer. Gosto de pegar um problema mal definido, entender quem vai
              usar a solução e transformar isso em uma interface clara que funciona de verdade em produção.
            </p>
            <p>
              No dia a dia, desenho no Figma e desenvolvo com React, Next.js e TypeScript. Essa combinação reduz
              idas e vindas entre design e desenvolvimento e encurta o caminho até a entrega.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid gap-7">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <Subtitle>{group.title}</Subtitle>
                <ChipList>
                  {group.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </ChipList>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section.Root>
  );
}
