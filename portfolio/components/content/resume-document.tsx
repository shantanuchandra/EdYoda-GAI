/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type ResumeRoleProps = {
  children?: React.ReactNode;
  company: string;
  logo?: string;
  period?: string;
  role?: string;
  summary?: string;
};

function ResumeRole({ children, company, logo, period, role, summary }: ResumeRoleProps) {
  return (
    <article className="resume-role" data-resume-role>
      <span aria-hidden="true" className="resume-role__wash" />
      <header className="resume-role__header">
        <div>
          <h3>{role ?? company}</h3>
          {role ? <p className="resume-role__company">{company}</p> : null}
        </div>
        {period ? <p className="resume-role__period"><CalendarDays aria-hidden="true" />{period}</p> : null}
      </header>
      {logo ? <Image alt={`${company} logo`} className="resume-role__logo" height={36} src={logo} width={96} /> : null}
      {summary ? <p className="resume-role__summary">{summary}</p> : null}
      {children ? (
        <details className="resume-role__detail">
          <summary>Role detail <ChevronDown aria-hidden="true" /></summary>
          <div>{children}</div>
        </details>
      ) : null}
    </article>
  );
}

export function ResumeDocument() {
  return (
    <article className="resume-document">
      <h1 className="sr-only">Shantanu Chandra</h1>

      <section aria-label="Career experience" className="resume-section resume-section--experience" data-resume-experience>
        <h2>Experience</h2>

        <ResumeRole company="Lenskart" logo="/images/companies/lenskart.png" period="Nov 2025–Present" role="AI Product Lead" summary="Selected three of 10 AI use cases for delivery, launched eye-test and recruiting products, and moved Marketing Intelligence into pilot.">
          <p className="resume-role__scope">Reports to a co-founder; works with three AI engineers, two ML engineers and one DevOps engineer.</p>
          <ul>
            <li>Selected three of 10 AI use cases for delivery, launched the eye-test and recruiting products, and moved Marketing Intelligence into pilot.</li>
            <li>Launched a Hindi and English voice-guided eye test in 200 stores. Across 1,000 controlled and 1,000 live-store tests, 95% of results agreed with a licensed optometrist&apos;s prescription within accepted industry tolerance; an optometrist approved every final prescription.</li>
            <li>Made on-device intent detection three times faster and cut recruiter sourcing and interest checks from about eight weeks to one across 300 candidates, with recruiters retaining calls, emails and final decisions.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company="IIFL Home Loans" logo="/images/companies/iifl-home-loans.png" period="May 2024–Oct 2025" role="AVP / Lead Product Manager" summary="Integrated credit bureau, KYC and Account Aggregator services into an app handling about one million onboardings a month; employed-customer onboarding and approval reached 20 minutes.">
          <p className="resume-role__scope">Managed six product managers and led 25 engineers and data scientists across three squads.</p>
          <ul>
            <li>Integrated credit bureau, KYC and Account Aggregator services into an app handling about one million onboardings a month; employed-customer onboarding and approval reached 20 minutes.</li>
            <li>Piloted a RAG policy assistant with 2,000 field-sales employees. Of about 100 weekly questions, 80% cleared a 95% confidence threshold; remaining questions went to policy specialists.</li>
            <li>Kept customer communications and collections actions behind human approval and an audit trail, with KYC and anti-money-laundering checks aligned to RBI and NHB requirements.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company="Hakuhodo" logo="/images/companies/hakuhodo.png" period="Sep 2023–Apr 2024" role="Senior Product Manager, AdTech" summary="Led automation of budgets, bids, campaign rules, inventory checks and reporting, reducing manual campaign work by 70% and new-client onboarding from several months to one week.">
          <p className="resume-role__scope">Mentored two product managers; worked across five commerce platforms and two national FMCG clients.</p>
          <ul>
            <li>Led automation of budgets, bids, campaign rules, inventory checks and reporting, reducing manual campaign work by 70% and new-client onboarding from several months to one week.</li>
            <li>During the eight-month rollout, the platform reached 50% adoption among eligible users in one quarter, while managed-campaign ROAS rose from 1.3× to 1.7×, a 31% increase.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company="Builder.ai" logo="/images/companies/builder-ai.png" period="Dec 2020–Aug 2023" role="Product Manager → Senior Product Manager" summary="Established product-design foundations and then scaled conversational planning, evaluation standards and customer adoption.">
          <p className="resume-role__scope">Led four product managers, two designers and 14 engineers and data scientists across five product squads.</p>
          <ul>
            <li>Led early customer discovery and product design work that established the foundations for the conversational planning workflow.</li>
            <li>Led customer interviews, beta programmes, product demos and sales enablement for a conversational planning product, reaching 90% adoption among 150 customer-success managers.</li>
            <li>Introduced consistent intent labels, training-data review and model-evaluation standards.</li>
            <li>A freemium offer increased completed monthly onboardings from 50 to 25,000 in six months; 12,500 users bought at least one month of service in month six.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company="NUiO" logo="/images/companies/nuio.png" period="Mar 2020–Nov 2020" role="Product Manager / Salesforce Administrator" summary="Led discovery, user-story development and roadmap work for CRM solutions with cross-functional delivery teams.">
          <ul>
            <li>Led discovery sessions, mapped user needs into product requirements and coordinated delivery with cross-cultural Scrum teams.</li>
            <li>Created product strategy and roadmap materials, alongside dashboards that supported metric-based decisions.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company="Pantheon" logo="/images/companies/pantheon.png" period="Jul 2019–Mar 2020" role="Business Analyst" summary="Built SQL, Excel and VBA migration-testing automation, reducing test execution time by 73%.">
          <ul>
            <li>Translated product features into user stories, acceptance criteria and test plans for healthcare technology work.</li>
            <li>Built a repeatable database-migration QA tool using SQL, Excel and VBA, reducing test execution time by 73%.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company="Cummins" logo="/images/companies/cummins.png" period="Jun 2018–Aug 2018" role="Business Development Analyst" summary="Mapped growth opportunities across industrial verticals and researched predictive-maintenance customer potential.">
          <ul>
            <li>Mapped business challenges across four verticals and used design thinking to identify scalable process opportunities.</li>
            <li>Researched North American hospital groups to evaluate the potential for predictive-maintenance services.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company="Toshiba Softwares" logo="/images/companies/toshiba.png" period="Aug 2013–Sep 2016" role="Software Engineer / Project Coordinator" summary="Contributed to weather-radar visualization software and coordinated a smart-parking pilot selected for Toshiba Global Innovation Day.">
          <ul>
            <li>Helped build weather-radar visualization software deployed in India and other markets.</li>
            <li>Coordinated a smart-parking pilot selected for Toshiba Global Innovation Day.</li>
          </ul>
        </ResumeRole>

      </section>

      <section aria-label="Education" className="resume-section resume-section--education" data-resume-education="true">
        <h2>Education</h2>
        <article className="resume-education-card">
          <div>
            <h3>MBA, Marketing</h3>
            <p>William &amp; Mary, Raymond A. Mason School of Business</p>
          </div>
          <span>2017–2019</span>
        </article>
        <article className="resume-education-card">
          <div>
            <h3>Bachelor of Engineering, Computer Science</h3>
            <p>Manipal Institute of Technology</p>
          </div>
          <span>2013</span>
        </article>
      </section>

      <section aria-label="Professional Skills" className="resume-section resume-section--skills" data-resume-skills="true">
        <h2>Professional Skills</h2>
        <div className="resume-skills__panel">
          <section className="resume-skill-card" data-resume-skill-card>
            <h3>Applied AI</h3>
            <ul>
              <li>RAG</li>
              <li>AI agents</li>
              <li>Model evaluation</li>
              <li>Human-review workflows</li>
              <li>Rule-based intent detection</li>
            </ul>
          </section>
          <section className="resume-skill-card" data-resume-skill-card>
            <h3>Product leadership</h3>
            <ul>
              <li>Product strategy</li>
              <li>Discovery and roadmaps</li>
              <li>Operating design</li>
              <li>Go-to-market</li>
              <li>Stakeholder leadership</li>
            </ul>
          </section>
          <section className="resume-skill-card" data-resume-skill-card>
            <h3>Data and platforms</h3>
            <ul>
              <li>SQL</li>
              <li>Python</li>
              <li>AWS</li>
              <li>Supabase</li>
              <li>Railway</li>
            </ul>
          </section>
          <section className="resume-skill-card" data-resume-skill-card>
            <h3>Design and delivery</h3>
            <ul>
              <li>Figma</li>
              <li>Miro</li>
              <li>Jira</li>
              <li>Agile delivery</li>
              <li>Customer adoption</li>
            </ul>
          </section>
        </div>
      </section>

      <section aria-label="Profile" className="resume-profile">
        <h2>Profile</h2>
        <p className="resume-document__descriptor">{siteConfig.descriptor}</p>
        <address className="resume-document__contact">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={siteConfig.linkedin}>linkedin.com/in/chandrashantanu</a>
        </address>
        <p className="resume-document__summary">
          AI product and transformation leader with 12+ years across retail, lending, AdTech, SaaS and enterprise software, including five years building and launching AI products. I connect product judgment, operating design, evaluation, governance and adoption to turn useful signals into measurable systems at scale.
        </p>
      </section>

      <footer className="resume-document__footer">
        <p>The HTML resume remains available if the PDF cannot be downloaded.</p>
        <Link href={siteConfig.resumePath} prefetch={false}>Download PDF resume</Link>
      </footer>
    </article>
  );
}
