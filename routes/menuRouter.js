import express from "express";
import {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  getMenuByCategory,
  updateStatus,
} from "../controllers/menuController.js";
import upload from "../middlewares/upload.js";
const menuRouter = express.Router();

menuRouter.post("/create-menu", upload.single("itemImage"), createMenu);
menuRouter.get("/view-menu", getMenu);
menuRouter.put("/edit-menu/:id", upload.single("itemImage"), updateMenu);
menuRouter.put("/update-menu-status/:id", updateStatus);
menuRouter.delete("/delete-menu/:id", deleteMenu);
menuRouter.get("/get-menu-by-category/:id", getMenuByCategory);

export default menuRouter;
