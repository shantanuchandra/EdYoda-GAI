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

it("presents the proof-first hero and impact record", async () => {
  await renderHomepage();

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "I make enterprise AI useful — and used.",
  );
  expect(screen.getByText(/AI product strategy, operating-model redesign and governed delivery/i)).toBeInTheDocument();

  for (const [name, href] of [
    ["Explore case studies", "/case-studies"],
    ["Contact me", "/contact"],
    ["Download resume", "/shantanu-chandra-resume.pdf"],
  ]) {
    expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
  }

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

  const capabilitiesHeading = screen.getByRole("heading", { name: "Transformation is an operating system." });
  const capabilitiesSection = capabilitiesHeading.closest("section");
  expect(capabilitiesSection).not.toBeNull();
  expect(within(capabilitiesSection as HTMLElement).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
    "Signal",
    "System",
    "Scale",
  ]);
  expect(within(capabilitiesSection as HTMLElement).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "AI product strategy and portfolio prioritization",
    "workflow and operating-model redesign",
    "product discovery and adoption",
    "RAG, agentic systems and evaluation design",
    "human review and responsible deployment",
    "cross-functional product and engineering leadership",
    "measurement, iteration and scale",
  ]);

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
  for (const employer of ["Lenskart", "IIFL", "AGL", "Builder.ai", "Earlier career"]) {
    expect(within(career).getByText(employer)).toBeInTheDocument();
  }

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
