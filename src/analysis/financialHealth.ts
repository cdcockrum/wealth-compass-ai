export interface FinancialHealthScore {
  score: number;
  rating: "Excellent" | "Strong" | "Average" | "Weak";
  strengths: string[];
  concerns: string[];
}

interface FinancialHealthInput {
  currentRatio: number;
  debtToEquity: number;
  operatingMargin: number;
  freeCashFlowPositive: boolean;
}

export function analyzeFinancialHealth(
  input: FinancialHealthInput
): FinancialHealthScore {
  let score = 50;

  const strengths: string[] = [];
  const concerns: string[] = [];

  if (input.currentRatio > 1.5) {
    score += 10;
    strengths.push("Strong short-term liquidity.");
  } else {
    concerns.push("Current ratio is below preferred levels.");
  }

  if (input.debtToEquity < 0.5) {
    score += 15;
    strengths.push("Conservative debt levels.");
  } else {
    concerns.push("Leverage is relatively high.");
  }

  if (input.operatingMargin > 20) {
    score += 15;
    strengths.push("Excellent operating margins.");
  }

  if (input.freeCashFlowPositive) {
    score += 10;
    strengths.push("Positive free cash flow generation.");
  } else {
    concerns.push("Negative free cash flow.");
  }

  score = Math.min(score, 100);

  const rating =
    score >= 90
      ? "Excellent"
      : score >= 80
      ? "Strong"
      : score >= 65
      ? "Average"
      : "Weak";

  return {
    score,
    rating,
    strengths,
    concerns,
  };
}
