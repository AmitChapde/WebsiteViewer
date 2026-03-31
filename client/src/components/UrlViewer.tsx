import { useEffect, useState } from "react";

type Props = {
  url: string | undefined;
};

export default function UrlViewer({ url }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
  }, [url]);

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-500 text-sm">No URL selected</p>
        <p className="text-xs text-gray-400 mt-1">
          Upload a file to start browsing
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      
      {/* Top bar */}
      <div className="flex justify-between items-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition"
        >
          Open in new tab ↗
        </a>

        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
          Preview mode
        </span>
      </div>

      {/* Viewer */}
      <div className="relative border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        
        {/* iframe */}
        <iframe
          src={url}
          className="w-full h-130"
          onLoad={() => setIsLoading(false)}
        />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            
            {/* spinner */}
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-2"></div>

            <p className="text-xs text-gray-500">
              Loading preview...
            </p>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <p className="text-xs text-gray-400 text-center">
        Some websites may restrict embedding. Use the link above if needed.
      </p>
    </div>
  );
}