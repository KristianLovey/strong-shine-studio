import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarIcon, type AvatarKey } from "./AvatarIcon";

type Props = {
  name: string;
  role: string;
  weightClass: string;
  avatar: AvatarKey;
  onAvatarClick: () => void;
  sq: number;
  bp: number;
  dl: number;
  sex: "M" | "F";
  bodyWeight: number;
  onSave: (vals: { sq: number; bp: number; dl: number; sex: "M" | "F"; bodyWeight: number }) => void;
};

const tile = (color: string, label: string, value: number, glow: string) => ({ color, label, value, glow });

export function ProfileHeader({
  name, role, weightClass, avatar, onAvatarClick,
  sq, bp, dl, sex, bodyWeight, onSave,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [vSq, setVSq] = useState(sq);
  const [vBp, setVBp] = useState(bp);
  const [vDl, setVDl] = useState(dl);
  const [vSex, setVSex] = useState<"M" | "F">(sex);
  const [vBw, setVBw] = useState(bodyWeight);

  const total = sq + bp + dl;

  const tiles = [
    tile("hsl(var(--sq))",  "SQ",  sq,  "rgba(107,140,255,0.35)"),
    tile("hsl(var(--bp))",  "BP",  bp,  "rgba(245,158,11,0.35)"),
    tile("hsl(var(--dl))",  "DL",  dl,  "rgba(34,197,94,0.35)"),
    tile("#ffffff",          "TOT", total, "rgba(255,255,255,0.25)"),
  ];

  return (
    <section className="animate-fade-up">
      <div className="glass p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          {/* Avatar + identity */}
          <div className="flex items-center gap-5">
            <button
              onClick={onAvatarClick}
              className="relative group shrink-0"
              aria-label="Promijeni avatar"
            >
              <span
                className="absolute -inset-2 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.55), rgba(167,139,250,0.25), transparent 70%)" }}
              />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                <AvatarIcon name={avatar} size={44} />
              </span>
              <span className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full grid place-items-center bg-primary text-primary-foreground border border-white/20 shadow-md">
                <Pencil size={12} strokeWidth={2.5} />
              </span>
            </button>

            <div>
              <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground mb-1">
                <span>{role}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                <span>{weightClass}</span>
              </div>
              <h1 className="text-display font-extrabold text-[2.2rem] md:text-[2.8rem] leading-[1.05] text-foreground">
                {name}
              </h1>
              <div className="mt-2 text-xs text-muted-foreground">
                {sex === "M" ? "Muški" : "Ženski"} · {bodyWeight} kg · GL ~ {(total / Math.max(bodyWeight, 1)).toFixed(2)}×BW
              </div>
            </div>
          </div>

          {/* 1RM stat tiles */}
          <div className="md:ml-auto w-full md:w-auto">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="grid grid-cols-4 gap-2 md:gap-3 flex-1 md:flex-none">
                {tiles.map((t) => (
                  <div
                    key={t.label}
                    className="glass-strong px-3 py-3 md:px-5 md:py-4 min-w-[78px] md:min-w-[110px] transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ boxShadow: `0 10px 40px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.08)` }}
                  >
                    <div
                      className="text-display font-extrabold text-2xl md:text-3xl tabular leading-none"
                      style={{ color: t.color, textShadow: `0 0 24px ${t.glow}` }}
                    >
                      {t.value}
                    </div>
                    <div className="mt-1.5 text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">{t.label}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setEditing((v) => !v)}
                className={cn(
                  "h-11 w-11 grid place-items-center rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors",
                  editing && "bg-primary/20 border-primary/40 text-primary"
                )}
                aria-label="Uredi 1RM"
              >
                <Pencil size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Edit panel */}
        {editing && (
          <div className="mt-6 pt-6 border-t border-white/[0.08] animate-slide-down overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { label: "ČUČANJ", color: "hsl(var(--sq))", v: vSq, set: setVSq },
                { label: "BENCH",  color: "hsl(var(--bp))", v: vBp, set: setVBp },
                { label: "MRTVO",  color: "hsl(var(--dl))", v: vDl, set: setVDl },
              ].map((f) => (
                <label key={f.label} className="block">
                  <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">{f.label}</span>
                  <input
                    type="number"
                    value={f.v}
                    onChange={(e) => f.set(Number(e.target.value))}
                    className="w-full bg-white/[0.04] border rounded-xl px-3 py-2.5 text-foreground tabular text-display text-lg font-bold outline-none focus:ring-2 focus:ring-primary/60"
                    style={{ borderColor: `${f.color}55` }}
                  />
                </label>
              ))}
              <label className="block">
                <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">SPOL</span>
                <div className="flex rounded-xl bg-white/[0.04] border border-white/10 p-1">
                  {(["M", "F"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setVSex(s)}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors",
                        vSex === s ? "bg-white text-background" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {s === "M" ? "Muški" : "Ženski"}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block">
                <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">TJELESNA (kg)</span>
                <input
                  type="number"
                  value={vBw}
                  onChange={(e) => setVBw(Number(e.target.value))}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-foreground tabular text-display text-lg font-bold outline-none focus:ring-2 focus:ring-primary/60"
                />
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 rounded-full text-sm border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <X size={14} /> Odustani
              </button>
              <button
                onClick={() => { onSave({ sq: vSq, bp: vBp, dl: vDl, sex: vSex, bodyWeight: vBw }); setEditing(false); }}
                className="px-5 py-2 rounded-full text-sm font-semibold bg-white text-background hover:bg-white/90 transition-colors inline-flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.18)]"
              >
                <Check size={14} /> Spremi
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
