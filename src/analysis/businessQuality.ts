import type { Company } from "@/models/Company";

export interface BusinessQualityScore {
  score: number;
  rating: "Excellent" | "Strong" | "Average" | "Weak";
  strengths: string[];
  concerns: string[];
}

export function analyzeBusinessQuality(company: Company): BusinessQualityScore {
  const strengths: string[] = [];
  const concerns: string[] = [];

  if (company.marketCap > 100_000_000_000) {
    strengths.push("Large scale and established market presence.");
  } else {
    concerns.push("Smaller scale may increase business volatility.");
  }

  if (company.description.length > 500) {
    strengths.push("Business description suggests a diversified operating model.");
  }

  if (company.sector) {
    strengths.push(`Operates in the ${company.sector} sector.`);
  }

  const score = Math.min(95, 65 + strengths.length * 8 - concerns.length * 6);

  const rating =
    score >= 90 ? "Excellent" :
    score >= 80 ? "Strong" :
    score >= 65 ? "Average" :
    "Weak";

  return {
    score,
    rating,
    strengths,
    concerns,
  };
}