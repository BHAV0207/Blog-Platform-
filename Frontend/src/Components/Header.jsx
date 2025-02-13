import React, { useContext, useState, useEffect } from "react";
import { ModalContext } from "../Store/Context";
import { UserContext } from "../Store/UserContext"; // ✅ Import User Context for Logout
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

function Header({ scrollToHome }) {
  const { setAuth, loginTrigger, registerTrigger } = useContext(ModalContext);
  const { user, HandleLogout } = useContext(UserContext); // ✅ Get user and logout function
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    loginTrigger();
    setAuth("login");
    setMenuOpen(false);
  };

  const handleRegister = () => {
    registerTrigger();
    setAuth("register");
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await HandleLogout();
    setMenuOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50 transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-80 shadow-lg" : "bg-transparent"
      }`}
    >
      {/* ✅ Logo Click Scrolls Back to Home */}
      <button onClick={scrollToHome} className="focus:outline-none">
        <h1
          className={`text-3xl font-extrabold drop-shadow-lg cursor-pointer ${
            isScrolled ? "text-white" : "text-gray-600"
          }`}
        >
          BlogMania
        </h1>
      </button>

      {/* ✅ Mobile Hamburger Menu */}
      <button
        className={`md:hidden text-2xl ${isScrolled ? "text-white" : "text-black"}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* ✅ Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {["Home", "About"].map((text, index) => (
          <Link
            key={index}
            to={`/${text.toLowerCase()}`}
            className="relative font-bold text-gray-200 transition-colors duration-300 ease-in-out hover:text-emerald-400"
          >
            {text}
          </Link>
        ))}

        {user ? (
          <button
            onClick={handleLogout}
            className="font-bold text-white transition-colors duration-300 hover:text-red-500"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="font-bold text-white transition-colors duration-300 hover:text-amber-400"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="font-bold text-white transition-colors duration-300 hover:text-amber-400"
            >
              Sign-Up
            </button>
          </>
        )}
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white/20 backdrop-blur-lg shadow-lg border border-gray-300 rounded-lg flex flex-col items-center py-4 space-y-4 md:hidden transition-all duration-300 ease-in-out">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center py-2 text-white font-semibold border-b border-gray-300 hover:bg-gray-100/20"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center py-2 text-white font-semibold border-b border-gray-300 hover:bg-gray-100/20"
          >
            About
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-center py-2 text-white font-semibold border-b border-gray-300 hover:bg-red-500 transition-all duration-300"
            >
              <FiLogOut className="inline-block mr-2" /> Logout
            </button>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="w-full text-center py-2 text-white font-semibold border-b border-gray-300 hover:bg-gray-100/20"
              >
                Login
              </button>

              <button
                onClick={handleRegister}
                className="w-full text-center py-2 text-white font-semibold border-b border-gray-300 hover:bg-gray-100/20"
              >
                Sign-Up
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
