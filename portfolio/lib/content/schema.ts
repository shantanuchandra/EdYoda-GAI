/* eslint-disable no-undef -- the inherited Babel parser does not apply TypeScript scope analysis. */
import { z } from "zod";

export const contentKinds = ["work", "products", "learning", "insights"] as const;
export type ContentKind = (typeof contentKinds)[number];

const outcomeSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  qualifier: z.string().min(1).optional(),
});

const seoSchema = z.object({
  title: z.string().min(20).max(60),
  description: z.string().min(70).max(160),
});

export const contentFrontmatterSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(4),
    description: z.string().min(40).max(200),
    category: z.enum(["employer-work", "independent-product", "learning", "insight"]),
    company: z.string().min(1).optional(),
    industry: z.array(z.string().min(1)).default([]),
    role: z.string().min(1).optional(),
    period: z.string().min(1).optional(),
    status: z.enum(["active", "in-development", "archived", "case-study-only"]).optional(),
    audience: z.string().min(1).optional(),
    outcomes: z.array(outcomeSchema).default([]),
    methods: z.array(z.string().min(1)).default([]),
    featured: z.boolean().default(false),
    publishedAt: z.iso.date().optional(),
    updatedAt: z.iso.date().optional(),
    externalUrl: z.url().optional(),
    public: z.boolean(),
    confidentialityNotes: z.string().min(1),
    seo: seoSchema,
  })
  .superRefine((value, ctx) => {
    const expected = {
      work: "employer-work",
      products: "independent-product",
      learning: "learning",
      insights: "insight",
    } as const;

    if (value.company && value.category !== expected.work) {
      ctx.addIssue({ code: "custom", path: ["company"], message: "company is reserved for employer work" });
    }
  });

export type PublicContent = z.infer<typeof contentFrontmatterSchema>;
export type Heading = { depth: 2 | 3; id: string; label: string };
export type ContentItem = { metadata: PublicContent; body: string; headings: Heading[] };
