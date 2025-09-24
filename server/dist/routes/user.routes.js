import express from "express";
import { validate } from "../middlewares/validate.js";
import { UserSchema } from "../schemas/user.schema.js";
import userController from "../controllers/user.controller.js";
const router = express.Router();
router.post("/register", validate(UserSchema), userController.register);
export default router;
