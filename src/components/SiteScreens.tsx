import type { Artifact, DemoMessage } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";

function packetFrom(artifact?: Artifact) {
  return artifact?.kind === "packet" ? artifact : null;
}

function emailFrom(artifact?: Artifact) {
  return artifact?.kind === "gmail" ? artifact : null;
}

function redlinesFrom(artifact?: Artifact) {
  return artifact?.kind === "redlines" ? artifact : null;
}

function outboundFrom(artifact?: Artifact) {
  return artifact?.kind === "outbound" ? artifact : null;
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  switch (beat.site) {
    case "granola":
      return <MeetingNotesScreen account={account} />;
    case "gdoc":
      return <DocumentScreen account={account} artifact={artifact} />;
    case "gmail":
      return (
        <MailScreen
          account={account}
          artifact={emailFrom(artifact)}
          sent={sent}
        />
      );
    case "research":
      return <ResearchScreen account={account} title={beat.title} />;
    case "page":
      return (
        <AccountBriefScreen
          account={account}
          artifact={outboundFrom(artifact)}
        />
      );
  }
}

function MeetingNotesScreen({ account }: { account: string }) {
  return (
    <div className="site site-granola">
      <header>
        <strong>Meeting notes</strong>
        <span>Live</span>
      </header>
      <p className="site-time">{account} account call</p>
      <ul>
        <li>
          <span>Now</span> Current workflow added to the meeting record.
        </li>
        <li>
          <span>Open</span> CoCounsel fit needs an approved product answer.
        </li>
        <li>
          <span>Review</span> Data question held for the right owner.
        </li>
        <li>
          <span>Next</span> Seller reviews the completed meeting pack.
        </li>
      </ul>
    </div>
  );
}

function DocumentScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  const packet = packetFrom(artifact);
  const redlines = redlinesFrom(artifact);

  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>{packet?.title || redlines?.title || `${account} working note`}</span>
      </header>
      <article>
        {packet ? (
          packet.fields.map((field) => (
            <p key={field.label}>
              <b>{field.label}.</b> {field.value}
            </p>
          ))
        ) : redlines ? (
          redlines.marks.map((mark) => (
            <p key={mark.text}>
              <b>{mark.take ? "Answer" : "Hold"}.</b> {mark.note}
            </p>
          ))
        ) : (
          <>
            <p>
              <b>Recap.</b> Clean account-team record of the discussion.
            </p>
            <p>
              <b>Sourced answer.</b> Approved material linked at the claim.
            </p>
            <p>
              <b>Open item.</b> Held for the owner who should confirm it.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

function MailScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof emailFrom>;
  sent: boolean;
}) {
  return (
    <div className="site site-gmail">
      <header>
        <strong>Mail</strong>
        <em>{sent ? "Sent" : "Draft. Not sent."}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} account team`}
      </p>
      <p>
        <span>Subject</span>
        {artifact?.subject || "Procurement request"}
      </p>
      <div>
        {artifact?.body ||
          "The request is sorted into product, security, and contract questions."}
      </div>
    </div>
  );
}

function ResearchScreen({
  account,
  title,
}: {
  account: string;
  title: string;
}) {
  return (
    <div className="site site-research">
      <header>
        <strong>{title}</strong>
        <span>Approved sources only</span>
      </header>
      <p className="site-time">Researching {account}</p>
      <ul>
        <li>
          <span>Account plan</span> Current priorities and review boundaries.
        </li>
        <li>
          <span>Product material</span> Approved guidance for the open question.
        </li>
        <li>
          <span>Account history</span> Previous meetings and open items.
        </li>
        <li>
          <span>Review</span> No external action without the account team.
        </li>
      </ul>
    </div>
  );
}

function AccountBriefScreen({
  account,
  artifact,
}: {
  account: string;
  artifact: ReturnType<typeof outboundFrom>;
}) {
  return (
    <div className="site site-page">
      <header>
        <strong>Account brief</strong>
        <em>Ready for review</em>
      </header>
      <h4>{artifact?.page.headline || `${account} next conversation`}</h4>
      {artifact ? (
        artifact.hypothesis.map((item) => (
          <p key={item.k}>
            <b>{item.k}.</b> {item.body}
          </p>
        ))
      ) : (
        <p>Current signal, possible fit, review boundary, and next step.</p>
      )}
    </div>
  );
}
