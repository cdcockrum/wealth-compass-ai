import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MarketService, NewsService } from "@/services";
import { PageHeader } from "@/components/wealth/PageHeader";
import { SectionCard } from "@/components/wealth/SectionCard";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/market")({ component: Market });

const calendar = [
  { date: "Wed", event: "FOMC Statement", impact: "High", time: "2:00 PM" },
  { date: "Thu", event: "Initial Jobless Claims", impact: "Med", time: "8:30 AM" },
  { date: "Thu", event: "GDP Q3 (adv)", impact: "High", time: "8:30 AM" },
  { date: "Fri", event: "PCE Price Index", impact: "High", time: "8:30 AM" },
  { date: "Fri", event: "U. of Mich. Sentiment", impact: "Med", time: "10:00 AM" },
];

function Market() {
  const { data: indices = [] } = useQuery({ queryKey: ["indices"], queryFn: MarketService.getIndices });
  const { data: econ = [] } = useQuery({ queryKey: ["indicators"], queryFn: MarketService.getIndicators });
  const { data: news = [] } = useQuery({ queryKey: ["news"], queryFn: NewsService.getLatest });

  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader eyebrow="Market Center" title="Global market pulse" description="Indices, rates, commodities, macro data, and the news that moves them." />

      <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
        {indices.map((i) => (
          <div key={i.name} className="surface-card p-4">
            <div className="text-xs text-muted-foreground">{i.name}</div>
            <div className="mt-1 text-lg font-semibold tabular-nums">{i.value.toLocaleString()}</div>
            <div className={`mt-1 flex items-center gap-0.5 text-xs font-medium ${i.change >= 0 ? "text-success" : "text-destructive"}`}>
              {i.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {i.change >= 0 ? "+" : ""}{i.change.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Economic indicators" className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {econ.map((e) => (
              <div key={e.label}>
                <div className="text-xs text-muted-foreground">{e.label}</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums">{e.value}</div>
                <div className={`text-xs ${e.trend === "up" ? "text-warning" : e.trend === "down" ? "text-success" : "text-muted-foreground"}`}>{e.change}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Economic calendar">
          <div className="space-y-3">
            {calendar.map((c, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-10 shrink-0 rounded-md bg-secondary/60 py-1 text-center text-xs font-medium">{c.date}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm">{c.event}</div>
                  <div className="text-xs text-muted-foreground">{c.time}</div>
                </div>
                <Badge variant="outline" className={c.impact === "High" ? "border-destructive/40 text-destructive" : "border-border/60"}>{c.impact}</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Latest financial news">
          <div className="grid gap-4 md:grid-cols-2">
            {news.map((n) => (
              <div key={n.id} className="rounded-xl border border-border/60 bg-secondary/30 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-medium leading-snug">{n.title}</div>
                  <Badge variant="outline" className={
                    n.sentiment === "positive" ? "border-success/40 text-success" :
                    n.sentiment === "negative" ? "border-destructive/40 text-destructive" : "border-border/60"
                  }>{n.sentiment}</Badge>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{n.source} · {n.time} ago</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
