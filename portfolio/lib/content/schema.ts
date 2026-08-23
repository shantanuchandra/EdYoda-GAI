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

const statusSchema = z.enum(["active", "in-development", "archived", "case-study-only"]);
const industrySchema = z.array(z.string().min(1));
const outcomesSchema = z.array(outcomeSchema);
const methodsSchema = z.array(z.string().min(1));
const externalUrlSchema = z
  .url()
  .refine((url) => new URL(url).protocol === "https:", "externalUrl must use HTTPS")
  .optional();

const commonFields = {
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(4),
  description: z.string().min(40).max(200),
  featured: z.boolean().default(false),
  externalUrl: externalUrlSchema,
  public: z.boolean(),
  confidentialityNotes: z.string().min(1),
  seo: seoSchema,
};

const employerWorkSchema = z.object({
  ...commonFields,
  category: z.literal("employer-work"),
  company: z.string().min(1),
  industry: industrySchema.min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  status: z.never().optional(),
  audience: z.never().optional(),
  outcomes: outcomesSchema.min(1),
  methods: methodsSchema.min(1),
  publishedAt: z.iso.date().optional(),
  updatedAt: z.iso.date().optional(),
});

const independentProductSchema = z.object({
  ...commonFields,
  category: z.literal("independent-product"),
  company: z.never().optional(),
  industry: industrySchema,
  role: z.never().optional(),
  period: z.never().optional(),
  status: statusSchema,
  audience: z.never().optional(),
  outcomes: outcomesSchema.min(1),
  methods: methodsSchema.min(1),
  publishedAt: z.iso.date().optional(),
  updatedAt: z.iso.date().optional(),
});

const learningSchema = z.object({
  ...commonFields,
  category: z.literal("learning"),
  company: z.never().optional(),
  industry: industrySchema,
  role: z.never().optional(),
  period: z.never().optional(),
  status: statusSchema.optional(),
  audience: z.string().min(1),
  outcomes: outcomesSchema.min(1),
  methods: methodsSchema.length(4),
  publishedAt: z.iso.date().optional(),
  updatedAt: z.iso.date().optional(),
});

const insightSchema = z.object({
  ...commonFields,
  category: z.literal("insight"),
  company: z.never().optional(),
  industry: industrySchema,
  role: z.never().optional(),
  period: z.never().optional(),
  status: z.never().optional(),
  audience: z.never().optional(),
  outcomes: outcomesSchema,
  methods: methodsSchema,
  publishedAt: z.iso.date(),
  updatedAt: z.iso.date(),
});

export const contentFrontmatterSchema = z
  .discriminatedUnion("category", [employerWorkSchema, independentProductSchema, learningSchema, insightSchema])
  .superRefine((value, ctx) => {
    if (value.category === "independent-product" && value.status === "active" && !value.externalUrl) {
      ctx.addIssue({ code: "custom", path: ["externalUrl"], message: "active products require an externalUrl" });
    }

    if (value.category === "independent-product" && value.status === "case-study-only" && value.externalUrl) {
      ctx.addIssue({ code: "custom", path: ["externalUrl"], message: "case-study-only products cannot have an externalUrl" });
    }
  });

export type PublicContent = z.infer<typeof contentFrontmatterSchema>;
export type Heading = { depth: 2 | 3; id: string; label: string };
export type ContentItem = { metadata: PublicContent; body: string; headings: Heading[] };
