import { cn } from "@/lib/utils";

type Tab = { id: string; label: string };

type Props = {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
};

export function PillTabs({ tabs, active, onChange }: Props) {
  return (
    <div className="overflow-x-auto scrollbar-thin -mx-2 px-2">
      <div className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        {tabs.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={cn(
                "relative px-5 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all whitespace-nowrap",
                isActive
                  ? "bg-white text-background shadow-[0_4px_24px_rgba(255,255,255,0.18)]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
