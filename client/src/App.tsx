import UrlNavigator from "./components/UrlNavigator";

function App() {
  return (
    <div className="min-h-screen flex justify-center px-4 py-8 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-5xl rounded-2xl shadow-lg p-6 space-y-6 bg-white border border-gray-300">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-purple-800">
              Website Navigator
            </h1>
            <p className="text-sm text-gray-700">
              Upload and browse URLs from Excel, CSV, or Google Sheets
            </p>
          </div>  
        </div>

        {/* Main Content */}
        <UrlNavigator />

      </div>
    </div>
  );
}

export default App;