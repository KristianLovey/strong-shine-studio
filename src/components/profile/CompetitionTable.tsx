import { cn } from "@/lib/utils";
import { formatDate, type Competition } from "./data";

type Props = { comps: Competition[] };

export function CompetitionTable({ comps }: Props) {
  return (
    <section className="glass p-5 md:p-6 animate-fade-up">
      <h3 className="text-display font-bold text-lg tracking-tight mb-4">NATJECANJA</h3>
      {comps.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground text-sm">
          Admin još nije ulogirao tvoje natjecateljske rezultate.
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-thin -mx-2">
          <table className="w-full text-sm tabular border-separate border-spacing-y-1.5 px-2">
            <thead>
              <tr className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground text-left">
                <th className="font-medium px-3 py-2">Natjecanje</th>
                <th className="font-medium px-3 py-2">Datum</th>
                <th className="font-medium px-3 py-2 text-right">SQ</th>
                <th className="font-medium px-3 py-2 text-right">BP</th>
                <th className="font-medium px-3 py-2 text-right">DL</th>
                <th className="font-medium px-3 py-2 text-right">Total</th>
                <th className="font-medium px-3 py-2 text-center">Mj.</th>
                <th className="font-medium px-3 py-2 hidden md:table-cell">Bilješka</th>
              </tr>
            </thead>
            <tbody>
              {comps.map((c) => (
                <tr key={c.id} className="bg-white/[0.025] hover:bg-white/[0.06] transition-colors">
                  <td className="px-3 py-3 rounded-l-xl font-medium text-foreground">{c.name}</td>
                  <td className="px-3 py-3 text-muted-foreground">{formatDate(c.date)}</td>
                  <td className="px-3 py-3 text-right" style={{ color: "hsl(var(--sq))" }}>{c.sq}</td>
                  <td className="px-3 py-3 text-right" style={{ color: "hsl(var(--bp))" }}>{c.bp}</td>
                  <td className="px-3 py-3 text-right" style={{ color: "hsl(var(--dl))" }}>{c.dl}</td>
                  <td className="px-3 py-3 text-right font-bold text-foreground">{c.total}</td>
                  <td className={cn(
                    "px-3 py-3 text-center font-bold",
                    c.place === 1 ? "text-gold" : c.place === 2 ? "text-silver" : c.place === 3 ? "text-bronze" : "text-foreground"
                  )}>
                    {c.place}.
                  </td>
                  <td className="px-3 py-3 rounded-r-xl text-muted-foreground hidden md:table-cell">{c.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
