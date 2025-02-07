import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { UserContext } from "../Store/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const { user, getUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUser();
    fetchPosts();
    fetchComments();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blog");
      setPosts(res.data.responseData.post);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/comments/${postId}`
      );
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
     
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Featured Articles
        </h2>
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
              <Link
                to={`/article/${post.id}`}
                className="text-blue-600 mt-2 inline-block"
              >
                Read More
              </Link>
              <button
                onClick={() => fetchComments(post.id)}
                className="text-gray-500 mt-2 inline-block"
              >
                View Comments
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6">
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
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Recent Comments</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b py-2">
                <p className="font-semibold">{comment.User.name}: </p>
                <p className="text-gray-600">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No comments available.</p>
          )}
        </div>
      </div>
     
    </div>
  );
}

export default HomePage;
