export type AgentIcon =
  | "brief"
  | "call"
  | "follow-up"
  | "answer"
  | "procurement"
  | "expansion";

export type FleetAgent = {
  name: string;
  icon: AgentIcon;
  assignment: string;
  computer: string;
  status: string;
  output: string;
};

export type ChatMessage = {
  from: "agent" | "rep" | "system";
  body: string;
};

export type ComputerPanel = {
  app: string;
  title: string;
  status: string;
  items: readonly string[];
};

type WorkingFrame = {
  kind: "trigger" | "work" | "review";
  at: string;
  label: string;
  summary: string;
  chat: readonly ChatMessage[];
  computer: ComputerPanel;
};

export type ArtifactFrame = {
  kind: "artifact";
  at: string;
  label: string;
  summary: string;
  chat: readonly ChatMessage[];
  computer: ComputerPanel;
  artifact: {
    kicker: string;
    title: string;
    fields: readonly { label: string; value: string }[];
  };
};

export type SceneFrames = readonly [
  WorkingFrame,
  WorkingFrame,
  WorkingFrame,
  ArtifactFrame,
];

export type UseCase = {
  id: "meeting" | "procurement" | "expansion";
  number: string;
  title: string;
  trigger: string;
  value: string;
  activeWork: string;
  sources: readonly string[];
  frames: SceneFrames;
};

export type SiteContent = {
  title: string;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  agents: readonly FleetAgent[];
  useCases: readonly [UseCase, UseCase, UseCase];
  accountContext: {
    eyebrow: string;
    title: string;
    intro: string;
    items: readonly { label: string; title: string; body: string }[];
  };
  comparison: {
    title: string;
    intro: string;
    rows: readonly { label: string; grokBot: string; chat: string }[];
  };
  rollout: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: readonly { label: string; title: string; body: string }[];
  };
  owner: {
    name: "Nick Scallion";
    email: "nick.scallion@cursor.com";
  };
};

