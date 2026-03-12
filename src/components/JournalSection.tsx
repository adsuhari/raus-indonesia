import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import journal1 from "@/assets/journal-1.jpg";
import journal2 from "@/assets/journal-2.jpg";
import journal3 from "@/assets/journal-3.jpg";

const articles = [
  {
    id: 1,
    category: "Experience",
    title: "Rina's story: A design cabin stay in Ubud",
    image: journal1,
  },
  {
    id: 2,
    category: "Experience",
    title: "Dani's story: A couple's retreat by the sea in Lombok",
    image: journal2,
  },
  {
    id: 3,
    category: "Experience",
    title: "Maya's story: A yoga retreat in the jungle",
    image: journal3,
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

const JournalSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-satoshi font-bold text-2xl sm:text-3xl text-foreground"
        >
          Our Journal
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={item}>
              <Link to={`/journal/${article.id}`} className="group block">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full aspect-[3/4] object-cover image-outline transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-satoshi font-bold text-xs tracking-wider text-muted-foreground uppercase">
                    {article.category}
                  </p>
                  <p className="font-satoshi font-bold text-base text-foreground mt-1">
                    {article.title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10"
        >
          <Link
            to="/journal"
            className="font-satoshi font-medium text-sm tracking-wider bg-secondary text-foreground h-11 px-6 rounded-full inline-flex items-center hover:brightness-95 active:scale-[0.98] transition-all duration-200"
          >
            All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default JournalSection;
