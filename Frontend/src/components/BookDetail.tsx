import { Book } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition, fadeInUp, staggerContainer } from "@/components/animations/PageTransition";

interface BookDetailProps {
  book: Book;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const BookDetail = ({ book, onBack, onEdit, onDelete }: BookDetailProps) => {
  return (
    <PageTransition>
      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        <motion.button variants={fadeInUp} onClick={onBack} className="text-primary hover:underline text-sm mb-6 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Retour au catalogue
        </motion.button>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div variants={fadeInUp}>
            {book.coverUrl ? (
              <img src={book.coverUrl} alt={book.titre} className="w-40 h-56 object-cover rounded-2xl shadow-2xl" width={160} height={224} />
            ) : (
              <div className="w-40 h-56 rounded-2xl bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground">
                {book.titre.substring(0, 2).toUpperCase()}
              </div>
            )}
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card p-8 flex-1">
            <Badge className="bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3 border-0">
              {book.categorie}
            </Badge>
            <h1 className="text-2xl font-bold text-foreground mb-4">{book.titre}</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Auteur</p>
            <p className="text-foreground mb-2">{book.auteur}</p>
            {book.isbn && (
              <>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-3">ISBN</p>
                <p className="text-sm text-foreground">{book.isbn}</p>
              </>
            )}
            {book.exemplairesDisponibles !== undefined && (
              <>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-3">Disponibilité</p>
                <p className={`text-sm font-medium ${(book.exemplairesDisponibles || 0) > 0 ? "text-emerald-400" : "text-destructive"}`}>
                  {book.exemplairesDisponibles}/{book.quantite} exemplaires disponibles
                </p>
              </>
            )}
            <div className="flex gap-3 mt-6">
              <motion.button whileHover={{ scale: 1.03 }} onClick={onEdit} className="px-5 py-2 rounded-xl border border-border text-sm text-foreground hover:bg-accent transition-colors">
                Modifier
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} onClick={onDelete} className="px-5 py-2 rounded-xl border border-destructive/50 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                Supprimer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default BookDetail;
