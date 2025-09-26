import express from "express";
import { validate } from "../middlewares/validate.js";
import { UserSchema } from "../schemas/user.schema.js";
import { MsgSchema } from "../schemas/msg.schema.js";
import userController from "../controllers/user.controller.js";
import msgController from "../controllers/msg.controller.js";

const router = express.Router();

router.get("/users", userController.getAll);

router.post("/register", validate(UserSchema), userController.register);

router.delete("/users/:id", userController.remove);

// Msgs
router.get("/msgs", msgController.getAll);
router.post("/send-msg/:id", validate(MsgSchema), msgController.create);
router.delete("/msgs", msgController.remove);

export default router;
