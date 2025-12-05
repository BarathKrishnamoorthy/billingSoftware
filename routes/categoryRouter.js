import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryByHotel
} from "../controllers/categoryController.js";
const categoryRouter = express.Router();

categoryRouter.post("/create-category", createCategory);
categoryRouter.get("/view-category", getCategories);
categoryRouter.put("/edit-category/:id", updateCategory);
categoryRouter.delete("/delete-category/:id", deleteCategory);
categoryRouter.get("/get-category-by-hotel/:hotelId", getCategoryByHotel);

export default categoryRouter;