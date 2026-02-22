import { motion } from "framer-motion";
import { Button } from "../components/ui";
import React from "react";
import portfolioVideo from "../assets/portfolio.mp4";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={portfolioVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/70 z-10"></div>{" "}
      {/* darker overlay */}
      <div className="relative z-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4 text-gray-100"
        >
          Hi, I'm{" "}
          <span className="text-cyan-400 transition-all duration-300 hover:text-amber-200 hover:scale-105 inline-block">
            Bikash KC
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-gray-300 mb-8 transition-colors duration-300 hover:text-amber-300"
        >
          Frontend Developer | React Specialist
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-medium transition-all"
          >
            View My Work
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
