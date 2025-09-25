import { Request, Response } from "express";
import { Msg } from "../entities/msg.entity.js";
import { User } from "../entities/user.entity.js";
import { AppDataSource } from "../data-source.js";

const userRepository = AppDataSource.getRepository(User);
const msgRepository = AppDataSource.getRepository(Msg);

const create = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const id = parseInt(req.params.id);

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const msg = msgRepository.create({ content, user });
    await msgRepository.save(msg);

    return res.status(201).json(msg);
  } catch (error) {
    console.error("Error creating message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  create,
};
