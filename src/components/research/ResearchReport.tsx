import {
  analyzeBusinessQuality,
  analyzeFinancialHealth,
} from "@/analysis";
import { Badge } from "@/components/ui/badge";
import type { Company } from "@/models/Company";
import { ScoreCard } from "./ScoreCard";

interface ResearchReportProps {
  company: Company;
}

export function ResearchReport({ company }: ResearchReportProps) {
  const quality = analyzeBusinessQuality(company);
  const health = analyzeFinancialHealth({
    currentRatio: 2.1,
    debtToEquity: 0.31,
    operatingMargin: 42,
    freeCashFlowPositive: true,
  });

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
        score={quality.score}
        rating={quality.rating}
        strengths={quality.strengths}
        concerns={quality.concerns}
      />

        <div className="mt-6" />

      <ScoreCard
        title="Financial Health"
        score={health.score}
        rating={health.rating}
        strengths={health.strengths}
        concerns={health.concerns}
      />
    </div>
  );
}