import { analyzeBusinessQuality } from "@/analysis";
import { Badge } from "@/components/ui/badge";
import type { Company } from "@/models/Company";
import { ScoreCard } from "./ScoreCard";

interface ResearchReportProps {
  company: Company;
}

export function ResearchReport({ company }: ResearchReportProps) {
  const quality = analyzeBusinessQuality(company);

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

      <section className="mt-8 rounded-xl border border-border/60 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Business Quality</h3>

          <div className="text-right">
            <div className="text-3xl font-bold">{quality.score}</div>
            <div className="text-sm text-muted-foreground">
              {quality.rating}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-medium text-emerald-500">Strengths</h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {quality.strengths.map((item: string) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-medium text-amber-500">Concerns</h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {quality.concerns.length ? (
                quality.concerns.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))
              ) : (
                <li>No major concerns detected.</li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}