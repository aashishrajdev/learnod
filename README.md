# Learnod - Interactive Learning Platform

Learnod is an interactive learning platform that combines video tutorials with hands-on coding practice. It features a built-in code editor and video player, allowing users to learn programming concepts while practicing them in real-time.

## Features

- 🎥 Integrated YouTube Video Player
- 💻 Built-in Code Editor with Syntax Highlighting
- 🌓 Dark/Light Mode
- 🔄 Real-time Code Execution
- 📱 Responsive Design
- 🎨 Beautiful UI with Tailwind CSS

## Supported Languages

- HTML
- JavaScript
- Python
- JSON

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Python (for Python code execution)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/learnod.git
cd learnod
```

2. Install dependencies:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Start the development servers:

```bash
# Start the frontend (from root directory)
npm start

# Start the backend (from server directory)
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
learnod/
├── public/             # Static files
├── src/               # Frontend source code
│   ├── components/    # React components
│   ├── services/      # API services
│   └── styles/        # CSS styles
├── server/            # Backend server
│   ├── routes/        # API routes
│   └── services/      # Code execution services
└── package.json       # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
