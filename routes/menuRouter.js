import express from "express";
import {createMenu, getMenu, updateMenu, deleteMenu, getMenuByHotel} from "../controllers/menuController.js";
const menuRouter = express.Router();

menuRouter.post("/create-menu", createMenu);
menuRouter.get("/view-menu", getMenu);
menuRouter.put("/edit-menu/:id", updateMenu);
menuRouter.delete("/delete-menu/:id", deleteMenu);
menuRouter.get("/get-menu-by-hotel/:hotelId", getMenuByHotel);

export default menuRouter;