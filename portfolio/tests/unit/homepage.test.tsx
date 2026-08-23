/* eslint-disable no-undef -- the inherited Babel parser does not apply DOM/TypeScript scope analysis. */
import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import HomePage from "@/app/(site)/page";

class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly scrollMargin = "0px";
  readonly thresholds = [0];

  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
  unobserve() {}
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

async function renderHomepage() {
  render(await HomePage());
}

it("presents the identity-first reference-parity hero and impact record", async () => {
  await renderHomepage();

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Shantanu Chandra");
  const hero = heading.closest("section");
  expect(hero).not.toBeNull();
  expect(
    within(hero as HTMLElement).getByRole("heading", {
      level: 2,
      name: "AI Transformation Leader across industries",
    }),
  ).toBeInTheDocument();

  for (const [name, href] of [
    ["View Resume", "/resume"],
    ["Explore Case Studies", "/case-studies"],
  ]) {
    expect(within(hero as HTMLElement).getByRole("link", { name })).toHaveAttribute("href", href);
  }
  expect(within(hero as HTMLElement).getByRole("link", { name: "Scroll to impact highlights" })).toHaveAttribute(
    "href",
    "#impact-highlights",
  );
  expect(within(hero as HTMLElement).getAllByRole("link")).toHaveLength(3);

  for (const [value, label] of [
    ["200 stores", "Hindi and English voice-guided eye test at Lenskart"],
    ["20 minutes", "Employed-customer onboarding and approval at IIFL"],
    ["70% less manual work", "Campaign operations across five commerce platforms at AGL"],
    ["50 → 25,000", "Monthly completed onboardings in six months at Builder.ai"],
  ]) {
    const impact = screen.getByRole("region", { name: "Impact highlights" });
    const metric = within(impact).getByText(value).closest("li");
    expect(metric).not.toBeNull();
    expect(within(metric as HTMLElement).getByText(label)).toBeInTheDocument();
  }
});

it("organizes the approved work and capabilities around Signal, System and Scale", async () => {
  await renderHomepage();

  const featuredWork = screen.getByRole("region", { name: "Selected employer work" });
  const workCards = within(featuredWork).getAllByRole("article");
  expect(workCards).toHaveLength(4);
  expect(within(featuredWork).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
    "AI-assisted retail journeys at Lenskart",
    "Responsible AI operations for digital lending",
    "Scaling ad-tech operations with automation",
    "Conversational AI for customer-success scale",
  ]);
  expect(workCards.map((card) => card.querySelector("p")?.textContent)).toEqual([
    "Lenskart",
    "IIFL",
    "AGL",
    "Builder.ai",
  ]);

  const capabilitiesHeading = screen.getByRole("heading", { name: "Areas of Specialization" });
  const capabilitiesSection = capabilitiesHeading.closest("section");
  expect(capabilitiesSection).not.toBeNull();
  expect(within(capabilitiesSection as HTMLElement).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
    "Signal",
    "System",
    "Scale",
    "Across industries",
  ]);
  expect(capabilitiesSection).toHaveAttribute("aria-labelledby", "specialization-title");
  expect(capabilitiesSection?.querySelectorAll("[data-specialization-card]")).toHaveLength(4);
  expect(capabilitiesSection?.querySelectorAll("svg[aria-hidden='true']")).toHaveLength(4);
  expect(capabilitiesSection).toHaveTextContent("AI product strategy and portfolio prioritization");
  expect(capabilitiesSection).toHaveTextContent("workflow and operating-model redesign");
  expect(capabilitiesSection).toHaveTextContent("RAG, agentic systems and evaluation design");
  expect(capabilitiesSection).toHaveTextContent("human review and responsible deployment");
  expect(capabilitiesSection).toHaveTextContent("cross-functional product and engineering leadership");
  expect(capabilitiesSection).toHaveTextContent("measurement, iteration and scale");
  expect(capabilitiesSection).toHaveTextContent("Retail, lending, AdTech, SaaS and enterprise software");

  const career = screen.getByRole("region", { name: "Career snapshot" });
  const impact = screen.getByRole("region", { name: "Impact highlights" });
  expect(career.compareDocumentPosition(capabilitiesSection as HTMLElement) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect((capabilitiesSection as HTMLElement).compareDocumentPosition(impact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

  expect(screen.queryByRole("region", { name: "Independent products" })).not.toBeInTheDocument();
  expect(screen.queryByRole("region", { name: "Learning Lab paths" })).not.toBeInTheDocument();
});

it("keeps cards semantic and gives every title and visible action its own link", async () => {
  await renderHomepage();

  const cardGroups = [
    {
      region: "Selected employer work",
      cards: [
        ["AI-assisted retail journeys at Lenskart", "Read case study", "/work/lenskart-ai-retail"],
        ["Responsible AI operations for digital lending", "Read case study", "/work/iifl-digital-lending"],
        ["Scaling ad-tech operations with automation", "Read case study", "/work/agl-adtech-operations"],
        ["Conversational AI for customer-success scale", "Read case study", "/work/builder-conversational-ai"],
      ],
    },
  ] as const;

  for (const group of cardGroups) {
    const articles = within(screen.getByRole("region", { name: group.region })).getAllByRole("article");
    expect(articles).toHaveLength(group.cards.length);

    group.cards.forEach(([title, action, href], index) => {
      const article = articles[index];
      expect(article.closest("a")).toBeNull();
      expect(within(article).getByRole("heading", { name: title }).querySelector("a")).toHaveAttribute("href", href);
      const actionLink = within(article).getByRole("link", { name: action });
      expect(actionLink).toHaveAttribute("href", href);
      expect(actionLink).toHaveClass("inline-flex", "min-h-11", "items-center");
    });
  }
});

it("uses one progressive Reveal boundary", async () => {
  await renderHomepage();
  expect(document.querySelectorAll("[data-reveal]")).toHaveLength(1);
});

it("explains the operating model, career path and contact routes without placeholder imagery", async () => {
  await renderHomepage();

  const career = screen.getByRole("region", { name: "Career snapshot" });
  const timeline = within(career).getByRole("list", { name: "Career timeline" });
  for (const employer of ["Lenskart", "IIFL", "AGL", "Builder.ai", "Earlier career"]) {
    expect(within(timeline).getAllByText(employer).length).toBeGreaterThan(0);
  }
  expect(within(timeline).getByText("Before 2019")).toBeInTheDocument();

  const contact = screen.getByRole("region", { name: "Start a conversation" });
  expect(within(contact).getByRole("link", { name: "Email" })).toHaveAttribute(
    "href",
    "mailto:shantanu.msp@gmail.com",
  );
  expect(within(contact).getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/chandrashantanu/",
  );
  expect(within(contact).getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");

  expect(screen.queryByRole("img", { name: /placeholder|stand-in|portrait/i })).not.toBeInTheDocument();
});
