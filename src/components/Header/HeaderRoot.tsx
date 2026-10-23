import { type ReactNode, useEffect, useState } from "react";
import type { NavItem } from "../../data/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrolled } from "../../hooks/useScrolled";
import { HeaderContext } from "./context";

interface HeaderRootProps {
  items: NavItem[];
  children: ReactNode;
}

export function HeaderRoot({ items, children }: HeaderRootProps) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(items.map((item) => item.id));

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const value = {
    items,
    open,
    active,
    toggle: () => setOpen((current) => !current),
    close: () => setOpen(false),
  };

  return (
    <HeaderContext.Provider value={value}>
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-100 -translate-y-[200%] rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-contrast focus-visible:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <header
        data-scrolled={scrolled || open}
        className="sticky top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-200 ease-brand data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg/85 data-[scrolled=true]:backdrop-blur-md data-[scrolled=true]:backdrop-saturate-180"
      >
        {children}
      </header>
    </HeaderContext.Provider>
  );
}
