import React, { useContext } from "react";
import { ModalContext } from "../Store/Context";
import { Link } from "react-router-dom";

function Header() {
  const { modalTrigger, setAuth } = useContext(ModalContext);

  const handleLogin = () => {
    modalTrigger();
    setAuth("login");
  };

  const handleRegister = () => {
    modalTrigger();
    setAuth("register");
  };

  return (
    <div className="bg-cream-100 text-gray-800 p-4 flex justify-between items-center shadow-md border-b-2 border-gray-300">
      <Link to={"/"}>
        <h1 className="text-3xl font-extrabold">BlogMania</h1>
      </Link>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-3xl shadow-md hover:bg-white hover:text-emerald-500 transition-all duration-300 ease-in-out opacity"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-3xl shadow-md hover:bg-white hover:text-emerald-500 transition-all duration-300 ease-in-out opacity"
          onClick={handleRegister}
        >
          Sign-Up
        </button>
      </div>
    </div>
  );
}

export default Header;
