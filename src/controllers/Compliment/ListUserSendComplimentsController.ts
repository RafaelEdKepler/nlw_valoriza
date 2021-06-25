import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../../services/Compliment/ListUserSendComplimentsService";


class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { user } = request.body;

    const listUserSendComplimentsService = new ListUserSendComplimentsService();

    const compliments = await listUserSendComplimentsService.execute(user);

    return response.json(compliments);
  }
}

export { ListUserSendComplimentsController };