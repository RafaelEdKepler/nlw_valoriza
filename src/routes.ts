import { Request, Response, Router } from "express";
import { CreateUserController } from "./controllers/User/CreateUserController";


const router = Router();
const createUserController = new CreateUserController();

router.post("/user/create", createUserController.handle)

export { router };