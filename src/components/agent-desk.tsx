"use client";

import { useState } from "react";

import type { ChatMessage, UseCase } from "@/lib/site-content";

type AgentDeskProps = {
  useCase: UseCase;
};

function ChatBubble({ message }: { message: ChatMessage }) {
  return (
    <li className={`desk-message is-${message.from}`}>
      <span>{message.from === "agent" ? "G" : message.from === "rep" ? "You" : "Run"}</span>
      <p>{message.body}</p>
    </li>
  );
}

export function AgentDesk({ useCase }: AgentDeskProps) {
  const [activeIndex, setActiveIndex] = useState(useCase.frames.length - 1);
  const activeFrame = useCase.frames[activeIndex] ?? useCase.frames[0];

  return (
    <div className="scene">
      <ol className="scene-frames" aria-label={`${useCase.title} scene frames`}>
        {useCase.frames.map((frame, index) => (
          <li key={`${frame.at}-${frame.label}`}>
            <button
              className={index === activeIndex ? "is-active" : undefined}
              type="button"
              aria-pressed={index === activeIndex}
              data-frame-kind={frame.kind}
              onClick={() => setActiveIndex(index)}
            >
              <span>{frame.at}</span>
              <strong>{frame.label}</strong>
              <small>{frame.summary}</small>
              <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
            </button>
          </li>
        ))}
      </ol>

      <div className="agent-window" key={`${useCase.id}-${activeIndex}`}>
        <header className="agent-window-bar">
          <span className="traffic" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <strong>{useCase.title}</strong>
          <span className="window-state">
            <i aria-hidden="true" />
            Agent working
          </span>
        </header>

        <div className="agent-window-body">
          <section className="chat-panel" aria-label="Agent chat">
            <header>
              <div className="agent-avatar" aria-hidden="true">
                G
              </div>
              <div>
                <h3>{useCase.id === "meeting" ? "Meeting pack" : useCase.id === "procurement" ? "Procurement" : "Account expansion"}</h3>
                <p>Illustrative agent transcript. Nothing sends on its own.</p>
              </div>
            </header>
            <ol>
              {activeFrame.chat.map((message, index) => (
                <ChatBubble message={message} key={`${message.from}-${index}`} />
              ))}
            </ol>
            <footer>
              <span>Message the agent</span>
              <button type="button" aria-label="Send message" disabled>
                ↑
              </button>
            </footer>
          </section>

          <section className="computer-panel" aria-label="Agent computer">
            <header className="computer-chrome">
              <span aria-hidden="true">‹</span>
              <p>
                <i aria-hidden="true" />
                workspace.grok
              </p>
              <span aria-hidden="true">•••</span>
            </header>
            <div className="computer-app-bar">
              <div>
                <span>{activeFrame.computer.app}</span>
                <strong>{activeFrame.computer.title}</strong>
              </div>
              <p>{activeFrame.computer.status}</p>
            </div>

            <div className={`computer-work is-${activeFrame.kind}`}>
              {activeFrame.kind === "artifact" ? (
                <article className="finished-artifact">
                  <header>
                    <span>{activeFrame.artifact.kicker}</span>
                    <strong>Ready for review</strong>
                  </header>
                  <h4>{activeFrame.artifact.title}</h4>
                  <dl>
                    {activeFrame.artifact.fields.map((field) => (
                      <div key={field.label}>
                        <dt>{field.label}</dt>
                        <dd>{field.value}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ) : (
                <div className="work-board">
                  <header>
                    <span>{activeFrame.label}</span>
                    <strong>{activeFrame.at}</strong>
                  </header>
                  <ul>
                    {activeFrame.computer.items.map((item, index) => (
                      <li key={item}>
                        <span aria-hidden="true">{index < activeIndex ? "✓" : "·"}</span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <footer className="computer-dock" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}
