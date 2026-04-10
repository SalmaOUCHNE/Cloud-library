import { useState } from "react";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import BookCard from "@/components/BookCard";
import AddBookForm from "@/components/AddBookForm";
import { categories, books as initialBooks, Book } from "@/lib/data";
import heroImage from "@/assets/hero-library.jpg";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const filterOptions = ["Tous", ...categories.map((c) => c.nom)];

  const filteredBooks =
    activeFilter === "Tous"
      ? books
      : books.filter((b) => b.categorie === activeFilter);

  const handleAddBook = (data: { titre: string; auteur: string; categorieId: string }) => {
    const cat = categories.find((c) => c.id === data.categorieId);
    const newBook: Book = {
      id: String(Date.now()),
      titre: data.titre,
      auteur: data.auteur,
      categorie: cat?.nom || "",
      categorieId: data.categorieId,
    };
    setBooks((prev) => [...prev, newBook]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              Votre collection, structurée et accessible
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Couvertures réelles (Open Library), photos par thème et navigation fluide — catalogue pensé pour une expérience lecture moderne.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src={heroImage}
              alt="Bibliothèque"
              className="w-80 h-48 object-cover rounded-xl shadow-2xl"
              width={320}
              height={192}
            />
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="container mx-auto px-4 py-12">
        <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-1">Catalogue</p>
        <h2 className="text-2xl font-bold text-foreground mb-1">Nos livres</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {filteredBooks.length} titres · {activeFilter === "Tous" ? "Toutes les catégories" : activeFilter}
        </p>

        {/* Filters */}
        <div className="glass-card p-3 flex items-center gap-2 flex-wrap mb-8">
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
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Explorer les catégories</p>
            <p className="text-xs text-muted-foreground">Cliquez pour filtrer le catalogue</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onClick={() => setActiveFilter(cat.nom)}
              />
            ))}
          </div>
        </div>

        {/* Add Book Form */}
        <div className="mb-8">
          <AddBookForm onSubmit={handleAddBook} />
        </div>

        {/* Book Collection */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Collection</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onFiche={() => navigate(`/livre/${book.id}`)}
                onEditer={() => navigate(`/livre/${book.id}/editer`)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
