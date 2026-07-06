import type { Company } from "./Company";
import type { ResearchLogMessage } from "@/components/research/researchLogTypes";

export interface ResearchSession {
  company?: Company;
  logs: ResearchLogMessage[];
  status: "idle" | "running" | "complete" | "failed";
  startedAt?: Date;
  completedAt?: Date;
}