export type ResearchStepStatus =
  | "pending"
  | "running"
  | "complete"
  | "error";

export interface ResearchStep {
  id: string;
  label: string;
  status: ResearchStepStatus;
}

export interface ResearchReport {
  ticker: string;
  companyName: string;

  recommendation:
    | "Strong Buy"
    | "Buy"
    | "Hold"
    | "Wait"
    | "Avoid";

  confidence: number;

  summary: string;

  bullCase: string[];

  bearCase: string[];

  risks: string[];

  evidence: string[];
}