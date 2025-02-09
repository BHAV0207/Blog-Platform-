import React, { useContext, useEffect } from "react";
import { ModalContext } from "../Store/Context";

function Register() {
  const {
    isOpen,
    modalTrigger,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    axiosRequest,
    err,
    success,
  } = useContext(ModalContext);

  const handleForm = async (e) => {
    e.preventDefault();
    await axiosRequest();
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        modalTrigger();
      }, 1000);
    }
  }, [success]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
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

        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <form className="space-y-4" onSubmit={handleForm}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-gray-300 hover:text-emerald-500 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
