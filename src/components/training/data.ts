export type Category = "SQ" | "BP" | "DL" | "ACC";

export const CAT_COLOR: Record<Category, string> = {
  SQ: "#6b8cff",
  BP: "#f59e0b",
  DL: "#22c55e",
  ACC: "#a78bfa",
};

export type ExerciseSet = {
  id: string;
  reps: number;
  weight: number;
  rpe?: number;
  done: boolean;
  actualWeight?: number;
  actualReps?: number;
};

export type Exercise = {
  id: string;
  name: string;
  category: Category;
  sets: ExerciseSet[];
};

export type Workout = {
  id: string;
  day: string;
  date: string;
  completed: boolean;
  exercises: Exercise[];
};

export type Week = {
  id: string;
  number: number;
  startDate: string;
  endDate: string;
  completed: boolean;
  workouts: Workout[];
};

export type Block = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  weeks: Week[];
};

const mkSets = (count: number, reps: number, weight: number, doneRatio = 0.6): ExerciseSet[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `s${i}`,
    reps,
    weight,
    rpe: 7 + (i % 3) * 0.5,
    done: i < Math.floor(count * doneRatio),
    actualWeight: i < Math.floor(count * doneRatio) ? weight : undefined,
    actualReps: i < Math.floor(count * doneRatio) ? reps : undefined,
  }));

export const MOCK_BLOCKS: Block[] = [
  {
    id: "b1",
    name: "Hypertrophy → Strength",
    startDate: "2026-04-06",
    endDate: "2026-05-31",
    weeks: [
      {
        id: "w1", number: 1, startDate: "2026-04-06", endDate: "2026-04-12", completed: true,
        workouts: [
          { id: "wk1d1", day: "Ponedjeljak", date: "2026-04-06", completed: true, exercises: [
            { id: "e1", name: "Squat", category: "SQ", sets: mkSets(4, 5, 160, 1) },
            { id: "e2", name: "Pause Bench", category: "BP", sets: mkSets(3, 5, 105, 1) },
            { id: "e3", name: "Romanian DL", category: "DL", sets: mkSets(3, 8, 140, 1) },
          ]},
          { id: "wk1d2", day: "Srijeda", date: "2026-04-08", completed: true, exercises: [
            { id: "e4", name: "Deadlift", category: "DL", sets: mkSets(3, 5, 180, 1) },
            { id: "e5", name: "Incline DB Press", category: "ACC", sets: mkSets(3, 10, 32, 1) },
          ]},
          { id: "wk1d3", day: "Petak", date: "2026-04-10", completed: true, exercises: [
            { id: "e6", name: "Front Squat", category: "SQ", sets: mkSets(4, 6, 120, 1) },
            { id: "e7", name: "Bench Press", category: "BP", sets: mkSets(4, 6, 115, 1) },
          ]},
        ],
      },
      {
        id: "w2", number: 2, startDate: "2026-04-13", endDate: "2026-04-19", completed: true,
        workouts: [
          { id: "wk2d1", day: "Ponedjeljak", date: "2026-04-13", completed: true, exercises: [
            { id: "e8", name: "Squat", category: "SQ", sets: mkSets(4, 4, 170, 1) },
            { id: "e9", name: "Pause Bench", category: "BP", sets: mkSets(4, 4, 112, 1) },
          ]},
          { id: "wk2d2", day: "Srijeda", date: "2026-04-15", completed: true, exercises: [
            { id: "e10", name: "Deadlift", category: "DL", sets: mkSets(3, 4, 190, 1) },
          ]},
        ],
      },
      {
        id: "w3", number: 3, startDate: "2026-04-20", endDate: "2026-04-26", completed: false,
        workouts: [
          { id: "wk3d1", day: "Ponedjeljak", date: "2026-04-20", completed: true, exercises: [
            { id: "e11", name: "Squat", category: "SQ", sets: mkSets(5, 3, 180, 1) },
            { id: "e12", name: "Bench Press", category: "BP", sets: mkSets(5, 3, 122, 1) },
          ]},
          { id: "wk3d2", day: "Srijeda", date: "2026-04-22", completed: false, exercises: [
            { id: "e13", name: "Deadlift", category: "DL", sets: mkSets(4, 3, 205, 0.5) },
            { id: "e14", name: "OHP", category: "ACC", sets: mkSets(3, 8, 55, 0) },
          ]},
          { id: "wk3d3", day: "Petak", date: "2026-04-24", completed: false, exercises: [
            { id: "e15", name: "Front Squat", category: "SQ", sets: mkSets(4, 4, 135, 0) },
            { id: "e16", name: "Close-Grip Bench", category: "BP", sets: mkSets(3, 6, 105, 0) },
          ]},
        ],
      },
      {
        id: "w4", number: 4, startDate: "2026-04-27", endDate: "2026-05-03", completed: false,
        workouts: [
          { id: "wk4d1", day: "Ponedjeljak", date: "2026-04-27", completed: false, exercises: [
            { id: "e17", name: "Squat", category: "SQ", sets: mkSets(5, 2, 195, 0) },
            { id: "e18", name: "Bench Press", category: "BP", sets: mkSets(5, 2, 130, 0) },
          ]},
        ],
      },
    ],
  },
  {
    id: "b0",
    name: "Off-season Volume",
    startDate: "2026-02-01",
    endDate: "2026-04-05",
    weeks: [],
  },
];

