import { Request, Response } from "express";
import { ComplimentsService } from "../services/ComplimentsService";

export class ComplimentController {
  async handle(req: Request, res: Response) {
    const { user_receiver, tag_id, message } = req.body;

    const { user_id } = req;

    const complimentController = new ComplimentsService();

    const compliment = await complimentController.execute({
      user_sender: user_id,
      user_receiver,
      tag_id,
      message,
    });

    return res.json(compliment);
  }
}
