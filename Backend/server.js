import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import bookRoutes from "./src/routes/bookRoutes.js";
// IMPORT ROUTES 
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();
app.use("/api/categories", categoryRoutes);
app.use("/api/books", bookRoutes);
// middlewares
app.use(cors());
app.use(express.json());

// ROUTES 
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API Cloud Library 🚀");
});

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.log(err));

// start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});