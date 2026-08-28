import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  computer: string;
  status: string;
  color: string;
  jobId: JobId;
  mark: string;
};

export const FLEET: FleetBot[] = [
  {
    id: "account-brief",
    name: "Account brief",
    blurb: "Pulls account history and current public signals into one page.",
    computer: "Research desk",
    status: "Reading approved sources",
    color: "#d64000",
    jobId: "attach-engine",
    mark: "AB",
  },
  {
    id: "call-notes",
    name: "Call notes",
    blurb: "Keeps a clean record of the live conversation and open questions.",
    computer: "Meeting workspace",
    status: "Listening",
    color: "#347357",
    jobId: "standardize-room",
    mark: "CN",
  },
  {
    id: "meeting-pack",
    name: "Meeting pack",
    blurb: "Builds the recap, sourced answers, and next meeting plan.",
    computer: "Document editor",
    status: "Drafting the pack",
    color: "#8b5e3c",
    jobId: "standardize-room",
    mark: "MP",
  },
  {
    id: "product-answer",
    name: "Product answer",
    blurb: "Finds the approved answer and keeps the source attached.",
    computer: "Knowledge search",
    status: "Checking sources",
    color: "#5f6f7c",
    jobId: "legal-redlines",
    mark: "PA",
  },
  {
    id: "procurement",
    name: "Procurement",
    blurb: "Sorts the request and drafts a sourced response for review.",
    computer: "Deal room",
    status: "Reviewing the request",
    color: "#934228",
    jobId: "legal-redlines",
    mark: "PR",
  },
  {
    id: "account-expansion",
    name: "Account expansion",
    blurb: "Finds the next useful team, signal, and reason to meet.",
    computer: "Account map",
    status: "Building the brief",
    color: "#3f6255",
    jobId: "attach-engine",
    mark: "AE",
  },
];
