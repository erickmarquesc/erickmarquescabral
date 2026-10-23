import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { useHeader } from "./context";

export function HeaderContent({ children }: { children: ReactNode }) {
  return (
    <div className="container-page flex h-(--header-height) items-center justify-between gap-6">{children}</div>
  );
}

export function HeaderBrand() {
  const { close } = useHeader();

  return (
    <a
      href="#inicio"
      onClick={close}
      className="inline-flex min-h-11 items-center gap-2.5 font-display text-[1.0625rem] font-bold tracking-[-0.01em]"
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-lg bg-ink text-[0.8125rem] tracking-normal text-bg"
      >
        EM
      </span>
      Erick Marques
    </a>
  );
}

export function HeaderNav() {
  const { items, active } = useHeader();

  return (
    <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
      <ul className="flex gap-7">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className="relative text-[0.9375rem] font-medium text-muted transition-colors duration-200 ease-brand after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:scale-x-0 after:rounded-xs after:bg-accent after:transition-transform after:duration-250 after:ease-brand hover:text-ink aria-[current=true]:text-ink aria-[current=true]:after:scale-x-100"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <Button href="#contato">Fale comigo</Button>
    </nav>
  );
}

export function HeaderMenuButton() {
  const { open, toggle } = useHeader();

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls="menu-mobile"
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      onClick={toggle}
      className="-mr-2.5 grid size-11 place-items-center rounded-[10px] md:hidden"
    >
      <Icon name={open ? "close" : "menu"} size={22} />
    </button>
  );
}

export function HeaderMobileMenu() {
  const { items, open, close } = useHeader();

  return (
    <nav
      id="menu-mobile"
      aria-label="Principal"
      data-open={open}
      hidden={!open}
      className="hidden border-t border-line bg-bg px-(--gutter) pt-2 pb-6 data-[open=true]:block md:data-[open=true]:hidden"
    >
      <ul className="mb-4 flex flex-col">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={close}
              className="block border-b border-line py-3.5 text-[1.125rem] font-medium"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <Button href="#contato" onClick={close} className="w-full">
        Fale comigo
      </Button>
    </nav>
  );
}
