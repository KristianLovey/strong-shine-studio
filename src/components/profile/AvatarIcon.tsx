import { cn } from "@/lib/utils";

export const AVATAR_KEYS = [
  "rocket", "flame", "bolt", "skull", "barbell", "crown",
  "diamond", "wolf", "lion", "shield", "star", "atom",
] as const;
export type AvatarKey = (typeof AVATAR_KEYS)[number];

type Props = {
  name: AvatarKey;
  size?: number;
  className?: string;
};

export function AvatarIcon({ name, size = 48, className }: Props) {
  const s = size;
  const stroke = "currentColor";
  const sw = 1.6;
  const common = {
    width: s, height: s, viewBox: "0 0 48 48",
    fill: "none", stroke, strokeWidth: sw,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    className: cn("text-foreground/90", className),
  };
  switch (name) {
    case "rocket":
      return (
        <svg {...common}>
          <path d="M24 6c6 4 9 10 9 17l-3 6h-12l-3-6c0-7 3-13 9-17z" />
          <circle cx="24" cy="20" r="3" />
          <path d="M15 30l-5 5 5 1M33 30l5 5-5 1" />
          <path d="M21 38l3 5 3-5" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M24 6c2 6 8 8 8 16a8 8 0 1 1-16 0c0-4 2-6 4-8 0 4 2 6 4 6 0-6 0-10 0-14z" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M26 4 12 26h10l-2 18 16-22H26l4-18z" />
        </svg>
      );
    case "skull":
      return (
        <svg {...common}>
          <path d="M10 22a14 14 0 1 1 28 0v8l-4 4v6H14v-6l-4-4v-8z" />
          <circle cx="18" cy="24" r="2.5" />
          <circle cx="30" cy="24" r="2.5" />
          <path d="M22 32h4M20 38v4M28 38v4" />
        </svg>
      );
    case "barbell":
      return (
        <svg {...common}>
          <path d="M6 18v12M10 14v20M38 14v20M42 18v12M10 24h28" />
        </svg>
      );
    case "crown":
      return (
        <svg {...common}>
          <path d="M6 16l6 8 12-14 12 14 6-8v22H6z" />
          <path d="M6 38h36" />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common}>
          <path d="M12 16h24l6 8-18 20L6 24z" />
          <path d="M12 16l6 8h12l6-8M18 24l6 20 6-20" />
        </svg>
      );
    case "wolf":
      return (
        <svg {...common}>
          <path d="M8 12l6 4 4-2 6 2 6-2 4 2 6-4-2 12-4 8-4 4H14l-4-4-4-8z" />
          <circle cx="20" cy="22" r="1.5" fill="currentColor" />
          <circle cx="28" cy="22" r="1.5" fill="currentColor" />
        </svg>
      );
    case "lion":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" />
          <path d="M24 10c-3-4-7-4-9 0M24 10c3-4 7-4 9 0M10 24c-4-2-4-6 0-8M38 24c4-2 4-6 0-8M10 24c-4 2-4 6 0 8M38 24c4 2 4 6 0 8" />
          <circle cx="20" cy="22" r="1.5" fill="currentColor" />
          <circle cx="28" cy="22" r="1.5" fill="currentColor" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M24 6l14 4v12c0 10-7 17-14 20-7-3-14-10-14-20V10z" />
          <path d="M18 24l4 4 8-8" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M24 4l6 12 14 2-10 10 2 14-12-6-12 6 2-14L4 18l14-2z" />
        </svg>
      );
    case "atom":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="3" fill="currentColor" />
          <ellipse cx="24" cy="24" rx="18" ry="7" />
          <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" />
          <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(-60 24 24)" />
        </svg>
      );
  }
}
