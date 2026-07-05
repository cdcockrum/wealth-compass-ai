import { useEffect, useRef } from "react";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import type { ResearchLogMessage } from "./researchLogTypes";

export type ConsoleStatus = "pending" | "running" | "complete";

export interface ConsoleStep {
  label: string;
  status: ConsoleStatus;
}

interface ResearchConsoleProps {
  ticker: string;
  analyzing: boolean;
  steps: ConsoleStep[];
  logs?: ResearchLogMessage[];
}

export function ResearchConsole({
  ticker,
  analyzing,
  steps,
}: ResearchConsoleProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [steps]);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 bg-zinc-900 px-5 py-3">
        <h2 className="font-semibold text-zinc-100">
          AI Research Terminal
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          {analyzing
            ? `Investigating ${ticker}...`
            : `Ready to analyze ${ticker}`}
        </p>
      </div>

      <div className="max-h-[420px] overflow-y-auto p-5 font-mono text-sm">
                {logs && logs.length > 0 ? (
          <>
            {logs.map((log) => (
              <div
                key={log.id}
                className="mb-2 flex items-start gap-4"
              >
                <span className="w-20 shrink-0 text-zinc-500">
                  {log.timestamp}
                </span>

                <span
                  className={
                    log.level === "success"
                      ? "text-emerald-400"
                      : log.level === "warning"
                        ? "text-amber-400"
                        : log.level === "error"
                          ? "text-red-400"
                          : "text-zinc-200"
                  }
                >
                  {log.message}
                </span>
              </div>
            ))}
          </>
        ) : (
          <>
            {steps.map((step) => (
              <div
                key={step.label}
                className="mb-3 flex items-center gap-3"
              >
                {step.status === "complete" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : step.status === "running" ? (
                  <Sparkles className="h-4 w-4 animate-pulse text-sky-400" />
                ) : (
                  <Circle className="h-4 w-4 text-zinc-600" />
                )}

                <span
                  className={
                    step.status === "pending"
                      ? "text-zinc-500"
                      : "text-zinc-200"
                  }
                >
                     {step.label}
                </span>
              </div>
            ))}
          </>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}