import type {
  Holding, Company, Opportunity, Goal, NewsItem, AIInsight,
  EconomicIndicator, Business, Metric,
} from "@/types/wealth";

export const netWorthSeries = Array.from({ length: 24 }, (_, i) => ({
  month: new Date(2023, i, 1).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
  value: 480000 + i * 6200 + Math.sin(i / 2) * 8000,
  invested: 320000 + i * 4100,
}));

export const allocationData = [
  { name: "US Equities", value: 42, color: "var(--color-chart-1)" },
  { name: "Intl Equities", value: 18, color: "var(--color-chart-2)" },
  { name: "Bonds", value: 15, color: "var(--color-chart-3)" },
  { name: "Real Estate", value: 10, color: "var(--color-chart-4)" },
  { name: "Cash", value: 8, color: "var(--color-chart-5)" },
  { name: "Alternatives", value: 7, color: "oklch(0.6 0.14 200)" },
];

export const sectorData = [
  { name: "Technology", value: 28 },
  { name: "Financials", value: 16 },
  { name: "Healthcare", value: 14 },
  { name: "Consumer", value: 12 },
  { name: "Industrials", value: 10 },
  { name: "Energy", value: 8 },
  { name: "Utilities", value: 6 },
  { name: "Materials", value: 6 },
];

export const dashboardMetrics: Metric[] = [
  { label: "Net Worth", value: "$724,318", change: "+2.4%", trend: "up", hint: "vs last month" },
  { label: "Monthly Growth", value: "+$17,240", change: "+3.1%", trend: "up" },
  { label: "Annual Growth", value: "+$142,880", change: "+24.6%", trend: "up" },
  { label: "Investment Return", value: "18.2%", change: "+2.1%", trend: "up", hint: "YTD" },
  { label: "Cash", value: "$58,420", change: "-1.2%", trend: "down" },
  { label: "Investments", value: "$482,900", change: "+4.1%", trend: "up" },
  { label: "Retirement", value: "$168,240", change: "+3.4%", trend: "up" },
  { label: "Emergency Fund", value: "$32,000", change: "100%", trend: "flat", hint: "6 mo. coverage" },
  { label: "Savings Rate", value: "38%", change: "+4%", trend: "up" },
  { label: "Passive Income", value: "$1,840/mo", change: "+8.2%", trend: "up" },
];

export const holdings: Holding[] = [
  { ticker: "AAPL", name: "Apple Inc.", shares: 220, price: 232.14, value: 51070, allocation: 10.6, sector: "Technology", region: "US", cap: "Large", dayChange: 1.2 },
  { ticker: "MSFT", name: "Microsoft", shares: 90, price: 428.10, value: 38529, allocation: 8.0, sector: "Technology", region: "US", cap: "Large", dayChange: 0.7 },
  { ticker: "NVDA", name: "NVIDIA", shares: 140, price: 178.62, value: 25007, allocation: 5.2, sector: "Technology", region: "US", cap: "Large", dayChange: 3.4 },
  { ticker: "BRK.B", name: "Berkshire Hathaway", shares: 60, price: 462.30, value: 27738, allocation: 5.7, sector: "Financials", region: "US", cap: "Large", dayChange: -0.3 },
  { ticker: "VTI", name: "Vanguard Total Market", shares: 210, price: 288.40, value: 60564, allocation: 12.5, sector: "ETF", region: "US", cap: "Large", dayChange: 0.6 },
  { ticker: "VXUS", name: "Vanguard Intl", shares: 380, price: 68.20, value: 25916, allocation: 5.4, sector: "ETF", region: "Global", cap: "Large", dayChange: 0.2 },
  { ticker: "SCHD", name: "Schwab Dividend", shares: 240, price: 82.44, value: 19786, allocation: 4.1, sector: "ETF", region: "US", cap: "Large", dayChange: -0.1 },
  { ticker: "COST", name: "Costco", shares: 30, price: 918.20, value: 27546, allocation: 5.7, sector: "Consumer", region: "US", cap: "Large", dayChange: 0.9 },
  { ticker: "GOOGL", name: "Alphabet", shares: 110, price: 194.28, value: 21371, allocation: 4.4, sector: "Technology", region: "US", cap: "Large", dayChange: 1.5 },
  { ticker: "JPM", name: "JPMorgan Chase", shares: 80, price: 246.10, value: 19688, allocation: 4.1, sector: "Financials", region: "US", cap: "Large", dayChange: 0.4 },
];

