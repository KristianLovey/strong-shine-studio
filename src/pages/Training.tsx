import { useMemo, useState } from "react";
import { TrainingTabs } from "@/components/training/TrainingTabs";
import { ProgramHero } from "@/components/training/ProgramHero";
import { BlockSelectorBar } from "@/components/training/BlockSelectorBar";
import { WeekPanel } from "@/components/training/WeekPanel";
import { HubTab } from "@/components/training/HubTab";
import { MeetDayTab } from "@/components/training/MeetDayTab";
import { CountdownBanner } from "@/components/training/CountdownBanner";
import { MOCK_BLOCKS, MOCK_NEXT_MEET } from "@/components/training/data";

const TABS = [
  { id: "program", label: "PROGRAM" },
  { id: "hub",     label: "HUB & ALATI" },
  { id: "meet",    label: "MEET DAY" },
];

const Training = () => {
  const [tab, setTab] = useState("program");
  const [activeBlockId, setActiveBlockId] = useState(MOCK_BLOCKS[0].id);
  const [blocks, setBlocks] = useState(MOCK_BLOCKS);

  const activeBlock = blocks.find((b) => b.id === activeBlockId) ?? blocks[0];

  const stats = useMemo(() => {
    const totalSets = activeBlock.weeks.reduce(
      (acc, w) => acc + w.workouts.reduce((a, wo) => a + wo.exercises.reduce((s, e) => s + e.sets.length, 0), 0),
      0
    );
    const doneSets = activeBlock.weeks.reduce(
      (acc, w) => acc + w.workouts.reduce((a, wo) => a + wo.exercises.reduce((s, e) => s + e.sets.filter((x) => x.done).length, 0), 0),
      0
    );
    const totalWorkouts = activeBlock.weeks.reduce((a, w) => a + w.workouts.length, 0);
    const pct = totalSets ? Math.round((doneSets / totalSets) * 100) : 0;
    return [
      { label: "TJEDANA", value: String(activeBlock.weeks.length) },
      { label: "TRENINGA", value: String(totalWorkouts) },
      { label: "SERIJA", value: `${doneSets}/${totalSets}`, accent: true },
      { label: "NAPREDAK", value: `${pct}%`, accent: true },
    ];
  }, [activeBlock]);

  const handleRename = (name: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === activeBlockId ? { ...b, name } : b)));
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background layers */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(79,70,229,0.22) 0%, rgba(99,102,241,0.1) 35%, transparent 68%), #04040a",
          filter: "blur(60px)",
          transform: "rotate(-15deg) scale(1.2)",
          width: "85vw",
          height: "85vh",
        }}
      />
      <div
        style={{
          position: "fixed",
          right: "-10%",
          bottom: "-10%",
          width: "70vw",
          height: "70vh",
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 60% 60%, rgba(109,40,217,0.14) 0%, rgba(79,70,229,0.06) 40%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%)",
          background: "#04040a",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.3,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
          backgroundSize: "200px",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 56,
          height: 1,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.65) 25%, rgba(139,92,246,0.85) 50%, rgba(99,102,241,0.65) 75%, transparent)",
          boxShadow: "0 0 50px 10px rgba(99,102,241,0.2)",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6 md:space-y-8">
        <CountdownBanner meet={MOCK_NEXT_MEET} />
        <TrainingTabs tabs={TABS} active={tab} onChange={setTab} />

        {tab === "program" && (
          <div className="space-y-5 md:space-y-6">
            <ProgramHero athleteName="Marin Kovačević" stats={stats} />
            <BlockSelectorBar
              blocks={blocks}
              activeId={activeBlockId}
              onSelectBlock={setActiveBlockId}
              onRename={handleRename}
            />
            <div>
              {activeBlock.weeks.map((w, i) => (
                <WeekPanel key={w.id} week={w} index={i} />
              ))}
              {activeBlock.weeks.length === 0 && (
                <div
                  className="text-center py-16"
                  style={{
                    fontFamily: "var(--fm)",
                    color: "rgba(255,255,255,0.35)",
                    fontSize: "0.85rem",
                  }}
                >
                  Ovaj blok nema tjedana
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "hub" && <HubTab />}
        {tab === "meet" && <MeetDayTab />}
      </div>
    </main>
  );
};

export default Training;
