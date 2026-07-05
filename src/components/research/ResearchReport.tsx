import { Badge } from "@/components/ui/badge";

interface ResearchReportProps {
  ticker: string;
}

export function ResearchReport({
  ticker,
}: ResearchReportProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            Investment Report
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {ticker}
          </h2>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            AI-generated investment research combining market data,
            company fundamentals, financial statements, SEC filings,
            valuation metrics, and macroeconomic context.
          </p>
        </div>

        <Badge className="bg-emerald-500/15 text-emerald-400">
          BUY
        </Badge>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <section>
          <h3 className="mb-3 font-semibold">
            Investment Thesis
          </h3>

          <p className="text-sm text-muted-foreground">
            Microsoft continues to demonstrate exceptional financial
            strength, durable competitive advantages, and consistent
            free cash flow generation. Although valuation is above
            historical averages, long-term growth drivers remain
            compelling.
          </p>
        </section>

        <section>
          <h3 className="mb-3 font-semibold">
            Business Quality
          </h3>

          <ul className="space-y-2 text-sm">
            <li>★★★★★ Economic Moat</li>
            <li>★★★★★ Management</li>
            <li>★★★★★ Balance Sheet</li>
            <li>★★★★☆ Valuation</li>
            <li>★★★★★ Cash Flow</li>
          </ul>
        </section>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <section>
          <h3 className="mb-3 font-semibold">
            Bull Case
          </h3>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Azure continues double-digit growth.</li>
            <li>• Strong AI positioning.</li>
            <li>• Excellent capital allocation.</li>
            <li>• Massive recurring revenue base.</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-3 font-semibold">
            Bear Case
          </h3>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Premium valuation.</li>
            <li>• Cloud competition.</li>
            <li>• Regulatory scrutiny.</li>
            <li>• Slowing enterprise spending.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}