import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AddBookForm from "@/components/AddBookForm";
import { books } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/animations/PageTransition";

const BookEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Livre introuvable.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(`/livre/${book.id}`)}
            className="text-primary hover:underline text-sm mb-6 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à la fiche
          </button>
          <h1 className="text-2xl font-bold text-foreground mb-8">Modifier l'ouvrage</h1>
          <AddBookForm
            initialData={{ titre: book.titre, auteur: book.auteur, categorieId: book.categorieId }}
            isEdit
            onSubmit={() => navigate(`/livre/${book.id}`)}
            onCancel={() => navigate(`/livre/${book.id}`)}
          />
        </div>
      </PageTransition>
    </div>
  );
};

export default BookEditPage;
