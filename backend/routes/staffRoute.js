import express from "express";
import { addStaff, listStaff, updateStaff, removeStaff, loginStaff } from "../controllers/staffController.js";
import authMiddleware from "../middleware/auth.js";

const staffRouter = express.Router();

staffRouter.post("/login", loginStaff);
staffRouter.get("/list", authMiddleware, listStaff);
staffRouter.post("/add", authMiddleware, addStaff);
staffRouter.put("/update", authMiddleware, updateStaff);
staffRouter.delete("/remove", authMiddleware, removeStaff);

export default staffRouter;
