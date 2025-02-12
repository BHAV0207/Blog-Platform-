import React, { createContext, useState } from "react";
import axios from "axios";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [auth, setAuth] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  const [loginData, setLoginData] = useState(null);

  const axiosRequest = async () => {
    try {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        setErr(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
        );
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      setSuccess("Registration successful!");
      setErr("");
      setName("");
      setEmail("");
      setPassword("");
      registerTrigger();
    } catch (error) {
      setErr("Registration failed. Please try again.");
      setSuccess("");
    }
  };

  const axiosLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      setSuccess("Login successful!");
      setErr("");
      setEmail("");
      setPassword("");
      loginTrigger();
      const token = res.data.token;
      localStorage.setItem("token", token);

      setLoginData(res.data.user);
    } catch (error) {
      setErr("Login failed. Please try again.");
      setSuccess("");
    }
  };

  const loginTrigger = () => {
    setLoginOpen(!loginOpen);
    setAuth("login");
    setRegisterOpen(false);
  };

  const registerTrigger = () => {
    setRegisterOpen(!registerOpen);
    setAuth("register");
    setLoginOpen(false);
    setSuccess("");
  };

  return (
    <ModalContext.Provider
      value={{
        loginOpen,
        loginTrigger,
        registerOpen,
        registerTrigger,
        auth,
        setAuth,
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword,
        axiosRequest,
        setSuccess,
        success,
        err,
        axiosLogin,
        loginData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
