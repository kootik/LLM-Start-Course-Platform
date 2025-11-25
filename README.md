# LLM Start - Educational Platform

A comprehensive educational platform for the "LLM Start" course, designed to teach Large Language Model fundamentals, architecture, and practical applications. This Single Page Application (SPA) features interactive lectures, hands-on practice labs, and a resource library.

## 🚀 Features

*   **Interactive Lectures**: Immersive slide decks with AI voiceover scripts and visual diagrams.
*   **Practice Labs**: Step-by-step guides for tools like n8n and Vector DBs.
*   **Workflow Builder**: Visualizer for n8n workflows and logic.
*   **Interactive Demos**: Real-time visualizations of concepts (Temperature, Tokenization, RAG).
*   **Resource Library**: centralized access to markdown docs, diagrams, and code snippets.
*   **File Viewer**: Built-in viewer for Markdown, Code, Images, and Video content.
*   **Progress Tracking**: LocalStorage-based tracking for lecture and assignment completion.

## 🛠 Tech Stack

*   **Framework**: React 19
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Charts**: Recharts
*   **Language**: TypeScript

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/llm-start-platform.git
    cd llm-start-platform
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

*   `src/components`: React components for sections, UI elements, and interactive lectures.
*   `src/constants.ts`: Static data for lectures, assignments, and resources.
*   `src/types.ts`: TypeScript definitions.
*   `public/`: Static assets (images, videos, markdown files).

## 🚢 Deployment

This project is configured to be deployed on GitHub Pages.

1.  Ensure your assets (`video-1`, `all_diagrams`, etc.) are in the `public` folder.
2.  The `main.yml` workflow automates the build and deploy process.
3.  Paths are configured to be relative to support subpath deployment.

## 📄 License

MIT
