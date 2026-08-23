import { publicCareer } from "@/lib/resume-data";

export function CareerTimeline() {
  return (
    <ol aria-label="Career timeline" className="career-timeline">
      {publicCareer.map((entry) => (
        <li className="career-timeline__entry" key={`${entry.company}-${entry.start}`}>
          <article>
            <p className="career-timeline__period">{entry.periodLabel}</p>
            <h3>{entry.company}</h3>
            <p className="career-timeline__role">{entry.title}</p>
            <p className="career-timeline__focus">{entry.focus}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}
