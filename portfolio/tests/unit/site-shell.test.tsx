/* eslint-disable no-undef -- the inherited Babel parser does not apply DOM type scope analysis. */
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SiteLayout from "@/app/(site)/layout";
import RootNotFound from "@/app/not-found";

const desktopMediaQuery = "(min-width: 900px)";
const mediaListeners = new Set<(event: MediaQueryListEvent) => void>();
let desktopMatches = false;

function installMatchMedia() {
  desktopMatches = false;
  mediaListeners.clear();
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) =>
      ({
        matches: desktopMatches,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
          if (type === "change" && typeof listener === "function") {
            mediaListeners.add(listener as (event: MediaQueryListEvent) => void);
          }
        },
        removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
          if (type === "change" && typeof listener === "function") {
            mediaListeners.delete(listener as (event: MediaQueryListEvent) => void);
          }
        },
        dispatchEvent: () => true,
      }) satisfies MediaQueryList,
    ),
  );
}

function enterDesktopViewport() {
  desktopMatches = true;
  const event = { matches: true, media: desktopMediaQuery } as MediaQueryListEvent;
  act(() => {
    for (const listener of mediaListeners) listener(event);
  });
}

beforeEach(() => {
  installMatchMedia();
  document.body.style.overflow = "";
});

afterEach(() => {
  document.body.style.overflow = "";
  vi.unstubAllGlobals();
});

vi.mock("next/navigation", () => ({
  usePathname: () => "/case-studies",
}));

it("provides semantic landmarks and a keyboard skip link", () => {
  render(
    <SiteLayout>
      <h1>Page title</h1>
    </SiteLayout>,
  );

  expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main-content");
  expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});

it("renders the root not-found page inside the accessible branded shell", () => {
  render(<RootNotFound />);

  expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main-content");
  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  expect(screen.getByRole("main")).toContainElement(screen.getByRole("heading", { name: "This page is outside the map." }));
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});

it("exposes the brand and complete primary navigation", () => {
  render(
    <SiteLayout>
      <h1>Page title</h1>
    </SiteLayout>,
  );

  const header = within(screen.getByRole("banner"));
  const primaryNavigation = within(header.getByRole("navigation", { name: "Primary" }));
  expect(header.getByRole("link", { name: "Shantanu Chandra" })).toHaveAttribute("href", "/");

  for (const [name, href] of [
    ["Home", "/"],
    ["Resume", "/resume"],
    ["Case Studies", "/case-studies"],
    ["Learning", "/learning"],
    ["Contact", "/contact"],
  ]) {
    expect(primaryNavigation.getByRole("link", { name })).toHaveAttribute("href", href);
  }

  expect(primaryNavigation.getByRole("link", { name: "Case Studies" })).toHaveAttribute("aria-current", "page");
  for (const name of ["Work", "Products", "Insights", "About"]) {
    expect(primaryNavigation.queryByRole("link", { name })).not.toBeInTheDocument();
  }
});

it("opens and closes the mobile navigation accessibly and restores trigger focus", async () => {
  const user = userEvent.setup();
  render(
    <SiteLayout>
      <h1>Page title</h1>
    </SiteLayout>,
  );

  const trigger = screen.getByRole("button", { name: "Open menu" });
  expect(trigger).toHaveStyle({ minHeight: "44px", minWidth: "44px" });
  expect(trigger).toHaveAttribute("aria-expanded", "false");

  await user.click(trigger);

  expect(trigger).toHaveAttribute("aria-expanded", "true");
  const dialog = screen.getByRole("dialog", { name: "Site navigation" });
  const close = screen.getByRole("button", { name: "Close menu" });
  expect(dialog).toContainElement(close);
  expect(close).toHaveFocus();

  await user.click(close);

  expect(screen.queryByRole("dialog", { name: "Site navigation" })).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

it("contains focus in the open menu and closes it with Escape", async () => {
  const user = userEvent.setup();
  render(
    <SiteLayout>
      <h1>Page title</h1>
    </SiteLayout>,
  );

  const trigger = screen.getByRole("button", { name: "Open menu" });
  await user.click(trigger);
  const dialog = screen.getByRole("dialog", { name: "Site navigation" });
  const focusable = dialog.querySelectorAll<HTMLElement>("a, button");

  focusable.item(focusable.length - 1).focus();
  await user.tab();
  expect(focusable.item(0)).toHaveFocus();

  await user.tab({ shift: true });
  expect(focusable.item(focusable.length - 1)).toHaveFocus();

  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog", { name: "Site navigation" })).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

it("locks body scrolling only while the mobile menu is open", async () => {
  const user = userEvent.setup();
  document.body.style.overflow = "auto";
  render(
    <SiteLayout>
      <h1>Page title</h1>
    </SiteLayout>,
  );

  await user.click(screen.getByRole("button", { name: "Open menu" }));
  expect(document.body.style.overflow).toBe("hidden");

  await user.click(screen.getByRole("button", { name: "Close menu" }));
  expect(document.body.style.overflow).toBe("auto");
});

it("restores body scrolling and removes the breakpoint listener when unmounted open", async () => {
  const user = userEvent.setup();
  document.body.style.overflow = "clip";
  const { unmount } = render(
    <SiteLayout>
      <h1>Page title</h1>
    </SiteLayout>,
  );

  await user.click(screen.getByRole("button", { name: "Open menu" }));
  expect(document.body.style.overflow).toBe("hidden");

  unmount();
  expect(document.body.style.overflow).toBe("clip");
  expect(mediaListeners.size).toBe(0);
});

it("closes an open mobile menu when the viewport becomes desktop", async () => {
  const user = userEvent.setup();
  document.body.style.overflow = "auto";
  render(
    <SiteLayout>
      <h1>Page title</h1>
    </SiteLayout>,
  );

  await user.click(screen.getByRole("button", { name: "Open menu" }));
  expect(screen.getByRole("dialog", { name: "Site navigation" })).toBeInTheDocument();
  expect(document.body.style.overflow).toBe("hidden");

  enterDesktopViewport();

  expect(screen.queryByRole("dialog", { name: "Site navigation" })).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe("auto");
  expect(within(screen.getByRole("banner")).getByRole("link", { name: "Shantanu Chandra" })).toHaveFocus();
});
