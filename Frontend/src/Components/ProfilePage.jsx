import React, { useContext, useEffect } from "react";
import { UserContext } from "../Store/UserContext";
import { FiUser } from "react-icons/fi"; // ✅ Import User Icon

function ProfilePage() {
  const { user, getUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 flex items-center justify-center rounded-full shadow-md">
          <FiUser size={50} className="text-gray-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>

        {user ? (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700">{user.name}</h3>
            <p className="text-gray-600 mt-1">{user.email}</p>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">Please log in to see your profile.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
