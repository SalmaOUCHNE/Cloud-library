import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash2, BookOpen } from "lucide-react";
import { PageTransition, fadeInUp, staggerContainer } from "@/components/animations/PageTransition";
import { books as initialBooks, categories, Book } from "@/lib/data";
import { toast } from "sonner";

const BooksPage = () => {
  const [booksList, setBooksList] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [form, setForm] = useState({ titre: "", auteur: "", categorieId: "", isbn: "", quantite: "1" });

  const filtered = booksList.filter(
    (b) => b.titre.toLowerCase().includes(search.toLowerCase()) || b.auteur.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => setForm({ titre: "", auteur: "", categorieId: "", isbn: "", quantite: "1" });

  const handleAdd = () => {
    const cat = categories.find((c) => c.id === form.categorieId);
    const q = parseInt(form.quantite) || 1;
    const newBook: Book = {
      id: String(Date.now()),
      titre: form.titre,
      auteur: form.auteur,
      categorie: cat?.nom || "",
      categorieId: form.categorieId,
      isbn: form.isbn,
      quantite: q,
      exemplairesDisponibles: q,
    };
    setBooksList((prev) => [...prev, newBook]);
    resetForm();
    setShowAdd(false);
    toast.success("Livre ajouté !");
  };

  const handleEdit = () => {
    if (!editBook) return;
    const cat = categories.find((c) => c.id === form.categorieId);
    setBooksList((prev) =>
      prev.map((b) =>
        b.id === editBook.id
          ? { ...b, titre: form.titre, auteur: form.auteur, categorieId: form.categorieId, categorie: cat?.nom || b.categorie, isbn: form.isbn, quantite: parseInt(form.quantite) || b.quantite }
          : b
      )
    );
    setEditBook(null);
    resetForm();
    toast.success("Livre modifié !");
  };

  const handleDelete = (id: string) => {
    setBooksList((prev) => prev.filter((b) => b.id !== id));
    toast.success("Livre supprimé !");
  };

  const openEdit = (book: Book) => {
    setEditBook(book);
    setForm({ titre: book.titre, auteur: book.auteur, categorieId: book.categorieId, isbn: book.isbn || "", quantite: String(book.quantite || 1) });
    setShowAdd(false);
  };

  const isFormOpen = showAdd || editBook;

  return (
    <PageTransition>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestion des livres</h1>
            <p className="text-sm text-muted-foreground">{booksList.length} livres au total</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setShowAdd(!showAdd); setEditBook(null); resetForm(); }}
            className="btn-glow px-5 py-2.5 text-sm flex items-center gap-2 rounded-xl"
          >
            <Plus className="w-4 h-4" /> Ajouter un livre
          </motion.button>
        </motion.div>

        {/* Add/Edit form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card p-6">
                <h2 className="font-semibold text-foreground mb-4">{editBook ? "Modifier le livre" : "Nouveau livre"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <input value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })} placeholder="Titre" className="bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
                  <input value={form.auteur} onChange={(e) => setForm({ ...form, auteur: e.target.value })} placeholder="Auteur" className="bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
                  <select value={form.categorieId} onChange={(e) => setForm({ ...form, categorieId: e.target.value })} className="bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50">
                    <option value="">Catégorie</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.nom}</option>)}
                  </select>
                  <input value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} placeholder="ISBN" className="bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
                  <input type="number" value={form.quantite} onChange={(e) => setForm({ ...form, quantite: e.target.value })} placeholder="Quantité" min="1" className="bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
                </div>
                <div className="flex gap-3 mt-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={editBook ? handleEdit : handleAdd} className="btn-glow px-5 py-2 text-sm rounded-xl">
                    {editBook ? "Enregistrer" : "Ajouter"}
                  </motion.button>
                  <button onClick={() => { setShowAdd(false); setEditBook(null); resetForm(); }} className="px-5 py-2 text-sm rounded-xl border border-border text-muted-foreground hover:text-foreground transition-colors">
                    Annuler
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <motion.div variants={fadeInUp} className="relative max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
          />
        </motion.div>

        {/* Table */}
        <motion.div variants={fadeInUp} className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Livre</th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Catégorie</th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">ISBN</th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Stock</th>
                  <th className="text-right px-6 py-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((book) => (
                  <motion.tr
                    key={book.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-border/10 hover:bg-accent/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {book.coverUrl ? (
                          <img src={book.coverUrl} alt="" className="w-8 h-10 rounded object-cover" loading="lazy" />
                        ) : (
                          <div className="w-8 h-10 rounded bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                            {book.titre.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-foreground">{book.titre}</p>
                          <p className="text-xs text-muted-foreground">{book.auteur}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{book.categorie}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{book.isbn || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium ${(book.exemplairesDisponibles || 0) === 0 ? "text-destructive" : "text-emerald-400"}`}>
                        {book.exemplairesDisponibles}/{book.quantite}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => openEdit(book)} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDelete(book.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
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

export default BooksPage;
