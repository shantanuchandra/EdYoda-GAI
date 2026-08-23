import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(site)/page";

it("introduces Shantanu as an AI Transformation Leader", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "I turn complex AI opportunities into adopted, measurable and responsibly governed products.",
  );
  expect(screen.getByText("Across retail, lending, AdTech, SaaS and enterprise software.")).toBeInTheDocument();
});
