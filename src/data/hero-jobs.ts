export type HeroMessage = {
  role: "user" | "agent";
  body: string;
};

export type HeroWorkRow = {
  label: string;
  value: string;
};

export type HeroJob = {
  id: string;
  pill: string;
  mark: string;
  agent: string;
  status: string;
  trigger: string;
  workRows: [HeroWorkRow, HeroWorkRow];
  workBody: string;
  result: string;
  messages: [HeroMessage, HeroMessage];
};

export const HERO_JOBS: [
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
  HeroJob,
] = [
  {
    id: "meeting-pack",
    pill: "Meeting pack",
    mark: "MP",
    agent: "Meeting pack",
    status: "Drafting the pack",
    trigger: "A customer call starts",
    workRows: [
      {
        label: "Recap",
        value: "A clean account-team record of the discussion",
      },
      {
        label: "Sourced answer",
        value: "Approved product material linked at the claim",
      },
    ],
    workBody:
      "Grok Bot keeps the meeting record, checks approved material, and prepares the pack. The seller reviews every external action.",
    result:
      "One live call becomes a finished meeting pack before the follow-up starts.",
    messages: [
      {
        role: "user",
        body: "Build the next meeting pack while the call is live",
      },
      {
        role: "agent",
        body: "The customer call started. I opened the account history and the meeting plan.",
      },
    ],
  },
  {
    id: "call-notes",
    pill: "Call notes",
    mark: "CN",
    agent: "Call notes",
    status: "Listening",
    trigger: "A customer call starts",
    workRows: [
      {
        label: "Open question",
        value:
          "How CoCounsel fits the current workflow and which owner should confirm the answer.",
      },
      {
        label: "Open item",
        value: "Data question held for the right owner",
      },
    ],
    workBody:
      "Keeps a clean record of the live conversation and open questions.",
    result:
      "The seller leaves the call with a clean recap, sourced answers, open questions, and a next meeting plan.",
    messages: [
      {
        role: "user",
        body: "The call starts. The account history and meeting plan are already open.",
      },
      {
        role: "agent",
        body: "A CoCounsel workflow question is open. I am checking approved product material now.",
      },
    ],
  },
  {
    id: "product-answer",
    pill: "Product answer",
    mark: "PA",
    agent: "Product answer",
    status: "Checking sources",
    trigger: "A procurement request arrives",
    workRows: [
      {
        label: "Product library",
        value: "Relevant guidance linked",
      },
      {
        label: "Product material",
        value: "Draft answer prepared",
      },
    ],
    workBody: "Finds the approved answer and keeps the source attached.",
    result:
      "Each drafted answer links back to the approved product source used to prepare it.",
    messages: [
      {
        role: "user",
        body: "How does the product fit the current workflow?",
      },
      {
        role: "agent",
        body: "A CoCounsel workflow question is open. I am checking approved product material now.",
      },
    ],
  },
  {
    id: "procurement",
    pill: "Procurement",
    mark: "PR",
    agent: "Procurement",
    status: "Reviewing the request",
    trigger: "A procurement request arrives",
    workRows: [
      {
        label: "Product material",
        value: "Draft answer prepared",
      },
      {
        label: "Contract library",
        value: "Deal owner required",
      },
    ],
    workBody: "Sorts the request and drafts a sourced response for review.",
    result:
      "A procurement request becomes a sourced reply with the open item clearly held.",
    messages: [
      {
        role: "user",
        body: "Answer a procurement question with the source attached",
      },
      {
        role: "agent",
        body: "A procurement request arrived. I separated the product, security, and contract questions.",
      },
    ],
  },
  {
    id: "security-review",
    pill: "Security review",
    mark: "SR",
    agent: "Security review",
    status: "Checking approved sources",
    trigger: "A procurement request arrives",
    workRows: [
      {
        label: "Security material",
        value: "Review path named",
      },
      {
        label: "Review",
        value: "Name the governance path",
      },
    ],
    workBody:
      "Use the approved security material and name the review owner.",
    result: "Security and governance questions need a clear review path.",
    messages: [
      {
        role: "user",
        body: "What should the security team review?",
      },
      {
        role: "agent",
        body: "The product and security answers match approved material. The contract item needs the deal owner.",
      },
    ],
  },
  {
    id: "account-brief",
    pill: "Account brief",
    mark: "AB",
    agent: "Account brief",
    status: "Reading approved sources",
    trigger: "A scheduled account review starts",
    workRows: [
      {
        label: "Current signal",
        value:
          "The account plan says Thomson Reuters is evaluating Grok 4.6 inside its own agent workflow.",
      },
      {
        label: "What to preserve",
        value: "Keep model routing open and make governance part of the first test.",
      },
    ],
    workBody: "Pulls account history and current public signals into one page.",
    result:
      "The seller gets one current signal, the possible fit, and the points that still need confirmation.",
    messages: [
      {
        role: "user",
        body: "Turn account signals into the next useful conversation",
      },
      {
        role: "agent",
        body: "The scheduled account review started. I opened the account plan and current account history.",
      },
    ],
  },
  {
    id: "account-expansion",
    pill: "Account expansion",
    mark: "AE",
    agent: "Account expansion",
    status: "Building the brief",
    trigger: "A scheduled account review starts",
    workRows: [
      {
        label: "Account plan",
        value:
          "Agent workflow evaluation and routing control are named account priorities.",
      },
      {
        label: "What to prove",
        value:
          "Use delivery measures from the account plan, not token savings, to judge the first job.",
      },
    ],
    workBody: "Finds the next useful team, signal, and reason to meet.",
    result:
      "A scheduled account review becomes one clear brief for the next useful conversation.",
    messages: [
      {
        role: "user",
        body: "Turn account signals into the next useful conversation",
      },
      {
        role: "agent",
        body: "The agent workflow evaluation is the current signal. I am keeping routing control and governance in the first test.",
      },
    ],
  },
  {
    id: "follow-up-draft",
    pill: "Follow-up draft",
    mark: "FD",
    agent: "Follow-up draft",
    status: "Drafting the reply. Not sent.",
    trigger: "A customer call starts",
    workRows: [
      {
        label: "Next step",
        value: "Seller reviews the pack before the follow-up",
      },
      {
        label: "Next meeting",
        value: "Owners and open items are clear",
      },
    ],
    workBody: "Keeps the record and prepares the follow-up",
    result: "Nothing sent. The finished pack is waiting for account-team review.",
    messages: [
      {
        role: "user",
        body: "Seller reviews the pack before the follow-up",
      },
      {
        role: "agent",
        body: "Nothing sent. The finished pack is waiting for account-team review.",
      },
    ],
  },
];
