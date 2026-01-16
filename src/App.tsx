import { APIProvider } from "@vis.gl/react-google-maps";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import HomePage from "./pages/Home";
import PrototypePage from "./pages/PrototypePage";

function App() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/prototype" element={<PrototypePage />} />
        </Routes>
      </Router>
    </APIProvider>
  );
}

export default App;
