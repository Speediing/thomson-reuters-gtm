"use client";

import { useState } from "react";

import type { AgentScenario, ScenarioId } from "@/lib/site-content";

type CustomerStoryProps = {
  scenarios: readonly [AgentScenario, ...AgentScenario[]];
};

export function CustomerStory({ scenarios }: CustomerStoryProps) {
  const [activeId, setActiveId] = useState<ScenarioId>(scenarios[0].id);
  const active = scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0];

  return (
    <div className="story-shell" id="sample-workflow">
      <div className="story-tabs" aria-label="Sample Grok Bot workflows">
        {scenarios.map((scenario) => (
          <button
            className={scenario.id === active.id ? "is-active" : undefined}
            type="button"
            aria-pressed={scenario.id === active.id}
            onClick={() => setActiveId(scenario.id)}
            key={scenario.id}
          >
            {scenario.tab}
          </button>
        ))}
      </div>

      <div className="story-window" key={active.id}>
        <div className="story-bar">
          <div className="window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <strong>Grok Bot signal desk</strong>
          <span className="story-status">
            <i aria-hidden="true" />
            Working
          </span>
        </div>

        <div className="story-body">
          <aside className="story-trigger">
            <p className="story-time">{active.time}</p>
            <span className="story-account">{active.account}</span>
            <h2>{active.trigger}</h2>
            <p>{active.summary}</p>
          </aside>

          <section className="story-run" aria-live="polite">
            <p className="story-run-label">Background run</p>
            <ol>
              {active.steps.map((step) => (
                <li className={`is-${step.state}`} key={step.label}>
                  <span className="step-mark" aria-hidden="true">
                    {step.state === "complete" ? "✓" : step.state === "working" ? "↗" : "•"}
                  </span>
                  <div>
                    <strong>{step.label}</strong>
                    <p>{step.detail}</p>
                  </div>
                  <em>{step.state}</em>
                </li>
              ))}
            </ol>
            <div className="story-deliverable">
              <div>
                <span>Ready for the rep</span>
                <strong>{active.deliverable}</strong>
              </div>
              <em>Rep approval required</em>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
