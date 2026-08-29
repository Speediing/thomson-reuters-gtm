import Image from "next/image";

import { BrandLockup } from "@/components/BrandLockup";
import { CompareTable } from "@/components/CompareTable";
import { HeroDemo } from "@/components/HeroDemo";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { QuoteWall } from "@/components/QuoteWall";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        <Image
          className="hero-watercolor-image"
          src="/brand/thomson-reuters-watercolor-header.jpg"
          alt=""
          width={1280}
          height={720}
          sizes="100vw"
          priority
          unoptimized
        />
        <SiteNav />
      </div>

      <div className="report report-paper">
        <div className="report-hero">
          <span className="paper-pin paper-pin-left" aria-hidden />
          <span className="paper-pin paper-pin-right" aria-hidden />
          <HeroTelemetry />
          <HeroDemo />

          <section className="usecase-framing">
            <p className="eyebrow">Three sample use cases</p>
            <h2>
              Watch the work move from signal to finished artifact.
            </h2>
            <p>
              Every timeline ends with the actual deliverable. Open the agent
              desk to see chat on the left and its computer on the right.
            </p>
          </section>

          <div className="metric-grid">
            {JOBS.map((job) => (
              <a
                key={job.id}
                className="metric-card"
                href={`#${job.id}`}
              >
                <div className="metric-card-top">
                  <p>Sample {String(job.number).padStart(2, "0")}</p>
                </div>
                <h2>{job.title}</h2>
                <p className="metric-trigger">Starts when {job.trigger.toLowerCase()}</p>
              </a>
            ))}
          </div>
        </div>
        <RosterChart />

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="report">
        <CompareTable />
        <QuoteWall />
      </div>

      <footer className="site-footer">
        <div>
          <BrandLockup size="sm" />
          <p className="footer-title">Grok Bot for Thomson Reuters GTM</p>
        </div>
        <address className="footer-contact">
          <p>Your Cursor account executive</p>
          <strong>Nick Scallion</strong>
          <a href="mailto:nick.scallion@cursor.com">
            nick.scallion@cursor.com
          </a>
        </address>
        <form action="/api/logout" method="post">
          <button type="submit">Lock page</button>
        </form>
      </footer>
    </main>
  );
}
