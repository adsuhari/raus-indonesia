import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FloatingSearch from "@/components/FloatingSearch";
import Footer from "@/components/Footer";

const experiences = [
  {
    title: "Sunrise Volcano Hike",
    location: "Yogyakarta",
    description: "Trek to the summit of Mount Merapi and witness a breathtaking sunrise above the clouds.",
    duration: "5 hours",
  },
  {
    title: "Rice Terrace Cycling",
    location: "Bali",
    description: "Cycle through Ubud's stunning terraced landscapes with a local guide.",
    duration: "3 hours",
  },
  {
    title: "Underwater Discovery",
    location: "Lombok",
    description: "Snorkel crystal-clear waters alongside sea turtles and vibrant coral reefs.",
    duration: "4 hours",
  },
  {
    title: "Traditional Cooking Class",
    location: "Bandung",
    description: "Learn to prepare authentic Sundanese dishes using farm-fresh ingredients.",
    duration: "3 hours",
  },
  {
    title: "Jungle Waterfall Trek",
    location: "Bali",
    description: "Hike through dense tropical forest to discover hidden waterfalls and natural pools.",
    duration: "4 hours",
  },
  {
    title: "Temple Sunrise Tour",
    location: "Yogyakarta",
    description: "Experience the magic of Borobudur temple at dawn, one of the world's great wonders.",
    duration: "4 hours",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const Experiences = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingSearch />

      <section className="pt-8 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-satoshi font-bold text-2xl sm:text-3xl text-foreground">Experiences</h1>
          <p className="font-satoshi text-base text-muted-foreground mt-2 max-w-[65ch]">
            Curated adventures to complement your stay. From volcanic sunrises to underwater worlds.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={item}
                className="bg-card rounded-2xl card-shadow p-6 flex flex-col"
              >
                <p className="font-satoshi font-bold text-xs tracking-wider text-primary uppercase">
                  {exp.location}
                </p>
                <h3 className="font-satoshi font-bold text-lg text-foreground mt-2">{exp.title}</h3>
                <p className="font-satoshi text-sm text-muted-foreground mt-2 flex-1">{exp.description}</p>
                <p className="font-satoshi text-sm text-muted-foreground mt-4">Duration: {exp.duration}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experiences;
