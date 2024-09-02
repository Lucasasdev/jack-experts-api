import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest, UserPayload } from "../controllers/controller";

export const verifyJwt = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token malformed" });
    }

    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));

    if (!decoded) {
      return res.sendStatus(401);
    }

    req.user = decoded as UserPayload;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
