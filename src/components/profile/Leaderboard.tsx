import { cn } from "@/lib/utils";
import { AvatarIcon, type AvatarKey } from "./AvatarIcon";
import type { LeaderboardEntry } from "./data";

type Props = { entries: LeaderboardEntry[] };

const colorFor = (pct: number) => {
  if (pct >= 90) return "hsl(var(--dl))";
  if (pct >= 70) return "hsl(var(--bp))";
  if (pct >= 50) return "hsl(var(--sq))";
  return "rgba(255,255,255,0.3)";
};

const medalFor = (rank: number) => {
  if (rank === 1) return { color: "hsl(var(--gold))", glow: "rgba(250,204,21,0.5)" };
  if (rank === 2) return { color: "hsl(var(--silver))", glow: "rgba(203,213,225,0.4)" };
  if (rank === 3) return { color: "hsl(var(--bronze))", glow: "rgba(217,119,6,0.4)" };
  return { color: "rgba(255,255,255,0.5)", glow: "transparent" };
};

export function Leaderboard({ entries }: Props) {
  const sorted = [...entries].sort((a, b) => (b.done / b.total) - (a.done / a.total));

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">
        POSTOTAK ZAVRŠENIH TRENINGA · SORTIRANO PO KONZISTENTNOSTI
      </div>

      <ul className="space-y-2.5">
        {sorted.map((e, i) => {
          const rank = i + 1;
          const pct = (e.done / e.total) * 100;
          const c = colorFor(pct);
          const medal = medalFor(rank);
          return (
            <li
              key={e.id}
              className={cn(
                "glass p-3.5 md:p-4 grid grid-cols-[40px_56px_1fr_auto] md:grid-cols-[48px_56px_1fr_180px_auto] items-center gap-3 md:gap-5 transition-all hover:-translate-y-0.5 animate-fade-up",
                e.isMe && "ring-1 ring-white/30 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className="text-display font-extrabold tabular text-2xl md:text-3xl text-center"
                style={{ color: medal.color, textShadow: rank <= 3 ? `0 0 20px ${medal.glow}` : "none" }}
              >
                {rank}
              </div>

              <div className="relative h-12 w-12 rounded-full bg-white/[0.04] border border-white/10 grid place-items-center">
                <AvatarIcon name={e.avatar as AvatarKey} size={28} />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground truncate">{e.name}</span>
                  {e.isMe && (
                    <span className="text-[0.6rem] font-bold tracking-wider px-1.5 py-0.5 rounded bg-white text-background">TI</span>
                  )}
                </div>
                <div className="md:hidden mt-1.5">
                  <Bar pct={pct} color={c} />
                </div>
              </div>

              <div className="hidden md:block">
                <Bar pct={pct} color={c} />
              </div>

              <div className="text-right">
                <div className="text-display font-extrabold tabular text-xl md:text-2xl" style={{ color: c }}>
                  {pct.toFixed(0)}<span className="text-sm text-muted-foreground font-medium">%</span>
                </div>
                <div className="text-[0.65rem] tabular text-muted-foreground">{e.done}/{e.total}</div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="text-xs text-muted-foreground/70 leading-relaxed pt-2">
        Rangiranje se zasniva na postotku završenih predviđenih treninga unutar trenutnog bloka.
        Treninzi označeni kao odmor ili deload ne ulaze u nazivnik.
      </div>
    </div>
  );
}

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="relative h-2 w-full rounded-full overflow-hidden bg-white/[0.06]">
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: `${Math.min(100, pct)}%`,
          background: `linear-gradient(90deg, ${color}aa, ${color})`,
          boxShadow: `0 0 16px ${color}80`,
          transition: "width 700ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}
