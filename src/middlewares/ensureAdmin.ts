import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { Usersrepositories } from "../repositories/Usersrepositories";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req;

  const userRepositories = getCustomRepository(Usersrepositories);

  const { admin } = await userRepositories.findOne(user_id);

  if (admin) {
    return next();
  } else {
    return res.status(401).json({ error: "User does not admin" });
  }
}
