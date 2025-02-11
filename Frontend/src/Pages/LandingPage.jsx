import React, { useContext, useState, useEffect } from "react";
import Header from "../Components/Header";
import Login from "../Components/Login";
import Register from "../Components/Register";
import { ModalContext } from "../Store/Context";
import { Link } from "react-router-dom";
import backgroundImage from "../../public/img2.jpg"; // Adjust the path

function LandingPage() {
  const { auth } = useContext(ModalContext);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center top", // ✅ Moves the image down slightly
      }}
    >
      {/* ✅ Header Overlayed on Background */}
      <Header />

      {/* ✅ Hero Section */}
      <div className="relative z-10 flex-grow flex flex-col items-center mb-30 justify-center text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl text-white font-extrabold mb-4 drop-shadow-lg">
          <span className="text-amber-700">We</span>lco
          <span className="text-amber-700">m</span>e to Bl
          <span className="text-amber-700">og</span>Mani
          <span className="text-amber-700">a</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-200 max-w-2xl drop-shadow-lg">
          Your go-to platform for insightful articles. Discover, learn, and
          share!
        </p>
        <Link
          to="/articles"
          className="bg-gray-500 text-white font-semibold px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300"
        >
          Explore Articles
        </Link>
      </div>

      <div className="relative z-10 absolute bottom-10">
        {auth === "login" ? <Login /> : <Register />}
      </div>

      <footer className="relative z-10 bg-black text-white p-4 text-center mt-auto w-full">
        <p>&copy; {new Date().getFullYear()} BlogMania. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
