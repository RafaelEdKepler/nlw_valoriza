import { Request, Response } from "express";
import { CreateComplimentService } from "../../services/Compliment/CreateComplimentService";


class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_receiver, message } = request.body;
    const user_sender = request.userId;
    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_sender,
      user_receiver, 
      message
    });

    return response.json(compliment);
  }
}

export { CreateComplimentController };