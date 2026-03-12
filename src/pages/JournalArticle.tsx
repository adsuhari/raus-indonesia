import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { journalArticles } from "@/pages/Journal";

const JournalArticle = () => {
  const { id } = useParams();
  const article = journalArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 pt-28 text-center">
          <h1 className="font-satoshi font-bold text-2xl text-foreground">Article not found</h1>
          <Link to="/journal" className="font-satoshi text-primary mt-4 inline-block">← Back to journal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-24 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/journal" className="inline-flex items-center gap-1 font-satoshi text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={14} /> Back to journal
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="font-satoshi font-bold text-xs tracking-wider text-muted-foreground uppercase">
              {article.category} · {article.date}
            </p>
            <h1 className="font-satoshi font-bold text-2xl sm:text-4xl text-foreground mt-3 leading-tight">
              {article.title}
            </h1>

            <div className="mt-8 rounded-2xl overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full aspect-[3/2] object-cover image-outline"
              />
            </div>

            <div className="mt-8 space-y-4">
              {article.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="font-satoshi text-base text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default JournalArticle;
