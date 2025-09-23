import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("Hello, Express + TypeScript + Yarn + ESM 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
