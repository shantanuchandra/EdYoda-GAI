/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript type declarations. */
type CareerTimelineEntry = {
  company: string;
  role: string;
  period: string;
  focus: string;
};

const careerTimelineEntries: readonly CareerTimelineEntry[] = [
  {
    company: "Lenskart",
    role: "AI Product Lead",
    period: "Nov 2025–Present",
    focus: "Selecting, launching and governing AI products for retail journeys and operations.",
  },
  {
    company: "IIFL Home Loans",
    role: "AVP / Lead Product Manager",
    period: "May 2024–Oct 2025",
    focus: "Digital lending, enterprise AI assistance and cross-functional product leadership.",
  },
  {
    company: "AGL (Hakuhodo)",
    role: "Senior Product Manager, AdTech",
    period: "Sep 2023–Apr 2024",
    focus: "Campaign automation and adoption across commerce platforms.",
  },
  {
    company: "Builder.ai",
    role: "Senior Product Manager, Conversational AI",
    period: "Dec 2020–Aug 2023",
    focus: "Conversational product scale, evaluation standards and customer adoption.",
  },
  {
    company: "NUiO",
    role: "Product Manager, Salesforce Consulting",
    period: "Mar 2020–Dec 2020",
    focus: "Enterprise product consulting.",
  },
  {
    company: "Pantheon",
    role: "Product Analyst",
    period: "Jul 2019–Mar 2020",
    focus: "Data-led product analysis and database-migration test automation.",
  },
  {
    company: "Covalent Softwares",
    role: "Manager, Sales & Support",
    period: "Oct 2016–Aug 2017",
    focus: "Customer, commercial and operating foundations.",
  },
  {
    company: "Toshiba Softwares",
    role: "Software Engineer",
    period: "Aug 2013–Sep 2016",
    focus: "Software engineering foundations.",
  },
] as const;

export function CareerTimeline() {
  return (
    <ol aria-label="Career timeline" className="career-timeline">
      {careerTimelineEntries.map((entry) => (
        <li className="career-timeline__entry" key={`${entry.company}-${entry.period}`}>
          <article>
            <p className="career-timeline__period">{entry.period}</p>
            <h3>{entry.company}</h3>
            <p className="career-timeline__role">{entry.role}</p>
            <p className="career-timeline__focus">{entry.focus}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}
