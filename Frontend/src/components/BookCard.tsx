import { Book } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
  onFiche?: () => void;
  onEditer?: () => void;
}

const BookCard = ({ book, onFiche, onEditer }: BookCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass-card-hover p-4 flex gap-4 items-start"
    >
      {book.coverUrl ? (
        <img
          src={book.coverUrl}
          alt={book.titre}
          className="w-16 h-20 object-cover rounded-lg flex-shrink-0 shadow-md"
          loading="lazy"
          width={64}
          height={80}
        />
      ) : (
        <div className="w-16 h-20 rounded-lg bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground flex-shrink-0">
          {book.titre.substring(0, 2).toUpperCase()}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <Badge className="bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider mb-1 border-0">
          {book.categorie}
        </Badge>
        <h3 className="font-semibold text-foreground truncate">{book.titre}</h3>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5">Auteur</p>
        <p className="text-sm text-secondary-foreground">{book.auteur}</p>
        {book.exemplairesDisponibles !== undefined && (
          <p className={`text-xs mt-1 font-medium ${(book.exemplairesDisponibles || 0) > 0 ? "text-emerald-400" : "text-destructive"}`}>
            {book.exemplairesDisponibles > 0 ? `${book.exemplairesDisponibles} disponible(s)` : "Indisponible"}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-auto self-end">
        <div className="flex gap-2">
          <Link to={`/livre/${book.id}`}>
            <motion.button whileHover={{ scale: 1.05 }} className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border">
              Fiche
            </motion.button>
          </Link>
          <Link to={`/livre/${book.id}/editer`}>
            <motion.button whileHover={{ scale: 1.05 }} className="text-xs btn-glow px-3 py-1.5 rounded-lg">
              Éditer
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
