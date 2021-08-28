import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { TagController } from "./controllers/TagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ComplimentController } from "./controllers/ComplimentController";

const router = Router();

const createUserController = new UserController();
const createTagController = new TagController();
const authenticateUser = new AuthenticateUserController();
const complimentController = new ComplimentController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAdmin, createTagController.handle);
router.post("/sessions", authenticateUser.handle);
router.post("/compliments", complimentController.handle);

export { router };
