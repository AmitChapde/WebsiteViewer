import express from "express";
import { upload } from "../middleware/upload.middleware";
import { handleUpload } from "../controllers/uploadController";

const router = express.Router();

router.post("/", upload.single("file"), handleUpload);

export default router;