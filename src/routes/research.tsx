import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ResearchService } from "@/services";
import { PageHeader } from "@/components/wealth/PageHeader";
import { SectionCard } from "@/components/wealth/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Star,
  Sparkles,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Circle,
  FileText,
  ShieldCheck,
  Download,
  BookOpen,
} from "lucide-react";


export const Route = createFileRoute("/research")({ component: Research });

const researchSteps = [
  "Company Profile",
  "Financial Statements",
  "SEC Filings",
  "Industry Comparison",
  "Recent News",
  "Investment Thesis",
];

type StepStatus = "pending" | "running" | "complete";

const initialResearchSteps = [
  "Company Profile",
  "Financial Statements",
  "SEC Filings",
  "Industry Comparison",
  "Recent News",
  "Investment Thesis",
].map((label) => ({
  label,
  status: "complete" as StepStatus,
}));

function Research() {
  const [ticker, setTicker] = useState("AAPL");

  const { data: company } = useQuery({
    queryKey: ["company", ticker],
    queryFn: () => ResearchService.getCompany(ticker),
  });

  if (!company) return null;

  const upside = (((company.fairValue - company.price) / company.price) * 100).toFixed(1);

  const [steps, setSteps] = useState(initialResearchSteps);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = async () => {
    setIsAnalyzing(true);

    const resetSteps = initialResearchSteps.map((step) => ({
      ...step,
      status: "pending" as StepStatus,
    }));

    setSteps(resetSteps);

    for (let i = 0; i < resetSteps.length; i++) {
      setSteps((current) =>
        current.map((step, index) =>
          index === i ? { ...step, status: "running" } : step
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 500));

      setSteps((current) =>
        current.map((step, index) =>
          index === i ? { ...step, status: "complete" } : step
        )
      );
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader
        eyebrow="AI Research Terminal"
        title="Institutional-grade research for individual investors"
        description="Analyze companies through fundamentals, risks, valuation, competitive advantages, and AI-generated investment theses."
      />

      <SectionCard className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="Search ticker, company, ETF, or fund..."
              className="h-12 w-full rounded-xl border border-border/60 bg-secondary/40 pl-11 pr-4 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button size="lg" onClick={runAnalysis} disabled={isAnalyzing}>
            <Sparkles className="mr-2 h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
          <Button size="lg" variant="outline">
            <Star className="mr-2 h-4 w-4" />
            Watchlist
          </Button>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <SectionCard>
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-4xl font-semibold">{company.ticker}</h2>
                  <Badge className="bg-success/15 text-success">{company.analystRating}</Badge>
                  <Badge variant="outline">{company.sector}</Badge>
                </div>

                <div className="mt-2 text-muted-foreground">{company.name}</div>

                <div className="mt-5 flex flex-wrap items-baseline gap-4">
                  <span className="text-5xl font-semibold tabular-nums">${company.price}</span>
                  <span
                    className={`flex items-center gap-1 font-medium ${
                      company.change >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {company.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {company.change >= 0 ? "+" : ""}
                    {company.change}%
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-secondary/30 p-5 text-right">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Recommendation</div>
                <div className="mt-2 text-3xl font-semibold text-success">{company.analystRating}</div>
                <div className="mt-1 text-sm text-muted-foreground">84% confidence</div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Research progress" actions={<Sparkles className="h-4 w-4 text-primary" />}>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.label}
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3"
              >
                {step.status === "complete" ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : step.status === "running" ? (
                  <Sparkles className="h-5 w-5 animate-pulse text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}

                <span className="text-sm font-medium">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          </SectionCard>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Market Cap", company.marketCap],
              ["P/E Ratio", company.pe.toString()],
              ["Free Cash Flow", company.freeCashFlow],
              ["Dividend Yield", `${company.dividendYield}%`],
              ["Fair Value", `$${company.fairValue}`],
              ["Upside", `+${upside}%`],
            ].map(([label, value]) => (
              <SectionCard key={label}>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
              </SectionCard>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <SectionCard title="Company overview" className="lg:col-span-2">
              <p className="text-sm leading-6 text-muted-foreground">{company.description}</p>

              <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                <div>
                  <div className="text-xs text-muted-foreground">CEO</div>
                  <div className="font-medium">{company.ceo}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">HQ</div>
                  <div className="font-medium">{company.hq}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Employees</div>
                  <div className="font-medium">{company.employees}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Competitive advantages
                </div>
                <div className="flex flex-wrap gap-2">
                  {company.moats.map((m) => (
                    <Badge key={m} variant="outline" className="border-primary/30 text-primary">
                      {m}
                    </Badge>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="AI investment thesis" actions={<Sparkles className="h-4 w-4 text-primary" />}>
              <p className="text-sm leading-6 text-muted-foreground">{company.aiSummary}</p>
            </SectionCard>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <SectionCard title="Bull case" actions={<Badge className="bg-success/15 text-success">Bull</Badge>}>
              <ul className="space-y-3 text-sm">
                {company.bullCase.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Bear case" actions={<Badge className="bg-destructive/15 text-destructive">Bear</Badge>}>
              <ul className="space-y-3 text-sm">
                {company.bearCase.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <Circle className="mt-1 h-3 w-3 shrink-0 text-destructive" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Key risks">
              <ul className="space-y-3 text-sm">
                {company.risks.map((r, i) => (
                  <li key={i} className="flex gap-2 text-muted-foreground">
                    <Circle className="mt-1 h-3 w-3 shrink-0 text-warning" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        </div>

        <aside className="space-y-6">
          <SectionCard title="Research actions">
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Star className="mr-2 h-4 w-4" />
                Save to watchlist
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Save to notebook
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export report
              </Button>
            </div>
          </SectionCard>

          <SectionCard title="Evidence used" actions={<ShieldCheck className="h-4 w-4 text-success" />}>
            <div className="space-y-3 text-sm">
              {["Financial statements", "SEC 10-K", "Recent news", "Valuation model", "Analyst consensus"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Analyst consensus" actions={<FileText className="h-4 w-4 text-primary" />}>
            <div className="text-3xl font-semibold text-success">{company.analystRating}</div>
            <div className="mt-1 text-xs text-muted-foreground">Consensus of 42 analysts</div>

            <div className="mt-5 border-t border-border/50 pt-5">
              <div className="text-xs text-muted-foreground">Fair value estimate</div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">${company.fairValue}</div>
              <div className="text-xs text-success">+{upside}% estimated upside</div>
            </div>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}