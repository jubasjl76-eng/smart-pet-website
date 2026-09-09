import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/scroll/Reveal";

/** Full-width statement — the one manifesto paragraph. */
export async function Program() {
  const t = await getTranslations("Home");
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-28 md:py-36">
      <Reveal className="mx-auto max-w-[46ch] text-center">
        <h2 className="font-display text-3xl md:text-4xl">{t("programTitle")}</h2>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">{t("programBody")}</p>
      </Reveal>
    </section>
  );
}
