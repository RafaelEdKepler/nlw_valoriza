import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../../services/Compliment/ListUserReceiveComplimentsService";


class ListUserReceiveComplimentsController {
  async handle(request: Request, response: Response) {
    const { user } = request.body;

    const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService();

    const compliments = await listUserReceiveComplimentsService.execute(user);

    return response.json(compliments);
  }
}

export { ListUserReceiveComplimentsController };