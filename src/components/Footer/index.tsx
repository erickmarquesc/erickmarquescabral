import { profile } from "../../data/profile";
import { Icon } from "../ui/Icon";

const YEAR = new Date().getFullYear();

const link =
  "touch-target inline-flex items-center gap-1.5 transition-colors duration-200 ease-brand hover:text-ink";

export function Footer() {
  return (
    <footer className="border-t border-line pt-8 pb-10">
      <div className="container-page flex flex-col-reverse items-start justify-between gap-6 text-[0.875rem] text-subtle sm:flex-row sm:items-center">
        <p>
          © {YEAR} {profile.name}
        </p>
        <nav aria-label="Redes" className="flex gap-5">
          <a href={profile.links.github} target="_blank" rel="noreferrer" className={link}>
            GitHub
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={link}>
            LinkedIn
          </a>
          <a href="#inicio" className={link}>
            Voltar ao topo <Icon name="arrowUp" size={14} />
          </a>
        </nav>
      </div>
    </footer>
  );
}
