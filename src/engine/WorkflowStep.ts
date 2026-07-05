import type { WorkflowEvent } from "./WorkflowEvent";

export interface WorkflowStepContext {
  emit: (event: Omit<WorkflowEvent, "id" | "timestamp">) => void;
}

export interface WorkflowStep {
  id: string;
  label: string;
  run: (context: WorkflowStepContext) => Promise<void>;
}