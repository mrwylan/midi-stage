# Implementation Plan: MIDI Router Web Application

This document outlines the technical tasks required to implement the MIDI Router application, broken down by the core user perspectives.

### 1. Project Setup & Foundation
1.  **Initialize Project:** Set up a new project using Vite with the React + TypeScript template.
2.  **Install Dependencies:**
    *   `react`, `react-dom`
    *   `zustand` for state management.
    *   `@mui/material`, `@emotion/react`, `@emotion/styled` for UI components.
    *   `react-flow` for the routing canvas.
3.  **Project Structure:** Organize the codebase into folders for `components`, `services`, `hooks`, `state`, and `views` (for Setup, Studio, Stage).
4.  **Linter/Formatter:** Configure ESLint and Prettier.
5.  **Core MIDI Service:** Create a `MidiService.ts` to encapsulate all Web MIDI API interactions (device detection, message handling).

### 2. The "Setup" Perspective
1.  **State:** Extend the Zustand store to manage a "Device Library," where each device has a name, color, and a map of CC numbers to string labels.
2.  **Device Library UI:** Create a component to list, add, and edit devices in the library.
3.  **CC Mapper UI:** For each device, create a UI to define and edit the named CC messages.

### 3. The "Studio" Perspective
1.  **State:** Model the state for the routing canvas, including nodes (instances of library devices), their positions, and the connections between them.
2.  **Routing Canvas UI:**
    *   Implement the main canvas using React Flow.
    *   Create a sidebar or panel to drag devices from the Device Library onto the canvas.
    *   Customize nodes to display device names and I/O ports.
3.  **Connection & Properties UI:**
    *   Implement the logic for connecting output ports to input ports.
    *   Create a modal or sidebar to edit the properties of a connection (e.g., channel filtering, message mapping).
4.  **Routing Engine:** Implement the core logic that listens to MIDI input and forwards it according to the connections and their defined properties.

### 4. The "Stage" Perspective
1.  **State:** Design the state for custom control surfaces, including a list of pages, and for each page, a grid of controls (buttons, sliders) with their associated MIDI actions.
2.  **Control Surface UI:**
    *   Create a view that displays the configured buttons and sliders for the active preset.
    *   Ensure controls are large and touch-friendly, as per the UI/UX guidelines.
3.  **Control Interaction:**
    *   Implement logic for sliders to send corresponding CC messages.
    *   Implement logic for buttons to send configured messages (Program Change, Note On/Off, etc.).
4.  **"Performance Mode":** The Stage perspective should inherently be a "performance mode," with no access to the underlying routing or device library.

### 5. Preset & System Management
1.  **State Serialization:** Create functions to serialize the entire relevant state (Device Library, Studio setup, Stage setup) into a single JSON object for presets.
2.  **Save/Load UI:** Implement UI to save the current state as a named preset and to load presets from a list.
3.  **Real-time Monitoring:** Create a MIDI log component that can be accessed from the Studio and Stage views for debugging.

### 6. Finalization & Deployment
1.  **Build Script:** Configure the `package.json` with a script to build the application for production.
2.  **README:** Write a comprehensive `README.md` explaining the project and how to run it.
3.  **CI/CD Pipeline:** Set up a GitHub Actions workflow to build, test, and push a multi-architecture Docker image (`amd64`/`arm64`) on new tags.
4.  **Deployment:** Deploy the application to a static web host like Netlify or Vercel.