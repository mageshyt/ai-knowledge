import BlurIn from "@/components/magicui/blur-in";
import Image from "next/image";
import Particles from "@/components/magicui/particles";

export default function Home() {
  return (
    <div className="relative h-[2000px] max-w-7xl mx-auto">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        refresh
      />

      <h1 className="text-7xl">testing this site and initalize</h1>
    </div>
  );
}
