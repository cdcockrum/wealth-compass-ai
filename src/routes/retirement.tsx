import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageHeader } from "@/components/wealth/PageHeader";
import { SectionCard } from "@/components/wealth/SectionCard";
import { Slider } from "@/components/ui/slider";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";
import { formatCurrency } from "@/hooks/use-format";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/retirement")({ component: Retirement });

function Retirement() {
  const [age, setAge] = useState(34);
  const [retireAge, setRetireAge] = useState(55);
  const [current, setCurrent] = useState(724);
  const [monthly, setMonthly] = useState(4500);
  const [returnRate, setReturnRate] = useState(7);

  const projection = useMemo(() => {
    const years = 65 - age;
    const data = [];
    let bal = current * 1000;
    for (let i = 0; i <= years; i++) {
      const r = returnRate / 100;
      if (i > 0) bal = bal * (1 + r) + monthly * 12;
      data.push({ age: age + i, value: bal, retired: age + i >= retireAge });
    }
    return data;
  }, [age, retireAge, current, monthly, returnRate]);

  const atRetirement = projection.find((p) => p.age === retireAge)?.value ?? 0;
  const safeIncome = atRetirement * 0.04;

  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader eyebrow="Retirement Planner" title="Chart your path to financial independence" description="Model your savings, run Monte Carlo simulations, and visualize the outcome." />

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Assumptions">
          <div className="space-y-6">
            {[
              { l: "Current age", v: age, set: setAge, min: 18, max: 65, s: `${age} years` },
              { l: "Retirement age", v: retireAge, set: setRetireAge, min: 40, max: 75, s: `${retireAge} years` },
              { l: "Current portfolio ($k)", v: current, set: setCurrent, min: 0, max: 5000, s: formatCurrency(current * 1000) },
              { l: "Monthly contribution", v: monthly, set: setMonthly, min: 0, max: 15000, s: formatCurrency(monthly) },
              { l: "Expected return", v: returnRate, set: setReturnRate, min: 3, max: 12, s: `${returnRate}%` },
            ].map((f) => (
              <div key={f.l}>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{f.l}</span><span className="font-medium tabular-nums">{f.s}</span></div>
                <Slider value={[f.v]} onValueChange={([x]) => f.set(x)} min={f.min} max={f.max} className="mt-2" />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Projection" className="lg:col-span-2">
          <div className="grid grid-cols-3 gap-4">
            <div><div className="text-xs text-muted-foreground">At retirement ({retireAge})</div><div className="mt-1 text-2xl font-semibold tabular-nums">{formatCurrency(atRetirement)}</div></div>
            <div><div className="text-xs text-muted-foreground">Safe annual income (4%)</div><div className="mt-1 text-2xl font-semibold tabular-nums text-success">{formatCurrency(safeIncome)}</div></div>
            <div><div className="text-xs text-muted-foreground">Confidence</div><div className="mt-1 flex items-center gap-2"><span className="text-2xl font-semibold">87%</span><Badge className="bg-success/15 text-success">On track</Badge></div></div>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer>
              <AreaChart data={projection}>
                <defs>
                  <linearGradient id="ret" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="age" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} formatter={(v: number) => formatCurrency(v)} />
                <ReferenceLine x={retireAge} stroke="var(--color-accent)" strokeDasharray="4 4" />
                <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fill="url(#ret)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <SectionCard title="Monte Carlo simulation">
          <div className="text-3xl font-semibold text-success">87%</div>
          <div className="mt-1 text-xs text-muted-foreground">Probability of success across 1,000 market simulations</div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
            <div><div className="text-muted-foreground">10th %</div><div className="mt-1 font-semibold tabular-nums">$1.8M</div></div>
            <div><div className="text-muted-foreground">50th %</div><div className="mt-1 font-semibold tabular-nums">$3.4M</div></div>
            <div><div className="text-muted-foreground">90th %</div><div className="mt-1 font-semibold tabular-nums">$6.2M</div></div>
          </div>
        </SectionCard>

        <SectionCard title="Timeline milestones">
          <div className="space-y-3 text-sm">
            {[["$1M net worth","age 40"],["$1.5M net worth","age 45"],["Financial independence","age 51"],["Optional retirement",`age ${retireAge}`],["Traditional retirement","age 65"]].map(([m,w]) => (
              <div key={m as string} className="flex justify-between border-b border-border/40 pb-2 last:border-0"><span>{m}</span><span className="text-muted-foreground">{w}</span></div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recommendations">
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" /><span>Max out Roth IRA ($7k/yr) — you have $6,200 of room.</span></li>
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /><span>Consider HSA as a stealth retirement vehicle.</span></li>
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" /><span>Increase equity allocation for your time horizon.</span></li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
