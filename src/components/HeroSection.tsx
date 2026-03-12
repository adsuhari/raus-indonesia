import { motion } from "framer-motion";
import heroCabin from "@/assets/hero-cabin-1.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-svh flex flex-col justify-center pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-satoshi font-bold text-primary leading-[1.1]"
          style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 4rem)" }}
        >
          Temukan tempat
          <br />
          peristirahatanmu
          <br />
          di alam Indonesia.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          className="mt-12 sm:mt-16"
        >
          <div className="w-full max-w-3xl mx-auto">
            <img
              src={heroCabin}
              alt="Cabin modern di tengah hutan tropis Indonesia"
              className="w-full h-auto rounded-2xl image-outline object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
