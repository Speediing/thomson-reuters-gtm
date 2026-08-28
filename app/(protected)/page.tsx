import Image from "next/image";
import type { CSSProperties } from "react";

import { AgentDesk } from "@/components/agent-desk";
import { BrandLockup } from "@/components/brand-lockup";
import { siteContent } from "@/lib/site-content";

export default function HomePage() {
  const { hero, agents, useCases, accountContext, comparison, rollout, owner } =
    siteContent;

  return (
    <main id="top">
      <header className="site-header">
        <a className="header-brand" href="#top" aria-label="Back to top">
          <BrandLockup linked={false} />
        </a>
        <nav aria-label="On this page">
          <a href="#fleet">Agent fleet</a>
          <a href="#use-cases">Use cases</a>
          <a href="#first-run">First run</a>
        </nav>
      </header>

      <section className="watercolor-header" aria-label="A fleet of agent computers at work">
        <Image
          className="watercolor-image"
          src="/brand/thomson-reuters-watercolor-header.jpg"
          alt=""
          width={1280}
          height={720}
          sizes="100vw"
          priority
        />
        <div className="watercolor-caption">
          <span />
          Six agent computers. One account team in control.
        </div>
      </section>

      <div className="report">
        <section className="hero-paper" aria-labelledby="hero-title">
          <span className="paper-pin paper-pin-left" aria-hidden="true" />
          <span className="paper-pin paper-pin-right" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 id="hero-title">{hero.title}</h1>
            <p className="hero-intro">{hero.intro}</p>
          </div>
          <div className="hero-fleet" aria-hidden="true">
            {agents.map((agent, index) => (
              <span key={agent.name} style={{ "--agent-index": index } as CSSProperties}>
                <i />
              </span>
            ))}
            <p>
              <strong>6 agents online</strong>
              Each works from its own computer
            </p>
          </div>
        </section>

        <section className="fleet-section" id="fleet">
          <div className="section-lead">
            <p className="eyebrow">The agent fleet</p>
            <h2>Give each repeatable job a computer and a clear finish line.</h2>
            <p>
              These are working desks, not job descriptions. Each agent opens the
              right tools, does the background work, and returns a finished artifact.
            </p>
          </div>
          <div className="fleet-grid">
            {agents.map((agent, index) => (
              <article className="fleet-computer" key={agent.name}>
                <header>
                  <span className="traffic" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <strong>Computer {String(index + 1).padStart(2, "0")}</strong>
                  <span className="fleet-live">
                    <i aria-hidden="true" />
                    Online
                  </span>
                </header>
                <div className="fleet-screen">
                  <div className={`fleet-agent-icon is-${agent.icon}`} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3>{agent.name}</h3>
                    <p>{agent.assignment}</p>
                  </div>
                  <dl>
                    <div>
                      <dt>Open on screen</dt>
                      <dd>{agent.computer}</dd>
                    </div>
                    <div>
                      <dt>Now</dt>
                      <dd>{agent.status}</dd>
                    </div>
                  </dl>
                </div>
                <footer>
                  <span>{agent.output}</span>
                  <i aria-hidden="true" />
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="use-case-intro" id="use-cases">
          <p className="eyebrow">Three sample jobs</p>
          <h2>Watch the work move from signal to finished artifact.</h2>
          <p>
            Every timeline ends with the actual deliverable. Select any frame to see
            the chat on the left and the agent&apos;s computer on the right.
          </p>
          <div className="use-case-links">
            {useCases.map((useCase) => (
              <a href={`#${useCase.id}`} key={useCase.id}>
                <span>Sample {useCase.number}</span>
                <strong>{useCase.title}</strong>
                <small>Starts when {useCase.trigger.toLowerCase()}</small>
              </a>
            ))}
          </div>
        </section>

        <div className="jobs">
          {useCases.map((useCase) => (
            <section className="job-section" id={useCase.id} key={useCase.id}>
              <p className="section-number">{useCase.number}</p>
              <div>
                <div className="background-agent">
                  <span aria-hidden="true" />
                  <p>
                    <strong>Background agent active</strong>
                    <small>
                      {useCase.trigger} <i aria-hidden="true">→</i> {useCase.activeWork}
                    </small>
                  </p>
                </div>
                <h2>{useCase.title}</h2>
                <p className="job-value">{useCase.value}</p>
                <ul className="source-list" aria-label="Approved source types">
                  {useCase.sources.map((source) => (
                    <li key={source}>{source}</li>
                  ))}
                </ul>
                <AgentDesk useCase={useCase} />
              </div>
            </section>
          ))}
        </div>

        <section className="account-context">
          <div className="section-lead">
            <p className="eyebrow">{accountContext.eyebrow}</p>
            <h2>{accountContext.title}</h2>
            <p>{accountContext.intro}</p>
          </div>
          <div className="context-grid">
            {accountContext.items.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="comparison" aria-labelledby="comparison-title">
          <div>
            <p className="eyebrow">Working model</p>
            <h2 id="comparison-title">{comparison.title}</h2>
            <p>{comparison.intro}</p>
          </div>
          <div className="comparison-table" role="table" aria-label="Grok Bot and chat comparison">
            <div className="comparison-row comparison-head" role="row">
              <span role="columnheader">Question</span>
              <strong role="columnheader">Grok Bot</strong>
              <strong role="columnheader">Chat</strong>
            </div>
            {comparison.rows.map((row) => (
              <div className="comparison-row" role="row" key={row.label}>
                <span role="rowheader">{row.label}</span>
                <p role="cell">{row.grokBot}</p>
                <p role="cell">{row.chat}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rollout" id="first-run">
          <div className="section-lead">
            <p className="eyebrow">{rollout.eyebrow}</p>
            <h2>{rollout.title}</h2>
            <p>{rollout.intro}</p>
          </div>
          <ol>
            {rollout.steps.map((step) => (
              <li key={step.label}>
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <a className="cta" href={`mailto:${owner.email}`}>
            Plan the first working session
            <span aria-hidden="true">↗</span>
          </a>
        </section>
      </div>

      <footer className="site-footer">
        <div>
          <BrandLockup linked={false} />
          <p>Grok Bot for Thomson Reuters GTM</p>
        </div>
        <address>
          <span>Your Cursor account executive</span>
          <strong>{owner.name}</strong>
          <a href={`mailto:${owner.email}`}>{owner.email}</a>
        </address>
        <form action="/api/logout" method="post">
          <button type="submit">Lock page</button>
        </form>
      </footer>
    </main>
  );
}
