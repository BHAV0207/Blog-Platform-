import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiSearch } from "react-icons/fi";
import CommentModal from "./CommentModal";

function FeedPage() {
  const { allPosts, getAllPosts } = useContext(UserContext);
  const [activePostId, setActivePostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Search query state
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(allPosts);
  }, [allPosts]);

  // ✅ Debounced Filtering using useEffect
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (!searchQuery.trim()) {
        setFilteredPosts(allPosts); // Reset to all posts if query is empty
      } else {
        const filtered = allPosts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
      }
    }, 300); // ✅ Wait 300ms before filtering

    return () => clearTimeout(delaySearch); // ✅ Cleanup previous timeout
  }, [searchQuery, allPosts]); // Runs when searchQuery or allPosts change

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Feed</h2>

      {/* ✅ Search Bar */}
      <div className="relative mb-6 flex items-center">
        <FiSearch className="absolute left-3 text-gray-500" size={20} />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ✅ Display Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              className="bg-white rounded-lg shadow-md p-4 relative"
              key={post.id}
            >
              <img
                src={post.imageUrls[0] || "https://via.placeholder.com/300"}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
              <p className="text-gray-600 mt-1">
                {post.content.substring(0, 100)}...
              </p>
              <Link
                to={`/article/${post.id}`}
                className="text-blue-600 mt-2 inline-block"
              >
                Read More
              </Link>

              <button
                className="absolute bottom-3 right-3 text-gray-600 hover:text-black p-2"
                onClick={() => setActivePostId(post.id)}
              >
                <FiMessageSquare size={22} />
              </button>

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
