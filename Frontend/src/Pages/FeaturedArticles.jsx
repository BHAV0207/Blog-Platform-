import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { ModalContext } from "../Store/Context";
import Login from "../Components/Login";
import Register from "../Components/Register";

function FeaturedArticles() {
  const { auth } = useContext(ModalContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true); 
      const res = await axios.get("http://localhost:3000/api/blog");
      setPosts(res.data.responseData.post);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
     
      <Header />

      <div className="p-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          ← Back to Home
        </button>
      </div>

      <div className="flex-grow p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Articles</h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div className="bg-white rounded-lg shadow-md p-4" key={post.id}>
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

      <div className="flex justify-center p-6">
        {auth === "login" ? <Login /> : <Register />}
      </div>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} BlogMania. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default FeaturedArticles;
