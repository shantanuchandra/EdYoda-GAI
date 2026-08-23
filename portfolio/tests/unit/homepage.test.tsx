/* eslint-disable no-undef -- the inherited Babel parser does not apply DOM/TypeScript scope analysis. */
import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/(site)/page";

async function renderHomepage() {
  render(await HomePage());
}

it("presents the proof-first hero and impact record", async () => {
  await renderHomepage();

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "I turn complex AI opportunities into adopted, measurable and responsibly governed products.",
  );
  expect(screen.getByText("Across retail, lending, AdTech, SaaS and enterprise software.")).toBeInTheDocument();

  for (const [name, href] of [
    ["Explore selected work", "/work"],
    ["Contact me", "/contact"],
    ["Download resume", "/shantanu-chandra-resume.pdf"],
  ]) {
    expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
  }

  for (const [value, label] of [
    ["200 stores", "Hindi and English voice-guided eye test at Lenskart"],
    ["1 week → 20 minutes", "Employed-customer onboarding and approval at IIFL"],
    ["70% less manual work", "Campaign operations across five commerce platforms at AGL"],
    ["50 → 25,000", "Monthly completed onboardings in six months at Builder.ai"],
  ]) {
    const impact = screen.getByRole("region", { name: "Impact highlights" });
    const metric = within(impact).getByText(value).closest("li");
    expect(metric).not.toBeNull();
    expect(within(metric as HTMLElement).getByText(label)).toBeInTheDocument();
  }
});

it("preserves the approved work, capability, industry, product and Learning Lab inventory", async () => {
  await renderHomepage();

  const featuredWork = screen.getByRole("region", { name: "Selected employer work" });
  for (const company of ["Lenskart", "IIFL", "AGL", "Builder.ai"]) {
    expect(within(featuredWork).getByText(company)).toBeInTheDocument();
  }

  for (const capability of [
    "AI product strategy and portfolio prioritization",
    "workflow and operating-model redesign",
    "product discovery and adoption",
    "RAG, agentic systems and evaluation design",
    "human review and responsible deployment",
    "cross-functional product and engineering leadership",
    "measurement, iteration and scale",
  ]) {
    expect(screen.getByText(capability)).toBeInTheDocument();
  }

  for (const [industry, href] of [
    ["Retail", "/work/lenskart-ai-retail"],
    ["Lending", "/work/iifl-digital-lending"],
    ["AdTech", "/work/agl-adtech-operations"],
    ["SaaS", "/work/builder-conversational-ai"],
    ["Enterprise software", "/about"],
  ]) {
    const index = screen.getByRole("region", { name: "Five contexts. One operating discipline." });
    expect(within(index).getByRole("link", { name: new RegExp(`^${industry}`) })).toHaveAttribute("href", href);
  }

  const independentProducts = screen.getByRole("region", { name: "Independent products" });
  expect(within(independentProducts).getAllByRole("article").map((card) => card.textContent)).toEqual([
    expect.stringContaining("Wasabi Travels"),
    expect.stringContaining("Card Compass"),
  ]);

  const learningLab = screen.getByRole("region", { name: "Learning Lab paths" });
  expect(within(learningLab).getAllByRole("article").map((card) => card.textContent)).toEqual([
    expect.stringContaining("Applied AI for non-technical professionals"),
    expect.stringContaining("AI product transformation"),
    expect.stringContaining("Practical agents for founders"),
  ]);
});

it("explains the operating model, career path and contact routes without placeholder or hover-only content", async () => {
  await renderHomepage();

  expect(
    screen.getByText(
      "Signal identifies the valuable problem, System makes the workflow reliable and responsible, and Scale turns adoption into measurable change.",
    ),
  ).toBeInTheDocument();

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
    "https://www.linkedin.com/in/chandrashantanu",
  );
  expect(within(contact).getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");

  expect(screen.queryByRole("img", { name: /placeholder|stand-in|portrait/i })).not.toBeInTheDocument();
  expect(document.querySelector("[aria-expanded], details")).toBeNull();
});
