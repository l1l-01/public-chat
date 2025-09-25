import express from "express";
import { validate } from "../middlewares/validate.js";
import { UserSchema } from "../schemas/user.schema.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", userController.getAll);

router.post("/register", validate(UserSchema), userController.register);

router.delete("/users/:id", userController.remove);

export default router;
