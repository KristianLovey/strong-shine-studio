export type Lift = "SQ" | "BP" | "DL";

export const LIFT_LABEL: Record<Lift, string> = {
  SQ: "ČUČANJ",
  BP: "BENCH",
  DL: "MRTVO",
};

export const LIFT_COLOR: Record<Lift, string> = {
  SQ: "hsl(var(--sq))",
  BP: "hsl(var(--bp))",
  DL: "hsl(var(--dl))",
};

export const REP_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10, 12] as const;
export type RepCount = (typeof REP_OPTIONS)[number];

export type PrEntry = {
  id: string;
  lift: Lift;
  reps: RepCount;
  weight: number;
  date: string; // ISO
  source?: string;
  notes?: string;
};

export type Competition = {
  id: string;
  name: string;
  date: string;
  sq: number;
  bp: number;
  dl: number;
  total: number;
  place: number;
  note?: string;
};

export type LeaderboardEntry = {
  id: string;
  name: string;
  avatar: string; // emoji/icon key
  done: number;
  total: number;
  isMe?: boolean;
};

export type MuscleGroup = {
  key: string;
  label: string;
  color: string;
  sets: number;
  tonnage: number;
};

export const MUSCLE_GROUPS: MuscleGroup[] = [
  { key: "SQUAT",      label: "SQUAT",      color: "#6b8cff", sets: 42, tonnage: 18420 },
  { key: "BENCH",      label: "BENCH",      color: "#f59e0b", sets: 38, tonnage: 11200 },
  { key: "DEADLIFT",   label: "DEADLIFT",   color: "#22c55e", sets: 28, tonnage: 16800 },
  { key: "CHEST",      label: "CHEST",      color: "#ec4899", sets: 22, tonnage: 4200 },
  { key: "SHOULDERS",  label: "SHOULDERS",  color: "#a78bfa", sets: 18, tonnage: 2980 },
  { key: "BACK",       label: "BACK",       color: "#06b6d4", sets: 26, tonnage: 6420 },
  { key: "BICEPS",     label: "BICEPS",     color: "#fb923c", sets: 14, tonnage: 1380 },
  { key: "TRICEPS",    label: "TRICEPS",    color: "#14b8a6", sets: 16, tonnage: 1840 },
  { key: "QUADS",      label: "QUADS",      color: "#a3e635", sets: 12, tonnage: 5200 },
  { key: "HAMSTRINGS", label: "HAMSTRINGS", color: "#eab308", sets: 10, tonnage: 3800 },
  { key: "GLUTES",     label: "GLUTES",     color: "#f43f5e", sets: 8,  tonnage: 2400 },
  { key: "CORE",       label: "CORE",       color: "#d946ef", sets: 14, tonnage: 980 },
  { key: "REHAB",      label: "REHAB",      color: "#64748b", sets: 6,  tonnage: 320 },
];

export const MOCK_PRS: PrEntry[] = [
  { id: "p1", lift: "SQ", reps: 1,  weight: 215, date: "2026-04-12", source: "Trening", notes: "Belt + sleeves" },
  { id: "p2", lift: "SQ", reps: 3,  weight: 195, date: "2026-03-22", source: "Trening" },
  { id: "p3", lift: "SQ", reps: 5,  weight: 180, date: "2026-02-18", source: "Trening" },
  { id: "p4", lift: "SQ", reps: 8,  weight: 160, date: "2026-01-14", source: "Trening" },
  { id: "p5", lift: "BP", reps: 1,  weight: 142, date: "2026-04-08", source: "Natjecanje" },
  { id: "p6", lift: "BP", reps: 3,  weight: 130, date: "2026-03-15", source: "Trening" },
  { id: "p7", lift: "BP", reps: 5,  weight: 120, date: "2026-02-04", source: "Trening" },
  { id: "p8", lift: "DL", reps: 1,  weight: 245, date: "2026-04-20", source: "Natjecanje", notes: "Hook grip" },
  { id: "p9", lift: "DL", reps: 3,  weight: 220, date: "2026-03-10", source: "Trening" },
  { id: "p10", lift: "DL", reps: 5, weight: 200, date: "2026-02-22", source: "Trening" },
];

export const MOCK_COMPS: Competition[] = [
  { id: "c1", name: "Hrvatsko prvenstvo", date: "2026-04-20", sq: 215, bp: 142, dl: 245, total: 602, place: 1, note: "PB total" },
  { id: "c2", name: "Adriatic Open",      date: "2026-02-08", sq: 205, bp: 138, dl: 235, total: 578, place: 2, note: "" },
  { id: "c3", name: "Winter Classic",     date: "2025-12-14", sq: 195, bp: 132, dl: 225, total: 552, place: 3, note: "First meet" },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: "u1", name: "Marko Kovač",   avatar: "flame",     done: 47, total: 48, isMe: false },
  { id: "u2", name: "Ana Horvat",    avatar: "bolt",      done: 44, total: 46 },
  { id: "u3", name: "Luka Babić",    avatar: "skull",     done: 42, total: 45 },
  { id: "u4", name: "Ti",            avatar: "rocket",    done: 38, total: 44, isMe: true },
  { id: "u5", name: "Petra Marić",   avatar: "barbell",   done: 35, total: 44 },
  { id: "u6", name: "Ivan Jurić",    avatar: "crown",     done: 30, total: 44 },
  { id: "u7", name: "Sara Tomić",    avatar: "diamond",   done: 26, total: 44 },
  { id: "u8", name: "Filip Novak",   avatar: "wolf",      done: 22, total: 44 },
];

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("hr-HR", { day: "2-digit", month: "2-digit", year: "numeric" });
