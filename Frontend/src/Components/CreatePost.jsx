import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../Store/UserContext";
import { ThemeContext } from "../Store/ThemeContext";

function CreatePost() {
  const { user, getUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getUser();
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", user.id);
    images.forEach((image) => formData.append("images", image));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/create`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setTitle("");
      setContent("");
      setImages([]);
      setImagePreview([]);

      alert("Post created successfully!");
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto p-6 rounded-lg transition-colors duration-300 ${
        theme === "light"
          ? "bg-white shadow-md text-gray-900"
          : "bg-gray-800 shadow-lg text-gray-100"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

      <form onSubmit={handleSubmitPost}>
        <label className="block mb-2 font-semibold">Title:</label>
        <input
          type="text"
          className={`w-full p-2 border rounded-md mb-4 transition-colors duration-300 ${
            theme === "light"
              ? "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              : "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400"
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block mb-2 font-semibold">Content:</label>
        <textarea
          className={`w-full p-2 border rounded-md mb-4 transition-colors duration-300 ${
            theme === "light"
              ? "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              : "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400"
          }`}
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <label className="block mb-2 font-semibold">Upload Images:</label>
        <input
          type="file"
          className={`w-full p-2 border rounded-md mb-4 transition-colors duration-300 ${
            theme === "light"
              ? "bg-white border-gray-300 text-gray-900 file:bg-gray-100 file:text-gray-700 file:border-gray-300"
              : "bg-gray-700 border-gray-600 text-gray-100 file:bg-gray-600 file:text-gray-100 file:border-gray-500"
          } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-solid file:cursor-pointer`}
          multiple
          onChange={handleImageChange}
        />

        {imagePreview.length > 0 && (
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            {imagePreview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Preview"
                className={`w-20 h-20 object-cover rounded-md border transition-colors duration-300 ${
                  theme === "light" ? "border-gray-300" : "border-gray-600"
                }`}
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className={`w-full font-semibold py-2 rounded-md transition-colors duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