export const opportunities: Opportunity[] = [
  { id: "1", ticker: "GOOGL", name: "Alphabet", category: "Undervalued", thesis: "Trading below intrinsic value with strong AI monetization runway.", score: 92, upside: 24, timeframe: "12 mo" },
  { id: "2", ticker: "ASML", name: "ASML Holding", category: "Quality", thesis: "EUV monopoly with expanding services revenue and high margins.", score: 89, upside: 18, timeframe: "18 mo" },
  { id: "3", ticker: "V", name: "Visa", category: "Dividend Growth", thesis: "20-year dividend growth streak with fortress balance sheet.", score: 87, upside: 15, timeframe: "24 mo" },
  { id: "4", ticker: "PLTR", name: "Palantir", category: "AI", thesis: "Rapid commercial adoption of AIP platform with enterprise moats.", score: 78, upside: 32, timeframe: "12 mo" },
  { id: "5", ticker: "META", name: "Meta Platforms", category: "Momentum", thesis: "AI-driven ad efficiency plus Reality Labs optionality.", score: 85, upside: 22, timeframe: "12 mo" },
  { id: "6", ticker: "NOW", name: "ServiceNow", category: "Value", thesis: "Enterprise AI workflow leader with 25%+ FCF growth.", score: 84, upside: 20, timeframe: "18 mo" },
  { id: "7", ticker: "TSM", name: "Taiwan Semi", category: "Quality", thesis: "Dominant foundry with pricing power and 3nm ramp.", score: 90, upside: 26, timeframe: "18 mo" },
  { id: "8", ticker: "CRWD", name: "CrowdStrike", category: "Emerging", thesis: "Consolidator in cybersecurity with Falcon platform expansion.", score: 82, upside: 28, timeframe: "24 mo" },
];

export const goals: Goal[] = [
  { id: "1", name: "Financial Independence", target: 2500000, current: 724318, deadline: "2038", category: "Retirement" },
  { id: "2", name: "Emergency Fund", target: 36000, current: 32000, deadline: "2026", category: "Savings" },
  { id: "3", name: "House Down Payment", target: 150000, current: 84000, deadline: "2027", category: "Real Estate" },
  { id: "4", name: "Business Revenue", target: 500000, current: 218000, deadline: "2026", category: "Business" },
  { id: "5", name: "Passive Income", target: 5000, current: 1840, deadline: "2030", category: "Income" },
];

export const news: NewsItem[] = [
  { id: "1", title: "Fed signals two rate cuts remain on table for this year", source: "Reuters", time: "2h", sentiment: "positive" },
  { id: "2", title: "NVIDIA unveils next-gen Rubin architecture for AI datacenters", source: "Bloomberg", time: "3h", sentiment: "positive", tickers: ["NVDA"] },
  { id: "3", title: "Oil retreats as OPEC+ hints at production increase", source: "WSJ", time: "5h", sentiment: "neutral" },
  { id: "4", title: "Apple's services revenue tops $28B in latest quarter", source: "CNBC", time: "6h", sentiment: "positive", tickers: ["AAPL"] },
  { id: "5", title: "Consumer sentiment dips as inflation expectations rise", source: "Bloomberg", time: "8h", sentiment: "negative" },
];

