import type { ResearchReport, ResearchStep } from "./types";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const initialResearchSteps: ResearchStep[] = [
  { id: "profile", label: "Loading company profile", status: "pending" },
  { id: "financials", label: "Reviewing financial statements", status: "pending" },
  { id: "sec", label: "Scanning SEC filings", status: "pending" },
  { id: "news", label: "Reading recent news", status: "pending" },
  { id: "valuation", label: "Estimating valuation", status: "pending" },
  { id: "thesis", label: "Generating investment thesis", status: "pending" },
];

export async function runMockResearchAgent(
  ticker: string,
  onStepUpdate?: (steps: ResearchStep[]) => void
): Promise<ResearchReport> {
  const steps = initialResearchSteps.map((step) => ({ ...step }));

  for (const step of steps) {
    step.status = "running";
    onStepUpdate?.([...steps]);
    await wait(600);

    step.status = "complete";
    onStepUpdate?.([...steps]);
  }

  return {
    ticker: ticker.toUpperCase(),
    companyName: "Costco Wholesale Corporation",
    recommendation: "Buy",
    confidence: 84,
    summary:
      "Costco appears to be a high-quality compounder with strong membership economics, durable customer loyalty, disciplined cost control, and consistent long-term growth potential.",
    bullCase: [
      "Recurring membership revenue creates durable cash flow.",
      "Strong customer loyalty supports pricing power.",
      "Inventory efficiency remains a competitive advantage.",
    ],
    bearCase: [
      "Valuation may already reflect much of the quality.",
      "Retail margins remain structurally thin.",
      "Consumer weakness could pressure discretionary sales.",
    ],
    risks: [
      "Premium valuation",
      "Margin compression",
      "Slower consumer spending",
      "International execution risk",
    ],
    evidence: [
      "Consistent revenue growth",
      "High membership renewal rates",
      "Strong free cash flow profile",
      "Defensive retail positioning",
    ],
  };
}