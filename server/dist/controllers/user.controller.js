import { User } from "../entities/user.entity.js";
import { AppDataSource } from "../data-source.js";
const userRepository = AppDataSource.getRepository(User);
const register = async (req, res) => {
    try {
        const { username } = req.body;
        const user = userRepository.create({ username });
        await userRepository.save(user);
        res.status(201).json({ success: true, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export default {
    register,
};
