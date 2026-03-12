import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingSearch from "@/components/FloatingSearch";
import Footer from "@/components/Footer";
import { cabins, regions } from "@/data/cabins";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const Cabins = () => {
  const [searchParams] = useSearchParams();
  const regionParam = searchParams.get("region") || "All Locations";
  const guestsParam = Number(searchParams.get("guests")) || 0;
  const [activeRegion, setActiveRegion] = useState(regionParam);

  const filtered = useMemo(() => {
    return cabins.filter((c) => {
      if (activeRegion !== "All Locations" && c.region !== activeRegion) return false;
      if (guestsParam > 0 && c.capacity < guestsParam) return false;
      return true;
    });
  }, [activeRegion, guestsParam]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingSearch />

      <section className="pt-8 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-satoshi font-bold text-2xl sm:text-3xl text-foreground">
            Our Cabins
          </h1>
          <p className="font-satoshi text-base text-muted-foreground mt-2">
            Handpicked stays across Indonesia's most beautiful landscapes.
          </p>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mt-6">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`font-satoshi text-sm px-4 h-9 rounded-full transition-all duration-200 ${
                  activeRegion === r
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:brightness-95"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Cabin grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            key={activeRegion}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          >
            {filtered.map((cabin) => (
              <motion.div key={cabin.id} variants={item}>
                <Link to={`/cabins/${cabin.id}`} className="group block">
                  <div className="overflow-hidden rounded-2xl bg-muted aspect-[4/3]">
                    <img
                      src={cabin.images[0]}
                      alt={cabin.name}
                      className="w-full h-full object-cover image-outline transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-satoshi font-bold text-lg text-foreground">{cabin.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-foreground">
                        <Star size={14} className="fill-accent text-accent" />
                        {cabin.rating}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin size={13} />
                      {cabin.location}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-satoshi font-bold text-foreground">
                        ${cabin.price}<span className="font-normal text-muted-foreground text-sm"> / night</span>
                      </p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users size={13} />
                        up to {cabin.capacity}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="font-satoshi text-muted-foreground mt-12 text-center">
              No cabins found for your search. Try adjusting filters.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cabins;
