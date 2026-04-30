import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { MUSCLE_GROUPS, type MuscleGroup } from "./data";

export type MuscleDonutProps = {
  blockName?: string;
  groups?: MuscleGroup[];
};

type Mode = "sets" | "tonnage";

export function MuscleDonut({ blockName = "BLOK 4 · HIPERTROFIJA", groups = MUSCLE_GROUPS }: MuscleDonutProps) {
  const [mode, setMode] = useState<Mode>("sets");
  const [hover, setHover] = useState<string | null>(null);

  const total = useMemo(
    () => groups.reduce((acc, g) => acc + (mode === "sets" ? g.sets : g.tonnage), 0),
    [groups, mode]
  );

  const SIZE = 280;
  const C = SIZE / 2;
  const R_OUT = 116;
  const R_IN = 70;
  const GAP = 0.012; // radians

  const arcs = useMemo(() => {
    let a = -Math.PI / 2;
    return groups.map((g) => {
      const v = mode === "sets" ? g.sets : g.tonnage;
      const slice = (v / total) * Math.PI * 2;
      const start = a + GAP / 2;
      const end = a + slice - GAP / 2;
      a += slice;
      return { g, start, end, value: v, pct: (v / total) * 100 };
    });
  }, [groups, mode, total]);

  const arcPath = (start: number, end: number, rIn: number, rOut: number, lift = 0) => {
    const mid = (start + end) / 2;
    const ox = Math.cos(mid) * lift;
    const oy = Math.sin(mid) * lift;
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = C + ox + Math.cos(start) * rOut;
    const y1 = C + oy + Math.sin(start) * rOut;
    const x2 = C + ox + Math.cos(end) * rOut;
    const y2 = C + oy + Math.sin(end) * rOut;
    const x3 = C + ox + Math.cos(end) * rIn;
    const y3 = C + oy + Math.sin(end) * rIn;
    const x4 = C + ox + Math.cos(start) * rIn;
    const y4 = C + oy + Math.sin(start) * rIn;
    return `M ${x1} ${y1} A ${rOut} ${rOut} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rIn} ${rIn} 0 ${large} 0 ${x4} ${y4} Z`;
  };

  const hovered = arcs.find((a) => a.g.key === hover) ?? null;

  return (
    <section className="glass p-5 md:p-6 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
        <div>
          <div className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">{blockName}</div>
          <h3 className="text-display font-bold text-lg tracking-tight">RASPODJELA MIŠIĆNIH SKUPINA</h3>
        </div>
        <div className="flex gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10">
          {(["sets", "tonnage"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
                mode === m ? "bg-white text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m === "sets" ? "% SERIJA" : "TONAŽA"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-center">
        <div className="relative mx-auto" style={{ width: SIZE, height: SIZE }}>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
            <defs>
              {arcs.map((a) => (
                <filter key={`f-${a.g.key}`} id={`g-${a.g.key}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              ))}
            </defs>
            {/* glow ring */}
            <circle cx={C} cy={C} r={R_OUT + 6} fill="none" stroke="rgba(255,255,255,0.04)" />
            {arcs.map((a) => {
              const isHover = hover === a.g.key;
              const dim = hover && !isHover;
              return (
                <g key={a.g.key}>
                  {isHover && (
                    <path
                      d={arcPath(a.start, a.end, R_IN - 2, R_OUT + 8, 4)}
                      fill={a.g.color}
                      opacity={0.35}
                      filter={`url(#g-${a.g.key})`}
                    />
                  )}
                  <path
                    d={arcPath(a.start, a.end, R_IN, R_OUT, isHover ? 4 : 0)}
                    fill={a.g.color}
                    opacity={dim ? 0.25 : isHover ? 1 : 0.92}
                    style={{ transition: "all 350ms cubic-bezier(0.22,1,0.36,1)" }}
                    onMouseEnter={() => setHover(a.g.key)}
                    onMouseLeave={() => setHover(null)}
                  />
                </g>
              );
            })}
          </svg>

          <div className="absolute inset-0 grid place-items-center pointer-events-none text-center">
            {hovered ? (
              <div>
                <div className="text-display font-extrabold text-3xl tabular" style={{ color: hovered.g.color, textShadow: `0 0 24px ${hovered.g.color}80` }}>
                  {hovered.pct.toFixed(1)}%
                </div>
                <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mt-1">{hovered.g.label}</div>
                <div className="text-xs text-foreground/70 mt-0.5 tabular">
                  {mode === "sets" ? `${hovered.value} serija` : `${hovered.value.toLocaleString("hr-HR")} kg`}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-display font-extrabold text-3xl tabular text-foreground">{groups.length}</div>
                <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mt-1">SKUPINE</div>
                <div className="text-xs text-foreground/70 mt-0.5 tabular">
                  {mode === "sets"
                    ? `${total} serija`
                    : `${total.toLocaleString("hr-HR")} kg`}
                </div>
              </div>
            )}
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[320px] overflow-y-auto scrollbar-thin pr-1">
          {arcs.map((a) => {
            const isHover = hover === a.g.key;
            const dim = hover && !isHover;
            return (
              <li
                key={a.g.key}
                onMouseEnter={() => setHover(a.g.key)}
                onMouseLeave={() => setHover(null)}
                className={cn(
                  "relative flex items-center justify-between gap-3 pl-3 pr-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] cursor-default transition-opacity",
                  dim && "opacity-40",
                  isHover && "bg-white/[0.06] border-white/[0.12]"
                )}
              >
                <span
                  className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full"
                  style={{ background: a.g.color, boxShadow: isHover ? `0 0 10px ${a.g.color}` : "none" }}
                />
                <span className="text-[0.7rem] tracking-wider font-semibold text-foreground/90 ml-1">{a.g.label}</span>
                <span className="text-[0.7rem] tabular text-muted-foreground">
                  {mode === "sets" ? `${a.value}` : `${(a.value / 1000).toFixed(1)}t`} · {a.pct.toFixed(1)}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
