import { type RefObject, useEffect } from "react";

/** Marca o elemento com data-offscreen enquanto ele estiver fora da tela, para pausar as animações via CSS. */
export function usePauseOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.dataset.offscreen = String(!entry.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
}
