import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, getCategories);
router.post("/", protect, authorizeRoles("ADMIN", "BIBLIOTHECAIRE"), createCategory);

export default router;