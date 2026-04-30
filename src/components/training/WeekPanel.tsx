import { Plus, Copy, Trash2, Check } from "lucide-react";
import type { Week } from "./data";
import { formatRange, formatDate, CAT_COLOR } from "./data";
import { display, microLabel, overline } from "./styles";

const iconBtn: React.CSSProperties = {
  width: 28,
  height: 28,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.45)",
  cursor: "pointer",
  transition: "all 0.2s",
};

export function WeekPanel({ week, index }: { week: Week; index: number }) {
  return (
    <div
      className="animate-fade-up"
      style={{
        animationDelay: `${index * 60}ms`,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderTop: week.completed
          ? "1px solid rgba(34,197,94,0.3)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        boxShadow: week.completed
          ? "0 8px 30px rgba(0,0,0,0.4), 0 -1px 0 rgba(34,197,94,0.15)"
          : "0 8px 30px rgba(0,0,0,0.4)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-baseline gap-3">
          <div
            style={{
              ...display,
              fontSize: "2rem",
              color: week.completed ? "#22c55e" : "#fff",
              textShadow: week.completed
                ? "0 0 30px rgba(34,197,94,0.4)"
                : undefined,
            }}
          >
            W{week.number}
          </div>
          <div>
            <div style={overline}>
              {week.completed ? "Završeno" : "U tijeku"}
            </div>
            <div
              style={{
                fontFamily: "var(--fm)",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.4)",
                marginTop: 2,
              }}
              className="tabular"
            >
              {formatRange(week.startDate, week.endDate)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button style={iconBtn} title="Add workout"><Plus size={13} /></button>
          <button style={iconBtn} title="Copy week"><Copy size={13} /></button>
          <button style={{ ...iconBtn, color: "rgba(239,68,68,0.55)" }} title="Delete"><Trash2 size={13} /></button>
        </div>
      </div>

      {/* Workouts */}
      <div className="space-y-3">
        {week.workouts.map((wo) => (
          <div
            key={wo.id}
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div style={overline}>{wo.day}</div>
                <div
                  style={{
                    fontFamily: "var(--fm)",
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: 2,
                  }}
                  className="tabular"
                >
                  {formatDate(wo.date)}
                </div>
              </div>
              {wo.completed && (
                <div
                  className="flex items-center gap-1.5"
                  style={{
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.25)",
                    color: "#4ade80",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "#22c55e",
                      boxShadow: "0 0 8px rgba(34,197,94,0.7)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      fontWeight: 700,
                    }}
                  >
                    DONE
                  </span>
                </div>
              )}
            </div>

            {/* Exercises */}
            <div className="space-y-1.5">
              {wo.exercises.map((ex) => {
                const color = CAT_COLOR[ex.category];
                const doneSets = ex.sets.filter((s) => s.done).length;
                return (
                  <div
                    key={ex.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg"
                    style={{
                      background: "rgba(255,255,255,0.015)",
                      borderLeft: `2px solid ${color}`,
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div
                        style={{
                          fontFamily: "var(--fm)",
                          fontSize: "0.85rem",
                          color: "#fff",
                          fontWeight: 500,
                        }}
                      >
                        {ex.name}
                      </div>
                      <div
                        className="tabular flex items-baseline gap-2 mt-0.5"
                        style={{ fontSize: "0.72rem" }}
                      >
                        <span style={{ color, fontWeight: 600 }}>
                          {ex.sets.length}×{ex.sets[0].reps}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.35)" }}>
                          @ {ex.sets[0].weight}kg
                        </span>
                        {ex.sets[0].done && ex.sets[0].actualWeight && (
                          <span
                            style={{
                              color: "#fff",
                              fontWeight: 600,
                              marginLeft: 4,
                            }}
                          >
                            → {ex.sets[0].actualWeight}kg
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Set dots */}
                    <div className="hidden sm:flex items-center gap-1">
                      {ex.sets.map((s, i) => (
                        <div
                          key={i}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            background: s.done ? color : "rgba(255,255,255,0.08)",
                            boxShadow: s.done
                              ? `0 0 6px ${color}80`
                              : undefined,
                          }}
                        />
                      ))}
                    </div>
                    <div
                      className="tabular"
                      style={{
                        fontSize: "0.66rem",
                        color: "rgba(255,255,255,0.35)",
                        minWidth: 28,
                        textAlign: "right",
                      }}
                    >
                      {doneSets}/{ex.sets.length}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {week.workouts.length === 0 && (
          <div
            style={{
              ...microLabel,
              padding: 16,
              textAlign: "center",
              border: "1px dashed rgba(255,255,255,0.08)",
              borderRadius: 10,
            }}
          >
            Nema treninga
          </div>
        )}
      </div>
    </div>
  );
}
