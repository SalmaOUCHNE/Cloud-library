import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  const { nom, description } = req.body;

  const category = await Category.create({ nom, description });

  res.status(201).json(category);
};

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};