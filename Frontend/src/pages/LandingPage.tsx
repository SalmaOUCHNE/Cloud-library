import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, ArrowLeftRight, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { PageTransition, fadeInUp, staggerContainer } from "@/components/animations/PageTransition";
import { books, categories } from "@/lib/data";

const stats = [
  { icon: BookOpen, label: "Livres", value: "8", desc: "dans le catalogue" },
  { icon: Users, label: "Membres", value: "5", desc: "utilisateurs actifs" },
  { icon: ArrowLeftRight, label: "Emprunts", value: "12", desc: "ce mois-ci" },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(245, 75%, 64%) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-5" style={{ background: "radial-gradient(circle, hsl(245, 85%, 72%) 0%, transparent 70%)" }} />
          </div>

          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-8">
                <Sparkles className="w-3.5 h-3.5" /> Cloud Library Management System
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
                Gérez votre bibliothèque{" "}
                <span className="gradient-text">simplement</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                Catalogue intelligent, emprunts automatisés et suivi en temps réel. Une plateforme moderne pensée pour les bibliothèques d'aujourd'hui.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/catalogue">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-glow px-8 py-3 text-sm flex items-center gap-2">
                    Explorer le catalogue <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                <Link to="/connexion">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-8 py-3 text-sm rounded-xl border border-border text-foreground hover:bg-accent transition-colors">
                    Se connecter
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="stat-card">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Featured Books */}
        <section className="container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-2">Populaires</p>
            <h2 className="text-2xl font-bold text-foreground mb-8">Livres à la une</h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {books.slice(0, 4).map((book) => (
              <motion.div key={book.id} variants={fadeInUp}>
                <Link to={`/livre/${book.id}`}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="glass-card-hover p-4 flex flex-col items-center text-center"
                  >
                    {book.coverUrl ? (
                      <img src={book.coverUrl} alt={book.titre} className="w-24 h-32 object-cover rounded-lg mb-4 shadow-lg" loading="lazy" />
                    ) : (
                      <div className="w-24 h-32 rounded-lg bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground mb-4">
                        {book.titre.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <h3 className="font-semibold text-foreground text-sm truncate w-full">{book.titre}</h3>
                    <p className="text-xs text-muted-foreground">{book.auteur}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-2">Catégories</p>
            <h2 className="text-2xl font-bold text-foreground mb-8">Explorer par genre</h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {categories.map((cat) => (
              <motion.div key={cat.id} variants={fadeInUp}>
                <Link to={`/catalogue?cat=${cat.id}`}>
                  <div className="category-overlay h-40">
                    <img src={cat.image} alt={cat.nom} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 z-10 p-4 flex flex-col justify-end">
                      <h3 className="font-semibold text-foreground text-sm">{cat.nom}</h3>
                      <p className="text-xs text-muted-foreground">{cat.livresCount} livres</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/30 py-8">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">© 2026 Cloud Library. Tous droits réservés.</p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg gradient-bg flex items-center justify-center">
                <BookOpen className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-medium">Cloud Library</span>
            </div>
          </div>
        </footer>
      </PageTransition>
    </div>
  );
};

export default LandingPage;
