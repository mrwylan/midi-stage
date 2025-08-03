# Project: MIDI Router Web Application

## Overview

A browser-based application for musicians to configure and manage their MIDI equipment for both studio and live stage setups. The application will provide a visual interface for routing MIDI signals between devices, filtering messages, and creating complex MIDI processing chains.

## Core Features

*   **Visual Routing Interface:** A drag-and-drop interface to connect MIDI inputs and outputs of various devices.
*   **Device Management:** Add, remove, and configure MIDI devices connected to the system. The application will use the Web MIDI API to detect and interact with connected hardware.
*   **MIDI Message Filtering:** Allow users to filter MIDI messages based on type (Note On/Off, CC, Program Change, etc.) and channel.
*   **MIDI Message Mapping:** Remap MIDI messages from one type to another (e.g., a CC message to a Program Change).
*   **Preset Management:** Save and load different routing configurations as presets for different studio or stage scenarios.
*   **Real-time Monitoring:** A real-time log of MIDI messages flowing through the system for debugging and monitoring.

## Technical Specifications

*   **Platform:** Web Browser
*   **Language:** TypeScript
*   **Key APIs:** Web MIDI API for device communication.
*   **MIDI Support:** General MIDI (GM) message format.
*   **Framework (Potential):** React or Svelte for the UI, providing a reactive and component-based structure.
*   **Runtime Environment:** The application logic will be compiled to WebAssembly (Wasm) to ensure high performance and cross-platform consistency.
*   **Offline Capability:** The application must be fully functional offline, packaged as a Progressive Web App (PWA) or using Service Workers to cache all necessary assets.
*   **Deliverable:** The final product will be delivered as a containerized web server (e.g., using Docker) that serves the static WebAssembly application bundle. This ensures easy and consistent deployment for end-users.
*   **Build Pipeline:** The project will use GitHub Actions to automatically build, test, and package the application.
*   **Containerization:** The final deliverable will be a multi-architecture Docker image, supporting both `amd64` (standard PCs) and `arm64` (e.g., Raspberry Pi, Apple Silicon) platforms.
