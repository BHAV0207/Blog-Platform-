import React, { useContext, useEffect } from "react";
import { ModalContext } from "../Store/Context";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const {
    isOpen,
    modalTrigger,
    axiosLogin,
    email,
    password,
    setEmail,
    setPassword,
    success,
    err,
  } = useContext(ModalContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await axiosLogin();
  };

  useEffect(() => {
    if (success) navigate("/home");
  }, [success]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      onClick={modalTrigger}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={modalTrigger}
        >
          &times;
        </button>

        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
        {err && <p className="text-red-600 text-sm mb-2">{err}</p>}

        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={password}
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
              required
              onChange={(e) => setPassword(e.target.value)}
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
