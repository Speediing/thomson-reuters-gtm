import { FLEET } from "@/data/fleet";

export function RosterChart() {
  return (
    <section id="fleet" className="roster fleet-roster">
      <p className="eyebrow">The agent fleet</p>
      <h2>Each repeatable job gets a computer and a clear finish line.</h2>
      <p className="section-lede">
        These are working desks. Each agent opens the right tools, does the
        background work, and returns a finished artifact.
      </p>

      <div className="agent-computer-grid">
        {FLEET.map((agent, index) => (
          <a
            className="agent-computer"
            href={`#${agent.jobId}`}
            key={agent.id}
          >
            <header>
              <span className="traffic" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <strong>Computer {String(index + 1).padStart(2, "0")}</strong>
              <span className="agent-online">
                <i aria-hidden />
                Online
              </span>
            </header>
            <div className="agent-computer-screen">
              <span
                className="agent-computer-avatar"
                style={{ background: agent.color }}
                aria-hidden
              >
                {agent.mark}
              </span>
              <div>
                <h3>{agent.name}</h3>
                <p>{agent.blurb}</p>
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
              <span>Open sample</span>
              <i aria-hidden />
            </footer>
          </a>
        ))}
      </div>
    </section>
  );
}
