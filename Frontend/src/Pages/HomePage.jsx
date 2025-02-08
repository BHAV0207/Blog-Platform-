import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import HomePageHeader from "../Components/HomePageHeader";
import {
  FiMenu,
  FiX,
  FiUser,
  FiFileText,
  FiMessageSquare,
} from "react-icons/fi";

function HomePage() {
  const { user, getUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    getUser();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blog");
      setPosts(res.data.responseData.post);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".sidebar-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className=" min-h-screen flex flex-col">
      {/* ✅ Home Page Header (Unchanged) */}
      
        <HomePageHeader user={user} />
      
      
      {/* ✅ Hamburger Button (Below Header) */}
      <div className="p-4 bg-white border-gray-300 flex items-center">
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 text-gray-800 menu-button"
        >
          <FiMenu size={30} />
        </button>
      </div>

      {/* ✅ Sidebar Menu (Opens Below Header) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 sidebar-menu`}
      >
        <div className="p-6 flex flex-col">
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end text-gray-600"
          >
            <FiX size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>

          {/* Sidebar Options */}
          <button
            className={`flex items-center text-lg p-3 rounded-lg ${
              activeSection === "profile"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
            onClick={() => setActiveSection("profile")}
          >
            <FiUser className="mr-3" /> My Profile
          </button>
          <button
            className={`flex items-center text-lg p-3 rounded-lg ${
              activeSection === "posts"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
            onClick={() => setActiveSection("posts")}
          >
            <FiFileText className="mr-3" /> My Posts
          </button>
          <button
            className={`flex items-center text-lg p-3 rounded-lg ${
              activeSection === "comments"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
            onClick={() => setActiveSection("comments")}
          >
            <FiMessageSquare className="mr-3" /> My Comments
          </button>
        </div>
      </div>

      {/* ✅ Main Content Area */}
      <div className="flex-grow p-6">
        {/* 🔹 Active Section Content */}
        {activeSection === "profile" && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-6">
              User Profile
            </h2>
            {user ? (
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            ) : (
              <p className="text-gray-600">
                Please log in to see your profile.
              </p>
            )}
          </div>
        )}

        {activeSection === "posts" && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-6">My Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  className="bg-white rounded-lg shadow-md p-4"
                  key={post.id}
                >
                  <img
                    src={post.imageUrls[0] || "https://via.placeholder.com/300"}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
                  <p className="text-gray-600 mt-1">
                    {post.content.substring(0, 100)}...
                  </p>
                  <Link
                    to={`/article/${post.id}`}
                    className="text-blue-600 mt-2 inline-block"
                  >
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "comments" && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-6">My Comments</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b py-2">
                    <p className="font-semibold">{comment.User.name}: </p>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No comments available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
