import express from "express";
import { addUser, getUser, login } from "../controllers/user.js";

const router = express.Router();

router.post("/", addUser);
router.post("/login", login);
router.get("/getuser", getUser);

export default router;
