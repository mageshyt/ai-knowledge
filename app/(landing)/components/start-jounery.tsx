"use client";
import React from "react";

import { motion } from "framer-motion";
import Image from "next/image";

import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

const StartJourneyHero = () => {
  return (

    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "tween",
        delay: 0.3,
        duration: 0.7,
        ease: "easeInOut",

      }}
      className="mt-10 p-4"
    >
      <NeonGradientCard
        borderSize={3}
        borderRadius={10}
        className="h-[500px] max-w-5xl w-full rounded-lg"
        neonColors={{
          firstColor: "#CDC1FF",
          secondColor: "#121212",

        }}
      >
        <div className="relative flex h-full w-full  rounded-lg border bg-background md:shadow-xl">
          <Image
            src="/hero-banner.png"
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="hero"
            className="rounded-lg"
          />
        </div>
      </NeonGradientCard >
    </motion.div >
  );
};



export default StartJourneyHero;
