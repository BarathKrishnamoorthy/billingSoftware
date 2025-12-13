import express from "express";
import { createSetting, getSettingDetails } from "../controllers/settingController.js";
const settingRouter = express.Router();
import upload from "../middlewares/upload.js";
settingRouter.post("/create-setting", upload.single("logo"), createSetting);
settingRouter.get("/view-setting/:id", getSettingDetails);

export default settingRouter;