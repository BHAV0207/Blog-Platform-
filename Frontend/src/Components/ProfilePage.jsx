import React, { useContext, useEffect } from "react";
import { UserContext } from "../Store/UserContext";

function ProfilePage() {

  const {user , getUser} = useContext(UserContext);

  useEffect(() => { 
    getUser();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">User Profile</h2>
      {user ? (
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ) : (
        <p className="text-gray-600">Please log in to see your profile.</p>
      )}
    </div>
  );
}

export default ProfilePage;
