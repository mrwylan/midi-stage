# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

---

## Running and Debugging Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- A modern web browser that supports the Web MIDI API (e.g., Chrome, Edge, Opera)

### 1. Installation
Navigate to the project directory and install the necessary dependencies.
```bash
cd midi-router-web
npm install
```

### 2. Running the Application
Once the installation is complete, you can start the local development server.
```bash
npm run dev
```
The application will be running at **http://localhost:5173**. Open this URL in your web browser.

### 3. Debugging
You can debug the application using your browser's built-in developer tools.

- **Component Inspection:** Use the "Elements" tab to inspect the DOM and the "Components" tab (if you have the React Developer Tools extension installed) to inspect component state and props.
- **Console Logs:** View application logs and errors in the "Console" tab.
- **Breakpoints:** Use the "Sources" tab to set breakpoints in the TypeScript code, inspect variables, and step through the execution.
- **MIDI:** To debug MIDI interactions, ensure your browser has permission to access MIDI devices. You can monitor the `MidiService` and the data in the `midiStore` using the React Dev Tools.