import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PortfolioService } from "@/services";
import { PageHeader } from "@/components/wealth/PageHeader";
import { SectionCard } from "@/components/wealth/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Sparkles } from "lucide-react";
import {
  Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
} from "recharts";
import { formatCurrency } from "@/hooks/use-format";

export const Route = createFileRoute("/portfolio")({ component: Portfolio });

function Portfolio() {
  const { data: holdings = [] } = useQuery({ queryKey: ["holdings"], queryFn: PortfolioService.getHoldings });
  const { data: allocation = [] } = useQuery({ queryKey: ["alloc"], queryFn: PortfolioService.getAllocation });
  const { data: sectors = [] } = useQuery({ queryKey: ["sectors"], queryFn: PortfolioService.getSectors });

  const total = holdings.reduce((s, h) => s + h.value, 0);
  const dayChange = holdings.reduce((s, h) => s + h.value * (h.dayChange / 100), 0);

  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader
        eyebrow="Portfolio"
        title="Holdings & allocation"
        description="Import brokerages, track every position, and see AI-driven allocation recommendations."
        actions={
          <>
            <Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" />Import holdings</Button>
            <Button size="sm"><Sparkles className="mr-2 h-4 w-4" />Get recommendations</Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <SectionCard title="Total value"><div className="text-3xl font-semibold tabular-nums">{formatCurrency(total)}</div><div className="mt-1 text-xs text-success">+{formatCurrency(dayChange)} today</div></SectionCard>
        <SectionCard title="Positions"><div className="text-3xl font-semibold tabular-nums">{holdings.length}</div><div className="mt-1 text-xs text-muted-foreground">Across 3 accounts</div></SectionCard>
        <SectionCard title="Dividend yield"><div className="text-3xl font-semibold tabular-nums">1.82%</div><div className="mt-1 text-xs text-muted-foreground">Est. ${(total * 0.0182).toFixed(0)}/yr</div></SectionCard>
        <SectionCard title="Expense ratio"><div className="text-3xl font-semibold tabular-nums">0.08%</div><div className="mt-1 text-xs text-success">Excellent</div></SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Allocation">
          <div className="h-56">
            <ResponsiveContainer><PieChart><Pie data={allocation} innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
              {allocation.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie><Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} /></PieChart></ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Sector exposure" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer><BarChart data={sectors} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={90} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
            </BarChart></ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Holdings" padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3">Ticker</th>
                  <th className="py-3">Sector</th>
                  <th className="py-3 text-right">Shares</th>
                  <th className="py-3 text-right">Price</th>
                  <th className="py-3 text-right">Value</th>
                  <th className="py-3 text-right">Alloc</th>
                  <th className="px-6 py-3 text-right">Day</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => (
                  <tr key={h.ticker} className="border-b border-border/40 transition-colors hover:bg-secondary/30">
                    <td className="px-6 py-3">
                      <div className="font-semibold">{h.ticker}</div>
                      <div className="text-xs text-muted-foreground">{h.name}</div>
                    </td>
                    <td className="py-3"><Badge variant="outline" className="border-border/60">{h.sector}</Badge></td>
                    <td className="py-3 text-right tabular-nums">{h.shares}</td>
                    <td className="py-3 text-right tabular-nums">${h.price.toFixed(2)}</td>
                    <td className="py-3 text-right font-medium tabular-nums">{formatCurrency(h.value)}</td>
                    <td className="py-3 text-right tabular-nums">{h.allocation}%</td>
                    <td className={`px-6 py-3 text-right tabular-nums font-medium ${h.dayChange >= 0 ? "text-success" : "text-destructive"}`}>
                      {h.dayChange >= 0 ? "+" : ""}{h.dayChange.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <SectionCard title="Risk metrics">
          <dl className="space-y-3 text-sm">
            {[["Beta","1.02"],["Sharpe ratio","1.34"],["Std deviation","14.2%"],["Max drawdown","-18.4%"]].map(([k,v]) => (
              <div key={k} className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium tabular-nums">{v}</dd></div>
            ))}
          </dl>
        </SectionCard>
        <SectionCard title="Geographic exposure">
          <div className="space-y-2">
            {[["United States",72],["Europe",12],["Asia-Pacific",10],["Emerging",6]].map(([n,v]) => (
              <div key={n as string}>
                <div className="flex justify-between text-xs"><span>{n}</span><span className="text-muted-foreground">{v}%</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${v}%` }} /></div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="AI recommendations" actions={<Sparkles className="h-4 w-4 text-primary" />}>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" /><span>Trim NVDA by ~30% to reduce single-name risk.</span></li>
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /><span>Add international exposure via VXUS or IEFA.</span></li>
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" /><span>Consider bond ladder for stability as retirement nears.</span></li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
