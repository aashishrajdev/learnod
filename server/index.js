const express = require("express");
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes with more detailed options
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error: " + err.message });
});

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Helper function to write code to a file
const writeCodeToFile = (code, extension) => {
  const fileName = `temp_${Date.now()}${extension}`;
  const filePath = path.join(tempDir, fileName);
  fs.writeFileSync(filePath, code);
  return filePath;
};

// Helper function to clean up temp files
const cleanup = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Execute Python code with improved error handling
app.post("/execute/python", async (req, res) => {
  console.log("Received Python execution request");

  try {
    const { code } = req.body;
    if (!code) {
      throw new Error("No code provided");
    }

    console.log("Writing Python code to temp file...");
    const filePath = writeCodeToFile(code, ".py");
    console.log("Temp file created:", filePath);

    console.log("Spawning Python process...");
    const pythonProcess = spawn("python", [filePath]);
    let output = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      const chunk = data.toString();
      console.log("Python output:", chunk);
      output += chunk;
    });

    pythonProcess.stderr.on("data", (data) => {
      const chunk = data.toString();
      console.error("Python error:", chunk);
      error += chunk;
    });

    pythonProcess.on("error", (err) => {
      console.error("Failed to start Python process:", err);
      cleanup(filePath);
      res.status(500).json({ error: `Failed to start Python: ${err.message}` });
    });

    pythonProcess.on("close", (code) => {
      console.log("Python process closed with code:", code);
      cleanup(filePath);
      if (code !== 0) {
        res.json({
          error: error || "Python execution failed with code " + code,
        });
      } else {
        res.json({ output });
      }
    });
  } catch (err) {
    console.error("Error in Python execution endpoint:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Temp directory: ${tempDir}`);
});
