import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { notFound, catchErrors } from "./middlewares/error_middlewares.js";
import db from "../db/models/index.js";

import patientRoutes from "./routes/patient_routes.js";

const app = express();
app.use(cors(), express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(patientRoutes);

app.use(notFound);
app.use(catchErrors);

// Test DB connection
db.sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

const PORT = 3000;
dotenv.config({
  path: path.resolve(__dirname, "../backend/.env"),
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
