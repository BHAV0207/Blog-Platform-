import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../Store/UserContext";

function CreatePost() {
  const { user, getUser } = useContext(UserContext);

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

  // ✅ Submit New Post
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
        `${process.env.BACKEND_URL}/api/blog/create`,
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
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

      {/* ✅ Post Form */}
      <form onSubmit={handleSubmitPost}>
        <label className="block mb-2 font-semibold">Title:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block mb-2 font-semibold">Content:</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <label className="block mb-2 font-semibold">Upload Images:</label>
        <input
          type="file"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          multiple
          onChange={handleImageChange}
        />

        {/* ✅ Image Preview */}
        {imagePreview.length > 0 && (
          <div className="flex space-x-2 mb-4">
            {imagePreview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-md"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
