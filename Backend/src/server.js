import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

const PORT = 3000;
dotenv.config({
  path: path.resolve(__dirname, "../backend/.env"),
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
