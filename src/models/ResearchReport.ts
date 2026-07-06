import type { Company } from "./Company";
import type { BusinessQualityScore } from "@/analysis/businessQuality";
import type { FinancialHealthScore } from "@/analysis/financialHealth";

export interface ResearchReportModel {
  company: Company;

  businessQuality: BusinessQualityScore;

  financialHealth: FinancialHealthScore;
}