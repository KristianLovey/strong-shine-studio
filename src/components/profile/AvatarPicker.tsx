import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AVATAR_KEYS, AvatarIcon, type AvatarKey } from "./AvatarIcon";

export type AvatarPickerProps = {
  open: boolean;
  current: AvatarKey;
  onSelect: (key: AvatarKey) => void;
  onClose: () => void;
};

export function AvatarPicker({ open, current, onSelect, onClose }: AvatarPickerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass-strong w-full max-w-lg p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">PROFIL</div>
            <h2 className="text-display font-bold text-xl">Odaberi avatar</h2>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors"
            aria-label="Zatvori"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {AVATAR_KEYS.map((k) => {
            const active = current === k;
            return (
              <button
                key={k}
                onClick={() => { onSelect(k); onClose(); }}
                className={cn(
                  "aspect-square rounded-2xl grid place-items-center border transition-all relative",
                  active
                    ? "bg-primary/15 border-primary/60 shadow-[0_0_30px_rgba(99,102,241,0.45)]"
                    : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.15]"
                )}
              >
                <AvatarIcon name={k} size={36} className={active ? "text-primary" : ""} />
                {active && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
