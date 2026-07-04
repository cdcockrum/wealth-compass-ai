// src/services/research/types.ts

export interface CompanyResearch {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  summary: string;
}

export interface ResearchProvider {
  searchCompany(symbol: string): Promise<CompanyResearch>;
}