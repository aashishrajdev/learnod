import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";

interface CodeEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
  const [language, setLanguage] = useState<string>("javascript"); // Default language

  const languages = [
    "javascript",
    "python",
    "typescript",
    "java",
    "c",
    "cpp",
    "csharp",
    "html",
    "css",
    "json",
  ];

  return (
    <div className="h-full bg-gray-800 rounded shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <label className="text-white text-sm font-medium">
          Select Language:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="ml-2 p-2 bg-gray-700 text-white rounded"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
      </div>
      <MonacoEditor
        height="400"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(newCode) => setCode(newCode)}
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
