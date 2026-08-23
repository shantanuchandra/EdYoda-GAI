import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { expect, it } from "vitest";
import { SignalProfileCard } from "@/components/home/signal-profile-card";

it("renders the local portrait, identity, latest role and truthful skill chips", () => {
  render(<SignalProfileCard />);

  expect(screen.getByRole("img", { name: "Shantanu Chandra" })).toHaveAttribute("src", expect.stringContaining("shantanu-chandra-linkedin"));
  expect(screen.getByText("AI Transformation Leader")).toBeInTheDocument();
  expect(screen.getByText("AI Product Lead at Lenskart")).toBeInTheDocument();
  expect(screen.getByText("November 2025 — Present")).toBeInTheDocument();
  const skills = screen.getByRole("list", { name: "Key skills" });
  expect(within(skills).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "AI Product Strategy",
    "Operating Models",
    "Responsible AI",
    "Product Adoption",
  ]);
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});

it("keeps a stable monogram fallback when the portrait fails", async () => {
  render(<SignalProfileCard portraitSrc="/missing-profile.jpg" />);
  const image = screen.getByRole("img", { name: "Shantanu Chandra" });
  fireEvent.error(image);
  await waitFor(() => expect(screen.getByRole("img", { name: "Shantanu Chandra" })).toHaveTextContent("SC"));
});
