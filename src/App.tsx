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

  // Handle compiling and running code
  const handleRunCode = () => {
    try {
      // Evaluate JavaScript code (use sandboxing for safety in production)
      // eslint-disable-next-line no-eval
      const result = eval(code);
      setOutput(String(result));
    } catch (err) {
      setOutput(`Error: ${err}`);
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="p-3 bg-gray-800 text-center text-lg font-bold">
        Learnod
      </header>

      {/* Main Layout */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Video Player (Left Panel) */}
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-xl mb-4">Video Player</h3>
          <input
            type="text"
            placeholder="Enter YouTube Video URL"
            value={youtubeUrl}
            onChange={handleUrlChange}
            className="w-full mb-4 p-2 rounded border border-gray-600 bg-gray-800 text-white"
          />
          {videoId && <VideoPlayer videoId={videoId} />}
        </div>

        {/* Code Editor (Right Panel) */}
        <div className="w-full h-fit md:w-1/2 p-4 border-t md:border-t-0 md:border-l border-gray-700">
          <h3 className="text-xl mb-4">Code Editor</h3>
          <CodeEditor code={code} setCode={setCode} />
          <button
            onClick={handleRunCode}
            className="mt-4 w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded"
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
