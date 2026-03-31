import { useState } from "react";
import { uploadFile } from "../services/api";
import { Trash2, Upload } from "lucide-react";

type Props = {
  onUpload: (urls: string[]) => void;
  setError: (msg: string | null) => void;
  setLoading: (val: boolean) => void;
};

export default function FileUpload({ onUpload, setError, setLoading }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);

  const allowedExtensions = [".xlsx", ".csv"];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const lowerName = file.name.toLowerCase();

    const isValid = allowedExtensions.some((ext) => lowerName.endsWith(ext));

    if (!isValid) {
      setError("Only .xlsx and .csv files are allowed");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const urls = await uploadFile(file);

      onUpload(urls);
      setFileName(file.name);

      e.target.value = "";
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setFileName(null);
    onUpload([]);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      <div>
        <p className="text-sm font-medium text-gray-800">Upload File</p>
        <p className="text-xs text-gray-400">
          Excel (.xlsx) or CSV containing website URLs
        </p>
      </div>

      {/* Upload Box */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer group ${
          fileName
            ? "border-green-300 bg-green-50/40"
            : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/30"
        }`}
      >
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center justify-center text-center space-y-2 pointer-events-none">
          <div className="text-2xl transition-transform duration-300 group-hover:scale-110">
            <Upload size={25} />
          </div>

          {fileName ? (
            <>
              <p className="text-sm font-medium text-gray-800">{fileName}</p>

              <p className="text-xs text-green-600">
                File uploaded successfully
              </p>

              <p className="text-xs text-gray-400">Click to replace file</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
                Click to upload or drag & drop
              </p>

              <p className="text-xs text-gray-400">
                Supported formats: .xlsx, .csv
              </p>
            </>
          )}
        </div>
      </div>

      {/* Remove Button */}
      {fileName && (
        <div className="flex justify-center">
          <button
            onClick={handleRemove}
            className="flex items-center gap-2 justify-center p-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white rounded-lg transition-all shadow-md cursor-pointer"
          >
            <Trash2 size={16} />
            <span>Remove File</span>
          </button>
        </div>
      )}
    </div>
  );
}
