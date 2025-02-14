import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Store/UserContext";
import { ThemeContext } from "../Store/ThemeContext";
import UpdatePost from "./UpdatePost";
import { FiMoreVertical } from "react-icons/fi";

function UserPosts() {
  const { getPostById, postById, DeletePost } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [updatePostId, setUpdatePostId] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    getPostById();
  }, []);

  const handleUpdateSuccess = () => {
    getPostById();
    setUpdatePostId(null);
    setDropdownOpen(null);
  };

  const handleDeletePost = async () => {
    await DeletePost(deletePostId);
    getPostById();
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen p-6`}
    >
      <h2 className="text-3xl font-bold text-center mb-6">My Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postById.map((post) => (
          <div
            className={`rounded-lg shadow-md p-4 relative transition-all ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
            key={post.id}
          >
            <img
              src={post.imageUrls[0] || "https://via.placeholder.com/300"}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
            <p className="mt-1">{post.content.substring(0, 100)}...</p>
            <Link
              to={`/article/${post.id}`}
              className="text-blue-400 mt-2 inline-block"
            >
              Read More
            </Link>

            <button
              className="absolute top-2 right-2 p-2"
              onClick={() =>
                setDropdownOpen(dropdownOpen === post.id ? null : post.id)
              }
            >
              <FiMoreVertical
                size={20}
                className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
              />
            </button>

            {dropdownOpen === post.id && (
              <div
                className={`absolute top-10 right-2 border shadow-lg rounded-md w-40 transition-all ${
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                }`}
              >
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-600"
                  onClick={() => setUpdatePostId(post.id)}
                >
                  Update Post
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-600"
                  onClick={() => setDeletePostId(post.id)}
                >
                  Delete Post
                </button>
              </div>
            )}

            {deletePostId === post.id && (
              <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center">
                <div
                  className={`p-4 rounded-md shadow-md text-center ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <p>Are you sure you want to delete this post?</p>
                  <div>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md mx-2"
                      onClick={handleDeletePost}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-gray-200 px-4 py-2 rounded-md mx-2"
                      onClick={() => setDeletePostId(null)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            {updatePostId === post.id && (
              <UpdatePost
                id={post.id}
                onUpdate={handleUpdateSuccess}
                closeModal={() => setUpdatePostId(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPosts;
