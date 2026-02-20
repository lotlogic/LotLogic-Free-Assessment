import { APIProvider } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/layouts/Header";
import AssessmentPage from "./pages/AssessmentPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivacyPage from "./pages/PrivacyPage";

function App() {
  useEffect(() => {
    document.body.classList.remove("preload");
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}
            {/* <Route path="/faq" element={<FaqPage />} /> */}
            <Route path="/privacy" element={<PrivacyPage />} />
            {/* The catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </APIProvider>
  );
}

export default App;
