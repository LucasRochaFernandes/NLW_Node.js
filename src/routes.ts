import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { TagController } from "./controllers/TagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new UserController();
const createTagController = new TagController();

router.post("/users", createUserController.handle);

router.post("/tags", ensureAdmin, createTagController.handle);

export { router };
