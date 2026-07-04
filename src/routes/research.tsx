import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ResearchService } from "@/services";
import { PageHeader } from "@/components/wealth/PageHeader";
import { SectionCard } from "@/components/wealth/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Star, Sparkles, TrendingUp, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/research")({ component: Research });

function Research() {
  const [ticker, setTicker] = useState("AAPL");
  const { data: company } = useQuery({ queryKey: ["company", ticker], queryFn: () => ResearchService.getCompany(ticker) });

  if (!company) return null;

  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader
        eyebrow="AI Research Center"
        title="Deep-dive any asset"
        description="Fundamental, technical, and AI-generated analysis on stocks, ETFs, mutual funds, sectors, and economies."
      />

      <div className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Search company, ETF, sector, or economic indicator..."
            className="h-11 w-full rounded-xl border border-border/60 bg-secondary/40 pl-10 pr-3 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button size="lg" variant="outline"><Star className="mr-2 h-4 w-4" />Watchlist</Button>
      </div>

      <SectionCard>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-semibold">{company.ticker}</h2>
              <Badge className="bg-success/15 text-success">{company.analystRating}</Badge>
              <Badge variant="outline">{company.sector}</Badge>
            </div>
            <div className="mt-1 text-muted-foreground">{company.name}</div>
            <div className="mt-4 flex items-baseline gap-4">
              <span className="text-4xl font-semibold tabular-nums">${company.price}</span>
              <span className={`flex items-center gap-1 font-medium ${company.change >= 0 ? "text-success" : "text-destructive"}`}>
                {company.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {company.change >= 0 ? "+" : ""}{company.change}%
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
            {[
              ["Market cap", company.marketCap], ["P/E", company.pe.toString()],
              ["Dividend", `${company.dividendYield}%`], ["Fair value", `$${company.fairValue}`],
              ["Free cash flow", company.freeCashFlow], ["Employees", company.employees],
            ].map(([k, v]) => (
              <div key={k}><div className="text-xs text-muted-foreground">{k}</div><div className="font-medium tabular-nums">{v}</div></div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Company overview" className="lg:col-span-2">
          <p className="text-sm text-muted-foreground">{company.description}</p>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div><div className="text-xs text-muted-foreground">CEO</div><div className="font-medium">{company.ceo}</div></div>
            <div><div className="text-xs text-muted-foreground">HQ</div><div className="font-medium">{company.hq}</div></div>
            <div><div className="text-xs text-muted-foreground">Employees</div><div className="font-medium">{company.employees}</div></div>
          </div>
          <div className="mt-6">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Competitive advantages</div>
            <div className="flex flex-wrap gap-2">
              {company.moats.map((m) => <Badge key={m} variant="outline" className="border-primary/30 text-primary">{m}</Badge>)}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="AI summary" actions={<Sparkles className="h-4 w-4 text-primary" />}>
          <p className="text-sm text-muted-foreground">{company.aiSummary}</p>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Financial statements">
          <dl className="space-y-3 text-sm">
            {[
              ["Revenue growth", `${company.revenueGrowth}%`],
              ["Gross margin", `${company.grossMargin}%`],
              ["Net margin", `${company.netMargin}%`],
              ["Debt / Equity", company.debtToEquity.toString()],
              ["Free cash flow", company.freeCashFlow],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border/40 pb-2 last:border-0">
                <dt className="text-muted-foreground">{k}</dt><dd className="font-medium tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </SectionCard>

        <SectionCard title="Bull case" actions={<Badge className="bg-success/15 text-success">Bull</Badge>}>
          <ul className="space-y-2 text-sm">
            {company.bullCase.map((b, i) => <li key={i} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" /><span>{b}</span></li>)}
          </ul>
        </SectionCard>

        <SectionCard title="Bear case" actions={<Badge className="bg-destructive/15 text-destructive">Bear</Badge>}>
          <ul className="space-y-2 text-sm">
            {company.bearCase.map((b, i) => <li key={i} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" /><span>{b}</span></li>)}
          </ul>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <SectionCard title="Key risks">
          <ul className="space-y-2 text-sm">
            {company.risks.map((r, i) => <li key={i} className="flex gap-2 text-muted-foreground"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" /><span>{r}</span></li>)}
          </ul>
        </SectionCard>
        <SectionCard title="Analyst consensus">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-semibold text-success">{company.analystRating}</div>
              <div className="mt-1 text-xs text-muted-foreground">Consensus of 42 analysts</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Fair value estimate</div>
              <div className="text-2xl font-semibold tabular-nums">${company.fairValue}</div>
              <div className="text-xs text-success">+{(((company.fairValue - company.price) / company.price) * 100).toFixed(1)}% upside</div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
