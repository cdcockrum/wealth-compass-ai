import type { Workflow } from "../Workflow";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const researchWorkflow: Workflow = {
  id: "research",
  name: "AI Investment Research",

  steps: [
    {
      id: "identify-company",
      label: "Identifying company and retrieving market profile...",
      async run() {
        await wait(700);
      },
    },

    {
      id: "fundamentals",
      label: "Analyzing financial fundamentals...",
      async run() {
        await wait(900);
      },
    },

    {
      id: "financial-statements",
      label: "Reviewing income statement, balance sheet, and cash flow...",
      async run() {
        await wait(1200);
      },
    },

    {
      id: "sec-filings",
      label: "Reading recent SEC filings and management discussion...",
      async run() {
        await wait(1100);
      },
    },

    {
      id: "competition",
      label: "Comparing competitors and industry positioning...",
      async run() {
        await wait(900);
      },
    },

    {
      id: "news",
      label: "Evaluating recent news and macroeconomic events...",
      async run() {
        await wait(900);
      },
    },

    {
      id: "valuation",
      label: "Estimating intrinsic value and valuation metrics...",
      async run() {
        await wait(1000);
      },
    },

    {
      id: "committee",
      label: "Consulting AI Investment Committee...",
      async run() {
        await wait(800);
      },
    },

    {
      id: "thesis",
      label: "Generating investment thesis and confidence score...",
      async run() {
        await wait(1300);
      },
    },
  ],
};