import type { Artifact, CroJob, SlideCard } from "./types";

const MEETING_PACK: SlideCard[] = [
  {
    n: 1,
    kicker: "Meeting recap",
    title: "What the account team covered",
    body: "A clean record of the discussion, the current workflow, and the open questions.",
  },
  {
    n: 2,
    kicker: "Sourced answer",
    title: "Approved material stays attached",
    body: "Each drafted answer links back to the approved product source used to prepare it.",
  },
  {
    n: 3,
    kicker: "Next meeting",
    title: "Owners and open items are clear",
    body: "The seller reviews the pack, confirms the owners, and chooses what goes out.",
  },
];

const PROCUREMENT_REPLY: Extract<Artifact, { kind: "redlines" }> = {
  kind: "redlines",
  title: "Sourced procurement reply",
  paperTitle: "Questions to resolve",
  from: "Procurement request received before the seller's day",
  marks: [
    {
      text: "How does the product fit the current workflow?",
      note: "Draft from approved product material and keep the source linked.",
      take: true,
    },
    {
      text: "What should the security team review?",
      note: "Use the approved security material and name the review owner.",
      take: true,
    },
    {
      text: "Which contract terms apply?",
      note: "Hold this item for the deal owner. Do not guess.",
      take: false,
    },
  ],
  reply: {
    to: "Procurement team",
    subject: "Product and security answers for review",
    body: "Hi,\n\nWe prepared the product and security answers from the approved source material. The contract item is still open with the deal owner.\n\nWe will send the complete response after that review.",
  },
};

const EXPANSION_BRIEF: Extract<Artifact, { kind: "outbound" }> = {
  kind: "outbound",
  title: "Account expansion brief",
  account: "Thomson Reuters",
  hypothesis: [
    {
      k: "Current signal",
      body: "The account plan says Thomson Reuters is evaluating Grok 4.6 inside its own agent workflow.",
    },
    {
      k: "What to preserve",
      body: "Keep model routing open and make governance part of the first test.",
    },
    {
      k: "What to prove",
      body: "Use delivery measures from the account plan, not token savings, to judge the first job.",
    },
  ],
  evidence: [
    {
      source: "Account plan",
      finding: "Agent workflow evaluation and routing control are named account priorities.",
    },
    {
      source: "Account plan",
      finding: "Security and governance questions need a clear review path.",
    },
    {
      source: "Account plan",
      finding: "Idea-to-deploy time, change failure rate, and recovery time are the named delivery measures.",
    },
  ],
  targets: [
    {
      name: "Workflow owner",
      role: "Account stakeholder",
      why: "Confirms the first job and the routing boundary.",
    },
    {
      name: "Security owner",
      role: "Review stakeholder",
      why: "Confirms the governance path before the test expands.",
    },
  ],
  page: {
    headline: "One job, clear controls, a finished artifact",
    body: "Start with one repeatable task. Name the approved sources, review point, and finished artifact before the agent begins.",
  },
};

