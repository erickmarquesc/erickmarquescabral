import { profile } from "../../data/profile";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

const outline =
  "w-full border-[color-mix(in_srgb,var(--bg)_30%,transparent)] bg-transparent text-bg hover:border-bg sm:w-auto";

export function Contact() {
  return (
    <section id="contato" className="py-[clamp(56px,7vw,96px)]">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-ink p-[clamp(40px,7vw,80px)] text-bg before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_100%_0%,color-mix(in_srgb,var(--accent)_45%,transparent),transparent_55%)] *:relative">
            <h2 className="max-w-160 text-[clamp(2rem,5vw,3.25rem)] font-bold">Tem um problema para resolver?</h2>
            <p className="mt-4 max-w-130 text-[1.0625rem] opacity-75">
              Me conte o que você precisa construir. Vamos entender o cenário juntos e encontrar o caminho mais
              direto até a solução.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                href={profile.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-bg text-ink hover:bg-surface-2 sm:w-auto"
              >
                <Icon name="message" />
                Conversar no WhatsApp
              </Button>
              <Button href={profile.links.linkedin} target="_blank" rel="noreferrer" variant="secondary" className={outline}>
                <Icon name="linkedin" />
                LinkedIn
              </Button>
              <Button href={profile.links.github} target="_blank" rel="noreferrer" variant="secondary" className={outline}>
                <Icon name="github" />
                GitHub
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
