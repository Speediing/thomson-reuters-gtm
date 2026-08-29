import { QUOTES } from "@/data/quotes";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function QuoteWall() {
  return (
    <section id="testimonials" className="quotes">
      <p className="eyebrow">Public reactions</p>
      <h2>What people say after they use Grok Bot.</h2>
      <p className="section-lede">
        These excerpts link to the original public posts.
      </p>
      <div className="quote-thread">
        {QUOTES.map((quote) => (
          <article
            className="quote-row"
            key={`${quote.handle}-${quote.date}`}
          >
            <div className="quote-who">
              <span className="quote-avatar" aria-hidden>
                {initials(quote.name)}
              </span>
              <div>
                <p className="quote-name">{quote.name}</p>
                <p className="quote-handle">{quote.handle}</p>
              </div>
            </div>
            <blockquote className="quote-bubble" cite={quote.source}>
              {quote.quote}
            </blockquote>
            <a
              className="quote-source"
              href={quote.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the source
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
