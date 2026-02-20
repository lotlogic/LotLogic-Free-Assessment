import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import Header from "./components/layouts/Header";

function App() {
  return (
    // <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <Router>
      <Header />
      <AnimatedRoutes />
    </Router>
    // </APIProvider>
  );
}

export default App;
