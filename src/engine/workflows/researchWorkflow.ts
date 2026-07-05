import type { Workflow } from "../Workflow";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const researchWorkflow: Workflow = {
  id: "research",
  name: "AI Investment Research",
  steps: [
    {
      id: "connect-fmp",
      label: "Connecting to Financial Modeling Prep...",
      async run() {
        await wait(700);
      },
    },
    {
      id: "identify-company",
      label: "Company profile loaded.",
      async run() {
        await wait(700);
      },
    },
    {
      id: "market-profile",
      label: "Market cap, sector, and industry identified.",
      async run() {
        await wait(800);
      },
    },
    {
      id: "fundamentals",
      label: "Preparing financial fundamentals for analysis...",
      async run() {
        await wait(900);
      },
    },
    {
      id: "sec-filings",
      label: "SEC filing analysis queued for next integration.",
      async run() {
        await wait(700);
      },
    },
    {
      id: "thesis",
      label: "Generating preliminary investment report...",
      async run() {
        await wait(1000);
      },
    },
  ],
};