import { getCustomRepository } from "typeorm";
import { Usersrepositories } from "../repositories/Usersrepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateUserService {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserService) {
    const usersRepositories = getCustomRepository(Usersrepositories);

    const userExists = await usersRepositories.findOne({
      email,
    });

    const passwordMatch = await compare(password, userExists.password);

    if (!userExists || !passwordMatch) {
      throw new Error("Email or Password incorrect");
    }
    const token = sign(
      {
        email: userExists.email,
      },
      "36fc79b4b59ea5b5576dfb635f848817",
      {
        subject: userExists.id,
        expiresIn: "1d",
      }
    );
    return token;
  }
}
