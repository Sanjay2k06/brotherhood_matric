# Running the Brotherhood Legacy Hub Project

Below are the commands to run, build, and manage the application.

## Prerequisites
Make sure you have Node.js installed on your system. Since the project contains lockfiles, you can use `npm` to install dependencies and run commands.

## Getting Started

### 1. Install Dependencies
Run this command in the project root to install all required dependencies:
```bash
npm install
```

### 2. Run the Development Server
To launch the application locally with hot-reloading:
```bash
npm run dev
```
By default, the server will start and provide a local address (usually `http://localhost:5173`) to view the application in your browser.

### 3. Build for Production
To compile and build a production-ready version of the application:
```bash
npm run build
```

### 4. Preview the Production Build
To preview the built production site locally:
```bash
npm run preview
```

### 5. Linting and Formatting
- To lint the codebase:
  ```bash
  npm run lint
  ```
- To auto-format the files using Prettier:
  ```bash
  npm run format
  ```
