import React, { useContext, useState } from "react";
import { ModalContext } from "../Store/Context";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const { modalTrigger, setAuth } = useContext(ModalContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    modalTrigger();
    setAuth("login");
    setMenuOpen(false);
  };

  const handleRegister = () => {
    modalTrigger();
    setAuth("register");
    setMenuOpen(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full text-white p-4 flex justify-between items-center z-50 bg-transparent">
      {/* ✅ Brand Name */}
      <Link to={"/"}>
        <h1 className="text-3xl font-extrabold drop-shadow-lg">BlogMania</h1>
      </Link>

      {/* ✅ Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
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
            className="relative font-semibold transition-colors duration-300 ease-in-out hover:text-emerald-400"
          >
            {text}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 ease-in-out hover:w-full"></span>
          </Link>
        ))}

        {/* ✅ Login & Sign-Up Buttons */}
        <button
          onClick={handleLogin}
          className="font-bold transition-colors duration-300 hover:text-amber-400"
        >
          Login
        </button>
        <button
          onClick={handleRegister}
          className="font-bold transition-colors duration-300 hover:text-amber-400"
        >
          Sign-Up
        </button>
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
        </div>
      )}
    </div>
  );
}

export default Header;
