import type { Workflow } from "../Workflow";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const researchWorkflow: Workflow = {
  id: "research",
  name: "Company Research",

  steps: [
    {
      id: "identify",
      label: "Identifying company",
      async run() {
        await wait(500);
      },
    },
    {
      id: "market",
      label: "Loading market data",
      async run() {
        await wait(600);
      },
    },
    {
      id: "financials",
      label: "Loading financial statements",
      async run() {
        await wait(700);
      },
    },
    {
      id: "sec",
      label: "Reading SEC filings",
      async run() {
        await wait(800);
      },
    },
    {
      id: "news",
      label: "Analyzing recent news",
      async run() {
        await wait(600);
      },
    },
    {
      id: "thesis",
      label: "Generating investment thesis",
      async run() {
        await wait(900);
      },
    },
  ],
};