import { getCustomRepository } from "typeorm";

import { Usersrepositories } from "../repositories/Usersrepositories";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

export class CreateUserService {
    async execute({ name, email, admin}: IUserRequest){
        const usersRepository = getCustomRepository(Usersrepositories)

        if(!email){
            throw new Error("Email incorrect")
        }

        const emailAlreadyExists = await usersRepository.findOne({
            email
        })

        if(emailAlreadyExists){
            throw new Error("Email already exists")
        }

        const user = usersRepository.create({
            name,
            email,
            admin
        })

        await usersRepository.save(user)

        return user
    }
}