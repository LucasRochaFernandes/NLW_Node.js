import { Request, Response, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

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

  const { sub } = verify(token, "36fc79b4b59ea5b5576dfb635f848817") as IPayLoad;

  req.user_id = sub;

  return next();
}
