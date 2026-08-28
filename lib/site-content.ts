export type ScenarioId = "meeting" | "procurement" | "signal";

export type ScenarioStep = {
  label: string;
  detail: string;
  state: "complete" | "working" | "ready";
};

export type AgentScenario = {
  id: ScenarioId;
  tab: string;
  time: string;
  trigger: string;
  account: string;
  summary: string;
  steps: readonly ScenarioStep[];
  deliverable: string;
};

export type SiteContent = {
  title: string;
  nav: readonly { label: string; href: string }[];
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    primaryAction: { label: string; href: string };
    secondaryAction: { label: string; href: string };
  };
  signals: readonly string[];
  scenarios: readonly [AgentScenario, ...AgentScenario[]];
  heard: {
    eyebrow: string;
    title: string;
    intro: string;
    items: readonly { number: string; title: string; body: string }[];
  };
  useCases: {
    eyebrow: string;
    title: string;
    intro: string;
    items: readonly {
      number: string;
      stage: string;
      title: string;
      body: string;
      output: string;
      sources: readonly string[];
    }[];
  };
  operatingModel: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: readonly { number: string; title: string; body: string }[];
  };
  comparison: {
    eyebrow: string;
    title: string;
    intro: string;
    rows: readonly { label: string; chat: string; grokBot: string }[];
  };
  rollout: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: readonly { time: string; title: string; body: string }[];
  };
  close: {
    eyebrow: string;
    title: string;
    body: string;
    action: string;
  };
  owner: {
    name: "Nick Scallion";
    email: "nick.scallion@cursor.com";
  };
};

