import { ScaleToFit } from "../../ui/ScaleToFit";
import { cn } from "../../../lib/cn";
import type { GraphData, NoteNode } from "../graphData";

const PLANE_TILT = "rotateX(calc(var(--ai-tilt-y, 0) * -10.5deg)) rotateY(calc(var(--ai-tilt-x, 0) * 14deg))";

const notePosition: Record<NoteNode["position"], string> = {
  below: "mt-3 -ml-[45px] w-[90px] text-center",
  above: "-mt-[26px] -ml-[45px] w-[90px] text-center",
  left: "-mt-[7px] -ml-20 w-[70px] text-right",
  right: "-mt-[7px] ml-3 w-[60px] text-left",
};

/** Grafo no estilo do Obsidian: três nós em foco e notas conectadas ao redor, em perspectiva. */
export function Graph({ data }: { data: GraphData }) {
  const { width, height, origin } = data;

  return (
    <ScaleToFit width={width}>
      <div className="relative perspective-[1200px]" style={{ width, height, perspectiveOrigin: origin }}>
        <div
          className="absolute inset-0 animate-drift transform-3d group-data-[hover=true]/card:animate-none"
          style={{ transformOrigin: origin }}
        >
          <div
            className="absolute inset-0 transition-transform duration-400 ease-brand transform-3d"
            style={{ transformOrigin: origin, transform: PLANE_TILT }}
          >
            <div className="absolute inset-0 [transform:translateZ(-160px)]">
              {data.far.map((dot) => (
                <span
                  key={`${dot.x}-${dot.y}`}
                  className={cn("absolute rounded-full bg-[#2E2E37]", dot.twinkle && "animate-twinkle bg-[#3A3A44]")}
                  style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
                />
              ))}
            </div>

            <svg className="absolute inset-0" width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
              <g stroke="#2E2E37" strokeWidth="1">
                {data.links.map(([x1, y1, x2, y2]) => (
                  <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
                ))}
              </g>
              {data.focusLinks.map(([x1, y1, x2, y2]) => (
                <g key={`${x1}-${y1}-${x2}-${y2}`} strokeWidth="2">
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ai-line)" />
                  <line
                    className="animate-dash-flow [stroke-dasharray:6_8]"
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--ai-accent)"
                  />
                </g>
              ))}
            </svg>

            <span
              className="absolute top-0 left-0 size-2 animate-packet rounded-full bg-white shadow-[0_0_12px_var(--ai-accent),0_0_0_3px_var(--ai-soft)] [offset-rotate:0deg]"
              style={{ offsetPath: `path("${data.packetPath}")` }}
            />

            {data.dots.map((dot) => (
              <span
                key={`${dot.x}-${dot.y}`}
                className="absolute -mt-1 -ml-1 size-2 rounded-full bg-[#3F3F48]"
                style={{ left: dot.x, top: dot.y }}
              />
            ))}

            {data.notes.map((note) => (
              <span key={note.label}>
                <span
                  className="absolute -mt-[5px] -ml-[5px] size-2.5 rounded-full bg-[#52525B]"
                  style={{ left: note.x, top: note.y }}
                />
                <span
                  className={cn("absolute text-[11px] leading-[14px] text-[#8B8B95]", notePosition[note.position])}
                  style={{ left: note.x, top: note.y }}
                >
                  {note.label}
                </span>
              </span>
            ))}

            {data.focus.map((node) => (
              <span key={node.name}>
                <span
                  className={cn(
                    "absolute grid animate-halo place-items-center rounded-full border-2 border-(--ai-accent) after:size-2 after:rounded-full after:content-['']",
                    node.filled
                      ? "-mt-3.5 -ml-3.5 size-7 bg-(--ai-accent) after:bg-[#0B0B0F]"
                      : "-mt-[11px] -ml-[11px] size-[22px] bg-[#0B0B0F] after:bg-(--ai-accent)",
                  )}
                  style={{ left: node.x, top: node.y }}
                />
                <span
                  className={cn(
                    "absolute",
                    node.label === "left" ? "-mt-5 -ml-[174px] w-[150px] text-right" : "mt-5 -ml-[70px] w-[140px] text-center",
                  )}
                  style={{ left: node.x, top: node.y }}
                >
                  <strong className="block font-display text-[1rem] font-bold">{node.name}</strong>
                  <small className="mt-0.5 block font-mono text-[11px] text-[#A1A1AA]">{node.caption}</small>
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScaleToFit>
  );
}
