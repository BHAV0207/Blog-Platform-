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
        `${import.meta.env.VITE_BACKEND_URL}/
api/user/${decode.id}`
      );
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/
api/blog`);
      setAllPosts(res.data.responseData.post);
    } catch (err) {
      console.error(err);
    }
  };

  const getPostById = async () => {
    try {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      if (!token) {
        return;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/
api/blog/${decode.id}`
      );
      setPostById(res.data.responseData.post);
    } catch (err) {
      console.error(err);
    }
  };

  const UpdatePost = async (id, data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/
api/blog/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Post updated successfully!");
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const DeletePost = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/
api/blog/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Post deleted successfully!");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const getCommentsByUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      if (!token) {
        return;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/
api/comment/user/${decode.id}`
      );
      setUserComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const postCommentOnAPost = async (id, commentContent) => {
    try {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      if (!token) {
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/
api/comment/${id}`,
        {
          content: commentContent,
          userId: decode.id,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCommentsForPost = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return [];
      }

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/
api/comment/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const updateComment = async (id, data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/
api/comment/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Comment updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/
api/comment/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Comment deleted successfully");
    } catch (err) {
      console.log(err);
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
        getCommentsByUserId,
        userComments,
        UpdatePost,
        DeletePost,
        postCommentOnAPost,
        fetchCommentsForPost,
        updateComment,
        deleteComment,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
