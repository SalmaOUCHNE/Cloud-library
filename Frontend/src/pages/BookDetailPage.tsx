import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import BookDetail from "@/components/BookDetail";
import { books } from "@/lib/data";

const BookDetailPage = () => {
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
      <div className="container mx-auto px-4 py-8">
        <BookDetail
          book={book}
          onBack={() => navigate("/catalogue")}
          onEdit={() => navigate(`/livre/${book.id}/editer`)}
          onDelete={() => navigate("/catalogue")}
        />
      </div>
    </div>
  );
};

export default BookDetailPage;
