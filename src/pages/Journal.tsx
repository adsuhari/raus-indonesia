import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import journal1 from "@/assets/journal-1.jpg";
import journal2 from "@/assets/journal-2.jpg";
import journal3 from "@/assets/journal-3.jpg";

export const journalArticles = [
  {
    id: "1",
    category: "Experience",
    title: "Rina's story: A design cabin stay in Ubud",
    excerpt: "After months of city burnout, Rina booked a treehouse cabin perched above Ubud's rice terraces. What she found was more than a vacation — it was a reset.",
    content: "After months of city burnout, Rina booked a treehouse cabin perched above Ubud's rice terraces. What she found was more than a vacation — it was a reset.\n\nThe first morning, she woke to the sound of birds rather than alarms. Floor-to-ceiling windows revealed a landscape so green it seemed unreal. She spent hours reading on the deck, took long walks through the paddies, and learned to cook traditional Balinese dishes with a local family.\n\n\"I came for three nights and stayed for seven,\" she says. \"There's something about being surrounded by nature in a beautifully designed space that changes your relationship with time.\"\n\nFor Rina, the cabin wasn't just accommodation — it was the entire experience. The thoughtful architecture, the natural materials, the way the space guided her toward stillness rather than stimulation.",
    image: journal1,
    date: "February 14, 2026",
  },
  {
    id: "2",
    category: "Experience",
    title: "Dani's story: A couple's retreat by the sea in Lombok",
    excerpt: "Dani and his partner escaped to a cliff cabin on Lombok's southern coast. Between surfing sessions and sunset dinners, they rediscovered what matters.",
    content: "Dani and his partner escaped to a cliff cabin on Lombok's southern coast. Between surfing sessions and sunset dinners, they rediscovered what matters.\n\nThe cabin sat high above the Indian Ocean, with an infinity plunge pool that seemed to merge with the horizon. \"We spent the first day doing absolutely nothing,\" Dani recalls. \"Just watching the waves and talking — really talking — for the first time in months.\"\n\nThey surfed empty breaks at dawn, explored hidden beaches by motorbike, and cooked fresh fish on the cabin's outdoor grill as the sun set behind Mount Agung.\n\n\"The design of the space mattered more than we expected. Everything was minimal but considered. It made us slow down and be present with each other.\"",
    image: journal2,
    date: "January 28, 2026",
  },
  {
    id: "3",
    category: "Experience",
    title: "Maya's story: A yoga retreat in the jungle",
    excerpt: "Maya traded her phone for a mat and spent five days in a jungle pod deep in Lombok's rainforest. No WiFi, no distractions — just nature.",
    content: "Maya traded her phone for a mat and spent five days in a jungle pod deep in Lombok's rainforest. No WiFi, no distractions — just nature.\n\n\"I was nervous about disconnecting,\" she admits. \"I run a business, I'm always online. But by the second day, I couldn't imagine going back.\"\n\nShe practiced yoga on a platform overlooking the canopy, hiked to waterfalls she had all to herself, and journaled by candlelight each evening.\n\n\"The pod is this incredible geodesic structure that feels like living inside a giant seed. Solar powered, outdoor shower, hammock swaying in the breeze. It strips away everything unnecessary and leaves you with just... yourself.\"\n\nMaya now visits quarterly. \"It's become essential to my creative process. I get more ideas in five days here than in five months at my desk.\"",
    image: journal3,
    date: "January 10, 2026",
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

const Journal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-satoshi font-bold text-2xl sm:text-3xl text-foreground">Journal</h1>
          <p className="font-satoshi text-base text-muted-foreground mt-2">
            Stories from our guests and the spaces they love.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10"
          >
            {journalArticles.map((article) => (
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
                      {article.category} · {article.date}
                    </p>
                    <p className="font-satoshi font-bold text-base text-foreground mt-1">{article.title}</p>
                    <p className="font-satoshi text-sm text-muted-foreground mt-2 line-clamp-2">{article.excerpt}</p>
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

export default Journal;
