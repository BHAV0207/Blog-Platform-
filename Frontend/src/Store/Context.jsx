import React, { createContext, useState } from "react";
import axios from "axios";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
      });
      setSuccess("Registration successful!");
      setErr("");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setErr("Registration failed. Please try again.");
      setSuccess("");
    }
  };

  const axiosLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      setSuccess("Login successful!");
      setErr("");
      setEmail("");
      setPassword("");

      const token = res.data.token;
      localStorage.setItem("token", token);

      setLoginData(res.data.user);
    } catch (error) {
      setErr("Login failed. Please try again.");
      setSuccess("");
    }
  };

  const modalTrigger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalTrigger,
        auth,
        setAuth,
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword,
        axiosRequest,
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
