import Particles from "@/components/magicui/particles";
import { Hero } from "./components/hero";
import StartJourneyHero from "./components/start-jounery";

export default function Home() {
  return (
    <div className="relative p-4 bg-neutral-950   antialiased   max-w-5xl mx-auto">
      <Particles quantity={100} ease={80} refresh />
      {/* ----------------------Hero------------------- */}
      <div className="absolute inset-0">
        <Hero />

        <StartJourneyHero />
      </div>
    </div >
  );
}
