import React, { useContext, useState } from "react";
import { UserContext } from "../Store/UserContext";

function UpdatePost({ id, onUpdate, closeModal }) {
  const { UpdatePost } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = { title, content };

    try {
      await UpdatePost(id, data); // ✅ Send correct post ID
      setMessage("Post updated successfully!");

      if (onUpdate) {
        onUpdate(); // 🔄 Refresh posts after update
      }

      setTimeout(() => {
        closeModal(); // ✅ Close the modal after update
      }, 1000);
    } catch (error) {
      setMessage("Failed to update post.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50" // ✅ Ensures modal appears in front
      onClick={closeModal} // ✅ Close modal when clicking outside
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-96 relative z-50" // ✅ Ensures modal content stays above other elements
        onClick={(e) => e.stopPropagation()} // ✅ Prevent closing when clicking inside
      >
        {/* ✅ Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          onClick={closeModal}
        >
          &times;
        </button>

        {/* ✅ Success/Error Message */}
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

        {/* ✅ Update Post Title */}
        <h2 className="text-xl font-bold mb-4 text-center">Update Post</h2>

        {/* ✅ Update Post Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePost;
