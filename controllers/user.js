import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const addUser = async (req, res) => {
  try {
    console.log("Received user data:", req.body);
    const { username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, password: hashedPassword, role },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "An error occurred while adding the user." });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) return res.status(400).json({ error: "No user found" });
    const isPwdCorrect = await bcrypt.compare(password, user.password);
    if (!isPwdCorrect)
      return res.status(400).json({ error: "Authentication failed" });
    const token = jwt.sign({ username: user.username }, "jwtkey", {
      expiexpiresIn: "10m",
    });
    res.cookie("jwttoken", token);
    res.status(200).json({ message: "Logged IN" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "An error occurred while adding the user." });
  }
};
