import type { CroJob, JobId } from "@/data/types";
import { Storyboard } from "./Storyboard";
import { ChapterPayoff } from "./ChapterPayoff";
import { JobDemo } from "./JobDemo";

const JOB_ART: Record<JobId, string> = {
  "standardize-room": "/brand/thomson-reuters-watercolor-header.jpg",
  "legal-redlines": "/brand/thomson-reuters-watercolor-header.jpg",
  "attach-engine": "/brand/thomson-reuters-watercolor-header.jpg",
};

export function JobSection({ job }: { job: CroJob }) {
  const lastBeat = job.storyboard[job.storyboard.length - 1];
  const payoff =
    lastBeat?.artifact || lastBeat?.slides?.length ? lastBeat : undefined;
  const lead = payoff ? job.storyboard.slice(0, -1) : job.storyboard;

  return (
    <section id={job.id} className="narrative report-section job">
      <p className="section-number">
        {String(job.number).padStart(2, "0")}
      </p>
      <div>
        <div className="job-art" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={JOB_ART[job.id]} alt="" />
        </div>
        <div className="background-agent">
          <span className="background-agent-pulse" aria-hidden />
          <p>
            <strong>Background agent active</strong>
            <small>
              {job.trigger} → {job.backgroundAction}
            </small>
          </p>
        </div>
        <h2 className="job-title">{job.title}</h2>
        <p className="job-value">{job.outcome}</p>
        <Storyboard beats={lead} />
        {payoff ? (
          <ChapterPayoff beat={payoff} wash={JOB_ART[job.id]} />
        ) : null}
        <div className="agent-desk-section">
          <p className="eyebrow">Agent desk</p>
          <h3>Chat on the left. Computer on the right.</h3>
          <JobDemo job={job} />
        </div>
      </div>
    </section>
  );
}
