import {
  analyzeBusinessQuality,
  analyzeFinancialHealth,
} from "@/analysis";
import { Badge } from "@/components/ui/badge";
import type { Company } from "@/models/Company";
import { ScoreCard } from "./ScoreCard";
import type { CompanyMetrics } from "@/models/CompanyMetrics";
import { buildResearchReport } from "@/analysis/buildResearchReport";

interface ResearchReportProps {
  company: Company;
  metrics: CompanyMetrics;
}

export function ResearchReport({
  company,
  metrics,
}: ResearchReportProps) {
  const report = buildResearchReport(company, metrics);

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            Investment Report
          </p>

          <h2 className="mt-2 text-3xl font-bold">{company.name}</h2>

          <p className="mt-1 text-muted-foreground">
            {company.sector} • {company.industry}
          </p>

          <p className="mt-4 text-muted-foreground">{company.description}</p>
        </div>

        <Badge className="bg-emerald-500/15 text-emerald-400">BUY</Badge>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 font-semibold">Company Information</h3>

          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Ticker</dt>
              <dd>{company.ticker}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-muted-foreground">CEO</dt>
              <dd>{company.ceo}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-muted-foreground">Market Cap</dt>
              <dd>{company.marketCap.toLocaleString()}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-muted-foreground">Website</dt>
              <dd>{company.website}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Investment Thesis</h3>

          <p className="text-sm text-muted-foreground">
            AI-generated investment thesis will appear here after the research
            workflow completes.
          </p>
        </div>
      </div>

      <ScoreCard
        title="Business Quality"
        score={report.businessQuality.score}
        rating={report.businessQuality.rating}
        strengths={report.businessQuality.strengths}
        concerns={report.businessQuality.concerns}
      />

        <div className="mt-6" />

      <ScoreCard
        title="Financial Health"
        score={report.financialHealth.score}
        rating={report.financialHealth.rating}
        strengths={report.financialHealth.strengths}
        concerns={report.financialHealth.concerns}
      />
    </div>
  );
}