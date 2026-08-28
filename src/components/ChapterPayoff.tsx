import type { Artifact, StoryBeat } from "@/data/types";
import { HeardSlide } from "./HeardSlide";

function ProcurementReply({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "redlines" }>;
}) {
  return (
    <div className="leave leave-paper">
      <header className="leave-paper-top">
        <div>
          <p className="leave-kicker">Finished artifact</p>
          <h3>{artifact.title}</h3>
        </div>
        <p className="leave-paper-from">{artifact.from}</p>
      </header>
      <div className="leave-paper-split">
        <section className="leave-marks">
          <p className="leave-kicker">{artifact.paperTitle}</p>
          <ol>
            {artifact.marks.map((mark) => (
              <li key={mark.text} className={mark.take ? "is-take" : "is-hold"}>
                <p className="leave-mark-line">{mark.text}</p>
                <p className="leave-mark-note">
                  <b>{mark.take ? "Answer" : "Hold"}.</b> {mark.note}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section className="leave-reply">
          <p className="leave-kicker">Draft reply. Not sent.</p>
          <p className="leave-reply-meta">
            <span>To</span>
            {artifact.reply.to}
          </p>
          <p className="leave-reply-meta">
            <span>Subject</span>
            {artifact.reply.subject}
          </p>
          <p className="leave-reply-body">{artifact.reply.body}</p>
        </section>
      </div>
    </div>
  );
}

function AccountBrief({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "outbound" }>;
}) {
  return (
    <article className="leave leave-account-brief">
      <header>
        <div>
          <p className="leave-kicker">Finished artifact</p>
          <h3>{artifact.title}</h3>
        </div>
        <strong>{artifact.account}</strong>
      </header>
      <div className="account-brief-grid">
        {artifact.hypothesis.map((item) => (
          <section key={item.k}>
            <p className="leave-kicker">{item.k}</p>
            <p>{item.body}</p>
          </section>
        ))}
      </div>
      <footer>
        <strong>{artifact.page.headline}</strong>
        <p>{artifact.page.body}</p>
      </footer>
    </article>
  );
}

export function ChapterPayoff({
  beat,
  wash,
  value,
}: {
  beat: StoryBeat;
  wash?: string;
  value?: string;
}) {
  const artifact = beat.artifact;
  let body = null;

  if (beat.slides?.length) {
    body = <HeardSlide slides={beat.slides} size="lg" wash={wash} />;
  } else if (artifact?.kind === "redlines") {
    body = <ProcurementReply artifact={artifact} />;
  } else if (artifact?.kind === "outbound") {
    body = <AccountBrief artifact={artifact} />;
  }

  if (!body) return null;

  return (
    <div className="chapter-payoff" data-frame-kind="artifact">
      <p className="payoff-label">
        {beat.when ? <span>{beat.when}</span> : null}
        {beat.label}
      </p>
      {body}
      {value ? <p className="leave-value">{value}</p> : null}
    </div>
  );
}
