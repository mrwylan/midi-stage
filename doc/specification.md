# User Stories

As a musician, the application should provide me with different perspectives tailored to specific tasks.

---

## 1. Setup Perspective: Defining My Gear

This perspective is focused on defining the properties of my MIDI instruments and devices before I start routing them.

*   **Device Library:**
    *   I want to create a library of my personal MIDI devices so I can reuse them across different projects.
    *   I want to be able to add a new MIDI device to the application so that I can incorporate it into my routing.
    *   I want to be able to give custom names and colors to my MIDI devices so that I can easily identify them.

*   **CC Mapping:**
    *   For each device in my library, I want to define a list of important MIDI CC messages so I don't have to remember the numbers.
    *   I want to assign meaningful labels to these CC numbers (e.g., "Filter Cutoff" for CC 74, "Reverb Mix" for CC 91).

---

## 2. Studio Perspective: Designing the Signal Flow

This perspective is the main workspace for visually creating and configuring my MIDI setup.

*   **Device Management:**
    *   I want to see a list of all my connected MIDI devices so that I can get an overview of my setup.
    *   I want to add devices from my library to the main routing canvas.

*   **Visual Routing:**
    *   I want to see a visual representation of my MIDI devices and their connections so that I can understand the signal flow.
    *   I want to connect the MIDI output of one device to the MIDI input of another device by dragging a line between them.
    *   I want to be able to disconnect a MIDI routing by deleting the connection line.

*   **MIDI Filtering and Mapping:**
    *   On any connection, I want to be able to filter out specific MIDI message types (e.g., Note On/Off, CC) on a specific channel so that I can control what data is sent.
    *   On any connection, I want to be able to remap a MIDI message from one type to another (e.g., a CC message to a Program Change) so that I can create custom control setups.

*   **Preset Management:**
    *   I want to be able to save my entire routing configuration (devices, connections, filters) as a preset so that I can recall it later.
    *   I want to be able to load a previously saved preset so that I can quickly switch between different setups.

---

## 3. Stage Perspective: Live Performance Control

This perspective provides a simplified, touch-friendly interface for interacting with a setup during a live performance. It prioritizes control and stability over editing.

*   **Performance View:**
    *   I want a simplified "Stage" view that hides the complex routing canvas so I can perform without distractions.
    *   I want to be able to quickly load my saved presets from a large, easy-to-read list.

*   **Custom Control Surfaces:**
    *   I want to create custom control panels for each preset.
    *   I want to add large, touch-friendly buttons and sliders to my control panel.

*   **Interactive Controls:**
    *   I want to link a slider on my control panel to a specific named CC message (defined in the Setup perspective) for a target device.
    *   I want to link a button on my control panel to send a specific Program Change, Note On/Off, or other MIDI message.

*   **Real-time Monitoring:**
    *   I want to be able to see a real-time log of all MIDI messages flowing through the system so that I can debug my setup.
    *   I want to be able to filter the MIDI log to only show messages from specific devices or channels so that I can focus on what's important.