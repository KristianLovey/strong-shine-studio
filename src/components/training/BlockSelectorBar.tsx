import { useState } from "react";
import { ChevronDown, FolderOpen, Plus, Copy, Trash2, FilePlus } from "lucide-react";
import type { Block } from "./data";
import { formatRange } from "./data";

const ghostBtn: React.CSSProperties = {
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.45)",
  borderRadius: 10,
  padding: "8px 12px",
  fontFamily: "var(--fm)",
  fontSize: "0.66rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: 600,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "all 0.2s",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

export function BlockSelectorBar({
  blocks,
  activeId,
  onSelectBlock,
  onRename,
}: {
  blocks: Block[];
  activeId: string;
  onSelectBlock: (id: string) => void;
  onRename: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const active = blocks.find((b) => b.id === activeId) ?? blocks[0];
  const [name, setName] = useState(active.name);

  return (
    <div className="relative animate-fade-up">
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderTop: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 12,
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
        }}
        className="flex flex-wrap items-center gap-3 p-3 md:p-4"
      >
        {/* Block switcher */}
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            ...ghostBtn,
            color: "#fff",
            borderColor: "rgba(255,255,255,0.14)",
            padding: "10px 14px",
          }}
        >
          <FolderOpen size={14} style={{ color: "#a5b4fc" }} />
          <span style={{ textTransform: "none", letterSpacing: "0.02em", fontSize: "0.82rem" }}>
            {active.name}
          </span>
          <ChevronDown size={14} style={{ opacity: 0.6 }} />
        </button>

        {/* Name field */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => onRename(name)}
          className="flex-1 min-w-[180px] bg-transparent outline-none"
          style={{
            fontFamily: "var(--fm)",
            color: "#fff",
            fontSize: "0.85rem",
            padding: "8px 10px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 8,
            background: "rgba(255,255,255,0.02)",
          }}
        />

        {/* Dates */}
        <div
          style={{
            fontFamily: "var(--fm)",
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.7rem",
            letterSpacing: "0.04em",
          }}
          className="hidden md:block tabular"
        >
          {formatRange(active.startDate, active.endDate)}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <button style={ghostBtn}><Plus size={12} /> Add Week</button>
          <button style={ghostBtn}><FilePlus size={12} /> New Block</button>
          <button style={ghostBtn}><Copy size={12} /> Copy</button>
          <button style={{ ...ghostBtn, color: "rgba(239,68,68,0.7)" }}>
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-full md:w-[360px] z-30 animate-scale-in origin-top-left"
          style={{
            background: "#09090e",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
            padding: 6,
          }}
        >
          {blocks.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                onSelectBlock(b.id);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors"
              style={{
                background: b.id === activeId ? "rgba(99,102,241,0.12)" : "transparent",
                color: b.id === activeId ? "#a5b4fc" : "rgba(255,255,255,0.75)",
                fontFamily: "var(--fm)",
                fontSize: "0.82rem",
              }}
            >
              <span>{b.name}</span>
              <span
                className="tabular"
                style={{ fontSize: "0.66rem", color: "rgba(255,255,255,0.35)" }}
              >
                {formatRange(b.startDate, b.endDate)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
