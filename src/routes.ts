import { Request, Response, Router } from "express";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { CreateTagController } from "./controllers/Tag/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/Auth/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/Compliment/CreateComplimentController";

const router = Router();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();


router.post("/users/create", createUserController.handle)

router.post("/tags/create", ensureAdmin, createTagController.handle)

router.post("/auth", authenticateUserController.handle);

router.post("/compliments/create", createComplimentController.handle)

export { router };