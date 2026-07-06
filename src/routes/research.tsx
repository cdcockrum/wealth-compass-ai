import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { ResearchConsole } from "@/components/research/ResearchConsole";
import { runWorkflow } from "@/engine";
import { researchWorkflow } from "@/engine/workflows";
import type { ResearchLogMessage } from "@/components/research/researchLogTypes";
import { ResearchReport } from "@/components/research/ResearchReport";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { useCompanyMetrics } from "@/hooks/useCompanyMetrics";


export const Route = createFileRoute("/research")({
  component: Research,
});


function Research() {
  const [ticker, setTicker] = useState("AAPL");
  const {
  data: company,
  isLoading: companyLoading,
  error: companyError,
} = useCompanyProfile(ticker);
  const {
  data: metrics,
  isLoading: metricsLoading,
  error: metricsError,

} = useCompanyMetrics(ticker);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [logs, setLogs] = useState<ResearchLogMessage[]>([]);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setLogs([]);

    await runWorkflow(researchWorkflow, (event) => {
      setLogs((current) => [
        ...current,
        {
          id: event.id,
          timestamp: event.timestamp,
          message: event.message,
          level:
            event.type === "completed"
              ? "success"
              : event.type === "step_failed"
                ? "error"
                : "info",
        },
      ]);
    });

    setIsAnalyzing(false);
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          AI Research Terminal
        </p>
        <h1 className="mt-2 text-4xl font-semibold">
          Evidence-based investment research
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Search a company and watch the research engine build a thesis from
          fundamentals, filings, news, and valuation signals.
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={ticker}
              onChange={(event) => setTicker(event.target.value.toUpperCase())}
              className="h-12 w-full rounded-xl border border-border/60 bg-secondary/40 pl-11 pr-4 text-sm outline-none ring-0 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              placeholder="Enter ticker, e.g. AAPL, MSFT, COST"
            />
          </div>

          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>

      <ResearchConsole
        ticker={ticker}
        analyzing={isAnalyzing}
        steps={[]}
        logs={logs}
      />

      {companyLoading && logs.length > 0 && (
        <div className="rounded-xl border border-border/60 bg-card p-4 text-sm text-muted-foreground">
          Loading company profile...
        </div>
      )}

      {companyError && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          Could not load company profile. Check your FMP API key and ticker symbol.
        </div>
      )}

      
      {company && metrics && !isAnalyzing && (
        <ResearchReport
          company={company}
          metrics={metrics}
        />
      )}
      
    </div>
  );
}