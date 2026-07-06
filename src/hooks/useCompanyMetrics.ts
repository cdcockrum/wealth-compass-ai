import { useQuery } from "@tanstack/react-query";
import { getCompanyMetrics } from "@/providers";

export function useCompanyMetrics(ticker: string) {
  return useQuery({
    queryKey: ["metrics", ticker],
    queryFn: () => getCompanyMetrics(ticker),
    enabled: ticker.length > 0,
  });
}