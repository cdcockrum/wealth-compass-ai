export type WorkflowEventType =
  | "started"
  | "step_started"
  | "step_completed"
  | "step_failed"
  | "completed";

export interface WorkflowEvent {
  id: number;
  type: WorkflowEventType;
  timestamp: string;
  message: string;
}