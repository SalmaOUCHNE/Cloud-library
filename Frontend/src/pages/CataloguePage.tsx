import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { PageTransition, fadeInUp, staggerContainer } from "@/components/animations/PageTransition";
import { books, categories } from "@/lib/data";
import CategoryCard from "@/components/CategoryCard";
import BookCard from "@/components/BookCard";

const CataloguePage = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat");
  const catLabel = initialCat ? categories.find((c) => c.id === initialCat)?.nom || "Tous" : "Tous";
  const [activeFilter, setActiveFilter] = useState(catLabel);
  const [search, setSearch] = useState("");

  const filterOptions = ["Tous", ...categories.map((c) => c.nom)];

  const filteredBooks = books
    .filter((b) => activeFilter === "Tous" || b.categorie === activeFilter)
    .filter((b) => !search || b.titre.toLowerCase().includes(search.toLowerCase()) || b.auteur.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <section className="container mx-auto px-4 py-12">
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <motion.div variants={fadeInUp}>
              <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-1">Catalogue</p>
              <h1 className="text-3xl font-bold text-foreground mb-1">Nos livres</h1>
              <p className="text-sm text-muted-foreground mb-8">
                {filteredBooks.length} titres · {activeFilter === "Tous" ? "Toutes les catégories" : activeFilter}
              </p>
            </motion.div>

            {/* Search */}
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un livre ou un auteur..."
                  className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                />
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div variants={fadeInUp} className="glass-card p-3 flex items-center gap-2 flex-wrap mb-8">
              <span className="text-xs text-muted-foreground uppercase tracking-wide mr-2">Filtrer</span>
              {filterOptions.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`filter-chip ${activeFilter === f ? "filter-chip-active" : "filter-chip-inactive"}`}
                >
                  {f}
                </button>
              ))}
            </motion.div>

            {/* Categories */}
            <motion.div variants={fadeInUp} className="mb-10">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Explorer les catégories</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map((cat) => (
                  <CategoryCard key={cat.id} category={cat} onClick={() => setActiveFilter(cat.nom)} />
                ))}
              </div>
            </motion.div>

            {/* Books */}
            <motion.div variants={fadeInUp}>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Collection</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.map((book, i) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <BookCard book={book} />
                  </motion.div>
                ))}
              </div>
              {filteredBooks.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Aucun livre trouvé.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </section>
      </PageTransition>
    </div>
  );
};

export default CataloguePage;
