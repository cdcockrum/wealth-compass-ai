import { useState } from "react";
import type { ResearchSession } from "@/models/ResearchSession";

export function useResearchSession() {
  const [session, setSession] = useState<ResearchSession>({
    logs: [],
    status: "idle",
  });

  return {
    session,
    setSession,
  };
}