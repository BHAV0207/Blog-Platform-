import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import { ModalContext } from "./Store/Context";
import { useContext } from "react";
import FeaturedArticles from "./Pages/FeaturedArticles";
import AboutPage from "./Pages/AboutPage"; // ✅ Import About Page

function App() {
  const { loginData } = useContext(ModalContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={<ProtectedRoutes user={loginData} element={<HomePage />} />}
        />
        <Route path="/articles" element={<FeaturedArticles />} />
        <Route path="/about" element={<AboutPage />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
