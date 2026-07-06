import type { Company } from "@/models/Company";
import type { CompanyMetrics } from "@/models/CompanyMetrics";

import {
  analyzeBusinessQuality,
  analyzeFinancialHealth,
} from "@/analysis";

export function buildResearchReport(
  company: Company,
  metrics: CompanyMetrics
) {
  return {
    company,

    businessQuality: analyzeBusinessQuality(company),

    financialHealth: analyzeFinancialHealth(metrics),
  };
}