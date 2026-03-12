import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FloatingSearch from "@/components/FloatingSearch";
import Footer from "@/components/Footer";

const locations = [
  {
    name: "Bali",
    description: "Tropical forests, rice terraces, and world-class surf. Indonesia's most iconic island.",
    cabinCount: 2,
    image: "/placeholder.svg",
  },
  {
    name: "Lombok",
    description: "Pristine beaches, turquoise waters, and untouched rainforest. Bali's quieter neighbor.",
    cabinCount: 2,
    image: "/placeholder.svg",
  },
  {
    name: "Bandung",
    description: "Cool highland air, tea plantations, and misty mountain views. Java's creative capital.",
    cabinCount: 1,
    image: "/placeholder.svg",
  },
  {
    name: "Yogyakarta",
    description: "Ancient temples, volcanic landscapes, and rich Javanese culture at every turn.",
    cabinCount: 1,
    image: "/placeholder.svg",
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

const Locations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingSearch />

      <section className="pt-8 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-satoshi font-bold text-2xl sm:text-3xl text-foreground">Our Locations</h1>
          <p className="font-satoshi text-base text-muted-foreground mt-2 max-w-[65ch]">
            Each destination offers a unique escape into Indonesia's diverse landscapes and cultures.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10"
          >
            {locations.map((loc) => (
              <motion.div key={loc.name} variants={item}>
                <Link
                  to={`/cabins?region=${loc.name}`}
                  className="group block bg-card rounded-2xl card-shadow overflow-hidden"
                >
                  <div className="aspect-[16/9] bg-muted overflow-hidden">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-satoshi font-bold text-xl text-foreground">{loc.name}</h3>
                    <p className="font-satoshi text-sm text-muted-foreground mt-2">{loc.description}</p>
                    <p className="font-satoshi text-sm text-primary font-medium mt-3">
                      {loc.cabinCount} cabin{loc.cabinCount > 1 ? 's' : ''} available →
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Locations;
