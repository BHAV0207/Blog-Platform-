import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiSearch } from "react-icons/fi";
import CommentModal from "./CommentModal";

function FeedPage() {
  const { allPosts, getAllPosts } = useContext(UserContext);
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
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header Section with Search Bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-bold text-gray-900">Feed</h2>
        <div className="relative w-1/3">
          <FiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 shadow-md"
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
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              key={post.id}
            >
              <img
                src={post.imageUrls[0] || "https://via.placeholder.com/400"}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
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

              {activePostId === post.id && (
                <CommentModal
                  postId={post.id}
                  closeModal={() => setActivePostId(null)}
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
}

export default FeedPage;
