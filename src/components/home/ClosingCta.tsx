import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/scroll/Reveal";

/** The one deliberate brand-colour block on the page (fixed in both themes). */
export async function ClosingCta({ email }: { email: string }) {
  const t = await getTranslations("Home");
  return (
    <section className="bg-brand-fixed text-brand-fixed-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-24 text-center">
        <Reveal className="mx-auto max-w-[40ch]">
          <h2 className="font-display text-3xl md:text-4xl">{t("ctaTitle")}</h2>
          <p className="mt-4 text-brand-fixed-ink/80">{t("ctaBody")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/apply"
              className="rounded-sm bg-accent px-6 py-3 text-sm text-accent-ink transition-transform active:translate-y-px"
            >
              {t("waitlist")}
            </Link>
            <a
              href={`mailto:${email}`}
              className="rounded-sm border border-brand-fixed-ink/40 px-6 py-3 text-sm transition-colors hover:bg-white/10"
            >
              {t("emailUs")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
