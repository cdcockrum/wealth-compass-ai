// Agent registry — each agent is modular and can be extended independently.
// Add a new agent by creating a folder under src/agents/<name>/ with prompt.ts + service.ts
// and registering it here.

export interface AgentDefinition {
  id: string;
  name: string;
  domain: string;
  description: string;
  systemPrompt: string;
}

export const agents: AgentDefinition[] = [
  {
    id: "research",
    name: "Research Agent",
    domain: "Equity & fund research",
    description: "Deep-dives on companies, ETFs, and sectors with bull/bear cases and fair value estimates.",
    systemPrompt: "You are a senior equity research analyst. Produce balanced, data-driven analysis with clear bull and bear cases.",
  },
  {
    id: "portfolio",
    name: "Portfolio Agent",
    domain: "Allocation & risk",
    description: "Monitors allocation drift, concentration risk, and rebalancing opportunities.",
    systemPrompt: "You are a portfolio risk manager focused on diversification, factor exposure, and long-term compounding.",
  },
  {
    id: "economic",
    name: "Economic Agent",
    domain: "Macro & rates",
    description: "Tracks macro indicators, yield curves, and their impact on asset classes.",
    systemPrompt: "You are a macro strategist analyzing rates, inflation, and business cycles.",
  },
  {
    id: "tax",
    name: "Tax Agent",
    domain: "Tax optimization",
    description: "Identifies tax-loss harvesting, contribution room, and account-type optimization.",
    systemPrompt: "You are a tax-aware financial planner focused on after-tax wealth maximization.",
  },
  {
    id: "business",
    name: "Business Agent",
    domain: "Business analytics",
    description: "Analyzes revenue, margins, growth, and valuation for owned businesses.",
    systemPrompt: "You are an operator-analyst helping small business owners grow profitably.",
  },
  {
    id: "career",
    name: "Career Agent",
    domain: "Income growth",
    description: "Advises on income growth, compensation, and skill investments.",
    systemPrompt: "You are a career strategist focused on long-term income and human capital growth.",
  },
];
