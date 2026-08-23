/* eslint-disable no-undef -- the inherited Babel parser does not apply DOM/TypeScript scope analysis. */
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import InsightDetailPage, {
  generateMetadata as generateInsightMetadata,
  generateStaticParams as generateInsightStaticParams,
} from "@/app/(site)/insights/[slug]/page";
import InsightsIndexPage, {
  InsightsIndex,
  metadata as insightsMetadata,
} from "@/app/(site)/insights/page";
import LearningDetailPage, {
  generateMetadata as generateLearningMetadata,
  generateStaticParams as generateLearningStaticParams,
} from "@/app/(site)/learning/[slug]/page";
import LearningIndexPage, {
  LearningIndex,
  metadata as learningMetadata,
} from "@/app/(site)/learning/page";

afterEach(() => cleanup());

const learningPaths = [
  {
    slug: "applied-ai-non-technical",
    title: "Applied AI for non-technical professionals",
    audience: "Operators and non-technical professionals",
    outcome: "Identify a valuable workflow, prototype safely, and evaluate output quality",
    modules: ["Opportunity framing", "Prompt-to-workflow design", "Grounding and verification", "Human-review checkpoints"],
  },
  {
    slug: "ai-product-transformation",
    title: "AI product transformation",
    audience: "Product leaders and transformation teams",
    outcome: "Turn an AI opportunity into an adopted, measurable operating change",
    modules: ["Portfolio prioritization", "System and data design", "Evals and governance", "Adoption and measurement"],
  },
  {
    slug: "practical-agents-founders",
    title: "Practical agents for founders",
    audience: "Founders and operators",
    outcome: "Decide when an agent is justified and design one with explicit tools, controls, and fallbacks",
    modules: ["Agent-vs-prompt test", "Tools and state", "Approval boundaries", "Production readiness"],
  },
] as const;

it("lists exactly three Learning Lab paths with their exact audience, outcome and four launch modules", async () => {
  render(await LearningIndexPage());

  expect(screen.getByRole("heading", { level: 1, name: "Shantanu Chandra Learning Lab" })).toBeInTheDocument();
  const cards = screen.getAllByRole("article");
  expect(cards).toHaveLength(3);
  expect(screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent)).toEqual(
    learningPaths.map(({ title }) => title),
  );

  learningPaths.forEach((path, index) => {
    const card = cards[index];
    expect(card.closest("a")).toBeNull();
    expect(within(card).getByText(path.audience, { exact: true })).toBeInTheDocument();
    expect(within(card).getByText(path.outcome, { exact: true })).toBeInTheDocument();
    const modules = within(card).getByRole("list", { name: `${path.title} launch modules` });
    expect(within(modules).getAllByRole("listitem").map((item) => item.textContent)).toEqual(path.modules);
    expect(within(card).getByRole("link", { name: path.title })).toHaveAttribute("href", `/learning/${path.slug}`);
    const action = within(card).getByRole("link", { name: "Explore path" });
    expect(action).toHaveAttribute("href", `/learning/${path.slug}`);
    expect(action).toHaveClass("inline-flex", "min-h-11", "items-center");
  });
});

it("renders each Learning Lab detail as a public overview with the exact audience, outcome and four modules", async () => {
  for (const path of learningPaths) {
    const view = render(await LearningDetailPage({ params: Promise.resolve({ slug: path.slug }) }));

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: path.title })).toBeInTheDocument();
    expect(screen.getByText("Shantanu Chandra Learning Lab", { exact: true })).toBeInTheDocument();
    expect(screen.getByText(path.audience, { exact: true })).toBeInTheDocument();
    expect(screen.getByText(path.outcome, { exact: true })).toBeInTheDocument();

    const launchModulesHeading = screen.getByRole("heading", { level: 2, name: "Launch modules" });
    const modules = launchModulesHeading.nextElementSibling;
    expect(modules?.tagName).toBe("UL");
    expect(within(modules as HTMLElement).getAllByRole("listitem").map((item) => item.textContent)).toEqual(path.modules);
    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull();

    view.unmount();
  }
});

it("publishes only the three approved learning routes with route and index metadata", async () => {
  await expect(generateLearningStaticParams()).resolves.toEqual(learningPaths.map(({ slug }) => ({ slug })));
  expect(learningMetadata).toMatchObject({
    title: "Shantanu Chandra Learning Lab",
    description: expect.stringContaining("three practical learning paths"),
  });
  await expect(generateLearningMetadata({ params: Promise.resolve({ slug: "ai-product-transformation" }) })).resolves.toMatchObject({
    title: "AI product transformation for product leaders",
    description: "A Shantanu Chandra Learning Lab overview for teams turning AI opportunities into adopted, measurable operating change.",
  });
});

