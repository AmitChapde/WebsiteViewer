import axios from "axios";
import type { UploadResponse } from "../types";

const API_BASE = import.meta.env.VITE_API_URL;

export const uploadFile = async (file: File): Promise<string[]> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<UploadResponse>(
    `${API_BASE}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.urls;
};