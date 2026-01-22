import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/App.css";

// Find the root element in the HTML file (e.g., <div id="root"></div>)
const rootElement = document.getElementById("root");

// Create a root and render the application
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
