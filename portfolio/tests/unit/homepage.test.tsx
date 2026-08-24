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

it("presents the identity-first reference-parity hero without a duplicate evidence band", async () => {
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
  expect(within(hero as HTMLElement).getByRole("link", { name: "Scroll to career snapshot" })).toHaveAttribute(
    "href",
    "#career-snapshot",
  );
  expect(within(hero as HTMLElement).getAllByRole("link")).toHaveLength(3);
  expect(screen.queryByRole("region", { name: "Impact highlights" })).not.toBeInTheDocument();
});

it("keeps the reference homepage focused on career, specialization and the closing action", async () => {
  await renderHomepage();

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
  const closing = screen.getByRole("region", { name: "Start a conversation" });
  expect(career.compareDocumentPosition(capabilitiesSection as HTMLElement) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect((capabilitiesSection as HTMLElement).compareDocumentPosition(closing) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.queryByRole("region", { name: "Selected employer work" })).not.toBeInTheDocument();

  expect(screen.queryByRole("region", { name: "Independent products" })).not.toBeInTheDocument();
  expect(screen.queryByRole("region", { name: "Learning Lab paths" })).not.toBeInTheDocument();
});

it("keeps portfolio detail destinations out of the homepage while preserving the direct case-studies route", async () => {
  await renderHomepage();

  expect(screen.getByRole("link", { name: "Explore Case Studies" })).toHaveAttribute("href", "/case-studies");
  expect(screen.queryByRole("link", { name: "Read case study" })).not.toBeInTheDocument();
});

it("explains the operating model, career path and contact routes without placeholder imagery", async () => {
  await renderHomepage();

  const career = screen.getByRole("region", { name: "Career snapshot" });
  const timeline = within(career).getByRole("list", { name: "Career timeline" });
  const employerCards = within(timeline).getAllByRole("listitem");
  expect(employerCards).toHaveLength(10);
  expect(employerCards.map((card) => card.querySelector("p")?.textContent)).toEqual([
    "Lenskart.com",
    "IIFL Home Loans",
    "Hakuhodo",
    "Builder.ai",
    "NUiO",
    "Pantheon",
    "Cummins",
    "Toshiba",
    "POWERGRID",
    "Telerik (now Progress Software)",
  ]);
  expect(within(timeline).getAllByText("Builder.ai")).toHaveLength(1);
  expect(within(timeline).getByText("Senior Product Manager (Conversational AI)")).toBeInTheDocument();
  expect(within(timeline).getByText("Product Manager (Design)")).toBeInTheDocument();
  expect(within(timeline).queryByText(/Covalent|\bAGL\b/i)).not.toBeInTheDocument();
  expect(within(timeline).queryByText(/Earlier career/i)).not.toBeInTheDocument();
  employerCards.forEach((card) => {
    const logo = card.querySelector<HTMLImageElement>("img[data-career-logo]");
    expect(logo?.getAttribute("src")).toMatch(/^\/images\/companies\/.+\.(?:png|svg)$/);
  });

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
