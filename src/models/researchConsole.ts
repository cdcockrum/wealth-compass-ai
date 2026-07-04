export interface ConsoleMessage {
  id: number;
  time: string;
  text: string;
  type: "info" | "success" | "warning";
}