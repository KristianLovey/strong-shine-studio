import { display, glassPanel, microLabel, overline } from "./styles";

type Stat = { label: string; value: string; accent?: boolean };

export function ProgramHero({
  athleteName,
  stats,
}: {
  athleteName: string;
  stats: Stat[];
}) {
  return (
    <section className="space-y-4 animate-fade-up">
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 22,
            height: 2,
            background:
              "linear-gradient(90deg, #6366f1, rgba(99,102,241,0))",
            borderRadius: 2,
          }}
        />
        <div style={overline}>{athleteName}</div>
      </div>

      <div
        style={{ ...glassPanel, overflow: "hidden" }}
        className="grid grid-cols-2 md:grid-cols-4"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="p-5 md:p-6"
            style={{
              borderRight:
                i < stats.length - 1
                  ? "1px solid rgba(255,255,255,0.06)"
                  : undefined,
              borderBottom:
                i < 2 ? "1px solid rgba(255,255,255,0.06)" : undefined,
            }}
          >
            <div style={microLabel}>{s.label}</div>
            <div
              style={{
                ...display,
                fontSize: "1.7rem",
                marginTop: 8,
                color: s.accent ? "#4ade80" : "#fff",
                textShadow: s.accent
                  ? "0 0 24px rgba(74,222,128,0.35)"
                  : undefined,
              }}
              className="tabular"
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
