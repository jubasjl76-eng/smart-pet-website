import { getKennel, getDogs, getLitters } from "@/lib/api";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { Program } from "@/components/home/Program";
import { Parents } from "@/components/home/Parents";
import { CurrentLitter } from "@/components/home/CurrentLitter";
import { Voices } from "@/components/home/Voices";
import { ClosingCta } from "@/components/home/ClosingCta";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [kennel, dogs, litters, t] = await Promise.all([
    getKennel(),
    getDogs(),
    getLitters(),
    getTranslations("Home"),
  ]);

  const featured =
    litters.find((l) => l.availableCount > 0) ??
    litters.find((l) => l.puppies.length > 0) ??
    litters[0];

  return (
    <>
      <Hero headline={t("headline")} sub={t("sub")} />
      <Program />
      {dogs.length > 0 && <Parents dogs={dogs} />}
      {featured && <CurrentLitter litter={featured} />}
      <Voices />
      <ClosingCta email={kennel.email} />
    </>
  );
}
