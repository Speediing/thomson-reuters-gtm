import type { JobId } from "./types";

export type SiteKind = "granola" | "gdoc" | "gmail" | "research" | "page";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  tabs: ChromeTab[];
};

const notes = { id: "notes", host: "granola.app", label: "Notes" };
const docs = { id: "docs", host: "docs.google.com", label: "Docs" };
const mail = { id: "mail", host: "mail.google.com", label: "Mail" };
const library = {
  id: "library",
  host: "approved-material.local",
  label: "Sources",
};
const account = {
  id: "account",
  host: "account-workspace.local",
  label: "Account",
};

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "standardize-room": {
    m1: {
      pill: "Opening the meeting workspace",
      host: "granola.app",
      path: "/notes/thomson-reuters",
      title: "Thomson Reuters account call",
      site: "granola",
      tabs: [notes, library, docs],
    },
    m2: {
      pill: "Checking approved product material",
      host: "approved-material.local",
      path: "/product/cocounsel",
      title: "CoCounsel source check",
      site: "research",
      tabs: [notes, library, docs],
    },
    m3: {
      pill: "Updating the meeting pack",
      host: "docs.google.com",
      path: "/document/meeting-pack",
      title: "Meeting pack",
      site: "gdoc",
      tabs: [notes, library, docs],
    },
    m4: {
      pill: "Writing the finished meeting pack",
      host: "docs.google.com",
      path: "/document/meeting-pack",
      title: "Meeting pack",
      site: "gdoc",
      tabs: [notes, library, docs],
    },
    m5: {
      pill: "Finished pack ready for review",
      host: "docs.google.com",
      path: "/document/meeting-pack",
      title: "Meeting pack",
      site: "gdoc",
      tabs: [notes, library, docs],
    },
  },
  "legal-redlines": {
    m1: {
      pill: "Opening the procurement request",
      host: "mail.google.com",
      path: "/mail/inbox",
      title: "Procurement request",
      site: "gmail",
      tabs: [mail, library, docs],
    },
    m2: {
      pill: "Checking approved sources",
      host: "approved-material.local",
      path: "/procurement",
      title: "Approved source check",
      site: "research",
      tabs: [mail, library, docs],
    },
    m3: {
      pill: "Building the response pack",
      host: "docs.google.com",
      path: "/document/procurement-reply",
      title: "Sourced procurement reply",
      site: "gdoc",
      tabs: [mail, library, docs],
    },
    m4: {
      pill: "Drafting the reply. Not sent.",
      host: "mail.google.com",
      path: "/mail/drafts",
      title: "Procurement reply",
      site: "gmail",
      tabs: [mail, library, docs],
    },
    m5: {
      pill: "Reply ready for review",
      host: "mail.google.com",
      path: "/mail/drafts",
      title: "Procurement reply",
      site: "gmail",
      tabs: [mail, library, docs],
    },
  },
  "attach-engine": {
    m1: {
      pill: "Opening account context",
      host: "account-workspace.local",
      path: "/thomson-reuters",
      title: "Thomson Reuters account",
      site: "research",
      tabs: [account, library, docs],
    },
    m2: {
      pill: "Connecting the current signal",
      host: "approved-material.local",
      path: "/agent-workflows",
      title: "Agent workflow review",
      site: "research",
      tabs: [account, library, docs],
    },
    m3: {
      pill: "Writing the test boundaries",
      host: "docs.google.com",
      path: "/document/first-test",
      title: "First test boundaries",
      site: "gdoc",
      tabs: [account, library, docs],
    },
    m4: {
      pill: "Building the finished account brief",
      host: "account-workspace.local",
      path: "/thomson-reuters/brief",
      title: "Account expansion brief",
      site: "page",
      tabs: [account, library, docs],
    },
    m5: {
      pill: "Account brief ready for review",
      host: "account-workspace.local",
      path: "/thomson-reuters/brief",
      title: "Account expansion brief",
      site: "page",
      tabs: [account, library, docs],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
