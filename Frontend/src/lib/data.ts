import catRoman from "@/assets/cat-roman.jpg";
import catScifi from "@/assets/cat-scifi.jpg";
import catBio from "@/assets/cat-bio.jpg";
import catHistoire from "@/assets/cat-histoire.jpg";
import catDev from "@/assets/cat-dev.jpg";

export type Category = {
  id: string;
  nom: string;
  description: string;
  initial: string;
  image: string;
  livresCount?: number;
};

export type Book = {
  id: string;
  titre: string;
  auteur: string;
  categorie: string;
  categorieId: string;
  coverUrl?: string;
  isbn?: string;
  quantite?: number;
  exemplairesDisponibles?: number;
  isActive?: boolean;
};

export type Borrow = {
  id: string;
  utilisateur: string;
  livre: string;
  livreId: string;
  dateEmprunt: string;
  dateRetourPrevue: string;
  dateRetourReelle?: string;
  statut: "EN_COURS" | "RETOURNE";
};

export type User = {
  id: string;
  nom: string;
  email: string;
  role: "ADMIN" | "BIBLIOTHECAIRE" | "MEMBRE";
  isActive: boolean;
  dateCreation: string;
};

export const categories: Category[] = [
  { id: "roman", nom: "Roman", description: "Romans et fictions", initial: "R", image: catRoman, livresCount: 3 },
  { id: "scifi", nom: "Science-Fiction", description: "SF, fantastique et futuriste", initial: "S", image: catScifi, livresCount: 2 },
  { id: "bio", nom: "Biographie", description: "Vies et récits de personnalités", initial: "B", image: catBio, livresCount: 1 },
  { id: "histoire", nom: "Histoire", description: "Ouvrages historiques", initial: "H", image: catHistoire, livresCount: 1 },
  { id: "dev", nom: "Développement", description: "Programmation et informatique", initial: "D", image: catDev, livresCount: 1 },
];

export const books: Book[] = [
  { id: "1", titre: "Les Misérables", auteur: "Victor Hugo", categorie: "Roman", categorieId: "roman", coverUrl: "https://covers.openlibrary.org/b/isbn/9782070409228-L.jpg", isbn: "978-2-07-040922-8", quantite: 5, exemplairesDisponibles: 3 },
  { id: "2", titre: "1984", auteur: "George Orwell", categorie: "Science-Fiction", categorieId: "scifi", coverUrl: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg", isbn: "978-0-451-52493-5", quantite: 3, exemplairesDisponibles: 1 },
  { id: "3", titre: "Le Petit Prince", auteur: "Antoine de Saint-Exupéry", categorie: "Roman", categorieId: "roman", coverUrl: "https://covers.openlibrary.org/b/isbn/9782070612758-L.jpg", isbn: "978-2-07-061275-8", quantite: 4, exemplairesDisponibles: 4 },
  { id: "4", titre: "L'Étranger", auteur: "Albert Camus", categorie: "Roman", categorieId: "roman", coverUrl: "https://covers.openlibrary.org/b/isbn/9782070360024-L.jpg", isbn: "978-2-07-036002-4", quantite: 2, exemplairesDisponibles: 0 },
  { id: "5", titre: "Sapiens", auteur: "Yuval Noah Harari", categorie: "Histoire", categorieId: "histoire", coverUrl: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg", isbn: "978-0-06-231609-7", quantite: 3, exemplairesDisponibles: 2 },
  { id: "6", titre: "Dune", auteur: "Frank Herbert", categorie: "Science-Fiction", categorieId: "scifi", coverUrl: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg", isbn: "978-0-441-17271-9", quantite: 2, exemplairesDisponibles: 2 },
  { id: "7", titre: "Clean Code", auteur: "Robert C. Martin", categorie: "Développement", categorieId: "dev", coverUrl: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg", isbn: "978-0-13-235088-4", quantite: 3, exemplairesDisponibles: 1 },
  { id: "8", titre: "Steve Jobs", auteur: "Walter Isaacson", categorie: "Biographie", categorieId: "bio", coverUrl: "https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg", isbn: "978-1-451-64853-9", quantite: 2, exemplairesDisponibles: 2 },
];

export const borrows: Borrow[] = [
  { id: "1", utilisateur: "Marie Dupont", livre: "Les Misérables", livreId: "1", dateEmprunt: "2026-03-20", dateRetourPrevue: "2026-04-20", statut: "EN_COURS" },
  { id: "2", utilisateur: "Jean Martin", livre: "1984", livreId: "2", dateEmprunt: "2026-03-15", dateRetourPrevue: "2026-04-15", statut: "EN_COURS" },
  { id: "3", utilisateur: "Sophie Bernard", livre: "Clean Code", livreId: "7", dateEmprunt: "2026-03-01", dateRetourPrevue: "2026-04-01", dateRetourReelle: "2026-03-28", statut: "RETOURNE" },
  { id: "4", utilisateur: "Marie Dupont", livre: "L'Étranger", livreId: "4", dateEmprunt: "2026-03-25", dateRetourPrevue: "2026-04-25", statut: "EN_COURS" },
  { id: "5", utilisateur: "Pierre Duval", livre: "1984", livreId: "2", dateEmprunt: "2026-02-10", dateRetourPrevue: "2026-03-10", dateRetourReelle: "2026-03-08", statut: "RETOURNE" },
];

export const users: User[] = [
  { id: "1", nom: "Admin Principal", email: "admin@cloudlibrary.com", role: "ADMIN", isActive: true, dateCreation: "2025-01-01" },
  { id: "2", nom: "Marie Dupont", email: "marie@example.com", role: "MEMBRE", isActive: true, dateCreation: "2025-06-15" },
  { id: "3", nom: "Jean Martin", email: "jean@example.com", role: "MEMBRE", isActive: true, dateCreation: "2025-08-20" },
  { id: "4", nom: "Sophie Bernard", email: "sophie@example.com", role: "BIBLIOTHECAIRE", isActive: true, dateCreation: "2025-03-10" },
  { id: "5", nom: "Pierre Duval", email: "pierre@example.com", role: "MEMBRE", isActive: false, dateCreation: "2025-11-01" },
];
