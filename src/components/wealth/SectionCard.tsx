import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function SectionCard({ title, subtitle, actions, children, className, padded = true }: Props) {
  return (
    <div className={cn("surface-card", className)}>
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 border-b border-border/60 px-6 py-4">
          <div>
            {title && <div className="text-sm font-semibold tracking-tight">{title}</div>}
            {subtitle && <div className="mt-0.5 text-xs text-muted-foreground">{subtitle}</div>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={cn(padded && "p-6")}>{children}</div>
    </div>
  );
}
