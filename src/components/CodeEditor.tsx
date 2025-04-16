import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { CodeExecutionService } from "../services/CodeExecutionService";
import { languages } from "../constants/languages";
import "../styles/editor.css";

interface CodeEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  onOutputChange?: (output: string) => void;
  isDarkMode: boolean;
}

const exampleCode = {
  javascript: `// JavaScript Example
console.log("Hello, World!");

// Try some math
const result = 5 + 3;
console.log("5 + 3 =", result);

// Try an array
const fruits = ["apple", "banana", "orange"];
console.log("Fruits:", fruits);

// Try a function
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("User"));`,

  typescript: `// TypeScript Example
// Note: Some TypeScript features may not work in the browser environment

// Simple types
const message: string = "Hello, World!";
console.log(message);

// Arrays
const numbers: number[] = [1, 2, 3, 4, 5];
console.log("Numbers:", numbers);

// Objects
const person = {
  name: "John",
  age: 30
};
console.log("Person:", person);

// Functions
function add(a: number, b: number): number {
  return a + b;
}

const result = add(5, 3);
console.log("5 + 3 =", result);

// Classes
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

const greeter = new Greeter("User");
console.log(greeter.greet());`,

  python: `# Python Example
print("Hello, World!")

# Try some math
result = 5 + 3
print("5 + 3 =", result)

# Try a list
fruits = ["apple", "banana", "orange"]
print("Fruits:", fruits)

# Try a function
def greet(name):
    return f"Hello, {name}!"

print(greet("User"))`,

  html: `<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello World</h1>
        <p>This is an example HTML document.</p>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </div>
</body>
</html>`,

  json: `{
    "name": "Example JSON",
    "version": "1.0.0",
    "description": "A sample JSON object",
    "data": {
        "numbers": [1, 2, 3, 4, 5],
        "text": "Hello World",
        "boolean": true,
        "nested": {
            "key": "value"
        }
    }
}`,
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  onOutputChange,
  isDarkMode,
}) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [isExecuting, setIsExecuting] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // Load example code when language changes
  useEffect(() => {
    if (exampleCode[language as keyof typeof exampleCode]) {
      setCode(exampleCode[language as keyof typeof exampleCode]);
    }
  }, [language, setCode]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleRunCode = async () => {
    if (isExecuting) return;

    setIsExecuting(true);
    try {
      const executionService = CodeExecutionService.getInstance();
      const output = await executionService.executeCode(code, language);
      if (onOutputChange) {
        onOutputChange(output);
      }
    } catch (error) {
      if (onOutputChange) {
        onOutputChange(
          `Error: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    } finally {
      setIsExecuting(false);
    }
  };

  const handleResetCode = () => {
    if (exampleCode[language as keyof typeof exampleCode]) {
      setCode(exampleCode[language as keyof typeof exampleCode]);
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value));
  };

  return (
    <div
      className={`editor-wrapper ${
        isDarkMode ? "bg-gray-900 dark" : "bg-white"
      }`}
    >
      <div className="p-4">
        {/* Top Controls */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="flex items-center space-x-4">
            <label
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Language:
              <select
                value={language}
                onChange={handleLanguageChange}
                className={`ml-2 p-2 rounded border ${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleResetCode}
              className={`px-4 py-2 rounded ${
                isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Reset Code
            </button>

            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className={`px-4 py-2 rounded ${
                isExecuting
                  ? "bg-gray-600 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition`}
            >
              {isExecuting ? "Running..." : "Run Code"}
            </button>
          </div>
        </div>

        {/* Editor Settings */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <label
            className={`text-sm font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Font Size:
            <input
              type="range"
              min="10"
              max="24"
              value={fontSize}
              onChange={handleFontSizeChange}
              className="ml-2"
            />
            <span className="ml-2">{fontSize}px</span>
          </label>

          <label
            className={`text-sm font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <input
              type="checkbox"
              checked={showLineNumbers}
              onChange={() => setShowLineNumbers(!showLineNumbers)}
              className="mr-2"
            />
            Line Numbers
          </label>
        </div>
      </div>

      {/* Editor */}
      <div className="editor-container flex-1">
        <MonacoEditor
          height="100%"
          language={language}
          theme={isDarkMode ? "vs-dark" : "vs-light"}
          value={code}
          onChange={(newCode) => setCode(newCode)}
          options={{
            selectOnLineNumbers: true,
            minimap: { enabled: false },
            fontSize: fontSize,
            lineNumbers: showLineNumbers ? "on" : "off",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            cursorStyle: "line",
            automaticLayout: true,
            smoothScrolling: true,
            mouseWheelZoom: true,
            renderWhitespace: "selection",
            renderLineHighlight: "all",
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              useShadows: false,
            },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
