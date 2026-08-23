import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EvidenceCollapsible } from "@/components/ui/collapsible";

it("renders an asChild button as a minimum-size link", () => {
  render(
    <Button asChild>
      <a href="/contact">Start a conversation</a>
    </Button>,
  );

  const link = screen.getByRole("link", { name: "Start a conversation" });
  expect(link).toHaveAttribute("href", "/contact");
  expect(link).toHaveClass("min-h-11");
});

it("renders badge variants as semantic inline text", () => {
  const { rerender } = render(<Badge variant="default">In progress</Badge>);
  expect(screen.getByText("In progress").tagName).toBe("SPAN");

  rerender(<Badge variant="accent">Featured</Badge>);
  expect(screen.getByText("Featured")).toHaveClass("bg-copper");
});

it("opens and closes evidence content from the keyboard", async () => {
  const user = userEvent.setup();
  render(
    <EvidenceCollapsible label="View evidence">
      <p>Research transcript</p>
    </EvidenceCollapsible>,
  );

  const trigger = screen.getByRole("button", { name: "View evidence" });
  await user.tab();
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute("aria-expanded", "false");

  await user.keyboard("{Enter}");
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText("Research transcript")).toBeVisible();

  await user.keyboard(" ");
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByText("Research transcript")).not.toBeInTheDocument();
});
