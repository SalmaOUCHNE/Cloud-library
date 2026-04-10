import { motion } from "framer-motion";
import { BookOpen, Users, ArrowLeftRight, TrendingUp, BookCheck, AlertCircle } from "lucide-react";
import { PageTransition, fadeInUp, staggerContainer } from "@/components/animations/PageTransition";
import { useAuthStore } from "@/lib/store";
import { books, borrows, users, categories } from "@/lib/data";

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);
  const activeBorrows = borrows.filter((b) => b.statut === "EN_COURS");
  const totalStock = books.reduce((sum, b) => sum + (b.quantite || 0), 0);
  const availableStock = books.reduce((sum, b) => sum + (b.exemplairesDisponibles || 0), 0);
  const lowStock = books.filter((b) => (b.exemplairesDisponibles || 0) === 0);

  const statsCards = [
    { icon: BookOpen, label: "Total Livres", value: String(books.length), color: "text-primary", bgColor: "bg-primary/10" },
    { icon: Users, label: "Utilisateurs", value: String(users.length), color: "text-emerald-400", bgColor: "bg-emerald-400/10" },
    { icon: ArrowLeftRight, label: "Emprunts actifs", value: String(activeBorrows.length), color: "text-amber-400", bgColor: "bg-amber-400/10" },
    { icon: TrendingUp, label: "Disponibilité", value: `${Math.round((availableStock / totalStock) * 100)}%`, color: "text-primary", bgColor: "bg-primary/10" },
  ];

  return (
    <PageTransition>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-2xl font-bold text-foreground">
            Bonjour, <span className="gradient-text">{user?.nom}</span> 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Voici un aperçu de votre bibliothèque</p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -2, scale: 1.01 }}
              className="stat-card"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent borrows */}
          <motion.div variants={fadeInUp} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Emprunts récents</h2>
              <span className="text-xs text-primary">{activeBorrows.length} actifs</span>
            </div>
            <div className="space-y-3">
              {borrows.slice(0, 5).map((b) => (
                <div key={b.id} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                  <div>
                    <p className="text-sm text-foreground font-medium">{b.livre}</p>
                    <p className="text-xs text-muted-foreground">{b.utilisateur}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    b.statut === "EN_COURS"
                      ? "bg-amber-400/10 text-amber-400"
                      : "bg-emerald-400/10 text-emerald-400"
                  }`}>
                    {b.statut === "EN_COURS" ? "En cours" : "Retourné"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Low stock */}
          <motion.div variants={fadeInUp} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Stock faible</h2>
              <AlertCircle className="w-4 h-4 text-destructive" />
            </div>
            {lowStock.length > 0 ? (
              <div className="space-y-3">
                {lowStock.map((b) => (
                  <div key={b.id} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                    <div>
                      <p className="text-sm text-foreground font-medium">{b.titre}</p>
                      <p className="text-xs text-muted-foreground">{b.auteur}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-destructive/10 text-destructive font-medium">
                      Indisponible
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Tous les livres sont en stock ✓</p>
            )}

            <div className="mt-6 pt-4 border-t border-border/20">
              <h3 className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Catégories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{cat.nom}</span>
                    <span className="text-xs text-muted-foreground">{cat.livresCount} livres</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default DashboardPage;
