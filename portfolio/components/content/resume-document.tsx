/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not recognize imports used by JSX or TypeScript. */
import Link from "next/link";
import { builderRoles } from "@/lib/resume-data";
import { siteConfig } from "@/lib/site-config";

type ResumeRoleProps = {
  children: React.ReactNode;
  company: string;
  period?: string;
  role?: string;
};

function ResumeRole({ children, company, period, role }: ResumeRoleProps) {
  return (
    <article className="resume-role">
      <header className="resume-role__header">
        <div>
          <h3>{company}</h3>
          {role ? <p>{role}</p> : null}
        </div>
        {period ? <p className="resume-role__period">{period}</p> : null}
      </header>
      {children}
    </article>
  );
}

export function ResumeDocument() {
  return (
    <article className="resume-document">
      <h1 className="sr-only">Shantanu Chandra</h1>

      <section aria-label="Career experience" className="resume-section resume-section--experience" data-resume-experience>
        <h2>Experience</h2>

        <ResumeRole company="Lenskart" period="Nov 2025–Present" role="AI Product Lead">
          <p className="resume-role__scope">Reports to a co-founder; works with three AI engineers, two ML engineers and one DevOps engineer.</p>
          <ul>
            <li>Selected three of 10 AI use cases for delivery, launched the eye-test and recruiting products, and moved Marketing Intelligence into pilot.</li>
            <li>Launched a Hindi and English voice-guided eye test in 200 stores. Across 1,000 controlled and 1,000 live-store tests, 95% of results agreed with a licensed optometrist&apos;s prescription within accepted industry tolerance; an optometrist approved every final prescription.</li>
            <li>Made on-device intent detection three times faster and cut recruiter sourcing and interest checks from about eight weeks to one across 300 candidates, with recruiters retaining calls, emails and final decisions.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company="IIFL Home Loans" period="May 2024–Oct 2025" role="AVP / Lead Product Manager">
          <p className="resume-role__scope">Managed six product managers and led 25 engineers and data scientists across three squads.</p>
          <ul>
            <li>Integrated credit bureau, KYC and Account Aggregator services into an app handling about one million onboardings a month; employed-customer onboarding and approval reached 20 minutes.</li>
            <li>Piloted a RAG policy assistant with 2,000 field-sales employees. Of about 100 weekly questions, 80% cleared a 95% confidence threshold; remaining questions went to policy specialists.</li>
            <li>Kept customer communications and collections actions behind human approval and an audit trail, with KYC and anti-money-laundering checks aligned to RBI and NHB requirements.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company="Hakuhodo" period="Sep 2023–Apr 2024" role="Senior Product Manager, AdTech">
          <p className="resume-role__scope">Mentored two product managers; worked across five commerce platforms and two national FMCG clients.</p>
          <ul>
            <li>Led automation of budgets, bids, campaign rules, inventory checks and reporting, reducing manual campaign work by 70% and new-client onboarding from several months to one week.</li>
            <li>During the eight-month rollout, the platform reached 50% adoption among eligible users in one quarter, while managed-campaign ROAS rose from 1.3× to 1.7×, a 31% increase.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company={builderRoles[0].company} period={builderRoles[0].periodLabel} role={builderRoles[0].title}>
          <p className="resume-role__scope">Product design systems and customer problem framing.</p>
          <ul>
            <li>Led early customer discovery and product design work that established the foundations for the conversational planning workflow.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company={builderRoles[1].company} period={builderRoles[1].periodLabel} role={builderRoles[1].title}>
          <p className="resume-role__scope">Led four product managers, two designers and 14 engineers and data scientists across five product squads.</p>
          <ul>
            <li>Led customer interviews, beta programmes, product demos and sales enablement for a conversational planning product, reaching 90% adoption among 150 customer-success managers.</li>
            <li>Introduced consistent intent labels, training-data review and model-evaluation standards.</li>
            <li>A freemium offer increased completed monthly onboardings from 50 to 25,000 in six months; 12,500 users bought at least one month of service in month six.</li>
          </ul>
        </ResumeRole>

        <ResumeRole company="Earlier career">
          <dl className="resume-earlier-career">
            <div>
              <dt>NUiO</dt>
              <dd>Product Manager, Salesforce Consulting · Mar–Dec 2020</dd>
            </div>
            <div>
              <dt>Pantheon</dt>
              <dd>Product Analyst · Jul 2019–Mar 2020. Built an SQL, Excel and VBA database-migration testing tool, reducing test execution time by more than 75%.</dd>
            </div>
            <div>
              <dt>Toshiba Softwares</dt>
              <dd>Software Engineer · Aug 2013–Sep 2016</dd>
            </div>
          </dl>
        </ResumeRole>

        <ResumeRole company="Independent products">
          <dl className="resume-earlier-career">
            <div>
              <dt>WasabiTravels</dt>
              <dd>Built and launched a Japan itinerary planner using more than 2,000 curated places to suggest routes and check whether each day&apos;s plan is practical.</dd>
            </div>
            <div>
              <dt>Card Compass · Case study only</dt>
              <dd>Built a credit-card discovery product using spending patterns and reward rules; it attracted 121 early-access requests. The current public destination is the portfolio case study only.</dd>
            </div>
          </dl>
        </ResumeRole>
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

      <div className="resume-document__columns">
        <section aria-label="Education" className="resume-section">
          <h2>Education and practical instruction</h2>
          <div className="resume-credential">
            <h3>MBA, Marketing</h3>
            <p>William &amp; Mary, Raymond A. Mason School of Business · 2017–2019</p>
          </div>
          <div className="resume-credential">
            <h3>Bachelor of Engineering, Computer Science</h3>
            <p>Manipal Institute of Technology · 2013</p>
          </div>
          <div className="resume-credential">
            <h3>Practical instruction</h3>
            <p>Generative AI and no-code agents · Jun 2025–Present</p>
          </div>
        </section>

        <section aria-label="Methods and tools" className="resume-section">
          <h2>Methods and tools</h2>
          <dl className="resume-methods">
            <div>
              <dt>Applied AI</dt>
              <dd>RAG, AI agents, model evaluation, human-review workflows, rule-based intent detection</dd>
            </div>
            <div>
              <dt>Data and infrastructure</dt>
              <dd>SQL, Python, AWS, Supabase, Railway</dd>
            </div>
            <div>
              <dt>Product</dt>
              <dd>Jira, Figma, Miro</dd>
            </div>
          </dl>
        </section>
      </div>

      <footer className="resume-document__footer">
        <p>The HTML resume remains available if the PDF cannot be downloaded.</p>
        <Link href={siteConfig.resumePath} prefetch={false}>Download PDF resume</Link>
      </footer>
    </article>
  );
}