export const JOBS: CroJob[] = [
  {
    id: "standardize-room",
    number: 1,
    title: "Build the next meeting pack while the call is live",
    trigger: "A customer call starts",
    backgroundAction: "Listening and updating the meeting workspace",
    problem:
      "The seller should not have to rebuild the call after it ends. The record, open questions, and approved answers can take shape while the conversation is still fresh.",
    botJob:
      "Grok Bot keeps the meeting record, checks approved material, and prepares the pack. The seller reviews every external action.",
    storyboard: [
      {
        when: "9:05 AM",
        label: "The call starts. The account history and meeting plan are already open.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Thomson Reuters account call",
          people: [
            { initials: "YOU", name: "You" },
            { initials: "AT", name: "Account team" },
            { initials: "TR", name: "Customer" },
          ],
        },
      },
      {
        when: "9:18 AM",
        label: "An open product question is added to the working notes.",
        scene: "notes",
        visual: {
          kind: "live-transcript",
          timestamp: "Live",
          label: "Open question",
          detail: "How CoCounsel fits the current workflow and which owner should confirm the answer.",
          signals: ["CoCounsel", "Owner to confirm"],
        },
      },
      {
        when: "9:27 AM",
        label: "The agent links approved sources and keeps the open item visible.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Product library", answer: "Relevant guidance linked" },
            { name: "Account notes", answer: "Current workflow checked" },
            { name: "Open item", answer: "Held for the right owner" },
          ],
          status: "Ready for seller review",
        },
      },
      {
        when: "9:31 AM",
        label: "Finished artifact: the meeting pack is ready for review.",
        scene: "deck",
        slides: MEETING_PACK,
      },
    ],
    unlock:
      "The seller leaves the call with a clean recap, sourced answers, open questions, and a next meeting plan.",
    outcome:
      "One live call becomes a finished meeting pack before the follow-up starts.",
    demo: {
      title: "Meeting pack",
      subtitle: "Live call to reviewed follow-up",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "meeting",
          name: "Meeting pack",
          role: "bot",
          persona: "Keeps the record and prepares the follow-up",
          color: "#347357",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "meeting",
          kind: "routine",
          body: "The customer call started. I opened the account history and the meeting plan.",
        },
        {
          id: "m2",
          from: "meeting",
          kind: "text",
          body: "A CoCounsel workflow question is open. I am checking approved product material now.",
        },
        {
          id: "m3",
          from: "meeting",
          kind: "text",
          body: "The approved material is linked. I kept the remaining data question open for the right owner.",
        },
        {
          id: "m4",
          from: "meeting",
          kind: "draft",
          draftLabel: "Finished meeting pack",
          artifact: {
            kind: "packet",
            title: "CoCounsel workflow follow-up",
            fields: [
              {
                label: "Recap",
                value: "A clean account-team record of the discussion",
              },
              {
                label: "Sourced answer",
                value: "Approved product material linked at the claim",
              },
              {
                label: "Open item",
                value: "Data question held for the right owner",
              },
              {
                label: "Next step",
                value: "Seller reviews the pack before the follow-up",
              },
            ],
          },
        },
        {
          id: "m5",
          from: "meeting",
          kind: "system",
          body: "Nothing sent. The finished pack is waiting for account-team review.",
        },
      ],
    },
  },
  {
    id: "legal-redlines",
    number: 2,
    title: "Answer a procurement question with the source attached",
    trigger: "A procurement request arrives",
    backgroundAction: "Sorting the request and checking approved sources",
    problem:
      "Product, security, and contract questions should not blur together. Each answer needs the right source and the right review owner.",
    botJob:
      "Grok Bot separates the request, drafts from approved material, and holds the contract item for the deal owner.",
    storyboard: [
      {
        when: "5:27 AM",
        label: "The request arrives. The agent sorts it before the seller signs in.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Procurement contact",
          subject: "Product, security, and contract questions",
          questions: "Questions sorted by owner",
        },
      },
      {
        when: "5:31 AM",
        label: "Approved product and security sources are attached.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Product material", answer: "Draft answer prepared" },
            { name: "Security material", answer: "Review path named" },
            { name: "Contract library", answer: "Deal owner required" },
          ],
          status: "Sources checked",
        },
      },
      {
        when: "5:39 AM",
        label: "The draft keeps the open contract item in view.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Procurement team",
          subject: "Product and security answers",
          status: "Ready for review",
        },
      },
      {
        when: "5:42 AM",
        label: "Finished artifact: a sourced reply with one clear hold.",
        scene: "send",
        artifact: PROCUREMENT_REPLY,
      },
    ],
    unlock:
      "The account team gets a checked draft while each owner keeps the right question.",
    outcome:
      "A procurement request becomes a sourced reply with the open item clearly held.",
    demo: {
      title: "Procurement",
      subtitle: "Request to sourced reply",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "procurement",
          name: "Procurement",
          role: "bot",
          persona: "Sorts questions and prepares the sourced response",
          color: "#934228",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "procurement",
          kind: "routine",
          body: "A procurement request arrived. I separated the product, security, and contract questions.",
        },
        {
          id: "m2",
          from: "procurement",
          kind: "text",
          body: "The product and security answers match approved material. The contract item needs the deal owner.",
        },
        {
          id: "m3",
          from: "procurement",
          kind: "draft",
          draftLabel: "Finished response pack",
          artifact: PROCUREMENT_REPLY,
        },
        {
          id: "m4",
          from: "procurement",
          kind: "draft",
          draftLabel: "Reply draft",
          artifact: {
            kind: "gmail",
            title: "Procurement reply",
            to: PROCUREMENT_REPLY.reply.to,
            subject: PROCUREMENT_REPLY.reply.subject,
            body: PROCUREMENT_REPLY.reply.body,
          },
        },
        {
          id: "m5",
          from: "procurement",
          kind: "system",
          body: "Nothing sent. The reply is waiting for account-team review.",
        },
      ],
    },
  },
  {
    id: "attach-engine",
    number: 3,
    title: "Turn account signals into the next useful conversation",
    trigger: "A scheduled account review starts",
    backgroundAction: "Reading account history and current signals",
    problem:
      "Account work gets noisy when every signal becomes a new task. The seller needs one short brief that explains what changed, what may fit, and what to confirm.",
    botJob:
      "Grok Bot reads the approved account context, narrows the work to one next conversation, and keeps every draft with the seller.",
    storyboard: [
      {
        when: "Monday 7:00 AM",
        label: "The scheduled review opens the account plan and current signals.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Thomson Reuters",
          sources: ["Account plan", "CRM", "Approved product material"],
          signal: "Agent workflow evaluation",
        },
      },
      {
        when: "Monday 7:06 AM",
        label: "The agent connects the signal to the named account priorities.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Signal", answer: "Agent workflow evaluation" },
            { label: "Control", answer: "Keep model routing open" },
            { label: "Review", answer: "Name the governance path" },
          ],
        },
      },
      {
        when: "Monday 7:12 AM",
        label: "The review is narrowed to one job and the owners who should confirm it.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Thomson Reuters account team",
          channels: ["Account brief", "Review agenda", "Follow-up draft"],
          status: "Drafts ready. Nothing sent.",
        },
      },
      {
        when: "Monday 7:15 AM",
        label: "Finished artifact: the account expansion brief is ready.",
        scene: "send",
        artifact: EXPANSION_BRIEF,
      },
    ],
    unlock:
      "The seller gets one current signal, the possible fit, and the points that still need confirmation.",
    outcome:
      "A scheduled account review becomes one clear brief for the next useful conversation.",
    demo: {
      title: "Account expansion",
      subtitle: "Signal to account brief",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "expansion",
          name: "Account expansion",
          role: "bot",
          persona: "Turns account context into one useful next step",
          color: "#3f6255",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "expansion",
          kind: "routine",
          body: "The scheduled account review started. I opened the account plan and current account history.",
        },
        {
          id: "m2",
          from: "expansion",
          kind: "text",
          body: "The agent workflow evaluation is the current signal. I am keeping routing control and governance in the first test.",
        },
        {
          id: "m3",
          from: "expansion",
          kind: "draft",
          draftLabel: "Account priorities",
          artifact: {
            kind: "packet",
            title: "First test boundaries",
            fields: EXPANSION_BRIEF.hypothesis.map((item) => ({
              label: item.k,
              value: item.body,
            })),
          },
        },
        {
          id: "m4",
          from: "expansion",
          kind: "draft",
          draftLabel: "Finished account brief",
          artifact: EXPANSION_BRIEF,
        },
        {
          id: "m5",
          from: "expansion",
          kind: "system",
          body: "Nothing sent. The account brief is ready for the seller to review.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
