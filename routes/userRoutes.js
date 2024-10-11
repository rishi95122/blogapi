import express from "express";
import { addUser, login } from "../controllers/user.js";

const router = express.Router();

router.post("/", addUser);
router.post("/login", login);

export default router;
