import type { WorkflowStep } from "./WorkflowStep";

export interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
}