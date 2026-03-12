import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import aboutCabin from "@/assets/about-cabin.jpg";

const AboutSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground max-w-3xl">
            Take a break from city life in carefully designed cabins, just a few steps from home.
          </h2>

          <p className="font-satoshi text-base text-muted-foreground mt-6 max-w-[65ch] leading-relaxed">
            Our cabins are spread across unique locations in Indonesia — deep in tropical forests, beside rice paddies, on mountain slopes, or near stunning beaches. Each location offers a different nature experience, time for yourself, or adventures with friends.
          </p>

          <Link
            to="/cabins"
            className="mt-8 inline-flex items-center font-satoshi font-medium text-sm tracking-wider bg-primary text-primary-foreground h-11 px-6 rounded-full hover:brightness-95 active:scale-[0.98] transition-all duration-200"
          >
            Book a Cabin
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="mt-12"
        >
          <img
            src={aboutCabin}
            alt="Modern cabin in tropical forest aerial view"
            className="w-full h-auto rounded-2xl image-outline object-cover max-h-[600px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