it("provides a useful Learning Lab empty state", () => {
  render(<LearningIndex items={[]} />);
  expect(screen.getByRole("heading", { level: 2, name: "Learning paths are being prepared." })).toBeInTheDocument();
  expect(screen.getByText(/no public Learning Lab paths/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
});

it("lists the one approved launch insight with article semantics and a dated internal link", async () => {
  render(await InsightsIndexPage());

  expect(screen.getByRole("heading", { level: 1, name: "Insights" })).toBeInTheDocument();
  const cards = screen.getAllByRole("article");
  expect(cards).toHaveLength(1);
  expect(within(cards[0]).getByRole("link", { name: "From AI demo to adopted system: Signal → System → Scale" })).toHaveAttribute("href", "/insights/signal-system-scale");
  expect(within(cards[0]).getByRole("link", { name: "Read insight" })).toHaveAttribute("href", "/insights/signal-system-scale");
  expect(within(cards[0]).getByText("23 August 2026")).toHaveAttribute("datetime", "2026-08-23");
});

it("renders the Signal to System to Scale insight as a dated article with TOC, reading measure and approved checklist", async () => {
  const { container } = render(await InsightDetailPage({ params: Promise.resolve({ slug: "signal-system-scale" }) }));

  const article = screen.getByRole("article");
  expect(within(article).getByRole("heading", { level: 1, name: "From AI demo to adopted system: Signal → System → Scale" })).toBeInTheDocument();
  expect(within(article).getByText("23 August 2026")).toHaveAttribute("datetime", "2026-08-23");

  const headings = ["Signal", "System", "Scale", "Why product design includes adoption and governance", "Closing checklist"];
  expect(screen.getByRole("navigation", { name: "On this page" }).querySelectorAll("a")).toHaveLength(headings.length);
  expect(Array.from(screen.getByRole("navigation", { name: "On this page" }).querySelectorAll("a"), (link) => link.textContent)).toEqual(headings);

  const body = container.querySelector(".article-layout__body");
  expect(body).toHaveClass("reading-measure");
  const toc = screen.getByRole("navigation", { name: "On this page" });
  expect(toc.compareDocumentPosition(body as Node) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);

  const checklistHeading = screen.getByRole("heading", { level: 2, name: "Closing checklist" });
  const checklist = checklistHeading.nextElementSibling;
  expect(within(checklist as HTMLElement).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Valuable signal",
    "Workflow owner",
    "Measurable outcome",
    "Evaluation set",
    "Human-review boundary",
    "Adoption path",
    "Monitoring plan",
  ]);
});

it("publishes only the approved insight route with route and index metadata", async () => {
  await expect(generateInsightStaticParams()).resolves.toEqual([{ slug: "signal-system-scale" }]);
  expect(insightsMetadata).toMatchObject({
    title: "Insights",
    description: expect.stringContaining("product viewpoints"),
  });
  await expect(generateInsightMetadata({ params: Promise.resolve({ slug: "signal-system-scale" }) })).resolves.toMatchObject({
    title: "From AI demo to adopted system at scale",
    description: "A practical AI product framework for designing valuable signals, governed systems, adoption paths, and monitored scale.",
  });
});

it("provides a useful Insights empty state", () => {
  render(<InsightsIndex items={[]} />);
  expect(screen.getByRole("heading", { level: 2, name: "Insights are being prepared." })).toBeInTheDocument();
  expect(screen.getByText(/no public articles available/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Explore selected work" })).toHaveAttribute("href", "/work");
});

it("uses the branded not-found branch for unpublished learning and insight slugs", async () => {
  await expect(LearningDetailPage({ params: Promise.resolve({ slug: "not-public" }) })).rejects.toThrow(/404|not found/i);
  await expect(InsightDetailPage({ params: Promise.resolve({ slug: "not-public" }) })).rejects.toThrow(/404|not found/i);
  await expect(generateLearningMetadata({ params: Promise.resolve({ slug: "not-public" }) })).resolves.toEqual({});
  await expect(generateInsightMetadata({ params: Promise.resolve({ slug: "not-public" }) })).resolves.toEqual({});
});
