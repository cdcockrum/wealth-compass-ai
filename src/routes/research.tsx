import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, CheckCircle2, Circle } from "lucide-react";

export const Route = createFileRoute("/research")({
  component: Research,
});

type StepStatus = "pending" | "running" | "complete";

const researchSteps = [
  "Loading company profile",
  "Reviewing financial statements",
  "Scanning SEC filings",
  "Comparing industry peers",
  "Reading recent news",
  "Generating investment thesis",
];

function Research() {
  const [ticker, setTicker] = useState("AAPL");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [steps, setSteps] = useState(
    researchSteps.map((label) => ({
      label,
      status: "complete" as StepStatus,
    }))
  );

  const runAnalysis = async () => {
    setIsAnalyzing(true);

    const resetSteps = researchSteps.map((label) => ({
      label,
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

      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Research Console</h2>
            <p className="text-sm text-muted-foreground">
              {isAnalyzing
                ? `Researching ${ticker}...`
                : `Ready to analyze ${ticker}`}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-black/30 p-4 font-mono text-sm">
          <div className="space-y-2">
            {steps.map((step) => (
              <div key={step.label} className="flex items-center gap-3">
                {step.status === "complete" ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : step.status === "running" ? (
                  <Sparkles className="h-4 w-4 animate-pulse text-primary" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}

                <span
                  className={
                    step.status === "pending"
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }
                >
                  {step.status === "pending"
                    ? `Waiting: ${step.label}`
                    : step.status === "running"
                      ? `Working: ${step.label}...`
                      : `Complete: ${step.label}`}
                </span>
              </div>
            ))}
          </div>

          {!isAnalyzing && (
            <div className="mt-4 border-t border-border/40 pt-3 text-success">
              Analysis complete. Investment report is ready.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}