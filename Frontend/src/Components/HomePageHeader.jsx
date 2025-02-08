import React, { useContext, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ModalContext } from "../Store/Context";

function HomePageHeader({ user }) {
  const navigate = useNavigate();
  const { HandleLogout } = useContext(UserContext);
  const {setSuccess} = useContext(ModalContext)
  const [logoutBox, setLogoutBox] = useState(false);

  const HandleLogoutBox = () => {
    setLogoutBox((prev) => !prev);
  };

  const handleLog = async () => {
    const logoutSuccess = await HandleLogout();
    setSuccess("");
    if (logoutSuccess) {
      navigate("/");
    }
  };

  return (
    <div className="bg-cream-100 text-gray-800 p-4 flex justify-between items-center shadow-md border-b-2 border-gray-300">
        <h1 className="text-3xl font-extrabold">BlogMania</h1>
      <div className="relative flex space-x-4">
        <span className="text-lg font-medium mt-1.5 text-gray-700">
          {" "}
          Hello {user?.name}
        </span>
        <button
          className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-3xl shadow-md hover:bg-white hover:text-emerald-500 transition-all duration-300 ease-in-out opacity"
          onClick={HandleLogoutBox}
        >
          Logout
        </button>
        {logoutBox && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white rounded-lg p-4 shadow-xl transition-all duration-300 ease-in-out z-10"
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
    </div>
  );
}

export default HomePageHeader;
