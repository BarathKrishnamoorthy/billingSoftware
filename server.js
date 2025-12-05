import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import connectDB from "./config/database.js";

import categoryRouter from "./routes/categoryRouter.js";
import userRouter from "./routes/userRoutes.js";
import roleRouter from "./routes/roleRouter.js";
import settingRouter from "./routes/settingRouter.js";



dotenv.config();


const app = express();
app.use(morgan("dev"));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

const startApp = async () => {
  // start cron
  await connectDB();
  // autoEmailSendJob();
  // autoLogoutJob();
  // Ensure uploads directory exists
  app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
  app.use("/api/category", categoryRouter);
  app.use("/api/user", userRouter);

  app.use("/api/setting", settingRouter);
  app.use("/api/role", roleRouter);

  // Base route
  app.get('/api', (req, res) => res.send('API is running...'));
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startApp(); 


