import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, CheckCircle } from "lucide-react";
import { PageTransition, fadeInUp, staggerContainer } from "@/components/animations/PageTransition";
import { borrows as initialBorrows, Borrow } from "@/lib/data";
import { toast } from "sonner";

const BorrowsPage = () => {
  const [borrowsList, setBorrowsList] = useState<Borrow[]>(initialBorrows);
  const [filter, setFilter] = useState<"ALL" | "EN_COURS" | "RETOURNE">("ALL");

  const filtered = borrowsList.filter((b) => filter === "ALL" || b.statut === filter);

  const handleReturn = (id: string) => {
    setBorrowsList((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, statut: "RETOURNE" as const, dateRetourReelle: new Date().toISOString().split("T")[0] } : b
      )
    );
    toast.success("Livre retourné !");
  };

  return (
    <PageTransition>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
        <motion.div variants={fadeInUp}>
          <h1 className="text-2xl font-bold text-foreground">Gestion des emprunts</h1>
          <p className="text-sm text-muted-foreground">{borrowsList.filter((b) => b.statut === "EN_COURS").length} emprunts en cours</p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex gap-2">
          {(["ALL", "EN_COURS", "RETOURNE"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-chip ${filter === f ? "filter-chip-active" : "filter-chip-inactive"}`}
            >
              {f === "ALL" ? "Tous" : f === "EN_COURS" ? "En cours" : "Retournés"}
            </button>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Utilisateur</th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Livre</th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Date emprunt</th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Retour prévu</th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Statut</th>
                  <th className="text-right px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-border/10 hover:bg-accent/30 transition-colors">
                    <td className="px-6 py-4 text-foreground">{b.utilisateur}</td>
                    <td className="px-6 py-4 text-foreground">{b.livre}</td>
                    <td className="px-6 py-4 text-muted-foreground">{b.dateEmprunt}</td>
                    <td className="px-6 py-4 text-muted-foreground">{b.dateRetourPrevue}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${b.statut === "EN_COURS" ? "bg-amber-400/10 text-amber-400" : "bg-emerald-400/10 text-emerald-400"}`}>
                        {b.statut === "EN_COURS" ? "En cours" : "Retourné"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {b.statut === "EN_COURS" && (
                        <motion.button whileHover={{ scale: 1.05 }} onClick={() => handleReturn(b.id)} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 transition-colors flex items-center gap-1 ml-auto">
                          <CheckCircle className="w-3.5 h-3.5" /> Retourner
                        </motion.button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </PageTransition>
  );
};

export default BorrowsPage;
