import { motion } from "framer-motion";
import ideaReading from "@/assets/idea-reading.jpg";
import ideaWalk from "@/assets/idea-walk.jpg";
import ideaSwim from "@/assets/idea-swim.jpg";

const ideas = [
  {
    id: 1,
    number: "Ide 27",
    text: "Tenggelam dalam buku favoritmu berjam-jam.",
    image: ideaReading,
  },
  {
    id: 2,
    number: "Ide 53",
    text: "Berjalan santai menyusuri alam tropis.",
    image: ideaWalk,
  },
  {
    id: 3,
    number: "Ide 12",
    text: "Berenang di kolam alami dengan pemandangan pegunungan.",
    image: ideaSwim,
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const IdeasCarousel = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {ideas.map((idea) => (
            <motion.div key={idea.id} variants={item} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={idea.image}
                  alt={idea.text}
                  className="w-full aspect-[3/4] object-cover image-outline transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4">
                <p className="font-satoshi font-bold text-sm text-foreground">{idea.number}</p>
                <p className="font-satoshi text-base text-foreground mt-1">{idea.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IdeasCarousel;
