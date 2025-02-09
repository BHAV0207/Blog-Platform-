import { createContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [postById, setPostById] = useState([]);
  const [userComments, setUserComments] = useState([]);

  const HandleLogout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      if (!token) {
        return;
      }
      const res = await axios.get(
        `http://localhost:3000/api/user/${decode.id}`
      );
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blog");
      setAllPosts(res.data.responseData.post);
    } catch (err) {
      console.error(err);
    }
  };

  const getPostById = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      if (!token) {
        return;
      }
      const res = await axios.get(
        `http://localhost:3000/api/blog/${decode.id}`
      );
      setPostById(res.data.responseData.post);
    } catch (err) {
      console.error(err);
    }
  };

  const getCommentsById = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      if (!token) {
        return;
      }
      const res = await axios.get(
        `http://localhost:3000/api/comment/user/${decode.id}`
      );
      setUserComments(res.data.responseData.post);
    } catch (err) {
      console.error(err);
    }
  };

  const UpdatePost = async (id, data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(`http://localhost:3000/api/blog/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Post updated successfully!");
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        HandleLogout,
        allPosts,
        getAllPosts,
        getPostById,
        postById,
        getCommentsById,
        userComments,
        UpdatePost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
