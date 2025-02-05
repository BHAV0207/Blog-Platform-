import React, { createContext, useState } from "react";
import axios from "axios";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [response, setResponse] = useState(null);

    const axiosRequest = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/auth/register", {
                name,
                email,
                password,
            });
            console.log(res.data);
        } catch (error) {
            console.error("Error in request:", error);
        }
    };

    const modalTrigger = () => {
        setIsOpen(!isOpen);
    };

    return (
        <ModalContext.Provider value={{
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
            // response
        }}>
            {children}
        </ModalContext.Provider>
    );
};