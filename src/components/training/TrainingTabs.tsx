import { cn } from "@/lib/utils";

type Tab = { id: string; label: string };

export function TrainingTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto scrollbar-thin -mx-2 px-2">
      <div
        className="inline-flex gap-1 p-1 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        {tabs.map((t) => {
          const a = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={cn(
                "relative px-5 py-2.5 rounded-lg text-[0.72rem] font-semibold whitespace-nowrap transition-all",
                a ? "" : "text-white/40 hover:text-white/70"
              )}
              style={{
                fontFamily: "var(--fm)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: a ? "rgba(99,102,241,0.18)" : "transparent",
                border: a ? "1px solid rgba(99,102,241,0.4)" : "1px solid transparent",
                color: a ? "#a5b4fc" : undefined,
                boxShadow: a
                  ? "0 0 20px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
                  : undefined,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
