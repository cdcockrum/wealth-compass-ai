import type { CompanyResearch, ResearchService } from "./ResearchService";

export class MockResearchService implements ResearchService {
  async searchCompany(symbol: string): Promise<CompanyResearch> {
    return {
      ticker: symbol.toUpperCase(),
      name: "Costco Wholesale Corporation",
      sector: "Consumer Defensive",
      industry: "Discount Stores",
      summary:
        "Costco is a membership-based retailer known for strong customer loyalty, high inventory turnover, recurring membership revenue, and disciplined cost control.",
    };
  }
}

// src/services/research/mockResearchService.ts

import type { CompanyResearch, ResearchProvider } from "./types";

export class MockResearchProvider implements ResearchProvider {
  async searchCompany(symbol: string): Promise<CompanyResearch> {
    return {
      ticker: symbol.toUpperCase(),
      name: "Costco Wholesale Corporation",
      sector: "Consumer Defensive",
      industry: "Discount Stores",
      summary:
        "Costco is a membership-based retailer known for strong customer loyalty, high inventory turnover, recurring membership revenue, and disciplined cost control.",
    };
  }
}