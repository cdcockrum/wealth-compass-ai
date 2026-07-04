import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  PortfolioService, InsightsService, MarketService, NewsService,
  GoalService, OpportunityService, EconomicService,
} from "@/services";
import { PageHeader } from "@/components/wealth/PageHeader";
import { MetricCard } from "@/components/wealth/MetricCard";
import { SectionCard } from "@/components/wealth/SectionCard";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell,
} from "recharts";
import { Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/hooks/use-format";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: metrics = [] } = useQuery({ queryKey: ["metrics"], queryFn: PortfolioService.getMetrics });
  const { data: series = [] } = useQuery({ queryKey: ["nw-series"], queryFn: PortfolioService.getNetWorthSeries });
  const { data: allocation = [] } = useQuery({ queryKey: ["alloc"], queryFn: PortfolioService.getAllocation });
  const { data: insights = [] } = useQuery({ queryKey: ["insights"], queryFn: InsightsService.getRecent });
  const { data: indices = [] } = useQuery({ queryKey: ["indices"], queryFn: MarketService.getIndices });
  const { data: news = [] } = useQuery({ queryKey: ["news"], queryFn: NewsService.getLatest });
  const { data: goals = [] } = useQuery({ queryKey: ["goals"], queryFn: GoalService.list });
  const { data: opps = [] } = useQuery({ queryKey: ["opps"], queryFn: OpportunityService.scan });
  const { data: econ = [] } = useQuery({ queryKey: ["econ"], queryFn: EconomicService.getIndicators });

  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader
        eyebrow="Good morning, Jordan"
        title="Your wealth at a glance"
        description="A live view of your net worth, holdings, and AI-generated insights across every account."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {metrics.map((m, i) => <MetricCard key={m.label} metric={m} index={i} />)}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <SectionCard
          className="lg:col-span-2"
          title="Net worth"
          subtitle="24-month trajectory"
          actions={<Badge variant="secondary" className="bg-success/15 text-success">+24.6% YoY</Badge>}
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="nw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
                  formatter={(v: number) => formatCurrency(v)}
                />
                <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fill="url(#nw)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Portfolio allocation" subtitle="Across all accounts">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={allocation} innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value">
                  {allocation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            {allocation.map((a) => (
              <div key={a.name} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: a.color }} />
                <span className="text-muted-foreground">{a.name}</span>
                <span className="ml-auto font-medium">{a.value}%</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard
          className="lg:col-span-2"
          title="Recent AI insights"
          subtitle="Generated by your agents"
          actions={<Sparkles className="h-4 w-4 text-primary" />}
        >
          <div className="divide-y divide-border/60">
            {insights.map((it) => (
              <div key={it.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  it.severity === "warn" ? "bg-warning" : it.severity === "success" ? "bg-success" : "bg-accent"
                }`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-border/60 text-[10px] uppercase tracking-wider">{it.agent}</Badge>
                    <span className="text-xs text-muted-foreground">{it.time} ago</span>
                  </div>
                  <div className="mt-1.5 text-sm font-medium">{it.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{it.body}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Market summary">
          <div className="space-y-3">
            {indices.slice(0, 6).map((i) => (
              <div key={i.name} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{i.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-medium tabular-nums">{i.value.toLocaleString()}</span>
                  <span className={`flex items-center gap-0.5 text-xs font-medium tabular-nums ${i.change >= 0 ? "text-success" : "text-destructive"}`}>
                    {i.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {i.change >= 0 ? "+" : ""}{i.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Economic snapshot">
          <div className="grid grid-cols-2 gap-4">
            {econ.map((e) => (
              <div key={e.label}>
                <div className="text-xs text-muted-foreground">{e.label}</div>
                <div className="mt-1 text-lg font-semibold tabular-nums">{e.value}</div>
                <div className={`text-xs ${e.trend === "up" ? "text-warning" : e.trend === "down" ? "text-success" : "text-muted-foreground"}`}>{e.change}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Goal progress">
          <div className="space-y-4">
            {goals.slice(0, 4).map((g) => {
              const pct = Math.min(100, (g.current / g.target) * 100);
              return (
                <div key={g.id}>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">{g.name}</span>
                    <span className="text-muted-foreground tabular-nums">{formatCurrency(g.current)} / {formatCurrency(g.target)}</span>
                  </div>
                  <Progress value={pct} className="mt-2 h-1.5" />
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Latest news">
          <div className="space-y-3">
            {news.slice(0, 5).map((n) => (
              <div key={n.id} className="border-l-2 border-border/60 pl-3">
                <div className="text-sm leading-snug">{n.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{n.source} · {n.time} ago</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Top opportunities" subtitle="Scanned by AI across your investable universe">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {opps.slice(0, 4).map((o) => (
              <div key={o.id} className="rounded-xl border border-border/60 bg-secondary/30 p-4 transition-colors hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{o.ticker}</span>
                  <Badge variant="outline" className="border-primary/40 text-[10px] text-primary">{o.category}</Badge>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">{o.name}</div>
                <p className="mt-3 line-clamp-3 text-xs text-muted-foreground">{o.thesis}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-success font-medium">+{o.upside}% upside</span>
                  <span className="text-muted-foreground">Score {o.score}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
