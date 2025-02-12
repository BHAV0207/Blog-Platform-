import React, { useContext, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { ThemeContext } from "../Store/ThemeContext"; // ✅ Import Theme Context
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../Store/Context";
import {
  FiMenu,
  FiX,
  FiUser,
  FiFileText,
  FiMessageSquare,
  FiPlusCircle,
  FiLogOut,
  FiSun,
  FiMoon, // ✅ Theme Icons
} from "react-icons/fi";

function HomePageHeader({ user, setActiveSection, activeSection }) {
  const navigate = useNavigate();
  const { HandleLogout } = useContext(UserContext);
  const { setSuccess } = useContext(ModalContext);
  const { theme, toggleTheme } = useContext(ThemeContext); // ✅ Get theme & toggle function

  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [logoutBox, setLogoutBox] = useState(false);

  const handleLogoutBox = () => setLogoutBox((prev) => !prev);

  const handleLog = async () => {
    const logoutSuccess = await HandleLogout();
    setSuccess("");
    if (logoutSuccess) {
      navigate("/");
    }
  };

  return (
    <div
      className={`p-4 flex justify-between items-center shadow-md border-b-2 transition-colors duration-300 ${
        theme === "light"
          ? "bg-cream-100 text-gray-800 border-gray-300"
          : "bg-gray-900 text-gray-100 border-gray-700"
      }`}
    >
      {/* ✅ Menu Button */}
      <button
        onClick={() => setMenuOpen(true)}
        className="text-2xl transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <FiMenu />
      </button>

      {/* ✅ BlogMania Logo - Clicking scrolls back to homepage */}
      <h1
        className="text-3xl font-extrabold cursor-pointer transition-colors duration-300 ease-in-out hover:text-emerald-500"
        onClick={() => setActiveSection("feed")}
      >
        BlogMania
      </h1>

      {/* ✅ Sidebar Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-64 shadow-lg transform transition-transform duration-500 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-white"
        }`}
      >
        <div className="p-6 flex flex-col">
          {/* ✅ Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end text-gray-600 transition-transform duration-300 hover:scale-110"
          >
            <FiX size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-6">Menu</h2>

          {/* ✅ Sidebar Options with Active Highlight */}
          {[
            { name: "My Feed", icon: <FiFileText />, section: "feed" },
            { name: "My Profile", icon: <FiUser />, section: "profile" },
            { name: "My Comments", icon: <FiMessageSquare />, section: "comments" },
          ].map((item) => (
            <button
              key={item.section}
              className={`flex items-center text-lg p-3 rounded-lg transition-all duration-300 ${
                activeSection === item.section
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveSection(item.section);
                setMenuOpen(false);
              }}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </button>
          ))}

          {/* ✅ My Posts Section */}
          <div>
            <button
              className={`flex items-center justify-between text-lg p-3 rounded-lg w-full transition-all duration-300 ${
                activeSection === "posts" || activeSection === "createPost"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => setSubMenuOpen(!subMenuOpen)}
            >
              <span className="flex items-center">
                <FiFileText className="mr-3" /> My Posts
              </span>
              {subMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            {subMenuOpen && (
              <div className="ml-6 mt-2 flex flex-col space-y-2">
                <button
                  className="flex items-center text-lg p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => {
                    setActiveSection("posts");
                    setMenuOpen(false);
                  }}
                >
                  📜 View My Posts
                </button>
                <button
                  className="flex items-center text-lg p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => {
                    setActiveSection("createPost");
                    setMenuOpen(false);
                  }}
                >
                  <FiPlusCircle className="mr-3" /> Create New Post
                </button>
              </div>
            )}
          </div>

          {/* ✅ Logout Button */}
          <button
            className="flex items-center text-lg p-3 rounded-lg hover:bg-red-600 hover:text-white"
            onClick={handleLogoutBox}
          >
            <FiLogOut className="mr-3" /> Logout
          </button>

          {/* ✅ Theme Toggle Button */}
          <button
            className="flex items-center text-lg p-3 rounded-lg transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={toggleTheme}
          >
            {theme === "light" ? <FiMoon className="mr-3" /> : <FiSun className="mr-3" />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePageHeader;
