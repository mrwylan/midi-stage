# Project: MIDI Router Web Application

## Overview

A browser-based application for musicians to configure and manage their MIDI equipment for both studio and live stage setups. The application will provide a visual interface for routing MIDI signals between devices, filtering messages, and creating complex MIDI processing chains.

## Core Features

The application is designed around three distinct perspectives for a seamless workflow from preparation to performance:

*   **Setup Perspective:** Define a personal library of MIDI devices and map human-readable names to MIDI CC messages (e.g., "Filter Cutoff" -> CC 74).
*   **Studio Perspective:** A visual, node-based interface for routing MIDI, applying filters, and transforming messages. This is the core environment for designing complex interactions.
*   **Stage Perspective:** A simplified, touch-friendly view for live performance. It provides large, customizable buttons and sliders to interact with presets and send MIDI commands without the risk of accidental edits.
*   **Preset Management:** Save and load complete configurations, including device setups, routings, and custom stage controls.
*   **Real-time Monitoring:** A detailed log of MIDI messages for debugging and analysis.

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
