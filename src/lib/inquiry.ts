import { z } from "zod";
import type { InquiryInput } from "./types";

const emptyToUndef = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

/**
 * Client + test schema. Mirrors the site `/api/inquiries` route
 * (that file is A-owned — keep these constraints in lockstep).
 */
export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name.").max(120),
  email: z.string().trim().email("That email does not look right.").max(200),
  phone: z.preprocess(emptyToUndef, z.string().trim().max(40).optional()),
  message: z.preprocess(emptyToUndef, z.string().trim().max(2000).optional()),
  puppyId: z.preprocess(emptyToUndef, z.string().max(64).optional()),
  litterId: z.preprocess(emptyToUndef, z.string().max(64).optional()),
  company: z.preprocess(emptyToUndef, z.string().max(0).optional()),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export function parseInquiry(input: unknown):
  | { ok: true; data: InquiryInput & { company?: string } }
  | { ok: false; errors: Record<string, string> } {
  const parsed = inquirySchema.safeParse(input);
  if (parsed.success) {
    const { company, ...inquiry } = parsed.data;
    return { ok: true, data: { ...inquiry, company } };
  }
  const errors: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}
