"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot, TextAreaField } from "@/components/ui/Field";
import { parseInquiry } from "@/lib/inquiry";

export function InquiryForm({
  puppyId,
  litterId,
  context,
}: {
  puppyId?: string;
  litterId?: string;
  context?: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = parseInquiry({ ...raw, puppyId, litterId });
    if (!parsed.ok) {
      setErrors(parsed.errors);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border-t border-line pt-6" role="status">
        <h2 className="font-display text-2xl">We have your note</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">
          Thank you. We read every application ourselves and will write back
          within a few days. No deposit is taken online.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5" noValidate>
      {context && <p className="text-ink-soft">{context}</p>}
      <Honeypot />
      <Field
        label="Your name"
        name="name"
        autoComplete="name"
        required
        error={errors.name}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={errors.email}
      />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        optional
        error={errors.phone}
      />
      <TextAreaField
        label="About your home"
        name="message"
        optional
        error={errors.message}
        placeholder="Who lives with you, other animals, the sort of life you have in mind."
      />
      {status === "error" && (
        <p className="text-sm text-accent" role="alert">
          We could not send that just now. Please try again, or email us
          directly.
        </p>
      )}
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send application"}
      </Button>
    </form>
  );
}
