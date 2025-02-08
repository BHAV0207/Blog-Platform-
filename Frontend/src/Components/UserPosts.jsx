import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Store/UserContext";

function UserPosts() {
  const { getPostById, postById } = useContext(UserContext);

  useEffect(() => {
    getPostById();
  }, []);
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">My Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postById.map((post) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPosts;
