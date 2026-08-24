import { render, screen, within } from "@testing-library/react";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import AboutPage from "@/app/(site)/about/page";
import ContactPage from "@/app/(site)/contact/page";
import ResumePage from "@/app/(site)/resume/page";

afterEach(() => cleanup());

it("presents the verified first-person career narrative and complete chronology", () => {
  render(<AboutPage />);

  expect(screen.getByRole("heading", { level: 1, name: "I build the operating system around useful AI." })).toBeInTheDocument();
  expect(screen.getByText(/12\+ years/i)).toBeInTheDocument();
  expect(screen.getByText(/five years building and launching AI products/i)).toBeInTheDocument();

  const industries = screen.getByRole("list", { name: "Industry experience" });
  expect(within(industries).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Retail",
    "Lending",
    "AdTech",
    "SaaS",
    "Enterprise software",
  ]);

  expect(screen.getByText(/managed six product managers and led 25 engineers and data scientists across three squads/i)).toBeInTheDocument();
  expect(screen.getByText(/software and data foundations/i)).toBeInTheDocument();
  expect(screen.getByText(/moved through customer-facing operations and product leadership/i)).toBeInTheDocument();
  expect(screen.getByText(/AI product scale/i)).toBeInTheDocument();
  expect(screen.getByText("Product Manager (Design)")).toBeInTheDocument();
  expect(screen.getByText("Senior Product Manager (Conversational AI)")).toBeInTheDocument();
  expect(screen.getByText(/enterprise transformation/i)).toBeInTheDocument();
  expect(screen.getByText(/independent products and practical instruction in generative AI and no-code agents/i)).toBeInTheDocument();

  const timeline = screen.getByRole("list", { name: "Career timeline" });
  expect(within(timeline).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
    "Lenskart",
    "IIFL Home Loans",
    "Hakuhodo",
    "Builder.ai",
    "Builder.ai",
    "NUiO",
    "Pantheon",
    "Cummins",
    "Toshiba Softwares",
  ]);
});

it("offers direct contact and both resume paths without a form or JavaScript dependency", () => {
  const { container } = render(<ContactPage />);

  expect(screen.getByRole("heading", { level: 1, name: "Get in touch" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2, name: "Send the useful first note" })).toBeInTheDocument();
  expect([...container.querySelectorAll("[data-contact-prompt]")].map((prompt) => prompt.textContent)).toEqual([
    "01ContextWhat is changing, who is affected, and why it matters now.",
    "02ConstraintWhat has made the problem difficult to solve so far.",
    "03OutcomeWhat a useful first conversation should help clarify.",
  ]);
  expect(screen.getByRole("link", { name: "shantanu.msp@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:shantanu.msp@gmail.com",
  );
  expect(screen.getByRole("link", { name: "linkedin.com/in/chandrashantanu" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/chandrashantanu/",
  );
  expect(screen.getByRole("link", { name: "View HTML resume" })).toHaveAttribute("href", "/resume");
  expect(screen.getByRole("link", { name: "Download PDF resume" })).toHaveAttribute(
    "href",
    "/shantanu-chandra-resume.pdf",
  );
  expect(screen.getByText("AI product leadership")).toBeInTheDocument();
  expect(screen.getByText("Enterprise transformation")).toBeInTheDocument();
  expect(screen.getByText("Applied AI education")).toBeInTheDocument();
  expect(screen.queryByText(/respond within/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/future downloadable PDF/i)).not.toBeInTheDocument();
  expect(container.querySelector("form")).toBeNull();
  expect(container.querySelector("script")).toBeNull();
});

it("renders a print-ready public resume with individually named, verified experience", () => {
  const { container } = render(<ResumePage />);

  expect(screen.getByRole("heading", { level: 1, name: "Shantanu Chandra" })).toBeInTheDocument();
  expect(screen.getByText("AI Transformation Leader")).toBeInTheDocument();

  const career = screen.getByRole("region", { name: "Career experience" });
  expect(within(career).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
    "AI Product Lead",
    "AVP / Lead Product Manager",
    "Senior Product Manager, AdTech",
    "Product Manager → Senior Product Manager",
    "Product Manager / Salesforce Administrator",
    "Business Analyst",
    "Business Development Analyst",
    "Software Engineer / Project Coordinator",
  ]);
  expect(within(career).getAllByText(/reached 20 minutes/i)).not.toHaveLength(0);
  expect(within(career).queryByText("Earlier career")).not.toBeInTheDocument();
  expect(within(career).queryByText("Independent products")).not.toBeInTheDocument();
  expect(within(career).queryByText(/121 early-access requests/i)).not.toBeInTheDocument();
  expect(within(career).getByText("NUiO")).toBeInTheDocument();
  expect(within(career).getByText("Pantheon")).toBeInTheDocument();
  expect(within(career).getByText("Cummins")).toBeInTheDocument();
  expect(within(career).getByText("Toshiba Softwares")).toBeInTheDocument();

  const education = screen.getByRole("region", { name: "Education" });
  expect(education).toHaveAttribute("data-resume-education", "true");
  expect(within(education).getByRole("heading", { level: 2, name: "Education" })).toBeInTheDocument();
  expect(within(education).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
    "MBA, Marketing",
    "Bachelor of Engineering, Computer Science",
  ]);
  expect(within(education).getByText("MBA, Marketing")).toBeInTheDocument();
  expect(within(education).getByText(/William & Mary/i)).toBeInTheDocument();
  expect(within(education).getByText("Bachelor of Engineering, Computer Science")).toBeInTheDocument();
  expect(within(education).getByText(/Manipal Institute of Technology/i)).toBeInTheDocument();

  const methods = screen.getByRole("region", { name: "Professional Skills" });
  expect(methods).toHaveAttribute("data-resume-skills", "true");
  expect(within(methods).getByRole("heading", { level: 2, name: "Professional Skills" })).toBeInTheDocument();
  expect(within(methods).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
    "Applied AI",
    "Product leadership",
    "Data and platforms",
    "Design and delivery",
  ]);
  for (const method of ["RAG", "AI agents", "model evaluation", "SQL", "Python", "AWS", "Figma", "Miro"]) {
    expect(within(methods).getByText(new RegExp(method, "i"))).toBeInTheDocument();
  }

  const pdfLinks = screen.getAllByRole("link", { name: "Download PDF resume" });
  expect(pdfLinks).toHaveLength(2);
  pdfLinks.forEach((link) => expect(link).toHaveAttribute("href", "/shantanu-chandra-resume.pdf"));

  const publicText = container.textContent ?? "";
  expect(publicText).not.toContain(["Ed", "Yoda"].join(""));
  expect(publicText).not.toContain(["80887", "52191"].join(" "));
  expect(publicText).not.toMatch(/Dubai|relocat/i);
  expect(publicText).not.toMatch(/Covalent|\bAGL\b/i);
});
