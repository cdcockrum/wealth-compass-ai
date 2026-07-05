import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { ResearchConsole } from "@/components/research/ResearchConsole";
import { runWorkflow } from "@/engine";
import { researchWorkflow } from "@/engine/workflows";
import type { ResearchLogMessage } from "@/components/research/researchLogTypes";

export const Route = createFileRoute("/research")({
  component: Research,
});

type StepStatus = "pending" | "running" | "complete";

const researchSteps = [
  "Identifying company",
  "Loading market data",
  "Loading financial statements",
  "Reading SEC filings",
  "Analyzing recent news",
  "Generating investment thesis",
];

function Research() {
  const [ticker, setTicker] = useState("AAPL");
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
    </div>
  );
}