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
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) return res.status(400).json({ error: "No user found" });
    const isPwdCorrect = await bcrypt.compare(password, user.password);
    if (!isPwdCorrect)
      return res.status(400).json({ error: "Authentication failed" });
    const token = jwt.sign({ id: user.id }, process.env.JWTKEY, {
      expiresIn: "20m",
    });

    console.log("logged");
    return res.status(200).json(token);
  } catch (error) {
    console.error("Error adding user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding the user." });
  }
};

export const getUser = (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTKEY);
    if (!decoded) return res.status(401).json({ message: "Invalid token" });
    return res.status(200).json(decoded);
  } catch (error) {
    console.error("Token verification failed:", error);

    return res.status(401).json({ message: "Invalid token" });
  }
};
