import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BusinessService } from "@/services";
import { PageHeader } from "@/components/wealth/PageHeader";
import { SectionCard } from "@/components/wealth/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/hooks/use-format";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/business")({ component: BusinessRoute });

const revSeries = Array.from({ length: 12 }, (_, i) => ({ m: i, v: 12000 + i * 1400 + Math.sin(i) * 900 }));

function BusinessRoute() {
  const { data: businesses = [] } = useQuery({ queryKey: ["businesses"], queryFn: BusinessService.list });

  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader
        eyebrow="Business Center"
        title="Track & grow your businesses"
        description="Revenue, expenses, KPIs, and AI-estimated valuations for every business you own."
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />Add business</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {businesses.map((b) => (
          <div key={b.id} className="surface-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-semibold">{b.name}</div>
                <Badge variant="outline" className="mt-1">{b.industry}</Badge>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Est. valuation</div>
                <div className="text-2xl font-semibold text-gradient-primary">{formatCurrency(b.valuation)}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-secondary/40 p-3"><div className="text-xs text-muted-foreground">Revenue</div><div className="mt-1 text-lg font-semibold tabular-nums">{formatCurrency(b.revenue)}</div></div>
              <div className="rounded-lg bg-secondary/40 p-3"><div className="text-xs text-muted-foreground">Expenses</div><div className="mt-1 text-lg font-semibold tabular-nums">{formatCurrency(b.expenses)}</div></div>
              <div className="rounded-lg bg-secondary/40 p-3"><div className="text-xs text-muted-foreground">Profit</div><div className="mt-1 text-lg font-semibold tabular-nums text-success">{formatCurrency(b.profit)}</div></div>
            </div>

            <div className="mt-4 h-24">
              <ResponsiveContainer><AreaChart data={revSeries}>
                <defs><linearGradient id={`biz${b.id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5}/><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0}/></linearGradient></defs>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} formatter={(v: number) => formatCurrency(v)} />
                <Area type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={2} fill={`url(#biz${b.id})`} />
              </AreaChart></ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
              <div className="flex gap-4">
                {b.kpis.map((k) => (
                  <div key={k.label}><div className="text-xs text-muted-foreground">{k.label}</div><div className="text-sm font-semibold">{k.value}</div></div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-success"><TrendingUp className="h-4 w-4" />+{b.growth}% YoY</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
