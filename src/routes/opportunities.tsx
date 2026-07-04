import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { OpportunityService } from "@/services";
import { PageHeader } from "@/components/wealth/PageHeader";
import { SectionCard } from "@/components/wealth/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/opportunities")({ component: Opportunities });

const categories = ["All", "Undervalued", "Dividend Growth", "Quality", "Momentum", "Value", "AI", "Emerging"];

function Opportunities() {
  const [filter, setFilter] = useState("All");
  const { data: opps = [] } = useQuery({ queryKey: ["opps"], queryFn: OpportunityService.scan });
  const filtered = filter === "All" ? opps : opps.filter((o) => o.category === filter);

  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader
        eyebrow="Opportunity Scanner"
        title="AI-surfaced investment ideas"
        description="Continuously scanned across thousands of securities to surface high-conviction ideas that match your profile."
        actions={<Button size="sm"><Sparkles className="mr-2 h-4 w-4" />Re-scan universe</Button>}
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === c ? "border-primary/60 bg-primary/15 text-primary" : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((o) => (
          <div key={o.id} className="surface-card group overflow-hidden p-5 transition-all hover:border-primary/40">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{o.ticker}</div>
                <div className="text-xs text-muted-foreground">{o.name}</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-xs font-bold text-primary">{o.score}</div>
            </div>
            <Badge variant="outline" className="mt-3 border-primary/30 text-primary">{o.category}</Badge>
            <p className="mt-3 text-sm text-muted-foreground">{o.thesis}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs">
              <div className="flex items-center gap-1 text-success"><TrendingUp className="h-3.5 w-3.5" />+{o.upside}% target</div>
              <span className="text-muted-foreground">{o.timeframe}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
