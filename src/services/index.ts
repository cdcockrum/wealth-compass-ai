// Service layer — mock implementations. Swap for real APIs later without touching UI.
import {
  dashboardMetrics, netWorthSeries, allocationData, sectorData, holdings,
  opportunities, goals, news, insights, economicIndicators, marketIndices,
  businesses, sampleCompany,
} from "./mock-data";

const delay = <T,>(data: T, ms = 250): Promise<T> =>
  new Promise((r) => setTimeout(() => r(data), ms));

export * from "./types";
export * from "./mockResearchService";

import { MockResearchProvider } from "./mockResearchService";

export const researchProvider = new MockResearchProvider();

export const PortfolioService = {
  getMetrics: () => delay(dashboardMetrics),
  getNetWorthSeries: () => delay(netWorthSeries),
  getAllocation: () => delay(allocationData),
  getSectors: () => delay(sectorData),
  getHoldings: () => delay(holdings),
};

export const ResearchService = {
  getCompany: (_ticker: string) => delay(sampleCompany),
  search: async (q: string) => {
    const results = [
      { ticker: "AAPL", name: "Apple Inc." },
      { ticker: "MSFT", name: "Microsoft" },
      { ticker: "NVDA", name: "NVIDIA" },
      { ticker: "GOOGL", name: "Alphabet" },
      { ticker: "VTI", name: "Vanguard Total Market" },
      { ticker: "SPY", name: "SPDR S&P 500" },
    ].filter((r) => (q ? (r.ticker + r.name).toLowerCase().includes(q.toLowerCase()) : true));
    return delay(results);
  },
};

export const MarketService = {
  getIndices: () => delay(marketIndices),
  getIndicators: () => delay(economicIndicators),
};

export const NewsService = {
  getLatest: () => delay(news),
};

export const EconomicService = {
  getIndicators: () => delay(economicIndicators),
};

export const OpportunityService = {
  scan: () => delay(opportunities),
};

export const GoalService = {
  list: () => delay(goals),
};

export const BusinessService = {
  list: () => delay(businesses),
};

export const InsightsService = {
  getRecent: () => delay(insights),
};

// AI Service — placeholder for chat interface
export const AIService = {
  ask: async (message: string): Promise<string> => {
    await new Promise((r) => setTimeout(r, 800));
    const responses = [
      `Based on your portfolio composition and current market conditions, ${message.toLowerCase().includes("retire") ? "you're tracking well toward financial independence — projected to hit your $2.5M target by 2037 at a 7% real return." : "I'd recommend reviewing your allocation to ensure it aligns with your risk tolerance and time horizon."}`,
      "Great question. Here are three considerations:\n\n1. **Diversification** — Ensure no single position exceeds 10% of your portfolio.\n2. **Time horizon** — Longer horizons allow for more equity exposure.\n3. **Tax efficiency** — Hold high-yield assets in tax-advantaged accounts.\n\nWould you like me to dig deeper into any of these?",
      "Looking at your data, I see an opportunity to optimize. Your savings rate of 38% is excellent, but redirecting $500/month from cash into your Roth IRA could add ~$180K to your retirement balance over 20 years (assuming 7% returns).",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  },
};
