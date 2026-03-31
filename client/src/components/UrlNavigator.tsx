import { useState } from "react";
import FileUpload from "./FileUpload";
import UrlViewer from "./UrlViewer";
import { isValidUrl } from "../utils/validateUrl";

export default function UrlNavigator() {
  const [urls, setUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = (uploadedUrls: string[]) => {
    const validUrls = uploadedUrls.filter(isValidUrl);

    if (validUrls.length === 0) {
      setError("No valid URLs found in file.");
      setUrls([]);
      return;
    }

    setError(null);
    setUrls(validUrls);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < urls.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Upload Section */}
      <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
        <FileUpload
          onUpload={handleUpload}
          setError={setError}
          setLoading={setLoading}
        />
      </div>

      {/* Status Messages */}
      <div className="space-y-2">
        {loading && (
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span className="animate-pulse">⏳</span> Uploading file...
          </p>
        )}

        {error && (
          <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}
      </div>

      {/* Viewer Section */}
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
        <UrlViewer url={urls[currentIndex]} />
      </div>

      {/* Navigation */}
      {urls.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-lg shadow-md transition-all ${currentIndex === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'}`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-700">
              Page {currentIndex + 1} of {urls.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex === urls.length - 1}
              className={`px-4 py-2 rounded-lg shadow-md transition-all ${currentIndex === urls.length - 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}