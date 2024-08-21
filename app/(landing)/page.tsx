import BlurIn from "@/components/magicui/blur-in";
import Image from "next/image";
import Particles from "@/components/magicui/particles";

export default function Home() {
  return (
    <div className="relative h-96 max-w-7xl mx-auto">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        // refresh
      />

      <span className="bg-gradient-to-br from-white  from-30% to-white/40  bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:200ms]">
        Magic UI is the new way
      </span>
    </div>
  );
}
