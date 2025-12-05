import express from "express";
import {createRole, getRoles, editRoles, deleteRoles} from "../controllers/roleController.js";
const roleRouter = express.Router();

roleRouter.post("/create-role", createRole);
roleRouter.get("/view-roles", getRoles);
roleRouter.put("/edit-role/:id", editRoles);
roleRouter.delete("/delete-role/:id", deleteRoles);

export default roleRouter;
