import { getKennel, getDogs, getLitters } from "@/lib/api";
import { Hero } from "@/components/home/Hero";
import { Program } from "@/components/home/Program";
import { Parents } from "@/components/home/Parents";
import { CurrentLitter } from "@/components/home/CurrentLitter";
import { Voices } from "@/components/home/Voices";
import { ClosingCta } from "@/components/home/ClosingCta";

export default async function Home() {
  const [kennel, dogs, litters] = await Promise.all([
    getKennel(),
    getDogs(),
    getLitters(),
  ]);

  const featured =
    litters.find((l) => l.availableCount > 0) ??
    litters.find((l) => l.puppies.length > 0) ??
    litters[0];

  return (
    <>
      <Hero
        headline="Retrievers raised underfoot."
        sub="A small County Meath programme. Fully health-tested parents, kitchen-raised puppies, a lifetime of support."
      />
      <Program />
      <Parents dogs={dogs} />
      {featured && <CurrentLitter litter={featured} />}
      <Voices />
      <ClosingCta email={kennel.email} />
    </>
  );
}
