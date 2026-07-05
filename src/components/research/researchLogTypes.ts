export type ResearchLogLevel = "info" | "success" | "warning" | "error";

export interface ResearchLogMessage {
  id: number;
  timestamp: string;
  message: string;
  level: ResearchLogLevel;
}