export const siteContent = {
  title: "Thomson Reuters x SpaceXAI",
  nav: [
    { label: "What we heard", href: "#what-we-heard" },
    { label: "Agent jobs", href: "#agent-jobs" },
    { label: "30-day plan", href: "#plan" },
  ],
  hero: {
    eyebrow: "A proactive GTM agent for Thomson Reuters",
    title: "Give every seller a research desk that never closes.",
    intro:
      "Grok Bot follows the work around a deal, gathers the right context, and prepares the next move. The rep stays in control before anything leaves the building.",
    primaryAction: { label: "See the first 30 days", href: "#plan" },
    secondaryAction: { label: "Open a sample workflow", href: "#sample-workflow" },
  },
  signals: [
    "Call notes",
    "CRM",
    "Inbox",
    "Approved product content",
    "Public account signals",
  ],
  scenarios: [
    {
      id: "meeting",
      tab: "Call ended",
      time: "2 minutes ago",
      trigger: "The buyer asked how CoCounsel fits its current AI stack.",
      account: "Legal team expansion",
      summary:
        "Grok Bot turns the room into a clear follow-up while the details are still fresh.",
      steps: [
        {
          label: "Call notes",
          detail: "Pulled the buyer questions and named stakeholders.",
          state: "complete",
        },
        {
          label: "Approved sources",
          detail: "Matched the questions to current CoCounsel material.",
          state: "complete",
        },
        {
          label: "Rep review",
          detail: "Prepared a recap, open questions, and next-step deck.",
          state: "ready",
        },
      ],
      deliverable: "Follow-up pack ready for review",
    },
    {
      id: "procurement",
      tab: "Question arrived",
      time: "7 minutes ago",
      trigger: "Procurement sent a security and data-handling question.",
      account: "ONESOURCE evaluation",
      summary:
        "Grok Bot finds the approved answer, shows the source, and drafts a reply without sending it.",
      steps: [
        {
          label: "Request",
          detail: "Separated product, security, and contract questions.",
          state: "complete",
        },
        {
          label: "Evidence",
          detail: "Found the approved response and supporting document.",
          state: "complete",
        },
        {
          label: "Draft",
          detail: "Built a sourced response for the account team.",
          state: "ready",
        },
      ],
      deliverable: "Sourced reply ready for review",
    },
    {
      id: "signal",
      tab: "Signal found",
      time: "This morning",
      trigger: "A target account announced a change in its legal operations team.",
      account: "New account research",
      summary:
        "Grok Bot connects the signal to a relevant Thomson Reuters story and gives the rep a useful reason to reach out.",
      steps: [
        {
          label: "Account change",
          detail: "Summarized the public signal and why it matters.",
          state: "complete",
        },
        {
          label: "Product fit",
          detail: "Mapped the signal to approved Westlaw and CoCounsel material.",
          state: "working",
        },
        {
          label: "Outreach",
          detail: "Prepared a short account brief and draft message.",
          state: "ready",
        },
      ],
      deliverable: "Account brief and outreach draft ready",
    },
  ],
  heard: {
    eyebrow: "Current account context",
    title: "The opportunity is not another chatbot.",
    intro:
      "The path forward needs to fit the way Thomson Reuters already evaluates models, governs agents, and measures software delivery.",
    items: [
      {
        number: "01",
        title: "Keep model choice open",
        body:
          "The team is evaluating Grok 4.6 inside its own agent workflow. The path needs to preserve routing control.",
      },
      {
        number: "02",
        title: "Answer governance first",
        body:
          "Cloud Agents can expand after the remaining security and governance questions are closed.",
      },
      {
        number: "03",
        title: "Prove delivery impact",
        body:
          "The value case should use idea-to-deploy time, change failure rate, and recovery time. Token savings are not the decision.",
      },
    ],
  },
  useCases: {
    eyebrow: "Jobs for the account team",
    title: "Start with work sellers already do every week.",
    intro:
      "Each job ends in a useful deliverable. Grok Bot drafts the work and keeps the account team at the approval point.",
    items: [
      {
        number: "01",
        stage: "Before the meeting",
        title: "Build the account brief",
        body:
          "Pull the latest relationship history, public news, open questions, and approved product material into one short brief.",
        output: "Meeting brief",
        sources: ["CRM", "Call notes", "Public signals"],
      },
      {
        number: "02",
        stage: "During discovery",
        title: "Write the next deck",
        body:
          "Turn what the buyer said into tailored pages for CoCounsel, Westlaw, ONESOURCE, or the right Thomson Reuters offer.",
        output: "Customer deck",
        sources: ["Call notes", "Approved content"],
      },
      {
        number: "03",
        stage: "After the call",
        title: "Prepare the follow-up",
        body:
          "Draft the recap, capture open questions, assign next steps, and update the account record for rep review.",
        output: "Follow-up pack",
        sources: ["Inbox", "CRM", "Call notes"],
      },
      {
        number: "04",
        stage: "In the deal",
        title: "Answer procurement",
        body:
          "Find approved product, security, and contract answers. Cite every source and leave the final response with the account team.",
        output: "Sourced response",
        sources: ["Security docs", "Contracts", "Product docs"],
      },
      {
        number: "05",
        stage: "Across the account",
        title: "Find the next team",
        body:
          "Map useful connections across Legal Professionals, Corporates, Tax & Accounting, and Reuters News.",
        output: "Account map",
        sources: ["CRM", "Org research", "Engagement history"],
      },
      {
        number: "06",
        stage: "For the week",
        title: "Prepare the sales review",
        body:
          "Collect deal changes, stalled decisions, and account-team commitments into a short review for leaders.",
        output: "Operating brief",
        sources: ["CRM", "Inbox", "Team notes"],
      },
    ],
  },
  operatingModel: {
    eyebrow: "How it works",
    title: "Signals in. Work out. Approval stays with the team.",
    intro:
      "The first workflow can stay narrow. Connect approved sources, define the job, and make every external action wait for review.",
    steps: [
      {
        number: "01",
        title: "Watch approved signals",
        body: "A call ends, an email arrives, a field changes, or a scheduled job starts.",
      },
      {
        number: "02",
        title: "Do the background work",
        body: "Grok Bot gathers context, checks approved sources, and builds the deliverable.",
      },
      {
        number: "03",
        title: "Hand back a decision",
        body: "The rep reviews the draft, edits it, and decides what happens next.",
      },
    ],
  },
  comparison: {
    eyebrow: "A different working model",
    title: "Move from answers to finished sales work.",
    intro:
      "A chat window helps when someone knows what to ask. Grok Bot also handles the repeatable work around the question.",
    rows: [
      {
        label: "Starts when",
        chat: "A person writes a prompt",
        grokBot: "An approved signal or schedule starts a job",
      },
      {
        label: "Uses",
        chat: "The context in one conversation",
        grokBot: "Approved account, call, inbox, and product sources",
      },
      {
        label: "Produces",
        chat: "An answer to copy into another tool",
        grokBot: "A review-ready brief, deck, reply, or account update",
      },
      {
        label: "Acts",
        chat: "Inside the chat",
        grokBot: "Across the workflow, with approval before external action",
      },
    ],
  },
  rollout: {
    eyebrow: "30-day plan",
    title: "Prove one job before adding the next.",
    intro:
      "Keep the first month practical. Choose one account-team task, set the guardrails, and judge the work in the real workflow.",
    steps: [
      {
        time: "Days 1 to 5",
        title: "Choose the job",
        body:
          "Pick one repeatable task, name the approved sources, and agree on the final reviewer.",
      },
      {
        time: "Days 6 to 15",
        title: "Run in shadow mode",
        body:
          "Let Grok Bot prepare the work without sending anything. Compare each draft with the account team's version.",
      },
      {
        time: "Days 16 to 30",
        title: "Put the job to work",
        body:
          "Move the approved workflow into regular use, review the result, and decide whether a second job earns its place.",
      },
    ],
  },
  close: {
    eyebrow: "A focused first step",
    title: "Pick the first job with the Thomson Reuters account team.",
    body:
      "Start with one workflow that sellers already repeat. We will map the sources, approval point, and output together.",
    action: "Plan the working session",
  },
  owner: {
    name: "Nick Scallion",
    email: "nick.scallion@cursor.com",
  },
} satisfies SiteContent;
