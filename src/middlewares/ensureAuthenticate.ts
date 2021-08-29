import { Request, Response, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAutheticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (authToken === "Bearer undefined" || !authToken) {
    throw new Error("User not authenticate");
  }

  const [, token] = authToken.split(" ");

  verify(token, "36fc79b4b59ea5b5576dfb635f848817");

  return next();
}
