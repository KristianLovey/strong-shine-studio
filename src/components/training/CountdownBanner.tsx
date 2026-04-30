import { useEffect, useState } from "react";
import type { UpcomingMeet } from "./data";
import { display, microLabel, overline } from "./styles";

function diff(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s, done: false };
}

export function CountdownBanner({ meet }: { meet: UpcomingMeet }) {
  const target = new Date(meet.date);
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [meet.date]);

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 animate-fade-up"
      style={{
        background: "rgba(245,158,11,0.04)",
        border: "1px solid rgba(245,158,11,0.15)",
        borderLeft: "3px solid #f59e0b",
        borderRadius: 12,
        padding: "16px 20px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.4), 0 0 30px rgba(245,158,11,0.08)",
      }}
    >
      <div>
        <div style={overline}>SLJEDEĆE NATJECANJE</div>
        <div
          style={{
            ...display,
            fontSize: "1.3rem",
            color: "#fff",
            marginTop: 4,
          }}
        >
          {meet.name}
        </div>
        <div
          className="tabular"
          style={{
            fontFamily: "var(--fm)",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.4)",
            marginTop: 2,
          }}
        >
          {new Date(meet.date).toLocaleDateString("hr-HR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      <div className="flex gap-2">
        {[
          { v: t.d, l: "DANA" },
          { v: t.h, l: "SATI" },
          { v: t.m, l: "MIN" },
          { v: t.s, l: "SEK" },
        ].map((u) => (
          <div
            key={u.l}
            style={{
              minWidth: 64,
              padding: "8px 10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(245,158,11,0.18)",
              borderRadius: 10,
              textAlign: "center",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="tabular"
              style={{
                ...display,
                fontSize: "1.5rem",
                color: "#fbbf24",
                lineHeight: 1,
              }}
            >
              {String(u.v).padStart(2, "0")}
            </div>
            <div style={{ ...microLabel, marginTop: 4, fontSize: "0.48rem" }}>
              {u.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
