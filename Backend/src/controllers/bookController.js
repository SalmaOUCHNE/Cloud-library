import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  const { titre, auteur, isbn, categorie, quantite } = req.body;

  const book = await Book.create({
    titre,
    auteur,
    isbn,
    categorie,
    quantite,
    exemplairesDisponibles: quantite,
  });

  res.status(201).json(book);
};

export const getBooks = async (req, res) => {
  const books = await Book.find().populate("categorie");
  res.json(books);
};