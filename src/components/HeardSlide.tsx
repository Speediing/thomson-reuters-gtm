import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className="heard-slide">
        <header className="heard-bar">
          <span>Finished artifact</span>
          <strong>Meeting pack</strong>
        </header>
        <div className="deck-slides">
          {slides.map((slide) => (
            <section className="deck-tile" key={`${slide.n}-${slide.title}`}>
              <p className="heard-tag">{slide.kicker}</p>
              <h3>{slide.title}</h3>
              <p>{slide.body}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
