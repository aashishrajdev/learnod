import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState(""); // Full YouTube URL
  const [videoId, setVideoId] = useState(""); // Extracted YouTube Video ID
  const [code, setCode] = useState("// Type your code..."); // Store code
  const [output, setOutput] = useState(""); // Store output from execution
  const [isDarkMode, setIsDarkMode] = useState(true); // Theme state

  // Function to extract video ID from a YouTube URL
  const extractVideoId = (url: string): string => {
    const regExp =
      /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})|(?:https?:\/\/(?:www\.)?youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    if (match) {
      return match[1] || match[2];
    }
    return "";
  };

  // Handle input change for YouTube URL
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setYoutubeUrl(newUrl);

    const extractedId = extractVideoId(newUrl);
    setVideoId(extractedId); // Update video ID
  };

  // Handle code execution output
  const handleOutputChange = (newOutput: string) => {
    setOutput(newOutput);
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } flex flex-col transition-colors duration-300`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 ${
          isDarkMode ? "bg-gray-800" : "bg-white shadow-md"
        } transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Learnod
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isDarkMode ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Player Section */}
          <div
            className={`rounded-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white shadow-md"
            } p-6 transition-colors duration-300`}
          >
            <div className="flex items-center space-x-2 mb-4">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <h2
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Video Player
              </h2>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter YouTube Video URL"
                  value={youtubeUrl}
                  onChange={handleUrlChange}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                      : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              {videoId && (
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <VideoPlayer videoId={videoId} />
                </div>
              )}
            </div>
          </div>

          {/* Code Editor Section */}
          <div
            className={`rounded-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white shadow-md"
            } p-6 transition-colors duration-300`}
          >
            <div className="flex items-center space-x-2 mb-4">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <h2
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Code Editor
              </h2>
            </div>
            <div className="space-y-4">
              <CodeEditor
                code={code}
                setCode={setCode}
                onOutputChange={handleOutputChange}
                isDarkMode={isDarkMode}
              />

              {/* Output Section */}
              <div
                className={`rounded-lg p-4 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } border transition-colors duration-300`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3
                    className={`font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Output
                  </h3>
                </div>
                <pre
                  className={`whitespace-pre-wrap break-words font-mono text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {output || "No output yet..."}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`py-4 ${
          isDarkMode ? "bg-gray-800" : "bg-white border-t"
        } transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 text-center">
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            © {new Date().getFullYear()} Learnod - Interactive Learning Platform
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
