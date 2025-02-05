import React, { useContext } from "react";
import Header from "../Components/Header";
import Login from "../Components/Login";
import Register from "../Components/Register";
import { ModalContext } from "../Store/Context";

function LandingPage() {

  const {auth} = useContext(ModalContext);

  return <div className="bg-black w-screen h-screen">
    <Header></Header>
    {auth === 'login' ? <Login></Login> : <Register></Register>}
  </div>;
}

export default LandingPage;
