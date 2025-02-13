import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { ThemeContext } from "../Store/ThemeContext";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiSearch } from "react-icons/fi";
import CommentModal from "./CommentModal";

function FeedPage() {
  const { allPosts, getAllPosts } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [activePostId, setActivePostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(allPosts);
  }, [allPosts]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (!searchQuery.trim()) {
        setFilteredPosts(allPosts);
      } else {
        const filtered = allPosts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchQuery, allPosts]);

  return (
    <div
      className={`max-w-7xl mx-auto px-6 py-8 transition-colors duration-300 ${
        theme === "light"
          ? "bg-white text-gray-900"
          : "bg-gray-900 text-gray-100 border border-gray-700"
      }`}
    >
      {/* Header Section with Search Bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-bold">Feed</h2>
        <div className="relative w-1/3">
          <FiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 shadow-md transition-colors duration-300 ${
              theme === "light"
                ? "border-gray-300 focus:ring-blue-400 bg-white text-gray-900"
                : "border-gray-600 focus:ring-blue-500 bg-gray-800 text-gray-100"
            }`}
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              className={`rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 p-4 border ${
                theme === "light"
                  ? "bg-white border-gray-300"
                  : "bg-gray-800 border-gray-700"
              }`}
              key={post.id}
            >
              <img
                src={post.imageUrls[0] || "https://via.placeholder.com/400"}
                alt={post.title}
                className="w-full h-56 object-cover border-b border-gray-700"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm mt-1">
                  {post.content.substring(0, 100)}...
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <Link
                    to={`/article/${post.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read More
                  </Link>
                  <button
                    className="text-gray-600 hover:text-black"
                    onClick={() => setActivePostId(post.id)}
                  >
                    <FiMessageSquare size={22} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No posts found.</p>
        )}
      </div>

      {/* Global Comment Modal */}
      {activePostId && (
        <div
          className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setActivePostId(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 h-auto flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <CommentModal
              postId={activePostId}
              closeModal={() => setActivePostId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedPage;
