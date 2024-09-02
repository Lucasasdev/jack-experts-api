import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
