import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/wealth/PageHeader";
import { SectionCard } from "@/components/wealth/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar } from "lucide-react";
import { formatCurrency } from "@/hooks/use-format";

export const Route = createFileRoute("/tax")({ component: Tax });

const harvestable = [
  { ticker: "PYPL", name: "PayPal", loss: -820, potential: 246 },
  { ticker: "DIS", name: "Disney", loss: -640, potential: 192 },
  { ticker: "INTC", name: "Intel", loss: -720, potential: 216 },
];

const limits = [
  { label: "401(k)", used: 12400, limit: 23000 },
  { label: "Roth IRA", used: 800, limit: 7000 },
  { label: "HSA", used: 3200, limit: 4150 },
  { label: "529 Plan", used: 4000, limit: 18000 },
];

const reminders = [
  { date: "Apr 15", event: "Federal tax filing deadline" },
  { date: "Jun 15", event: "Q2 estimated payments due" },
  { date: "Sep 15", event: "Q3 estimated payments due" },
  { date: "Dec 31", event: "Last day to harvest tax losses" },
];

function Tax() {
  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader eyebrow="Tax Center" title="Optimize after-tax wealth" description="Estimated liability, harvesting opportunities, contribution room, and key deadlines." />

      <div className="grid gap-4 md:grid-cols-4">
        <SectionCard title="Est. capital gains tax"><div className="text-3xl font-semibold tabular-nums">$8,420</div><div className="mt-1 text-xs text-muted-foreground">This tax year</div></SectionCard>
        <SectionCard title="Est. dividend tax"><div className="text-3xl font-semibold tabular-nums">$1,320</div><div className="mt-1 text-xs text-muted-foreground">Qualified: 82%</div></SectionCard>
        <SectionCard title="Harvestable losses"><div className="text-3xl font-semibold tabular-nums text-success">$2,180</div><div className="mt-1 text-xs text-muted-foreground">Across 3 positions</div></SectionCard>
        <SectionCard title="Effective rate"><div className="text-3xl font-semibold tabular-nums">21.4%</div><div className="mt-1 text-xs text-muted-foreground">Federal + state blend</div></SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Tax-loss harvesting" subtitle="Positions with unrealized losses" actions={<Sparkles className="h-4 w-4 text-primary" />}>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border/60"><th className="py-2 text-left">Position</th><th className="text-right">Loss</th><th className="text-right">Tax savings</th></tr>
            </thead>
            <tbody>
              {harvestable.map((h) => (
                <tr key={h.ticker} className="border-b border-border/40">
                  <td className="py-3"><div className="font-medium">{h.ticker}</div><div className="text-xs text-muted-foreground">{h.name}</div></td>
                  <td className="py-3 text-right text-destructive tabular-nums">{formatCurrency(h.loss)}</td>
                  <td className="py-3 text-right text-success tabular-nums">+{formatCurrency(h.potential)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="Contribution room">
          <div className="space-y-4">
            {limits.map((l) => {
              const pct = (l.used / l.limit) * 100;
              const remaining = l.limit - l.used;
              return (
                <div key={l.label}>
                  <div className="flex justify-between text-sm"><span className="font-medium">{l.label}</span><span className="text-muted-foreground tabular-nums">{formatCurrency(l.used)} / {formatCurrency(l.limit)}</span></div>
                  <div className="mt-2 h-1.5 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
                  <div className="mt-1 text-xs text-success">{formatCurrency(remaining)} of room remaining</div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Tax deadlines & reminders">
          <div className="grid gap-3 md:grid-cols-4">
            {reminders.map((r, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-secondary/30 p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="h-3.5 w-3.5" />{r.date}</div>
                <div className="mt-2 text-sm font-medium">{r.event}</div>
                <Badge variant="outline" className="mt-3 border-warning/40 text-warning">Upcoming</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
