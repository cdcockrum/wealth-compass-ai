import type { CompanyMetrics } from "@/models/CompanyMetrics";
import { fmpFetch } from "./client";

interface FmpRatios {
  currentRatio: number;
  debtEquityRatio: number;
  operatingProfitMargin: number;
}

interface FmpCashFlow {
  freeCashFlow: number;
}

export async function getCompanyMetrics(ticker: string): Promise<CompanyMetrics> {
  const [ratios, cashFlows] = await Promise.all([
    fmpFetch<FmpRatios[]>(`/ratios-ttm/${ticker}`),
    fmpFetch<FmpCashFlow[]>(`/cash-flow-statement/${ticker}?limit=1`),
  ]);

  const latestRatios = ratios[0];
  const latestCashFlow = cashFlows[0];

  if (!latestRatios || !latestCashFlow) {
    throw new Error(`Metrics not found for ${ticker}`);
  }

  return {
    currentRatio: latestRatios.currentRatio ?? 0,
    debtToEquity: latestRatios.debtEquityRatio ?? 0,
    operatingMargin: (latestRatios.operatingProfitMargin ?? 0) * 100,
    freeCashFlowPositive: latestCashFlow.freeCashFlow > 0,
  };
}