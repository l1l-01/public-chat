import express from "express";
import { AppDataSource } from "./data-source.js";
import userRoutes from "./routes/user.routes.js";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use("/api", userRoutes);
AppDataSource.initialize()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Database connection error:", error);
});
