import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FeaturedArticles() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true); 
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blog`);
      setPosts(res.data.responseData.post);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-grow p-6">
        <h1 className="text-4xl font-extrabold text-amber-600 text-center mb-6">
          <span className="text-white">Fe</span>atu<span className="text-white">re</span>d Ar<span className="text-white">ti</span>cles</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div className="bg-gray-300 opacity-60 hover:opacity-100 transition-all duration-300  rounded-lg shadow-md p-4 " key={post.id}>
                <img
                  src={post.imageUrls[0] || "https://via.placeholder.com/300"}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
                <p className="text-gray-600 mt-1">
                  {post.content.substring(0, 100)}...
                </p>
                <Link to={`/article/${post.id}`} className="text-blue-600 mt-2 inline-block">
                  Read More
                </Link>
                <button className="text-gray-500 mt-2 inline-block">
                  View Comments
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedArticles;
