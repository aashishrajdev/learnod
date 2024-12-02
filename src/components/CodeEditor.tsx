import React from "react";
import MonacoEditor from "react-monaco-editor";

interface CodeEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
  return (
    <div className="h-full bg-gray-800 rounded shadow-lg p-2">
      <MonacoEditor
        height="400"
        language="javascript" // You can change this to other languages
        theme="vs-dark"
        value={code}
        onChange={(newCode) => setCode(newCode)} // Update the state on code change
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
