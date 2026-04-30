import { useState } from "react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PillTabs } from "@/components/profile/PillTabs";
import { ProgressChart } from "@/components/profile/ProgressChart";
import { MuscleDonut } from "@/components/profile/MuscleDonut";
import { CompetitionTable } from "@/components/profile/CompetitionTable";
import { PersonalRecordsTab } from "@/components/profile/PersonalRecordsTab";
import { Leaderboard } from "@/components/profile/Leaderboard";
import { AvatarPicker } from "@/components/profile/AvatarPicker";
import type { AvatarKey } from "@/components/profile/AvatarIcon";
import { MOCK_COMPS, MOCK_LEADERBOARD, MOCK_PRS, type Lift, type PrEntry, type RepCount } from "@/components/profile/data";

const TABS = [
  { id: "napredak", label: "NAPREDAK" },
  { id: "pr",       label: "OSOBNI REKORDI" },
  { id: "lb",       label: "LEADERBOARD" },
];

const Index = () => {
  const [tab, setTab] = useState("napredak");
  const [avatar, setAvatar] = useState<AvatarKey>("rocket");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [prs, setPrs] = useState<PrEntry[]>(MOCK_PRS);

  const [stats, setStats] = useState({
    sq: 215, bp: 142, dl: 245, sex: "M" as "M" | "F", bodyWeight: 93,
  });

  const handleAddPr = (e: { lift: Lift; reps: RepCount; weight: number; date: string }) => {
    setPrs((prev) => [
      { id: `n-${Date.now()}`, lift: e.lift, reps: e.reps, weight: e.weight, date: e.date, source: "Trening" },
      ...prev,
    ]);
  };

  const handleDeletePr = (id: string) => setPrs((prev) => prev.filter((p) => p.id !== id));

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="app-bg" />
      <div className="noise" />
      <div className="top-beam" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6 md:space-y-8">
        <ProfileHeader
          name="Marin Kovačević"
          role="ATLETA"
          weightClass="−93 kg"
          avatar={avatar}
          onAvatarClick={() => setPickerOpen(true)}
          sq={stats.sq}
          bp={stats.bp}
          dl={stats.dl}
          sex={stats.sex}
          bodyWeight={stats.bodyWeight}
          onSave={(v) => setStats(v)}
        />

        <PillTabs tabs={TABS} active={tab} onChange={setTab} />

        {tab === "napredak" && (
          <div className="space-y-5 md:space-y-6">
            <ProgressChart prs={prs} />
            <MuscleDonut />
            <CompetitionTable comps={MOCK_COMPS} />
          </div>
        )}

        {tab === "pr" && (
          <PersonalRecordsTab prs={prs} onAdd={handleAddPr} onDelete={handleDeletePr} />
        )}

        {tab === "lb" && <Leaderboard entries={MOCK_LEADERBOARD} />}
      </div>

      <AvatarPicker
        open={pickerOpen}
        current={avatar}
        onSelect={setAvatar}
        onClose={() => setPickerOpen(false)}
      />
    </main>
  );
};

export default Index;
