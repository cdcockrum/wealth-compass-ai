import type { Workflow } from "./Workflow";
import type { WorkflowEvent } from "./WorkflowEvent";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const timestamp = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export async function runWorkflow(
  workflow: Workflow,
  onEvent: (event: WorkflowEvent) => void
) {
  let eventId = 1;

  const emit = (event: Omit<WorkflowEvent, "id" | "timestamp">) => {
    onEvent({
      id: eventId++,
      timestamp: timestamp(),
      ...event,
    });
  };

  emit({
    type: "started",
    message: `Starting workflow: ${workflow.name}`,
  });

  for (const step of workflow.steps) {
    emit({
      type: "step_started",
      message: step.label,
    });

    await step.run({ emit });
    await wait(300);

    emit({
      type: "step_completed",
      message: `Completed: ${step.label}`,
    });
  }

  emit({
    type: "completed",
    message: `${workflow.name} complete.`,
  });
}