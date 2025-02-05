import React, { useContext } from "react";
import { ModalContext } from "../Store/Context";

function Login() {
  const { isOpen, modalTrigger } = useContext(ModalContext);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      onClick={modalTrigger}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80 relative"
        onClick={(e) => e.stopPropagation()} 
      >
          <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={modalTrigger}
        >
          &times;
        </button>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
