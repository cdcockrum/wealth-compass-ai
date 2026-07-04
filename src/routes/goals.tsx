import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { GoalService } from "@/services";
import { PageHeader } from "@/components/wealth/PageHeader";
import { SectionCard } from "@/components/wealth/SectionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Target } from "lucide-react";
import { formatCurrency } from "@/hooks/use-format";

export const Route = createFileRoute("/goals")({ component: Goals });

function Goals() {
  const { data: goals = [] } = useQuery({ queryKey: ["goals"], queryFn: GoalService.list });

  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader
        eyebrow="Goal Planner"
        title="Your financial destinations"
        description="Set targets across net worth, retirement, savings, real estate, and business. Track progress in real time."
        actions={<Button size="sm"><Plus className="mr-2 h-4 w-4" />New goal</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((g) => {
          const pct = Math.min(100, (g.current / g.target) * 100);
          const remaining = Math.max(0, g.target - g.current);
          return (
            <div key={g.id} className="surface-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="outline">{g.category}</Badge>
              </div>
              <div className="mt-4 text-sm font-semibold">{g.name}</div>
              <div className="mt-2 text-2xl font-semibold tabular-nums">{formatCurrency(g.current)}</div>
              <div className="text-xs text-muted-foreground">of {formatCurrency(g.target)} · by {g.deadline}</div>
              <Progress value={pct} className="mt-4 h-1.5" />
              <div className="mt-2 flex justify-between text-xs">
                <span className="text-primary">{pct.toFixed(1)}% complete</span>
                <span className="text-muted-foreground">{formatCurrency(remaining)} to go</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <SectionCard title="Goal recommendations">
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /><span>Increasing your monthly savings by $500 accelerates your FI target by 2.4 years.</span></li>
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" /><span>Redirecting bonus toward the house down payment goal reaches target 8 months earlier.</span></li>
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" /><span>Passive income goal requires ~$1.2M in dividend-focused assets at current yields.</span></li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
