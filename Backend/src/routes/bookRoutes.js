import express from "express";
import { createBook, getBooks } from "../controllers/bookController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getBooks);
router.post("/", protect, createBook);

export default router;