import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/wealth/PageHeader";
import { SectionCard } from "@/components/wealth/SectionCard";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({ component: Settings });

function Settings() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow="Settings" title="Preferences" description="Manage your profile, integrations, and AI agent behavior." />

      <div className="space-y-6">
        <SectionCard title="Profile">
          <div className="grid gap-4 md:grid-cols-2">
            {[["Name","Jordan Davis"],["Email","jordan@example.com"],["Currency","USD"],["Time zone","America / New York"]].map(([l,v]) => (
              <div key={l}>
                <label className="text-xs text-muted-foreground">{l}</label>
                <input defaultValue={v} className="mt-1 h-10 w-full rounded-lg border border-border/60 bg-secondary/40 px-3 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="AI agent preferences">
          <div className="space-y-4">
            {[
              ["Enable proactive insights","Agents surface findings without being asked"],
              ["Include tax context","Agents factor in your tax situation"],
              ["Weekly briefing","Email me a weekly summary"],
              ["Aggressive opportunities","Include higher-risk / higher-reward ideas"],
            ].map(([t,d], i) => (
              <div key={t} className="flex items-center justify-between border-b border-border/40 pb-4 last:border-0 last:pb-0">
                <div><div className="text-sm font-medium">{t}</div><div className="text-xs text-muted-foreground">{d}</div></div>
                <Switch defaultChecked={i < 3} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Integrations">
          <div className="grid gap-3 md:grid-cols-2">
            {["Plaid (brokerage)", "Robinhood", "Fidelity", "Schwab", "Coinbase", "QuickBooks"].map((n) => (
              <div key={n} className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 px-4 py-3">
                <span className="text-sm font-medium">{n}</span>
                <Button size="sm" variant="outline">Connect</Button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
