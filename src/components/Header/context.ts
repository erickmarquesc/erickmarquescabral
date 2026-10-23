import { createContext, useContext } from "react";
import type { NavItem } from "../../data/navigation";

interface HeaderContextValue {
  items: NavItem[];
  open: boolean;
  active: string | null;
  toggle: () => void;
  close: () => void;
}

export const HeaderContext = createContext<HeaderContextValue | null>(null);

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) throw new Error("As partes do Header precisam estar dentro de <Header.Root>.");
  return context;
}
