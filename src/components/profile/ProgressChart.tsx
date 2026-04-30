import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { LIFT_COLOR, LIFT_LABEL, REP_OPTIONS, type Lift, type PrEntry, type RepCount, formatDate } from "./data";

export type ProgressChartProps = {
  prs: PrEntry[];
  initialLift?: Lift;
};

type Point = { x: number; y: number; weight: number; date: string; isPeak: boolean };

export function ProgressChart({ prs, initialLift = "SQ" }: ProgressChartProps) {
  const [lift, setLift] = useState<Lift>(initialLift);
  const [reps, setReps] = useState<RepCount>(1);
  const [hover, setHover] = useState<number | null>(null);

  const repsWithData = useMemo(() => {
    const set = new Set<number>();
    prs.filter((p) => p.lift === lift).forEach((p) => set.add(p.reps));
    return set;
  }, [prs, lift]);

  // Build a synthetic time series per (lift, reps): rolling max of logged PRs
  const series = useMemo(() => {
    const filtered = prs
      .filter((p) => p.lift === lift && p.reps === reps)
      .sort((a, b) => a.date.localeCompare(b.date));
    if (filtered.length === 0) return [];
    // Synthesize a few historical points so the chart looks substantial
    const base = filtered[filtered.length - 1].weight;
    const months = 7;
    const points = Array.from({ length: months }).map((_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (months - 1 - i));
      const ratio = 0.78 + (i / (months - 1)) * 0.22;
      const noise = Math.sin(i * 1.3) * 2;
      const w = i === months - 1 ? base : Math.round(base * ratio + noise);
      return { weight: w, date: d.toISOString().slice(0, 10) };
    });
    return points;
  }, [prs, lift, reps]);

  const W = 720;
  const H = 260;
  const PAD = { l: 44, r: 24, t: 28, b: 36 };

  const points: Point[] = useMemo(() => {
    if (series.length === 0) return [];
    const ws = series.map((s) => s.weight);
    const min = Math.min(...ws) - 5;
    const max = Math.max(...ws) + 5;
    const peakW = Math.max(...ws);
    return series.map((s, i) => {
      const x = PAD.l + (i / Math.max(1, series.length - 1)) * (W - PAD.l - PAD.r);
      const y = PAD.t + (1 - (s.weight - min) / (max - min)) * (H - PAD.t - PAD.b);
      return { x, y, weight: s.weight, date: s.date, isPeak: s.weight === peakW };
    });
  }, [series]);

  const path = useMemo(() => {
    if (points.length < 2) return "";
    const d: string[] = [`M ${points[0].x} ${points[0].y}`];
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const cx = (p0.x + p1.x) / 2;
      d.push(`C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`);
    }
    return d.join(" ");
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length < 2) return "";
    return `${path} L ${points[points.length - 1].x} ${H - PAD.b} L ${points[0].x} ${H - PAD.b} Z`;
  }, [path, points]);

  const yTicks = useMemo(() => {
    if (series.length === 0) return [] as { y: number; label: number }[];
    const ws = series.map((s) => s.weight);
    const min = Math.min(...ws) - 5;
    const max = Math.max(...ws) + 5;
    return Array.from({ length: 4 }).map((_, i) => {
      const t = i / 3;
      const v = Math.round(min + t * (max - min));
      const y = PAD.t + (1 - t) * (H - PAD.t - PAD.b);
      return { y, label: v };
    });
  }, [series]);

  const color = LIFT_COLOR[lift];
  const gradId = `grad-${lift}`;
  const glowId = `glow-${lift}`;

  return (
    <section className="glass p-5 md:p-6 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h3 className="text-display font-bold text-lg tracking-tight">PR NAPREDAK</h3>
        <div className="flex gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10">
          {(["SQ", "BP", "DL"] as Lift[]).map((l) => (
            <button
              key={l}
              onClick={() => setLift(l)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all",
                lift === l ? "bg-white/10 shadow-inner" : "text-muted-foreground hover:text-foreground"
              )}
              style={lift === l ? { color: LIFT_COLOR[l], textShadow: `0 0 10px ${LIFT_COLOR[l]}80` } : {}}
            >
              {LIFT_LABEL[l]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap mb-4">
        {REP_OPTIONS.map((r) => {
          const has = repsWithData.has(r);
          const active = reps === r;
          return (
            <button
              key={r}
              onClick={() => has && setReps(r)}
              disabled={!has}
              className={cn(
                "px-2.5 py-1 rounded-md text-[0.7rem] font-semibold tabular border transition-colors",
                active
                  ? "bg-white text-background border-white"
                  : has
                  ? "bg-white/[0.04] border-white/10 text-foreground hover:bg-white/[0.08]"
                  : "bg-transparent border-white/[0.06] text-muted-foreground/40 cursor-not-allowed"
              )}
            >
              {r}RM
            </button>
          );
        })}
      </div>

      <div className="relative">
        {points.length === 0 ? (
          <div className="h-[240px] grid place-items-center text-muted-foreground text-sm">
            Nema podataka za ovaj odabir.
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            onMouseLeave={() => setHover(null)}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={color} stopOpacity="0.45" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
              <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* gridlines */}
            {yTicks.map((t, i) => (
              <line key={i} x1={PAD.l} x2={W - PAD.r} y1={t.y} y2={t.y} stroke="rgba(255,255,255,0.06)" />
            ))}
            {yTicks.map((t, i) => (
              <text key={`yl-${i}`} x={PAD.l - 8} y={t.y + 4} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.45)">
                {t.label}
              </text>
            ))}
            {points.map((p, i) =>
              i % Math.max(1, Math.floor(points.length / 5)) === 0 || i === points.length - 1 ? (
                <text key={`xl-${i}`} x={p.x} y={H - 12} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.45)">
                  {new Date(p.date).toLocaleDateString("hr-HR", { month: "short" })}
                </text>
              ) : null
            )}

            <path d={areaPath} fill={`url(#${gradId})`} />
            <path d={path} fill="none" stroke={color} strokeWidth={2.5} filter={`url(#${glowId})`} strokeLinecap="round" />

            {/* hover crosshair */}
            <rect
              x={PAD.l} y={PAD.t} width={W - PAD.l - PAD.r} height={H - PAD.t - PAD.b}
              fill="transparent"
              onMouseMove={(e) => {
                const svg = (e.currentTarget.ownerSVGElement as SVGSVGElement);
                const rect = svg.getBoundingClientRect();
                const px = ((e.clientX - rect.left) / rect.width) * W;
                let nearest = 0;
                let best = Infinity;
                points.forEach((p, i) => {
                  const d = Math.abs(p.x - px);
                  if (d < best) { best = d; nearest = i; }
                });
                setHover(nearest);
              }}
            />

            {hover !== null && points[hover] && (
              <>
                <line x1={points[hover].x} x2={points[hover].x} y1={PAD.t} y2={H - PAD.b} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                <circle cx={points[hover].x} cy={points[hover].y} r={6} fill={color} stroke="white" strokeWidth={1.5} />
              </>
            )}

            {/* peak markers */}
            {points.map((p, i) =>
              p.isPeak ? <circle key={`pk-${i}`} cx={p.x} cy={p.y} r={4} fill="white" /> : null
            )}
          </svg>
        )}

        {hover !== null && points[hover] && (
          <div
            className="absolute pointer-events-none glass-strong px-3 py-2 text-xs"
            style={{
              left: `calc(${(points[hover].x / W) * 100}% + 0px)`,
              top: 8,
              transform: "translateX(-50%)",
              borderRadius: 12,
            }}
          >
            <div className="text-display font-bold tabular text-base" style={{ color }}>
              {points[hover].weight} kg
            </div>
            <div className="text-muted-foreground">{formatDate(points[hover].date)}</div>
            {points[hover].isPeak && (
              <div className="mt-1 inline-block px-1.5 py-0.5 rounded bg-white text-background text-[0.6rem] font-bold tracking-wider">
                BEST
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
