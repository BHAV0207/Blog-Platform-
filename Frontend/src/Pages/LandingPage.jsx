import React, { useContext } from "react";
import Header from "../Components/Header";
import Login from "../Components/Login";
import Register from "../Components/Register";
import { ModalContext } from "../Store/Context";

function LandingPage() {
  const { auth } = useContext(ModalContext);

  return (
    <div className="bg-gray-100 w-screen h-screen">
      <Header />
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder for news posts */}
        <div className="bg-white p-4 rounded-lg shadow-md">Post 1</div>
        <div className="bg-white p-4 rounded-lg shadow-md">Post 2</div>
        <div className="bg-white p-4 rounded-lg shadow-md">Post 3</div>
      </div>
      {auth === "login" ? <Login /> : <Register />}
    </div>
  );
}

export default LandingPage;
