import { useMemo, useState } from "react";
import { glassPanel, overline, display, microLabel } from "./styles";
import { RPE_TABLE } from "./data";

const TOOLS = [
  { id: "rpe",  label: "RPE KALKULATOR", color: "#a78bfa" },
  { id: "gl",   label: "GL TOČKE",        color: "#f59e0b" },
  { id: "wilk", label: "WILKS",            color: "#22c55e" },
  { id: "warm", label: "ZAGRIJAVANJE",     color: "#6b8cff" },
  { id: "att",  label: "ATTEMPT SELECT",   color: "#ec4899" },
];

export function HubTab() {
  const [active, setActive] = useState("rpe");
  const tool = TOOLS.find((t) => t.id === active)!;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Tool chips */}
      <div className="overflow-x-auto scrollbar-thin -mx-2 px-2">
        <div className="inline-flex gap-2">
          {TOOLS.map((t) => {
            const a = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{
                  background: a ? `${t.color}1f` : "rgba(255,255,255,0.03)",
                  border: a
                    ? `1px solid ${t.color}66`
                    : "1px solid rgba(255,255,255,0.08)",
                  color: a ? t.color : "rgba(255,255,255,0.4)",
                  padding: "10px 16px",
                  borderRadius: 12,
                  fontFamily: "var(--fm)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  boxShadow: a
                    ? `0 0 24px ${t.color}25, inset 0 1px 0 rgba(255,255,255,0.08)`
                    : undefined,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool panel */}
      {active === "rpe" && <RpeCalculator color={tool.color} />}
      {active !== "rpe" && (
        <div style={glassPanel} className="p-8 text-center">
          <div style={overline}>{tool.label}</div>
          <div
            style={{
              ...display,
              fontSize: "1.4rem",
              color: tool.color,
              marginTop: 12,
            }}
          >
            Coming soon
          </div>
        </div>
      )}
    </div>
  );
}

function RpeCalculator({ color }: { color: string }) {
  const [weight, setWeight] = useState(150);
  const [reps, setReps] = useState(5);
  const [rpe, setRpe] = useState(8);

  const oneRm = useMemo(() => {
    const pct = RPE_TABLE[rpe]?.[reps];
    if (!pct) return null;
    return weight / (pct / 100);
  }, [weight, reps, rpe]);

  const breakdown = useMemo(() => {
    if (!oneRm) return [];
    return [10, 9.5, 9, 8.5, 8, 7.5, 7].map((r) => ({
      rpe: r,
      pct: RPE_TABLE[r]?.[reps],
      w: RPE_TABLE[r]?.[reps] ? oneRm * (RPE_TABLE[r][reps] / 100) : null,
    }));
  }, [oneRm, reps]);

  return (
    <div style={glassPanel} className="p-5 md:p-7">
      <SectionTitle label="ULAZ" color={color} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <CalcInput label="TEŽINA (kg)" value={weight} onChange={setWeight} color={color} />
        <CalcInput label="PONAVLJANJA" value={reps} onChange={setReps} color={color} max={12} />
        <CalcInput label="RPE" value={rpe} onChange={setRpe} color={color} step={0.5} max={10} />
      </div>

      <div className="mt-7">
        <SectionTitle label="REZULTAT" color={color} />
        <div className="mt-4">
          <ResultCard
            label="PROCIJENJENI 1RM"
            value={oneRm ? `${oneRm.toFixed(1)} kg` : "—"}
            color={color}
          />
        </div>
      </div>

      {breakdown.length > 0 && (
        <div className="mt-7">
          <SectionTitle label="RPE TABLICA" color={color} />
          <div className="mt-3">
            {breakdown.map((row) => {
              const isActive = row.rpe === rpe;
              return (
                <div
                  key={row.rpe}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    background: isActive ? "rgba(245,158,11,0.08)" : "transparent",
                  }}
                >
                  <div
                    className="tabular"
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: "0.78rem",
                      color: isActive ? "#fbbf24" : "rgba(255,255,255,0.7)",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    RPE {row.rpe}
                  </div>
                  <div
                    className="tabular"
                    style={{
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {row.pct}%
                  </div>
                  <div
                    className="tabular"
                    style={{
                      ...display,
                      fontSize: "1rem",
                      color: isActive ? "#fbbf24" : "#fff",
                    }}
                  >
                    {row.w ? `${row.w.toFixed(1)} kg` : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: color,
          boxShadow: `0 0 12px ${color}`,
        }}
      />
      <div style={overline}>{label}</div>
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)",
        }}
      />
    </div>
  );
}

function CalcInput({
  label,
  value,
  onChange,
  color,
  step = 1,
  max,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  color: string;
  step?: number;
  max?: number;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <label className="block">
      <div style={microLabel}>{label}</div>
      <div className="relative mt-2">
        <input
          type="number"
          step={step}
          max={max}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            border: focus ? `1.5px solid ${color}` : "1.5px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            padding: "12px 14px",
            color: "#fff",
            fontFamily: "var(--fd)",
            fontSize: "1.4rem",
            fontWeight: 700,
            outline: "none",
            transition: "all 0.2s",
            boxShadow: focus ? `0 0 0 3px ${color}18` : undefined,
          }}
          className="tabular"
        />
        <div
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 0,
            height: 2,
            background: color,
            borderRadius: 2,
            transform: focus ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
    </label>
  );
}

function ResultCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      key={value}
      className="animate-scale-in"
      style={{
        background: `${color}0c`,
        border: `1.5px solid ${color}28`,
        borderRadius: 14,
        padding: "20px 22px",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 30px ${color}12`,
      }}
    >
      <div style={microLabel}>{label}</div>
      <div
        className="tabular"
        style={{
          ...display,
          fontSize: "2.6rem",
          color,
          marginTop: 6,
          textShadow: `0 0 40px ${color}55`,
        }}
      >
        {value}
      </div>
    </div>
  );
}
