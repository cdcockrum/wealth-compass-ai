import { fmpFetch } from "./client";
import type { Company } from "@/models/Company";

interface FmpCompanyProfile {
  symbol: string;
  companyName: string;
  price: number;
  mktCap: number;
  sector: string;
  industry: string;
  ceo: string;
  description: string;
  image: string;
  website: string;
}

export async function getCompanyProfile(
  ticker: string
): Promise<Company> {
  const result = await fmpFetch<FmpCompanyProfile[]>(
    `/profile/${ticker}`
  );

  if (!result.length) {
    throw new Error(`Company not found: ${ticker}`);
  }

  const company = result[0];

  return {
    ticker: company.symbol,
    name: company.companyName,
    price: company.price,
    marketCap: company.mktCap,
    sector: company.sector,
    industry: company.industry,
    ceo: company.ceo,
    description: company.description,
    website: company.website,
    logo: company.image,
  };
}