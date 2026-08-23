import { beforeEach, expect, it, vi } from "vitest";
import WorkIndexRedirect from "@/app/(site)/work/page";
import ProductsIndexRedirect from "@/app/(site)/products/page";

const redirectCalls = vi.hoisted(() => ({ values: [] as string[] }));
const permanentRedirect = vi.hoisted(() => (destination: string): never => {
  redirectCalls.values.push(destination);
  throw new Error(`REDIRECT:${destination}`);
});

vi.mock("next/navigation", () => ({ permanentRedirect }));

beforeEach(() => redirectCalls.values.splice(0));

it("redirects the legacy employer index to the unified Case Studies employer anchor", () => {
  expect(() => WorkIndexRedirect()).toThrow("REDIRECT:/case-studies#employer-transformations");
  expect(redirectCalls.values).toEqual(["/case-studies#employer-transformations"]);
});

it("redirects the legacy product index to the unified Case Studies product anchor", () => {
  expect(() => ProductsIndexRedirect()).toThrow("REDIRECT:/case-studies#independent-products");
  expect(redirectCalls.values).toEqual(["/case-studies#independent-products"]);
});
