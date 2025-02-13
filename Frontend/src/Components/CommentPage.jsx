import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { ThemeContext } from "../Store/ThemeContext";
import { FiMoreVertical, FiX, FiSend, FiTrash2 } from "react-icons/fi";

function CommentPage() {
  const {
    user,
    getUser,
    getCommentsByUserId,
    userComments,
    updateComment,
    deleteComment,
  } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const [formattedComments, setFormattedComments] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateContent, setUpdateContent] = useState("");
  const [updateCommentId, setUpdateCommentId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const syncing = async () => {
      await getUser();
      if (user?.id) {
        await getCommentsByUserId(user.id);
      }
    };
    syncing();
  }, [user?.id]);

  useEffect(() => {
    if (userComments.length > 0) {
      const formatted = userComments.map((comment) => ({
        ...comment,
        createdAt: new Date(comment.createdAt).toLocaleDateString("en-GB"),
      }));
      setFormattedComments(formatted);
    }
  }, [userComments]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateCommentId) return;

    await updateComment(updateCommentId, { content: updateContent });
    await getCommentsByUserId(user.id);

    setUpdateModal(false);
    setUpdateCommentId(null);
    setUpdateContent("");
  };

  const openUpdateModal = (comment) => {
    setUpdateCommentId(comment.id);
    setUpdateContent(comment.content);
    setUpdateModal(true);
    setDropdownOpen(null);
  };

  const handleDeleteComment = async (id) => {
    await deleteComment(id);
    await getCommentsByUserId(user.id);
    setDropdownOpen(null);
  };

  return (
    <div>
      <h1 className={`text-2xl font-semibold mb-4 ${
        theme === "light" ? "text-gray-900" : "text-gray-100"
      }`}>
        Your Comments
      </h1>
      <div className="mt-4">
        {formattedComments.length > 0 ? (
          formattedComments.map((comment) => (
            <div
              key={comment.id}
              className={`mb-4 p-4 rounded-lg relative transition-colors duration-300 ${
                theme === "light" 
                  ? "bg-gray-100 text-gray-900" 
                  : "bg-gray-800 text-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {comment.User?.name || "Unknown User"}
                </h2>

                <button
                  className={`p-2 transition-colors duration-300 ${
                    theme === "light"
                      ? "text-gray-600 hover:text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setDropdownOpen(dropdownOpen === comment.id ? null : comment.id)}
                >
                  <FiMoreVertical size={20} />
                </button>
              </div>

              {dropdownOpen === comment.id && (
                <div className={`absolute top-10 right-2 border shadow-lg rounded-md w-40 z-50 transition-colors duration-300 ${
                  theme === "light"
                    ? "bg-white border-gray-200"
                    : "bg-gray-700 border-gray-600"
                }`}>
                  <button
                    className={`w-full text-left px-4 py-2 transition-colors duration-300 ${
                      theme === "light"
                        ? "hover:bg-gray-100"
                        : "hover:bg-gray-600"
                    }`}
                    onClick={() => openUpdateModal(comment)}
                  >
                    Update
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-red-500 transition-colors duration-300 ${
                      theme === "light"
                        ? "hover:bg-gray-100"
                        : "hover:bg-gray-600"
                    }`}
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              )}

              <h2 className="text-lg font-semibold">{comment.content}</h2>
              <p className={`text-sm ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}>
                <span className="font-semibold">Created on:</span>{" "}
                {comment.createdAt}
              </p>
              <p className={`text-sm ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}>
                <span className="font-semibold">Commented on:</span>{" "}
                {comment.BlogPost?.title || "Unknown Post"}
              </p>
            </div>
          ))
        ) : (
          <p className={`${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}>
            You haven't commented on any posts yet.
          </p>
        )}
      </div>

      {updateModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setUpdateModal(false)}
        >
          <div
            className={`p-6 rounded-lg shadow-lg w-96 relative transition-colors duration-300 ${
              theme === "light"
                ? "bg-white text-gray-900"
                : "bg-gray-800 text-gray-100"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`absolute top-2 right-2 text-2xl transition-colors duration-300 ${
                theme === "light"
                  ? "text-gray-600 hover:text-black"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setUpdateModal(false)}
            >
              <FiX />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Update Comment
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <textarea
                value={updateContent}
                onChange={(e) => setUpdateContent(e.target.value)}
                className={`w-full p-2 border rounded-md transition-colors duration-300 ${
                  theme === "light"
                    ? "bg-white border-gray-300 text-gray-900"
                    : "bg-gray-700 border-gray-600 text-gray-100"
                }`}
                placeholder="Enter your updated comment..."
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Update Comment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentPage;