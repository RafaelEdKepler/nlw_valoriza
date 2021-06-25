import { Request, Response, Router } from "express";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { CreateTagController } from "./controllers/Tag/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/Auth/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/Compliment/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserReceiveComplimentsController } from "./controllers/Compliment/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/Compliment/ListUserSendComplimentsController";
import { ListTagController } from "./controllers/Tag/ListTagController";
import { ListUserController } from "./controllers/User/ListUsersController";

const router = Router();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listTagController = new ListTagController(); 
const listUserController = new ListUserController();


router.post("/users/create", createUserController.handle)
router.get("/users/list", ensureAuthenticated, listUserController.handle);

router.post("/tags/create", ensureAuthenticated, ensureAdmin, createTagController.handle)
router.get("/tags/list", ensureAuthenticated, listTagController.handle);

router.post("/auth", authenticateUserController.handle);

router.post("/compliments/create", ensureAuthenticated, createComplimentController.handle)
router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);

export { router };