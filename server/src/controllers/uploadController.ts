import { Request, Response } from "express";
import { extractUrlsFromFile } from "../utils/extractUrls";
import fs from "fs";

export const handleUpload = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const filePath = req.file.path;

    const { validUrls, invalidCount, duplicateCount } = extractUrlsFromFile(
      filePath
    );

    fs.unlinkSync(filePath);

    return res.json({
      urls: validUrls,
      meta: {
        total: validUrls.length + invalidCount,
        valid: validUrls.length,
        invalid: invalidCount,
        duplicates: duplicateCount, 
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error processing file",
    });
  }
};
