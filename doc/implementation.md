# Implementation Plan: MIDI Router Web Application

This document outlines the technical tasks required to implement the MIDI Router application, broken down by feature.

### 1. Project Setup & Foundation
1.  **Initialize Project:** Set up a new project using Vite with the React + TypeScript template.
2.  **Install Dependencies:** Add necessary libraries for state management (e.g., Zustand or Redux Toolkit) and UI components (e.g., a component library like MUI or React-Bootstrap).
3.  **Project Structure:** Organize the codebase with folders for components, services, hooks, and styles.
4.  **Linter/Formatter:** Configure ESLint and Prettier for code quality and consistency.

### 2. Core MIDI Integration
1.  **MIDI Service:** Create a `MidiService.ts` to encapsulate all interactions with the Web MIDI API.
2.  **Device Detection:** Implement a function within the service to request MIDI access and retrieve a list of available input and output devices.
3.  **State Management:** Store the list of connected devices in a global state management solution.
4.  **Message Handling:** Create listeners for incoming MIDI messages and a function to send outgoing MIDI messages.

### 3. UI: Device Management
1.  **Device List Component:** Create a React component to display the list of available MIDI inputs and outputs.
2.  **Device Representation:** Create a data model for a "Device" in the application, including its ID, name, and a user-defined alias.
3.  **Add/Remove Devices:** Implement UI for users to "add" a detected MIDI device to the workspace, making it available for routing.

### 4. UI: Visual Routing Canvas
1.  **Canvas Component:** Create a main component to serve as the visual workspace.
2.  **Draggable Device Nodes:** Implement a `DeviceNode` component that can be dragged and dropped onto the canvas.
3.  **Input/Output Ports:** Each `DeviceNode` should have visual ports representing its MIDI inputs and outputs.
4.  **Connection Logic:** Implement the ability to draw a line (a "cable") between an output port of one node and an input port of another.
5.  **State for Connections:** Store the connections (e.g., `sourceDeviceId`, `targetDeviceId`) in the global state.

### 5. MIDI Processing Engine
1.  **Routing Logic:** Create a core processing function that listens for MIDI events from "added" devices. When a message is received, it should check the connection state and forward the message to all connected target devices.
2.  **Filter Implementation:** For each connection, allow the user to configure filters (e.g., "block all CC messages on channel 5"). Implement this filtering logic within the core processing function.
3.  **Mapping Implementation:** For each connection, allow the user to define mappings (e.g., "change Note On on channel 1 to Note On on channel 2"). Implement this mapping logic.
4.  **UI for Filters/Mappings:** Create a modal or sidebar form that appears when a user clicks on a connection "cable", allowing them to configure these settings.

### 6. Preset Management
1.  **State Serialization:** Create a function to serialize the entire application state (added devices, their positions on the canvas, connections, filters, mappings) into a JSON object.
2.  **State Deserialization:** Create a function to parse a JSON object and restore the application state from it.
3.  **Save/Load UI:** Implement buttons to allow users to save the current state as a `.json` file and to load a state from a `.json` file.
4.  **Local Storage (Optional):** Implement a feature to save multiple presets by name into the browser's local storage.

### 7. Real-time Monitoring
1.  **Logging Service:** Create a service that can be called from the MIDI processing engine to log events.
2.  **Log Component:** Create a UI component that displays the logged messages in a scrollable, formatted view.
3.  **Log Filtering:** Add UI controls to the log component to filter messages by device, message type, or channel.

### 8. Finalization & Deployment
1.  **Build Script:** Configure the `package.json` with a script to build the application for production.
2.  **README:** Write a comprehensive `README.md` explaining the project and how to run it.
3.  **CI/CD Pipeline:** Set up a GitHub Actions workflow to build and test the application on every push. The workflow should also be configured to build and push a multi-architecture Docker image (for `amd64` and `arm64`) when a new tag is pushed.
4.  **Deployment:** Deploy the application to a static web host like Netlify or Vercel.
