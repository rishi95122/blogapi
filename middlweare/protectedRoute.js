import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const protectRoute = async (req, res, next) => {
  console.log("pro");
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWTKEY);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }
    console.log("Dec", decoded);
    req.uploadedBy = decoded.id;
    next();
  } catch (err) {
    console.log("Error in protectRoute middleware", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export default protectRoute;
