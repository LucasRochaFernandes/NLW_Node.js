import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { Usersrepositories } from "../repositories/Usersrepositories";

interface IComplimentRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

export class ComplimentsService {
  async execute({
    user_sender,
    user_receiver,
    tag_id,
    message,
  }: IComplimentRequest) {
    if (user_sender === user_receiver) {
      throw new Error("Incorrect User receiver");
    }

    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const usersRepositories = getCustomRepository(Usersrepositories);

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error("User receiver does not exists");
    }

    const compliment = complimentsRepositories.create({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}
