import { Request, Response, Router } from "express";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { CreateTagController } from "./controllers/Tag/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();


router.post("/users/create", createUserController.handle)

router.post("/tags/create", ensureAdmin, createTagController.handle)

export { router };