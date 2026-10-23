import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Process } from "./components/Process";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Showcase } from "./components/Showcase";
import { Button } from "./components/ui/Button";
import { Icon } from "./components/ui/Icon";
import { ScaleToFit } from "./components/ui/ScaleToFit";
import { navItems } from "./data/navigation";
import { profile } from "./data/profile";
import { useMediaQuery } from "./hooks/useMediaQuery";

/* A partir do tablet o painel aparece inteiro e reduzido; no celular ele empilha para ficar legível. */
const SCALED_PANEL = "(min-width: 601px)";
const SHOWCASE_WIDTH = 960;

function ButtonShowcase({ layout }: { layout: "fixed" | "fluid" }) {
  return (
    <Showcase.Root
      layout={layout}
      caption="Estudo de anatomia de um botão: as quatro camadas do componente, o resultado com medidas de espaçamento e os estados de interação."
    >
      <Showcase.TopBar title="Button / Primary" meta="Anatomia · 4 camadas → componente" />
      <Showcase.Body>
        <Showcase.Layers />
        <Showcase.Inspector />
      </Showcase.Body>
      <Showcase.States />
      <Showcase.Strip />
    </Showcase.Root>
  );
}

export default function App() {
  const scaled = useMediaQuery(SCALED_PANEL);

  return (
    <>
      <Header.Root items={navItems}>
        <Header.Content>
          <Header.Brand />
          <Header.Nav />
          <Header.MenuButton />
        </Header.Content>
        <Header.MobileMenu />
      </Header.Root>

      <main id="conteudo">
        <Hero.Root>
          <Hero.Content>
            <Hero.Badge>Disponível para novos projetos</Hero.Badge>
            <Hero.Title>Interfaces que resolvem problemas, do Figma ao deploy.</Hero.Title>
            <Hero.Lead>
              Sou {profile.name}, desenvolvedor front-end e UI designer. Transformo requisitos em produtos web
              rápidos, acessíveis e fáceis de usar, desenhando a interface e escrevendo o código que a coloca no ar.
            </Hero.Lead>
            <Hero.Actions>
              <Button href={profile.links.whatsapp} target="_blank" rel="noreferrer">
                <Icon name="message" />
                Conversar no WhatsApp
              </Button>
              <Button href="#servicos" variant="secondary">
                Como posso ajudar
              </Button>
            </Hero.Actions>
            <Hero.Stack items={["React", "TypeScript", "Next.js", "Figma"]} />
          </Hero.Content>

          <Hero.Visual>
            {scaled ? (
              <ScaleToFit width={SHOWCASE_WIDTH}>
                <ButtonShowcase layout="fixed" />
              </ScaleToFit>
            ) : (
              <ButtonShowcase layout="fluid" />
            )}
          </Hero.Visual>
        </Hero.Root>

        <Experience />
        <Services />
        <Process />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
