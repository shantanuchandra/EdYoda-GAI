/* eslint-disable no-undef -- the inherited Babel parser does not recognize TypeScript declarations. */
export type CareerRole = {
  company: string;
  title: string;
  start: string;
  end: string;
  periodLabel: string;
  focus: string;
};

export const builderRoles: readonly [CareerRole, CareerRole] = [
  {
    company: "Builder.ai",
    title: "Product Manager (Design)",
    start: "2020-12",
    end: "2022-03",
    periodLabel: "Dec 2020–Mar 2022",
    focus: "Product design systems and customer problem framing.",
  },
  {
    company: "Builder.ai",
    title: "Senior Product Manager (Conversational AI)",
    start: "2022-04",
    end: "2023-08",
    periodLabel: "Apr 2022–Aug 2023",
    focus: "Conversational product scale, evaluation standards and customer adoption.",
  },
] as const;

export const publicCareer: readonly CareerRole[] = [
  {
    company: "Lenskart",
    title: "AI Product Lead",
    start: "2025-11",
    end: "present",
    periodLabel: "Nov 2025–Present",
    focus: "Selecting, launching and governing AI products for retail journeys and operations.",
  },
  {
    company: "IIFL Home Loans",
    title: "AVP / Lead Product Manager",
    start: "2024-05",
    end: "2025-10",
    periodLabel: "May 2024–Oct 2025",
    focus: "Digital lending, enterprise AI assistance and cross-functional product leadership.",
  },
  {
    company: "Hakuhodo",
    title: "Senior Product Manager, AdTech",
    start: "2023-09",
    end: "2024-04",
    periodLabel: "Sep 2023–Apr 2024",
    focus: "Campaign automation and adoption across commerce platforms.",
  },
  ...builderRoles,
  {
    company: "NUiO",
    title: "Product Manager, Salesforce Consulting",
    start: "2020-03",
    end: "2020-12",
    periodLabel: "Mar 2020–Dec 2020",
    focus: "Enterprise product consulting.",
  },
  {
    company: "Pantheon",
    title: "Product Analyst",
    start: "2019-07",
    end: "2020-03",
    periodLabel: "Jul 2019–Mar 2020",
    focus: "Data-led product analysis and database-migration test automation.",
  },
  {
    company: "Cummins",
    title: "Business Development Analyst",
    start: "2018-06",
    end: "2018-08",
    periodLabel: "Jun 2018–Aug 2018",
    focus: "Market analysis and growth opportunities across industrial verticals.",
  },
  {
    company: "Toshiba Softwares",
    title: "Software Engineer",
    start: "2013-08",
    end: "2016-09",
    periodLabel: "Aug 2013–Sep 2016",
    focus: "Software engineering foundations.",
  },
] as const;

export const homepageCareer: readonly CareerRole[] = [
  ...publicCareer,
  {
    company: "POWERGRID",
    title: "Selected enterprise technology work",
    start: "",
    end: "",
    periodLabel: "Selected engagement",
    focus: "Infrastructure and enterprise technology experience.",
  },
  {
    company: "Telerik (now Progress Software)",
    title: "Selected enterprise software work",
    start: "",
    end: "",
    periodLabel: "Selected engagement",
    focus: "Developer tooling and enterprise software experience.",
  },
] as const;
