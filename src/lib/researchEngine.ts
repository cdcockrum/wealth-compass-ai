import type { ResearchLogMessage } from "@/components/research/types";

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function timestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export async function simulateResearch(
  ticker: string,
  onMessage: (message: ResearchLogMessage) => void
) {
  const messages = [
    `Connecting to market data for ${ticker}...`,
    "Company identified.",
    "Downloading latest annual report...",
    "Reading financial statements...",
    "Scanning SEC filings...",
    "Comparing industry peers...",
    "Calculating valuation...",
    "Building investment thesis...",
    "Research complete.",
  ];

  let id = 1;

  for (const message of messages) {
    onMessage({
      id: id++,
      timestamp: timestamp(),
      message,
      level: "info",
    });

    await wait(700);
  }
}