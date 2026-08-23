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
  expect(screen.getByText(/enterprise transformation/i)).toBeInTheDocument();
  expect(screen.getByText(/independent products and practical instruction in generative AI and no-code agents/i)).toBeInTheDocument();

  const timeline = screen.getByRole("list", { name: "Career timeline" });
  expect(within(timeline).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
    "Lenskart",
    "IIFL Home Loans",
    "AGL (Hakuhodo)",
    "Builder.ai",
    "NUiO",
    "Pantheon",
    "Covalent Softwares",
    "Toshiba Softwares",
  ]);
});

it("offers direct contact and both resume paths without a form or JavaScript dependency", () => {
  const { container } = render(<ContactPage />);

  expect(screen.getByRole("heading", { level: 1, name: "Start a direct conversation." })).toBeInTheDocument();
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
  expect(container.querySelector("form")).toBeNull();
  expect(container.querySelector("script")).toBeNull();
});

it("renders a print-ready public resume with verified groupings and safe identity data", () => {
  const { container } = render(<ResumePage />);

  expect(screen.getByRole("heading", { level: 1, name: "Shantanu Chandra" })).toBeInTheDocument();
  expect(screen.getByText("AI Transformation Leader")).toBeInTheDocument();

  const career = screen.getByRole("region", { name: "Career experience" });
  expect(within(career).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
    "Lenskart",
    "IIFL Home Loans",
    "AGL (Hakuhodo)",
    "Builder.ai",
    "Earlier career",
    "Independent products",
  ]);
  expect(within(career).getByText(/more than 75%/i)).toBeInTheDocument();
  expect(within(career).getByText(/121 early-access requests/i)).toBeInTheDocument();
  expect(within(career).getByText("Card Compass · Case study only")).toBeInTheDocument();

  const education = screen.getByRole("region", { name: "Education" });
  expect(within(education).getByText("MBA, Marketing")).toBeInTheDocument();
  expect(within(education).getByText(/William & Mary/i)).toBeInTheDocument();
  expect(within(education).getByText("Bachelor of Engineering, Computer Science")).toBeInTheDocument();
  expect(within(education).getByText(/Manipal Institute of Technology/i)).toBeInTheDocument();

  const methods = screen.getByRole("region", { name: "Methods and tools" });
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
});
