import { useEffect, useRef, useState } from "react";

/** Escala um bloco de largura fixa para caber no espaço disponível, sem passar de 100%. */
export function useFitScale<T extends HTMLElement>(designWidth: number) {
  const ref = useRef<T>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => setScale(Math.min(1, element.clientWidth / designWidth));
    update();

    if (!("ResizeObserver" in window)) return;
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [designWidth]);

  return { ref, scale };
}
