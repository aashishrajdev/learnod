import { languages } from "../constants/languages";

const API_BASE_URL = "http://localhost:5000";

// Helper function to handle network errors
const handleNetworkError = (error: unknown): string => {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return "Network Error: Could not connect to the server. Please make sure the server is running on port 5000.";
  }
  return `Error: ${error instanceof Error ? error.message : String(error)}`;
};

export class CodeExecutionService {
  private static instance: CodeExecutionService;

  private constructor() {}

  public static getInstance(): CodeExecutionService {
    if (!CodeExecutionService.instance) {
      CodeExecutionService.instance = new CodeExecutionService();
    }
    return CodeExecutionService.instance;
  }

  public async executeCode(code: string, language: string): Promise<string> {
    try {
      switch (language.toLowerCase()) {
        case "javascript":
          return this.executeJavaScript(code);
        case "typescript":
          return this.executeTypeScript(code);
        case "python":
          return this.executePython(code);
        case "html":
          return this.executeHTML(code);
        case "json":
          return this.executeJSON(code);
        default:
          return `Unsupported language: ${language}`;
      }
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  private async executeTypeScript(code: string): Promise<string> {
    try {
      // Remove TypeScript-specific syntax and type annotations
      const jsCode = code
        .replace(/:\s*\w+/g, "") // Remove type annotations
        .replace(/interface\s+\w+\s*{[\s\S]*?}/g, "") // Remove interfaces
        .replace(/type\s+\w+\s*=.*?;/g, "") // Remove type aliases
        .replace(/export\s+/g, "") // Remove exports
        .replace(/import\s+.*?from\s+['"].*?['"];?/g, ""); // Remove imports

      return this.executeJavaScript(jsCode);
    } catch (error) {
      return `TypeScript Error: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }

  private async executeJavaScript(code: string): Promise<string> {
    try {
      const safeEval = new Function(`
        const console = {
          log: (...args) => {
            window.output += args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') + '\\n';
          },
          error: (...args) => {
            window.output += 'Error: ' + args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') + '\\n';
          }
        };
        
        try {
          window.output = '';
          const result = eval(arguments[0]);
          if (result !== undefined) {
            console.log(result);
          }
          return window.output || 'Code executed successfully';
        } catch (e) {
          return 'Error: ' + e.toString();
        }
      `);

      return safeEval(code);
    } catch (error) {
      return `JavaScript Error: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }

  private async executePython(code: string): Promise<string> {
    try {
      console.log("Sending Python code to server:", code);

      const response = await fetch(`${API_BASE_URL}/execute/python`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        return `Python Error: Server responded with status ${response.status}: ${errorText}`;
      }

      const data = await response.json();
      if (data.error) {
        console.error("Python execution error:", data.error);
        return `Python Error: ${data.error}`;
      }

      console.log("Python execution successful:", data.output);
      return data.output;
    } catch (error) {
      console.error("Error executing Python code:", error);
      return handleNetworkError(error);
    }
  }

  private async executeHTML(code: string): Promise<string> {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, "text/html");
      return doc.body.innerHTML;
    } catch (error) {
      return `HTML Error: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }

  private async executeJSON(code: string): Promise<string> {
    try {
      const parsed = JSON.parse(code);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      return `JSON Error: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }
}
