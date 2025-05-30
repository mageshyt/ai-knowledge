import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight } from "lucide-react";
import * as motion from "framer-motion/client"
export const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -100 ,scale:0.9}}
      animate={{ opacity: 1, y: 0 ,scale:1}}
      transition={{
        type:"tween",
        delay: 0.2,
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="mt-10 text-center space-y-4 ">
      <AnimatedGradientText>
        🌐 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#FEF9D9] via-[#D8A25E] to-[#98DED9] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          Introducing KnowledgeVerse
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>

      <h1 className="lg:text-6xl font-semibold md:text-5xl text-4xl bg-gradient-to-br text-transparent bg-clip-text from-white via-gray-100 to-neutral-800">
        Transforming the Way You Engage
        <br />
        with Web Content
      </h1>
      <p className="text-muted-foreground text-center text-sm">
        Explore, analyze, and interact with web articles effortlessly using AI.
        <br />
        Powered by advanced security and real-time content analysis.
      </p>

      <Button className="hover:bg-opacity-25">
        Get Started Now
        <ArrowRight className="icon-sm ml-2" />
      </Button>
    </motion.section>
  );
};