export const insights: AIInsight[] = [
  { id: "1", agent: "Portfolio Agent", title: "Rebalance opportunity detected", body: "Your tech exposure is 4.2% above target. Consider trimming NVDA to restore balance and reduce concentration risk.", severity: "warn", time: "1h" },
  { id: "2", agent: "Tax Agent", title: "Tax-loss harvesting available", body: "3 positions show unrealized losses totaling $2,180. Harvesting could offset $2,180 in capital gains this year.", severity: "info", time: "3h" },
  { id: "3", agent: "Research Agent", title: "Watchlist alert: ASML", body: "ASML dropped 6% on weak guidance — approaching your fair value entry zone of $720.", severity: "success", time: "5h" },
  { id: "4", agent: "Economic Agent", title: "Yield curve normalization", body: "The 2s10s spread has flipped positive for the first time in 18 months. Historically bullish for equities over 12 months.", severity: "info", time: "1d" },
];

export const economicIndicators: EconomicIndicator[] = [
  { label: "Fed Funds Rate", value: "5.25%", change: "0.00", trend: "flat" },
  { label: "CPI (YoY)", value: "3.2%", change: "-0.1", trend: "down" },
  { label: "Unemployment", value: "4.1%", change: "+0.1", trend: "up" },
  { label: "10Y Treasury", value: "4.28%", change: "-0.04", trend: "down" },
  { label: "GDP Growth", value: "2.8%", change: "+0.2", trend: "up" },
  { label: "USD Index", value: "104.32", change: "-0.18", trend: "down" },
];

export const marketIndices = [
  { name: "S&P 500", value: 5842.12, change: 0.68 },
  { name: "Nasdaq", value: 18921.44, change: 1.12 },
  { name: "Dow Jones", value: 42418.30, change: 0.32 },
  { name: "Russell 2000", value: 2284.60, change: -0.22 },
  { name: "VIX", value: 14.82, change: -3.4 },
  { name: "Gold", value: 2712.40, change: 0.44 },
  { name: "Oil (WTI)", value: 68.20, change: -1.2 },
  { name: "Bitcoin", value: 96420, change: 2.8 },
];

export const businesses: Business[] = [
  { id: "1", name: "Northwind Consulting", industry: "Consulting", revenue: 218000, expenses: 84000, profit: 134000, growth: 24, valuation: 620000,
    kpis: [{ label: "MRR", value: "$18.2K" }, { label: "Clients", value: "14" }, { label: "Churn", value: "2.1%" }] },
  { id: "2", name: "Aperture Digital", industry: "SaaS", revenue: 94000, expenses: 42000, profit: 52000, growth: 68, valuation: 480000,
    kpis: [{ label: "MRR", value: "$7.8K" }, { label: "ARR", value: "$94K" }, { label: "NRR", value: "118%" }] },
];

export const sampleCompany: Company = {
  ticker: "AAPL",
  name: "Apple Inc.",
  sector: "Technology",
  price: 232.14,
  change: 1.2,
  marketCap: "$3.52T",
  pe: 32.1,
  description: "Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide, and provides a growing portfolio of digital services.",
  moats: ["Brand loyalty", "Integrated ecosystem", "Services flywheel", "Custom silicon (M/A-series)", "Retail distribution"],
  ceo: "Tim Cook",
  employees: "164,000",
  hq: "Cupertino, CA",
  revenueGrowth: 6.2,
  grossMargin: 46.2,
  netMargin: 25.8,
  debtToEquity: 1.51,
  freeCashFlow: "$108B",
  dividendYield: 0.44,
  fairValue: 248,
  analystRating: "Buy",
  bullCase: [
    "Services growing at 15%+ with 74% gross margins.",
    "Vision Pro and AI unlock the next hardware supercycle.",
    "$100B+ annual buybacks + growing dividend.",
    "Emerging markets (India) still in early adoption phase.",
  ],
  bearCase: [
    "iPhone unit growth has stagnated in developed markets.",
    "Regulatory pressure on App Store fees globally.",
    "China exposure remains a geopolitical tail risk.",
    "Premium valuation with limited near-term earnings acceleration.",
  ],
  risks: ["China supply chain concentration", "App Store antitrust rulings", "FX headwinds"],
  aiSummary: "Apple remains a fortress-quality business with unmatched capital returns and ecosystem lock-in. Near-term valuation is full, but services and AI-enabled hardware refresh cycles support a modest premium. Best accumulated on pullbacks below $210.",
};
