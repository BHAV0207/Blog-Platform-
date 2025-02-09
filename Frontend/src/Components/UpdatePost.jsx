import React, { useContext, useState } from "react";
import { UserContext } from "../Store/UserContext";

function UpdatePost({ id, onUpdate }) {
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

      // ✅ Trigger re-fetch of posts
      if (onUpdate) {
        onUpdate(); // 🔄 Refresh posts after update
      }
    } catch (error) {
      setMessage("Failed to update post.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md mt-4">
      <h2 className="text-xl font-bold">Update Post</h2>

      {message && <p className="text-sm text-green-600 mt-2">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePost;
