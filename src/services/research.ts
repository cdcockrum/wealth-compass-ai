export interface CompanyResearch {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  summary: string;
}

export interface ResearchService {
  searchCompany(symbol: string): Promise<CompanyResearch>;
}