export type Trend = "up" | "down" | "flat";

export interface Metric {
  label: string;
  value: string;
  change?: string;
  trend?: Trend;
  hint?: string;
}

export interface Holding {
  ticker: string;
  name: string;
  shares: number;
  price: number;
  value: number;
  allocation: number;
  sector: string;
  region: string;
  cap: "Large" | "Mid" | "Small";
  dayChange: number;
}

export interface Company {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  marketCap: string;
  pe: number;
  description: string;
  moats: string[];
  ceo: string;
  employees: string;
  hq: string;
  revenueGrowth: number;
  grossMargin: number;
  netMargin: number;
  debtToEquity: number;
  freeCashFlow: string;
  dividendYield: number;
  fairValue: number;
  analystRating: "Buy" | "Hold" | "Sell";
  bullCase: string[];
  bearCase: string[];
  risks: string[];
  aiSummary: string;
}

export interface Opportunity {
  id: string;
  ticker: string;
  name: string;
  category: string;
  thesis: string;
  score: number;
  upside: number;
  timeframe: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: "positive" | "neutral" | "negative";
  tickers?: string[];
}

export interface AIInsight {
  id: string;
  agent: string;
  title: string;
  body: string;
  severity: "info" | "warn" | "success";
  time: string;
}

export interface EconomicIndicator {
  label: string;
  value: string;
  change: string;
  trend: Trend;
}

export interface Business {
  id: string;
  name: string;
  industry: string;
  revenue: number;
  expenses: number;
  profit: number;
  growth: number;
  valuation: number;
  kpis: { label: string; value: string }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  agent?: string;
  time: string;
}
