import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Store/UserContext";
import UpdatePost from "./UpdatePost";
import { FiMoreVertical } from "react-icons/fi"; // ✅ Import three dots icon

function UserPosts() {
  const { getPostById, postById , DeletePost } = useContext(UserContext);
  const [updatePostId, setUpdatePostId] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null); // ✅ Track which post's menu is open

  useEffect(() => {
    getPostById();
  }, []);

  // ✅ Refresh the posts after update
  const handleUpdateSuccess = () => {
    getPostById(); // 🔄 Fetch updated posts
    setUpdatePostId(null); // Close update form
    setDropdownOpen(null); // Close dropdown menu
  };

  const handleDeletePost = async () => {
    await DeletePost(deletePostId);
    getPostById();
  }


  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">My Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postById.map((post) => (
          <div className="bg-white rounded-lg shadow-md p-4 relative" key={post.id}>
            <img
              src={post.imageUrls[0] || "https://via.placeholder.com/300"}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
            <p className="text-gray-600 mt-1">{post.content.substring(0, 100)}...</p>
            <Link to={`/article/${post.id}`} className="text-blue-600 mt-2 inline-block">
              Read More
            </Link>

            {/* ✅ Three Dots Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black p-2"
              onClick={() => setDropdownOpen(dropdownOpen === post.id ? null : post.id)}
            >
              <FiMoreVertical size={20} />
            </button>

            {/* ✅ Dropdown Menu */}
            {dropdownOpen === post.id && (
              <div className="absolute top-10 right-2 bg-white border shadow-lg rounded-md w-40">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setUpdatePostId(post.id)}
                >
                  Update Post
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDeletePostId(post.id)}
                >
                  Delete Post
                </button>
               
              </div>
            )}

            {deletePostId === post.id && (
              <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-md shadow-md text-center">
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
            {/* ✅ Show Update Form when selected */}
            {updatePostId === post.id && (
              <UpdatePost id={post.id} onUpdate={handleUpdateSuccess} closeModal={() => setUpdatePostId(null)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPosts;
