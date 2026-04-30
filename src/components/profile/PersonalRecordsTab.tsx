import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LIFT_COLOR, LIFT_LABEL, REP_OPTIONS, type Lift, type PrEntry, type RepCount, formatDate } from "./data";

export type AddPrFormProps = {
  lift: Lift;
  reps: RepCount;
  onAdd: (entry: { lift: Lift; reps: RepCount; weight: number; date: string }) => void;
};

export function AddPrForm({ lift, reps, onAdd }: AddPrFormProps) {
  const [weight, setWeight] = useState<string>("");
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const valid = weight !== "" && Number(weight) > 0 && date;
  const color = LIFT_COLOR[lift];

  return (
    <div className="glass p-5 md:p-6 animate-fade-up">
      <div className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
        DODAJ PR · {LIFT_LABEL[lift]} · {reps}RM
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="number"
          placeholder="Težina (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="flex-1 bg-white/[0.04] border rounded-xl px-4 py-3 text-display text-lg font-bold tabular outline-none focus:ring-2 focus:ring-primary/60"
          style={{ borderColor: `${color}55` }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-foreground tabular outline-none focus:ring-2 focus:ring-primary/60"
        />
        <button
          disabled={!valid}
          onClick={() => {
            if (!valid) return;
            onAdd({ lift, reps, weight: Number(weight), date });
            setWeight("");
          }}
          className={cn(
            "px-6 py-3 rounded-xl text-sm font-bold tracking-wider transition-all",
            valid
              ? "bg-white text-background hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.18)]"
              : "bg-white/5 text-muted-foreground/50 border border-white/10 cursor-not-allowed"
          )}
        >
          LOGIRAJ {reps}RM
        </button>
      </div>
    </div>
  );
}

type Props = {
  prs: PrEntry[];
  onAdd: (entry: { lift: Lift; reps: RepCount; weight: number; date: string }) => void;
  onDelete: (id: string) => void;
};

export function PersonalRecordsTab({ prs, onAdd, onDelete }: Props) {
  const [lift, setLift] = useState<Lift>("SQ");
  const [reps, setReps] = useState<RepCount>(1);

  const repSet = useMemo(() => {
    const m = new Map<RepCount, boolean>();
    prs.filter((p) => p.lift === lift).forEach((p) => m.set(p.reps, true));
    return m;
  }, [prs, lift]);

  const best = useMemo(
    () => prs.find((p) => p.lift === lift && p.reps === reps),
    [prs, lift, reps]
  );

  const all = useMemo(
    () => [...prs].sort((a, b) => b.date.localeCompare(a.date)),
    [prs]
  );

  const color = LIFT_COLOR[lift];

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Best lift selector */}
      <section className="glass p-5 md:p-7 animate-fade-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="flex gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10">
            {(["SQ", "BP", "DL"] as Lift[]).map((l) => (
              <button
                key={l}
                onClick={() => setLift(l)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all",
                  lift === l ? "bg-white/10" : "text-muted-foreground hover:text-foreground"
                )}
                style={lift === l ? { color: LIFT_COLOR[l], textShadow: `0 0 10px ${LIFT_COLOR[l]}80` } : {}}
              >
                {LIFT_LABEL[l]}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {REP_OPTIONS.map((r) => {
              const has = repSet.has(r);
              const active = reps === r;
              return (
                <button
                  key={r}
                  onClick={() => setReps(r)}
                  className={cn(
                    "relative px-2.5 py-1 rounded-md text-[0.7rem] font-semibold tabular border transition-colors",
                    active
                      ? "bg-white text-background border-white"
                      : "bg-white/[0.04] border-white/10 text-foreground hover:bg-white/[0.08]"
                  )}
                >
                  {r}RM
                  {has && !active && (
                    <span
                      className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full"
                      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {best ? (
          <div className="text-center py-6">
            <div
              className="text-display font-extrabold leading-none tabular"
              style={{ fontSize: "clamp(3.5rem, 12vw, 6.5rem)", color, textShadow: `0 0 60px ${color}55` }}
            >
              {best.weight}
              <span className="text-foreground/60 text-[0.32em] font-bold align-super ml-1">kg</span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground tracking-wider">
              {formatDate(best.date)} · {best.source ?? "Trening"}
              {best.notes ? ` · ${best.notes}` : ""}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground/60 text-sm">
            Nema ulogiranog {reps}RM za {LIFT_LABEL[lift]}.
          </div>
        )}
      </section>

      <AddPrForm lift={lift} reps={reps} onAdd={onAdd} />

      {/* Full log */}
      <section className="glass p-5 md:p-6 animate-fade-up">
        <h3 className="text-display font-bold text-lg tracking-tight mb-4">SVE ULOGIRANO</h3>
        {all.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground text-sm">Nema unosa.</div>
        ) : (
          <ul className="space-y-1.5">
            {all.map((p) => (
              <li
                key={p.id}
                className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[60px_60px_1fr_auto_auto_auto] items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-colors"
              >
                <span
                  className="text-[0.65rem] font-bold tracking-wider px-2 py-1 rounded-md text-center"
                  style={{ background: `${LIFT_COLOR[p.lift]}1f`, color: LIFT_COLOR[p.lift] }}
                >
                  {p.lift}
                </span>
                <span className="text-xs text-muted-foreground tabular hidden md:block">{p.reps}RM</span>
                <span className="text-display font-extrabold tabular">
                  <span className="md:hidden text-xs text-muted-foreground mr-2">{p.reps}RM</span>
                  {p.weight}<span className="text-muted-foreground text-xs font-medium ml-0.5">kg</span>
                </span>
                <span className="text-xs text-muted-foreground tabular hidden md:block">{formatDate(p.date)}</span>
                <span className="text-[0.6rem] tracking-wider uppercase px-2 py-0.5 rounded-md bg-white/[0.05] text-muted-foreground hidden md:inline-block">
                  {p.source ?? "Trening"}
                </span>
                <button
                  onClick={() => onDelete(p.id)}
                  className="h-8 w-8 grid place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label="Obriši"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
