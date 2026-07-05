export interface ResearchLogMessage {
  id: number;
  timestamp: string;
  message: string;
  level: "info" | "success" | "warning";
}