export type UpcomingMeet = {
  name: string;
  date: string; // ISO date+time
};

export const MOCK_NEXT_MEET: UpcomingMeet = {
  name: "Adriatic Spring Open",
  date: "2026-05-23T10:00:00",
};

export type LiftKey = "SQ" | "BP" | "DL";
export const LIFT_META: Record<LiftKey, { label: string; color: string; oneRm: number }> = {
  SQ: { label: "ČUČANJ", color: "#6b8cff", oneRm: 215 },
  BP: { label: "BENCH",  color: "#f59e0b", oneRm: 142 },
  DL: { label: "MRTVO",  color: "#22c55e", oneRm: 245 },
};

export type Attempt = { id: string; weight: number; result: "good" | "no" | "pending" };
export const MOCK_ATTEMPTS: Record<LiftKey, Attempt[]> = {
  SQ: [
    { id: "a1", weight: 200, result: "good" },
    { id: "a2", weight: 212, result: "good" },
    { id: "a3", weight: 220, result: "pending" },
  ],
  BP: [
    { id: "b1", weight: 132, result: "good" },
    { id: "b2", weight: 140, result: "no" },
    { id: "b3", weight: 142, result: "pending" },
  ],
  DL: [
    { id: "d1", weight: 230, result: "pending" },
    { id: "d2", weight: 245, result: "pending" },
    { id: "d3", weight: 255, result: "pending" },
  ],
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("hr-HR", { day: "2-digit", month: "2-digit", year: "numeric" });

export const formatRange = (a: string, b: string) =>
  `${new Date(a).toLocaleDateString("hr-HR", { day: "2-digit", month: "2-digit" })} – ${new Date(b).toLocaleDateString("hr-HR", { day: "2-digit", month: "2-digit", year: "numeric" })}`;

// RPE % of 1RM table (Tuchscherer-style)
export const RPE_TABLE: Record<number, Record<number, number>> = {
  10:   { 1: 100, 2: 95.5, 3: 92.2, 4: 89.2, 5: 86.3, 6: 83.7, 8: 78.6 },
  9.5:  { 1: 97.8, 2: 93.9, 3: 90.7, 4: 87.8, 5: 85.0, 6: 82.3, 8: 77.4 },
  9:    { 1: 95.5, 2: 92.2, 3: 89.2, 4: 86.3, 5: 83.7, 6: 81.1, 8: 76.2 },
  8.5:  { 1: 93.9, 2: 90.7, 3: 87.8, 4: 85.0, 5: 82.3, 6: 79.9, 8: 75.1 },
  8:    { 1: 92.2, 2: 89.2, 3: 86.3, 4: 83.7, 5: 81.1, 6: 78.6, 8: 73.9 },
  7.5:  { 1: 90.7, 2: 87.8, 3: 85.0, 4: 82.3, 5: 79.9, 6: 77.4, 8: 72.3 },
  7:    { 1: 89.2, 2: 86.3, 3: 83.7, 4: 81.1, 5: 78.6, 6: 76.2, 8: 70.7 },
};
