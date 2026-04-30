import { useState } from "react";
import { LIFT_META, MOCK_ATTEMPTS, type LiftKey, type Attempt } from "./data";
import { display, microLabel, overline } from "./styles";

export function MeetDayTab() {
  const [attempts, setAttempts] = useState(MOCK_ATTEMPTS);

  const setResult = (lift: LiftKey, id: string, result: Attempt["result"]) => {
    setAttempts((prev) => ({
      ...prev,
      [lift]: prev[lift].map((a) => (a.id === id ? { ...a, result } : a)),
    }));
  };

  const setWeight = (lift: LiftKey, id: string, weight: number) => {
    setAttempts((prev) => ({
      ...prev,
      [lift]: prev[lift].map((a) => (a.id === id ? { ...a, weight } : a)),
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 animate-fade-in">
      {(Object.keys(LIFT_META) as LiftKey[]).map((k, i) => (
        <LiftCard
          key={k}
          liftKey={k}
          attempts={attempts[k]}
          onResult={setResult}
          onWeight={setWeight}
          delay={i * 80}
        />
      ))}
    </div>
  );
}

function LiftCard({
  liftKey,
  attempts,
  onResult,
  onWeight,
  delay,
}: {
  liftKey: LiftKey;
  attempts: Attempt[];
  onResult: (l: LiftKey, id: string, r: Attempt["result"]) => void;
  onWeight: (l: LiftKey, id: string, w: number) => void;
  delay: number;
}) {
  const meta = LIFT_META[liftKey];
  const activeIdx = attempts.findIndex((a) => a.result === "pending");
  return (
    <div
      className="animate-fade-up"
      style={{
        animationDelay: `${delay}ms`,
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: 22,
        boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 20px ${meta.color}12, inset 0 1px 0 rgba(255,255,255,0.06)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${meta.color}, ${meta.color}55, transparent)`,
        }}
      />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: meta.color,
              boxShadow: `0 0 14px ${meta.color}`,
            }}
          />
          <div
            style={{
              ...display,
              fontSize: "1.4rem",
              color: "#fff",
            }}
          >
            {meta.label}
          </div>
        </div>
        <div className="text-right">
          <div style={microLabel}>1RM</div>
          <div
            className="tabular"
            style={{
              ...display,
              fontSize: "1.1rem",
              color: meta.color,
            }}
          >
            {meta.oneRm}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {attempts.map((a, i) => (
          <div
            key={a.id}
            className="flex items-center gap-2 p-2.5 rounded-xl"
            style={{
              background: i === activeIdx ? `${meta.color}10` : "rgba(255,255,255,0.02)",
              border: i === activeIdx ? `1px solid ${meta.color}33` : "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: `${meta.color}1c`,
                color: meta.color,
                fontFamily: "var(--fd)",
                fontWeight: 800,
                fontSize: "0.85rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {i + 1}
            </div>
            <input
              type="number"
              value={a.weight}
              onChange={(e) => onWeight(liftKey, a.id, parseFloat(e.target.value) || 0)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "8px 10px",
                color: "#fff",
                fontFamily: "var(--fd)",
                fontSize: "1rem",
                fontWeight: 700,
                outline: "none",
              }}
              className="tabular"
            />
            <div className="flex gap-1">
              <ResultChip
                label="✓"
                active={a.result === "good"}
                color="#22c55e"
                onClick={() => onResult(liftKey, a.id, "good")}
              />
              <ResultChip
                label="✕"
                active={a.result === "no"}
                color="#ef4444"
                onClick={() => onResult(liftKey, a.id, "no")}
              />
              <ResultChip
                label="—"
                active={a.result === "pending"}
                color="#94a3b8"
                onClick={() => onResult(liftKey, a.id, "pending")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultChip({
  label,
  active,
  color,
  onClick,
}: {
  label: string;
  active: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        background: active ? `${color}22` : "transparent",
        border: active ? `1px solid ${color}66` : "1px solid rgba(255,255,255,0.08)",
        color: active ? color : "rgba(255,255,255,0.45)",
        fontWeight: 700,
        fontSize: "0.85rem",
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: active ? `0 0 12px ${color}40` : undefined,
      }}
    >
      {label}
    </button>
  );
}
