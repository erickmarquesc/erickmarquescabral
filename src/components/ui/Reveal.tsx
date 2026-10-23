import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Aparece suavemente quando entra na tela. Sem animação para quem prefere movimento reduzido. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Sem IntersectionObserver (navegadores antigos) o conteúdo já nasce visível.
  const [visible, setVisible] = useState(() => !("IntersectionObserver" in window));

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "translate-y-4 opacity-0 transition-[opacity,transform] duration-600 ease-brand",
        "data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
