# Project: MIDI Router Web Application

## Project Overview

This is a browser-based application for musicians to configure and manage MIDI equipment. It uses the Web MIDI API to provide a visual, node-based interface for routing, filtering, and transforming MIDI signals. The application is designed with a three-perspective workflow:

1.  **Setup:** A library for defining MIDI devices and their custom CC message maps.
2.  **Studio:** A visual, drag-and-drop canvas (using React Flow) for creating and configuring MIDI routings.
3.  **Stage:** A simplified, touch-friendly view with custom buttons and sliders for live performance.

The final deliverable will be a multi-architecture Docker container (amd64/arm64) built via a GitHub Actions CI/CD pipeline.

## Building and Running

While the project is not yet implemented, the development plan specifies the following structure and commands.

1.  **Installation:**
    ```bash
    # TODO: After initialization, run npm install
    npm install
    ```

2.  **Running the Development Server:**
    ```bash
    # TODO: This command will be available from package.json
    npm run dev
    ```

3.  **Building for Production:**
    ```bash
    # TODO: This command will be available from package.json
    npm run build
    ```

4.  **Running Tests:**
    ```bash
    # TODO: This command will be available from package.json
    npm run test
    ```

## Development Conventions

*   **Language:** TypeScript
*   **Frontend Framework:** React with Vite
*   **State Management:** Zustand
*   **UI Components:** MUI (Material-UI) with Emotion for styling
*   **Visual Routing:** React Flow
*   **Code Style:** ESLint and Prettier will be used for linting and formatting.
*   **Project Structure:** The codebase will be organized into `components`, `services`, `hooks`, `state`, and `views`.
*   **Git Branching:** The `development` branch is used for all implementation work.
