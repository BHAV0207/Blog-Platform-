import React, { useContext, useEffect } from "react";
import { UserContext } from "../Store/UserContext";
import { ThemeContext } from "../Store/ThemeContext";
import { FiUser } from "react-icons/fi";

function ProfilePage() {
  const { user, getUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className={`shadow-lg rounded-lg p-8 w-full max-w-md text-center ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <div className={`w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full shadow-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
          <FiUser size={50} className={theme === "dark" ? "text-gray-300" : "text-gray-500"} />
        </div>

        <h2 className="text-2xl font-bold">User Profile</h2>

        {user ? (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="mt-1">{user.email}</p>
          </div>
        ) : (
          <p className="mt-4">Please log in to see your profile.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
