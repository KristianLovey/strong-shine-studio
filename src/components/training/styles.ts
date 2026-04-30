import type { CSSProperties } from "react";

export const glassPanel: CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 20,
  boxShadow:
    "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
};

export const overline: CSSProperties = {
  fontFamily: "var(--fm)",
  fontSize: "0.56rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.38)",
  fontWeight: 600,
};

export const microLabel: CSSProperties = {
  fontFamily: "var(--fm)",
  fontSize: "0.52rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.3)",
  fontWeight: 600,
};

export const display: CSSProperties = {
  fontFamily: "var(--fd)",
  fontWeight: 800,
  letterSpacing: "-0.02em",
};
