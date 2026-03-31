import express from "express";
import cors from "cors";
import uploadRoutes from "./src/routes/upload.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoutes);

export default app;