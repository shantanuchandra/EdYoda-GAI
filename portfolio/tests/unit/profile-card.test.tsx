import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { expect, it } from "vitest";
import { SignalProfileCard } from "@/components/home/signal-profile-card";

it("renders the local portrait, identity, operating thesis and truthful current role", () => {
  render(<SignalProfileCard />);

  expect(screen.getByRole("img", { name: "Shantanu Chandra" })).toHaveAttribute("src", expect.stringContaining("shantanu-chandra-linkedin"));
  expect(screen.getByText("AI Transformation Leader")).toBeInTheDocument();
  expect(screen.getByText("AI Product Lead at Lenskart")).toBeInTheDocument();
  const thesis = screen.getByRole("list", { name: "Operating thesis" });
  expect(within(thesis).getAllByRole("listitem").map((item) => item.querySelector("strong")?.textContent)).toEqual(["Signal", "System", "Scale"]);
  expect(screen.getByRole("link", { name: /Read resume/ })).toHaveAttribute("href", "/resume");
});

it("keeps a stable monogram fallback when the portrait fails", async () => {
  render(<SignalProfileCard portraitSrc="/missing-profile.jpg" />);
  const image = screen.getByRole("img", { name: "Shantanu Chandra" });
  fireEvent.error(image);
  await waitFor(() => expect(screen.getByRole("img", { name: "Shantanu Chandra" })).toHaveTextContent("SC"));
});
