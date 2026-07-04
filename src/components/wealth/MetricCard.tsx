import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metric } from "@/types/wealth";

export function MetricCard({ metric, index = 0 }: { metric: Metric; index?: number }) {
  const trend = metric.trend ?? "flat";
  const Icon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  const color = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className="surface-card group relative overflow-hidden p-5"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{metric.label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{metric.value}</div>
      {metric.change && (
        <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", color)}>
          <Icon className="h-3.5 w-3.5" />
          <span>{metric.change}</span>
          {metric.hint && <span className="ml-1 text-muted-foreground">· {metric.hint}</span>}
        </div>
      )}
    </motion.div>
  );
}
