import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../Store/Context";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();

  const {
    loginTrigger,
    loginOpen,
    registerTrigger,
    axiosLogin,
    email,
    password,
    setEmail,
    setPassword,
    success,
    err,
  } = useContext(ModalContext);

  const [shakeError, setShakeError] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(3); // ✅ Countdown for redirect

  const handleLogin = async (e) => {
    e.preventDefault();
    await axiosLogin();

    // ✅ Shake animation when there's an error
    if (err) {
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
    }
  };

  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        navigate("/home");
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [success, navigate]);

  if (!loginOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-cream-100 bg-opacity-40 z-50 backdrop-blur-lg flex justify-center items-center"
      onClick={loginTrigger}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 relative ${
          shakeError ? "animate-shake" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✅ Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
          onClick={loginTrigger}
        >
          <FiX size={22} />
        </button>

        {/* ✅ Success & Error Messages */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-700 bg-emerald-200 p-3 rounded-md text-sm mb-2 text-center"
          >
            🎉 {success}! Redirecting in {redirectCountdown}...
          </motion.div>
        )}
        {err && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 bg-red-100 p-3 rounded-md text-sm mb-2 text-center"
          >
            ⚠️ {err}
          </motion.div>
        )}

        {/* ✅ Title */}
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Welcome Back!
        </h2>

        {/* ✅ Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* ✅ Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              type="email"
              className="w-full px-4 py-2 border rounded-lg bg-cream-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* ✅ Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={password}
              type="password"
              className="w-full px-4 py-2 border rounded-lg bg-cream-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* ✅ Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg shadow-lg hover:bg-emerald-700 transition-all duration-300"
          >
            Login
          </motion.button>

          {/* ✅ Register Link */}
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => registerTrigger()}
              className="text-emerald-500 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;