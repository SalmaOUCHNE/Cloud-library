import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  titre: String,
  auteur: String,
  isbn: { type: String, unique: true },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  quantite: Number,
  exemplairesDisponibles: Number,
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);