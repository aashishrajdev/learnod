import React, { useState } from "react";

import CodeEditor from "./components/CodeEditor";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState(""); // Full YouTube URL
  const [videoId, setVideoId] = useState(""); // Extracted YouTube Video ID
  const [code, setCode] = useState("// Type your code..."); // Store code
  const [output, setOutput] = useState(""); // Store output from execution

  // Function to extract video ID from a YouTube URL
  const extractVideoId = (url: string): string => {
    const regExp =
      /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : ""; // Return video ID if matched, otherwise an empty string
  };

  // Handle input change for YouTube URL
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setYoutubeUrl(newUrl);

    const extractedId = extractVideoId(newUrl);
    setVideoId(extractedId); // Update video ID
  };

  // Handle compiling and running code
  const handleRunCode = () => {
    try {
      // Evaluate the JavaScript code (you can extend this for Python, etc. using API calls)
      // eslint-disable-next-line no-eval
      const result = eval(code); // Be cautious with eval in production
      setOutput(String(result));
    } catch (err) {
      setOutput(`Error: ${err}`);
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="p-4 bg-gray-800 text-center text-lg font-bold">
        Code and Learn Platform
      </header>

      {/* Main Layout */}
      <div className="flex flex-grow">
        {/* Video Player (Left Panel) */}
        <div className="w-1/2 p-4">
          <h3 className="text-xl mb-4">Video Player</h3>
          <input
            type="text"
            placeholder="Enter YouTube Video URL"
            value={youtubeUrl}
            onChange={handleUrlChange}
            className="w-full mb-4 p-2 rounded border border-gray-600 bg-gray-800 text-white"
          />
          {/* Pass videoId to the VideoPlayer component */}
          {videoId && <VideoPlayer videoId={videoId} />}
        </div>

        {/* Code Editor (Right Panel) */}
        <div className="w-1/2 p-4 border-l border-gray-700">
          <h3 className="text-xl mb-4">Code Editor</h3>
          <CodeEditor code={code} setCode={setCode} />
          <button
            onClick={handleRunCode}
            className="mt-4 p-2 bg-blue-600 text-white rounded"
          >
            Run Code
          </button>

          {/* Output Area */}
          <div className="mt-4 p-4 bg-gray-800 border border-gray-600 rounded">
            <h4 className="font-bold">Output:</h4>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
