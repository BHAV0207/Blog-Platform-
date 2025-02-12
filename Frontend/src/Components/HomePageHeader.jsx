import React, { useContext, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { ThemeContext } from "../Store/ThemeContext";
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
  FiMoon,
} from "react-icons/fi";

function HomePageHeader({ user, setActiveSection, activeSection }) {
  const navigate = useNavigate();
  const { HandleLogout, setUser } = useContext(UserContext); // ✅ Get setUser to clear state
  const { setSuccess } = useContext(ModalContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [logoutBox, setLogoutBox] = useState(false);

  const handleLogoutBox = (e) => {
    e.stopPropagation();
    setTimeout(() => setLogoutBox((prev) => !prev), 200); // ✅ Adds delay
  };
  

  const handleLog = async () => {
    try {
      const logoutSuccess = await HandleLogout();
      if (logoutSuccess) {
        setSuccess("");
        setMenuOpen(false); 
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
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
      <button
        onClick={() => setMenuOpen(true)}
        className="text-2xl transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <FiMenu />
      </button>

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
          theme === "light"
            ? "bg-white text-gray-800"
            : "bg-gray-800 text-white"
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
            {
              name: "My Comments",
              icon: <FiMessageSquare />,
              section: "comments",
            },
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
            {theme === "light" ? (
              <FiMoon className="mr-3" />
            ) : (
              <FiSun className="mr-3" />
            )}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>

      {/* ✅ Logout Confirmation */}
      {logoutBox && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white rounded-lg p-4 shadow-xl transition-all duration-300 ease-in-out z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-lg font-bold text-gray-800 mb-2 text-center">
            Are you sure you want to logout?
          </h1>

          <div className="flex space-x-4 mt-2 w-full">
            <button
              onClick={() => setLogoutBox(false)}
              className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-200 p-1"
            >
              Cancel
            </button>

            <button
              onClick={handleLog}
              className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200 p-1"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePageHeader;
