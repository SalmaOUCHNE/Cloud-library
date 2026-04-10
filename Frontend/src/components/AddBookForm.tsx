import { useState } from "react";
import { categories } from "@/lib/data";

interface AddBookFormProps {
  onSubmit: (data: { titre: string; auteur: string; categorieId: string }) => void;
  initialData?: { titre: string; auteur: string; categorieId: string };
  isEdit?: boolean;
  onCancel?: () => void;
}

const AddBookForm = ({ onSubmit, initialData, isEdit = false, onCancel }: AddBookFormProps) => {
  const [titre, setTitre] = useState(initialData?.titre || "");
  const [auteur, setAuteur] = useState(initialData?.auteur || "");
  const [categorieId, setCategorieId] = useState(initialData?.categorieId || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) return;
    onSubmit({ titre, auteur, categorieId });
    if (!isEdit) {
      setTitre("");
      setAuteur("");
      setCategorieId("");
    }
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-bold text-foreground mb-1">
        {isEdit ? "Modifier l'ouvrage" : "Ajouter un ouvrage"}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {isEdit
          ? "Mettez à jour les champs puis enregistrez."
          : "Renseignez le titre, l'auteur et la catégorie. Les champs marqués sont obligatoires pour l'enregistrement."}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1">
              Titre <span className="text-primary">*</span>
            </label>
            <p className="text-[10px] text-primary mb-1">Requis</p>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex. Les Misérables"
              className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1">Auteur</label>
            <input
              type="text"
              value={auteur}
              onChange={(e) => setAuteur(e.target.value)}
              placeholder="Nom de l'auteur"
              className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1">Catégorie</label>
            <select
              value={categorieId}
              onChange={(e) => setCategorieId(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring appearance-none"
            >
              <option value="">Sélectionner...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              {isEdit ? "Enregistrer" : "Enregistrer le livre"}
            </button>
            {isEdit && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="border border-border text-foreground px-4 py-2 rounded-md text-sm hover:bg-accent transition-colors"
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
