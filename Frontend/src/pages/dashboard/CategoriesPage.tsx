import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { PageTransition, fadeInUp, staggerContainer } from "@/components/animations/PageTransition";
import { categories as initialCats, Category } from "@/lib/data";
import { toast } from "sonner";

const CategoriesPage = () => {
  const [cats, setCats] = useState<Category[]>(initialCats);
  const [showAdd, setShowAdd] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [form, setForm] = useState({ nom: "", description: "" });

  const resetForm = () => setForm({ nom: "", description: "" });

  const handleAdd = () => {
    const newCat: Category = {
      id: String(Date.now()),
      nom: form.nom,
      description: form.description,
      initial: form.nom.charAt(0).toUpperCase(),
      image: "",
      livresCount: 0,
    };
    setCats((prev) => [...prev, newCat]);
    resetForm();
    setShowAdd(false);
    toast.success("Catégorie ajoutée !");
  };

  const handleEdit = () => {
    if (!editCat) return;
    setCats((prev) =>
      prev.map((c) => (c.id === editCat.id ? { ...c, nom: form.nom, description: form.description, initial: form.nom.charAt(0).toUpperCase() } : c))
    );
    setEditCat(null);
    resetForm();
    toast.success("Catégorie modifiée !");
  };

  const handleDelete = (id: string) => {
    setCats((prev) => prev.filter((c) => c.id !== id));
    toast.success("Catégorie supprimée !");
  };

  const isFormOpen = showAdd || editCat;

  return (
    <PageTransition>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Catégories</h1>
            <p className="text-sm text-muted-foreground">{cats.length} catégories</p>
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => { setShowAdd(!showAdd); setEditCat(null); resetForm(); }} className="btn-glow px-5 py-2.5 text-sm flex items-center gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Ajouter
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {isFormOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="glass-card p-6">
                <h2 className="font-semibold text-foreground mb-4">{editCat ? "Modifier la catégorie" : "Nouvelle catégorie"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Nom" className="bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
                  <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
                </div>
                <div className="flex gap-3 mt-4">
                  <motion.button whileHover={{ scale: 1.02 }} onClick={editCat ? handleEdit : handleAdd} className="btn-glow px-5 py-2 text-sm rounded-xl">{editCat ? "Enregistrer" : "Ajouter"}</motion.button>
                  <button onClick={() => { setShowAdd(false); setEditCat(null); resetForm(); }} className="px-5 py-2 text-sm rounded-xl border border-border text-muted-foreground hover:text-foreground transition-colors">Annuler</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cats.map((cat) => (
            <motion.div key={cat.id} whileHover={{ y: -2 }} className="glass-card-hover p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {cat.initial}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditCat(cat); setForm({ nom: cat.nom, description: cat.description }); setShowAdd(false); }} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-foreground">{cat.nom}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
              <p className="text-xs text-primary mt-3">{cat.livresCount || 0} livres</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </PageTransition>
  );
};

export default CategoriesPage;
