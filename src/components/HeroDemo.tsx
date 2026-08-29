"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { HERO_JOBS } from "@/data/hero-jobs";

const JOB_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7] as const;
type JobIndex = (typeof JOB_INDEXES)[number];

function jobIndex(offset: number): JobIndex {
  const count = JOB_INDEXES.length;
  const wrapped = ((offset % count) + count) % count;
  return JOB_INDEXES[wrapped] ?? 0;
}

export function HeroDemo() {
  const [active, setActive] = useState<JobIndex>(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const job = HERO_JOBS[active];

  function activate(index: JobIndex, moveFocus = false) {
    setActive(index);
    if (moveFocus) {
      tabsRef.current[index]?.focus();
    }
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let next: JobIndex | undefined;
    if (event.key === "ArrowRight") next = jobIndex(active + 1);
    if (event.key === "ArrowLeft") next = jobIndex(active - 1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 7;
    if (next === undefined) return;
    event.preventDefault();
    activate(next, true);
  }

  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Grok Bot for Thomson Reuters GTM</p>
        <h1>A fleet of agents, each with its own computer.</h1>
        <p className="hero-intro">
          They handle the work around every account. Research, meeting prep,
          follow-up, and approved answers keep moving while sellers stay with
          the customer.
        </p>
        <div
          className="hero-phone-jobs"
          role="tablist"
          aria-label="Agent jobs"
        >
          {HERO_JOBS.map((item, index) => {
            const tab = jobIndex(index);
            const selected = tab === active;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabsRef.current[tab] = node;
                }}
                type="button"
                role="tab"
                id={`hero-job-${item.id}`}
                aria-selected={selected}
                aria-controls="hero-bot-demo"
                tabIndex={selected ? 0 : -1}
                onClick={() => activate(tab)}
                onKeyDown={onTabKeyDown}
                className={selected ? "is-active" : undefined}
              >
                <span aria-hidden>{item.mark}</span>
                {item.pill}
              </button>
            );
          })}
        </div>
      </div>
      <aside className="hero-bot-demo">
        <div
          className="hero-phone"
          id="hero-bot-demo"
          role="tabpanel"
          aria-labelledby={`hero-job-${job.id}`}
        >
          <div className="notch hero-phone-notch" aria-hidden />
          <header className="header hero-phone-header">
            <span className="hero-phone-back" aria-hidden>
              ‹
            </span>
            <span className="hero-phone-agent" aria-hidden>
              {job.mark}
            </span>
            <p>
              <strong>{job.agent}</strong>
              <small>
                <span aria-hidden />
                {job.status}
              </small>
            </p>
            <span className="hero-phone-desktop" aria-hidden>
              ▣
            </span>
          </header>
          <div className="thread hero-phone-thread" key={job.id}>
            <article className="hero-phone-work">
              <p className="hero-phone-work-label">
                <span aria-hidden />
                {job.trigger}
              </p>
              {job.workRows.map((row) => (
                <p className="hero-phone-work-meta" key={row.label}>
                  <span>{row.label}</span>
                  {row.value}
                </p>
              ))}
              <p className="hero-phone-work-copy">{job.workBody}</p>
              <strong>{job.result}</strong>
            </article>
            {job.messages.map((message) => (
              <p
                key={`${message.role}-${message.body}`}
                className={`hero-phone-message ${
                  message.role === "user" ? "is-user" : "is-bot"
                }`}
              >
                <span className="sr-only">
                  {message.role === "user" ? "You" : job.agent}:
                </span>{" "}
                {message.body}
              </p>
            ))}
          </div>
          <footer className="composer hero-phone-composer" aria-hidden>
            <span>+</span>
            <p>Message {job.agent}</p>
            <span>●</span>
          </footer>
        </div>
      </aside>
    </section>
  );
}
