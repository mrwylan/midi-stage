# UI/UX Guidelines for the MIDI Router

This document provides design principles and guidelines to create a user experience that is intuitive, efficient, and reliable for musicians, especially in high-pressure live performance settings.

## Core Principles

1.  **Clarity First:** The interface must be immediately understandable. A musician on a dark stage with seconds to spare cannot decipher a complex UI. Prioritize scannability over information density.
2.  **Performance-Proof:** The design must prevent accidental changes during a live performance. The user should feel confident interacting with the app on stage.
3.  **Speed is a Feature:** Common actions must be fast. Loading presets, making a quick routing change, or monitoring a signal should require minimal taps or clicks.

## On-Stage & Live Performance Considerations

*   **High-Contrast / Dark Mode is Mandatory:**
    *   The default theme should be a dark mode. Bright interfaces can be blinding in low-light environments and distracting to the audience.
    *   Text, active elements, and connection lines must have a high contrast ratio against the background. Use off-white or light gray for text instead of pure white to reduce eye strain.

*   **Introduce a "Performance Mode":**
    *   This is a critical feature. When enabled, this mode should lock the workspace, disabling all editing capabilities like dragging nodes, deleting connections, or opening settings.
    *   A large, clear, and deliberate control should be used to toggle between "Edit Mode" and "Performance Mode". This prevents accidental changes mid-show.

*   **Touch-First Design:**
    *   Assume the app will be used on a tablet or touchscreen laptop.
    *   All interactive elements (buttons, ports, toggles) must be large enough to be accurately tapped with a finger.
    *   Ensure there is enough space between interactive elements to avoid mis-taps.

## Interface & Interaction Guidelines

*   **Visual Feedback is Non-Negotiable:**
    *   **MIDI Activity:** Provide a subtle but clear visual indicator (e.g., a small flashing light on the device node or connection cable) when MIDI data is flowing. This is essential for troubleshooting.
    *   **State Changes:** Any user action (e.g., connecting a cable, loading a preset, changing a filter) must result in immediate and obvious visual feedback.
    *   **Unsaved Changes:** Clearly indicate when the current configuration has unsaved changes (e.g., an asterisk next to the preset name).

*   **Layout & Readability:**
    *   **Font:** Use a clean, sans-serif font like Inter, Lato, or Roboto. It must be legible from a distance.
    *   **Hierarchy:** Use font size and weight to create a clear visual hierarchy. The most important information should be the most prominent.
    *   **Responsive Design:** The layout must be fluid and usable on a variety of screen sizes, from a 12" tablet to a 27" studio monitor.

*   **Color Palette:**
    *   Use color purposefully and consistently. Don't use it just for decoration.
    *   **Suggestion:**
        *   Use one color for inputs (e.g., blue) and another for outputs (e.g., green) across the application.
        *   Use a warning color (e.g., orange or red) for destructive actions or for MIDI feedback/error states.
        *   Keep the overall palette limited to avoid a cluttered or distracting look.

*   **Minimize Cognitive Load:**
    *   **Progressive Disclosure:** Don't show all options at once. Keep the main view clean. Show advanced settings (like MIDI filtering or mapping) in a modal or a side panel that can be opened when needed.
    *   **Clear Language:** Use simple, direct language that musicians will understand. Avoid technical jargon where possible. (e.g., "Block Messages" is better than "Filter Events").

*   **Error Prevention:**
    *   Make it impossible to make invalid connections (e.g., input to input).
    *   Use confirmation dialogs for destructive actions like deleting a device or overwriting a preset. The confirmation should clearly state what will happen.
