"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Apply");
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
      const next: Record<string, string> = {};
      if (parsed.errors.name) next.name = t("nameError");
      if (parsed.errors.email) next.email = t("emailError");
      setErrors(next);
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
        <h2 className="font-display text-2xl">{t("successTitle")}</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5" noValidate>
      {context && <p className="text-ink-soft">{context}</p>}
      <Honeypot />
      <Field
        label={t("name")}
        name="name"
        autoComplete="name"
        required
        error={errors.name}
      />
      <Field
        label={t("email")}
        name="email"
        type="email"
        autoComplete="email"
        required
        error={errors.email}
      />
      <Field
        label={t("phone")}
        name="phone"
        type="tel"
        autoComplete="tel"
        optional
        optionalLabel={t("optional")}
        error={errors.phone}
      />
      <TextAreaField
        label={t("message")}
        name="message"
        optional
        optionalLabel={t("optional")}
        error={errors.message}
        placeholder={t("messagePlaceholder")}
      />
      {status === "error" && (
        <p className="text-sm text-accent" role="alert">
          {t("error")}
        </p>
      )}
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
