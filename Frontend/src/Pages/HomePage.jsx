import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";
import HomePageHeader from "../Components/HomePageHeader";
import {
  FiMenu,
  FiX,
  FiUser,
  FiFileText,
  FiMessageSquare,
  FiPlusCircle, // ✅ Added icon for "Create New Post"
} from "react-icons/fi";
import ProfilePage from "../Components/ProfilePage";
import FeedPage from "../Components/FeedPage";
import UserPosts from "../Components/UserPosts";
import CommentPage from "../Components/CommentPage";
import CreatePost from "../Components/CreatePost"; // ✅ Import Create Post Component

function HomePage() {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false); // ✅ State for sub-hamburger
  const [activeSection, setActiveSection] = useState("feed");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".sidebar-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setMenuOpen(false);
        setSubMenuOpen(false); // ✅ Close sub-menu when clicking outside
      }
    };
    if (menuOpen || subMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen, subMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <HomePageHeader user={user} />

      <div className="p-4 bg-white border-gray-300 flex items-center">
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 text-gray-800 menu-button"
        >
          <FiMenu size={30} />
        </button>
      </div>

      {/* ✅ Sidebar Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 sidebar-menu`}
      >
        <div className="p-6 flex flex-col">
          <button onClick={() => setMenuOpen(false)} className="self-end text-gray-600">
            <FiX size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>

          {/* Sidebar Options */}
          <button
            className={`flex items-center text-lg p-3 rounded-lg ${
              activeSection === "feed" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveSection("feed")}
          >
            <FiFileText className="mr-3" /> My Feed
          </button>

          <button
            className={`flex items-center text-lg p-3 rounded-lg ${
              activeSection === "profile" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveSection("profile")}
          >
            <FiUser className="mr-3" /> My Profile
          </button>

          {/* ✅ My Posts (with Sub-Hamburger) */}
          <div>
            <button
              className={`flex items-center justify-between text-lg p-3 rounded-lg w-full ${
                activeSection === "posts" || activeSection === "createPost"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
              onClick={() => setSubMenuOpen(!subMenuOpen)} // ✅ Toggle sub-menu
            >
              <span className="flex items-center">
                <FiFileText className="mr-3" /> My Posts
              </span>
              {subMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* ✅ Sub-Menu for My Posts */}
            {subMenuOpen && (
              <div className="ml-6 mt-2 flex flex-col space-y-2">
                <button
                  className={`flex items-center text-lg p-3 rounded-lg ${
                    activeSection === "posts" ? "bg-gray-300 text-gray-900" : "text-gray-700"
                  }`}
                  onClick={() => setActiveSection("posts")}
                >
                  📜 View My Posts
                </button>
                <button
                  className={`flex items-center text-lg p-3 rounded-lg ${
                    activeSection === "createPost" ? "bg-gray-300 text-gray-900" : "text-gray-700"
                  }`}
                  onClick={() => setActiveSection("createPost")}
                >
                  <FiPlusCircle className="mr-3" /> Create New Post
                </button>
              </div>
            )}
          </div>

          <button
            className={`flex items-center text-lg p-3 rounded-lg ${
              activeSection === "comments" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveSection("comments")}
          >
            <FiMessageSquare className="mr-3" /> My Comments
          </button>
        </div>
      </div>

      {/* ✅ Main Content Area */}
      <div className="flex-grow p-6">
        {activeSection === "profile" && <ProfilePage />}
        {activeSection === "feed" && <FeedPage />}
        {activeSection === "posts" && <UserPosts />}
        {activeSection === "createPost" && <CreatePost />} {/* ✅ New Component */}
        {activeSection === "comments" && <CommentPage />}
      </div>
    </div>
  );
}

export default HomePage;
