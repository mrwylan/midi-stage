# MIDI Router Web Application

## Project Overview
A browser-based MIDI routing and management application for musicians, built with React/TypeScript and Web MIDI API. The application provides three distinct perspectives for a complete workflow from setup to live performance.

## Technology Stack
- **Frontend:** React with Vite and TypeScript
- **State Management:** Zustand
- **UI Components:** MUI (Material-UI)
- **Styling:** Emotion
- **Visual Routing:** React Flow
- **MIDI Communication:** Web MIDI API
- **Build & CI/CD:** GitHub Actions
- **Deployment:** Docker (multi-architecture: amd64/arm64)

## Project Structure
```
midi-router-web/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # Core services (MidiService, etc.)
│   ├── state/          # Zustand stores
│   └── views/          # Main application views
├── doc/                # Project documentation
└── package.json
```

## Core Application Views

### 1. Setup View
- **Purpose:** Define and manage MIDI device library and CC mappings
- **Key Components:** `DeviceLibraryList`, `AddDeviceForm`
- **State:** Device library with custom names, colors, and CC label mappings

### 2. Studio View  
- **Purpose:** Visual MIDI routing and signal processing design
- **Key Components:** `RoutingCanvas`, Properties Editor
- **Features:** Node-based routing, filtering, message mapping, preset management

### 3. Stage View
- **Purpose:** Simplified live performance interface
- **Key Components:** Custom control surfaces, preset browser
- **Features:** Touch-friendly controls, performance mode (no editing)

## Development Commands

### Installation & Setup
```bash
cd midi-router-web
npm install
```

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

## Key Services & Architecture

### MidiService (`src/services/MidiService.ts`)
Handles all Web MIDI API interactions including device detection, message routing, and real-time communication.

### State Management (Zustand Stores)
- `deviceLibraryStore.ts` - Device definitions and CC mappings
- `deviceStore.ts` - Connected MIDI devices  
- `midiStore.ts` - MIDI routing and monitoring
- `studioStore.ts` - Studio view state and configurations

### Core Hooks
- `useMidi.ts` - MIDI device detection and communication
- `useDeviceLibrary.ts` - Device library management
- `useStudio.ts` - Studio routing and preset management

## UI/UX Guidelines
- **Dark Mode Default:** High-contrast theme for live performance environments
- **Touch-First Design:** Large, touch-friendly controls for stage use
- **Performance Mode:** Stage view disables all editing capabilities
- **Visual Feedback:** Real-time MIDI activity indicators
- **Progressive Disclosure:** Advanced settings in modals/sidebars

## Development Workflow
1. All changes should maintain the three-perspective architecture
2. Follow existing component patterns and naming conventions
3. Ensure responsive design for tablet and desktop use
4. Test MIDI functionality with actual hardware when possible
5. Maintain offline PWA capabilities

## Performance Considerations
- Application compiled to WebAssembly for cross-platform performance
- Offline-first design with Service Worker caching
- Real-time MIDI processing with minimal latency
- Optimized for both studio and live performance environments

## Deployment
The application is containerized using Docker with multi-architecture support and deployed via GitHub Actions CI/CD pipeline.