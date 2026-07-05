import { useQuery } from "@tanstack/react-query";
import { getCompanyProfile } from "@/providers";

export function useCompanyProfile(ticker: string) {
  return useQuery({
    queryKey: ["company", ticker],
    queryFn: () => getCompanyProfile(ticker),
    enabled: ticker.length > 0,
  });
}