export const siteContent = {
  title: "Thomson Reuters x SpaceXAI",
  hero: {
    eyebrow: "Grok Bot for Thomson Reuters GTM",
    title: "A fleet of agents, each with its own computer.",
    intro:
      "They handle the work around every account. Research, meeting prep, follow-up, and approved answers keep moving while sellers stay with the customer.",
  },
  agents: [
    {
      name: "Account brief",
      icon: "brief",
      assignment: "Pull account history and current public signals.",
      computer: "Research desk",
      status: "Reading approved sources",
      output: "Brief in progress",
    },
    {
      name: "Call notes",
      icon: "call",
      assignment: "Turn the live conversation into a clear record.",
      computer: "Meeting workspace",
      status: "Listening",
      output: "Notes updating",
    },
    {
      name: "Follow-up",
      icon: "follow-up",
      assignment: "Build the recap, open questions, and next steps.",
      computer: "Document editor",
      status: "Drafting",
      output: "Pack in progress",
    },
    {
      name: "Product answer",
      icon: "answer",
      assignment: "Find the approved answer and keep the source attached.",
      computer: "Knowledge search",
      status: "Checking sources",
      output: "Answer in progress",
    },
    {
      name: "Procurement",
      icon: "procurement",
      assignment: "Sort the questions and draft a sourced response.",
      computer: "Deal room",
      status: "Reviewing the request",
      output: "Reply in progress",
    },
    {
      name: "Account expansion",
      icon: "expansion",
      assignment: "Find the next useful team, signal, and reason to meet.",
      computer: "Account map",
      status: "Mapping the account",
      output: "Plan in progress",
    },
  ],
  useCases: [
    {
      id: "meeting",
      number: "01",
      title: "Build the next meeting pack while the call is live.",
      trigger: "A customer call starts",
      value:
        "The seller leaves the call with a recap, sourced answers, open questions, and the next meeting plan.",
      activeWork: "Listening to the call and updating the meeting workspace",
      sources: ["Call notes", "CRM", "Approved product material"],
      frames: [
        {
          kind: "trigger",
          at: "9:05 AM",
          label: "Call starts",
          summary: "Grok Bot opens the account brief and starts a clean record.",
          chat: [
            { from: "system", body: "Customer call started. Notes are private to the account team." },
            { from: "agent", body: "I opened the account history and the current meeting plan." },
          ],
          computer: {
            app: "Meeting workspace",
            title: "Account brief",
            status: "Listening",
            items: ["Attendees", "Open opportunities", "Last meeting", "Current questions"],
          },
        },
        {
          kind: "work",
          at: "9:18 AM",
          label: "Question lands",
          summary: "The agent records the question as an open item for the account team.",
          chat: [
            { from: "agent", body: "A question came up about how CoCounsel fits the current workflow." },
            { from: "agent", body: "I am checking approved product material now." },
          ],
          computer: {
            app: "Live notes",
            title: "Questions to answer",
            status: "New question",
            items: ["Current workflow", "CoCounsel fit", "Data handling", "Owner to confirm"],
          },
        },
        {
          kind: "review",
          at: "9:27 AM",
          label: "Sources checked",
          summary: "The agent attaches approved sources and marks what still needs an owner.",
          chat: [
            { from: "agent", body: "I found the approved CoCounsel material and linked each answer." },
            { from: "rep", body: "Keep the open data question in the pack for review." },
          ],
          computer: {
            app: "Product library",
            title: "Answer check",
            status: "Rep review",
            items: ["Approved sources", "Draft answer", "Open question", "No message sent"],
          },
        },
        {
          kind: "artifact",
          at: "9:31 AM",
          label: "Meeting pack ready",
          summary: "The seller gets the completed meeting pack for review.",
          chat: [
            { from: "agent", body: "The meeting pack is ready. Nothing has been sent." },
            { from: "rep", body: "Open the pack. I will review it before the follow-up." },
          ],
          computer: {
            app: "Document editor",
            title: "Meeting pack",
            status: "Ready for review",
            items: ["Recap", "Sourced answers", "Open questions", "Next meeting plan"],
          },
          artifact: {
            kicker: "Finished artifact",
            title: "CoCounsel workflow follow-up",
            fields: [
              { label: "Recap", value: "The account team's clean record of the discussion" },
              { label: "Answer", value: "Approved product material linked at the claim" },
              { label: "Open item", value: "Data question held for the right owner" },
              { label: "Next step", value: "Review the pack before the follow-up goes out" },
            ],
          },
        },
      ],
    },
    {
      id: "procurement",
      number: "02",
      title: "Answer a procurement question with the source attached.",
      trigger: "A procurement email arrives",
      value:
        "The account team gets a checked draft. Product, security, and contract questions stay separate.",
      activeWork: "Sorting the request and checking approved source material",
      sources: ["Inbox", "Security material", "Product docs", "Contract library"],
      frames: [
        {
          kind: "trigger",
          at: "5:27 AM",
          label: "Request arrives",
          summary: "Grok Bot separates the request into work the right owners can review.",
          chat: [
            { from: "system", body: "New procurement request received." },
            { from: "agent", body: "I split product, security, and contract questions." },
          ],
          computer: {
            app: "Inbox",
            title: "Procurement request",
            status: "Unread",
            items: ["Product fit", "Data handling", "Security review", "Contract term"],
          },
        },
        {
          kind: "work",
          at: "5:31 AM",
          label: "Evidence found",
          summary: "The agent searches only the approved places named for the job.",
          chat: [
            { from: "agent", body: "The product and security questions match approved source material." },
            { from: "agent", body: "The contract question needs the deal owner." },
          ],
          computer: {
            app: "Knowledge search",
            title: "Source check",
            status: "Sources matched",
            items: ["Product guide", "Security response", "Data handling note", "Contract item held"],
          },
        },
        {
          kind: "review",
          at: "5:39 AM",
          label: "Draft checked",
          summary: "Every answer keeps its source. The open item stays visible.",
          chat: [
            { from: "agent", body: "The sourced answers are in the draft." },
            { from: "agent", body: "I left the contract item open for the deal owner." },
          ],
          computer: {
            app: "Response editor",
            title: "Procurement reply",
            status: "Not sent",
            items: ["Sourced answers", "Open contract item", "Citations attached", "Owner named"],
          },
        },
        {
          kind: "artifact",
          at: "5:42 AM",
          label: "Reply ready",
          summary: "The account team gets a complete reply with one clear review point.",
          chat: [
            { from: "agent", body: "The reply is ready for account-team review." },
            { from: "rep", body: "Hold it. I will confirm the contract answer first." },
          ],
          computer: {
            app: "Response editor",
            title: "Sourced procurement reply",
            status: "Ready for review",
            items: ["Product answer", "Security answer", "Data answer", "Contract question"],
          },
          artifact: {
            kicker: "Finished artifact",
            title: "Sourced procurement reply",
            fields: [
              { label: "Answered", value: "Product, security, and data handling" },
              { label: "Held", value: "One contract item for the deal owner" },
              { label: "Evidence", value: "Approved source linked to each drafted answer" },
              { label: "Action", value: "Account team reviews and decides when to send" },
            ],
          },
        },
      ],
    },
    {
      id: "expansion",
      number: "03",
      title: "Turn account signals into the next useful conversation.",
      trigger: "A scheduled account review starts",
      value:
        "The seller gets one short account brief with the signal, the possible fit, and what to confirm next.",
      activeWork: "Reading account history and current public signals",
      sources: ["CRM", "Account plan", "Engagement history", "Public signals"],
      frames: [
        {
          kind: "trigger",
          at: "Monday 7:00 AM",
          label: "Review starts",
          summary: "The agent opens the account plan before the seller's week begins.",
          chat: [
            { from: "system", body: "Scheduled account review started." },
            { from: "agent", body: "I am checking account history and current public signals." },
          ],
          computer: {
            app: "Account map",
            title: "Target account",
            status: "Reviewing",
            items: ["Active team", "Recent meetings", "Open questions", "Public changes"],
          },
        },
        {
          kind: "work",
          at: "Monday 7:06 AM",
          label: "Signal connected",
          summary: "The agent connects one useful signal to approved product material.",
          chat: [
            { from: "agent", body: "I found one current signal that may matter to the account." },
            { from: "agent", body: "I am checking the relevant approved product story." },
          ],
          computer: {
            app: "Research desk",
            title: "Signal review",
            status: "Checking fit",
            items: ["Public signal", "Account history", "Relevant offer", "Evidence to confirm"],
          },
        },
        {
          kind: "review",
          at: "Monday 7:12 AM",
          label: "Plan narrowed",
          summary: "The agent cuts the list down to one reason to meet and one owner to confirm.",
          chat: [
            { from: "agent", body: "The brief has one reason to reach out and a short fact check." },
            { from: "rep", body: "Keep it short. I need the evidence and the next step." },
          ],
          computer: {
            app: "Account plan",
            title: "Next conversation",
            status: "Drafting",
            items: ["Why this account", "Why now", "What to confirm", "Suggested next step"],
          },
        },
        {
          kind: "artifact",
          at: "Monday 7:15 AM",
          label: "Brief ready",
          summary: "The seller gets the account brief and chooses the next move.",
          chat: [
            { from: "agent", body: "The account brief is ready. No outreach has been sent." },
            { from: "rep", body: "Open the brief. I will choose the next move." },
          ],
          computer: {
            app: "Account plan",
            title: "Account expansion brief",
            status: "Ready for review",
            items: ["Current signal", "Relevant offer", "Evidence", "Next conversation"],
          },
          artifact: {
            kicker: "Finished artifact",
            title: "Account expansion brief",
            fields: [
              { label: "Signal", value: "One current change worth checking with the account" },
              { label: "Fit", value: "Approved product material tied to that change" },
              { label: "Confirm", value: "The facts the seller should validate" },
              { label: "Next step", value: "One useful conversation, chosen by the seller" },
            ],
          },
        },
      ],
    },
  ],
  accountContext: {
    eyebrow: "Current account context",
    title: "Start where Thomson Reuters already has a reason to test.",
    intro:
      "The account plan points to three practical boundaries for an initial workflow. These are internal account notes, not customer quotes.",
    items: [
      {
        label: "01",
        title: "Keep model routing open",
        body:
          "Thomson Reuters is evaluating Grok 4.6 inside its own agent workflow. A first run should preserve routing control.",
      },
      {
        label: "02",
        title: "Close governance questions",
        body:
          "Security and governance questions need clear answers before the work expands beyond a narrow first job.",
      },
      {
        label: "03",
        title: "Use delivery measures",
        body:
          "The account plan names idea-to-deploy time, change failure rate, and recovery time as useful measures. Token savings are not the decision.",
      },
    ],
  },
  comparison: {
    title: "This is a working team, not another chat tab.",
    intro:
      "Each agent has its own computer, starts from an approved signal, and returns finished work for review.",
    rows: [
      {
        label: "What starts the work",
        grokBot: "An approved signal, event, or schedule",
        chat: "A person opens a chat and writes a prompt",
      },
      {
        label: "Where the work happens",
        grokBot: "Across approved tools on the agent's computer",
        chat: "Inside one conversation",
      },
      {
        label: "What comes back",
        grokBot: "A finished brief, pack, or sourced reply",
        chat: "An answer that still needs to be moved into the workflow",
      },
    ],
  },
  rollout: {
    eyebrow: "Proposed first run",
    title: "Prove one job before adding the next.",
    intro:
      "Choose a repeatable account-team task. Name the sources, review point, and finished artifact before the agent starts.",
    steps: [
      {
        label: "01",
        title: "Choose the job",
        body:
          "Pick one task with a clear trigger and a useful finished artifact.",
      },
      {
        label: "02",
        title: "Run in review mode",
        body:
          "Let the agent prepare the work. Keep every external action with the account team.",
      },
      {
        label: "03",
        title: "Judge the work",
        body:
          "Review the artifact in the real workflow. Add a second job only if the first one earns it.",
      },
    ],
  },
  owner: {
    name: "Nick Scallion",
    email: "nick.scallion@cursor.com",
  },
} satisfies SiteContent;
