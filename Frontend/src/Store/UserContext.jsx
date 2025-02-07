import { createContext, useState } from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const HandleLogout = () => {
    localStorage.removeItem('token');

    setUser(null);
  }

  const getUser = async () => {
    try{
      const token = localStorage.getItem('token');
      const decode = jwtDecode(token);
      if(!token){
        return;
      }
      const res = await axios.get(`http://localhost:3000/api/user/${decode.id}`);
      setUser(res.data);
      console.log(res.data);
    }catch(err){
      console.error(err);
    } 
  }

  return (
    <UserContext.Provider value={{user , getUser , HandleLogout}}>
      {children}
    </UserContext.Provider>
  );
}