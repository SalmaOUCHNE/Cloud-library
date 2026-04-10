import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/jwt.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email deja utilise" });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const user = await User.create({
      nom,
      email,
      motDePasse: hashedPassword,
    });

    const token = generateAccessToken(user);

    res.status(201).json({
      message: "Utilisateur cree",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = generateAccessToken(user);

    res.json({
      message: "Connexion reussie",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};