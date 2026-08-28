import { BrandLockup } from "@/components/brand-lockup";
import { CustomerStory } from "@/components/customer-story";
import { siteContent } from "@/lib/site-content";

export default function HomePage() {
  const { hero, heard, useCases, operatingModel, comparison, rollout, close, owner } =
    siteContent;

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <BrandLockup />
          <nav aria-label="Main navigation">
            {siteContent.nav.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-action" href="#plan">
            Pick the first job
          </a>
        </div>
      </header>

      <main>
        <section className="hero section-shell">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1>{hero.title}</h1>
              <p className="hero-intro">{hero.intro}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={hero.primaryAction.href}>
                  {hero.primaryAction.label}
                </a>
                <a className="button button-secondary" href={hero.secondaryAction.href}>
                  {hero.secondaryAction.label}
                </a>
              </div>
            </div>
            <div className="hero-index" aria-hidden="true">
              <span>TR</span>
              <i />
              <strong>01</strong>
            </div>
          </div>
          <CustomerStory scenarios={siteContent.scenarios} />
        </section>

        <section className="signal-rail" aria-label="Sources Grok Bot can use">
          <p>Approved signals</p>
          <ul>
            {siteContent.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </section>

        <section className="heard section-shell section-pad" id="what-we-heard">
          <div className="section-heading">
            <p className="eyebrow">{heard.eyebrow}</p>
            <h2>{heard.title}</h2>
            <p>{heard.intro}</p>
          </div>
          <div className="heard-grid">
            {heard.items.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="jobs section-pad" id="agent-jobs">
          <div className="section-shell">
            <div className="section-heading section-heading-wide">
              <p className="eyebrow">{useCases.eyebrow}</p>
              <h2>{useCases.title}</h2>
              <p>{useCases.intro}</p>
            </div>
            <div className="job-grid">
              {useCases.items.map((item) => (
                <article className="job-card" key={item.number}>
                  <div className="job-card-top">
                    <span>{item.number}</span>
                    <p>{item.stage}</p>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="job-body">{item.body}</p>
                  <ul>
                    {item.sources.map((source) => (
                      <li key={source}>{source}</li>
                    ))}
                  </ul>
                  <div className="job-output">
                    <span>Output</span>
                    <strong>{item.output}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="operating section-shell section-pad">
          <div className="operating-lead">
            <p className="eyebrow">{operatingModel.eyebrow}</p>
            <h2>{operatingModel.title}</h2>
            <p>{operatingModel.intro}</p>
          </div>
          <ol className="operating-steps">
            {operatingModel.steps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="comparison section-pad">
          <div className="section-shell">
            <div className="section-heading">
              <p className="eyebrow">{comparison.eyebrow}</p>
              <h2>{comparison.title}</h2>
              <p>{comparison.intro}</p>
            </div>
            <div className="comparison-table" role="table" aria-label="Chat and Grok Bot comparison">
              <div className="comparison-row comparison-head" role="row">
                <span role="columnheader">Working model</span>
                <strong role="columnheader">Chat</strong>
                <strong role="columnheader">Grok Bot</strong>
              </div>
              {comparison.rows.map((row) => (
                <div className="comparison-row" role="row" key={row.label}>
                  <span role="rowheader">{row.label}</span>
                  <p role="cell">{row.chat}</p>
                  <p role="cell">{row.grokBot}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="plan section-shell section-pad" id="plan">
          <div className="section-heading section-heading-wide">
            <p className="eyebrow">{rollout.eyebrow}</p>
            <h2>{rollout.title}</h2>
            <p>{rollout.intro}</p>
          </div>
          <ol className="plan-grid">
            {rollout.steps.map((step, index) => (
              <li key={step.time}>
                <span>{step.time}</span>
                <strong>0{index + 1}</strong>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="close">
          <div className="close-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="section-shell close-inner">
            <p className="eyebrow">{close.eyebrow}</p>
            <h2>{close.title}</h2>
            <p>{close.body}</p>
            <a className="button button-light" href={`mailto:${owner.email}`}>
              {close.action}
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner section-shell">
          <BrandLockup />
          <p>
            Your Cursor account executive
            <a href={`mailto:${owner.email}`}>{owner.name}</a>
          </p>
          <form action="/api/logout" method="post">
            <button type="submit">Lock page</button>
          </form>
        </div>
      </footer>
    </>
  );
}
