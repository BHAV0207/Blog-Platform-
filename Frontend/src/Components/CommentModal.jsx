import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { FiSend, FiX, FiTrash2 } from "react-icons/fi"; // ✅ Import Delete Icon
import { ThemeContext } from "../Store/ThemeContext";

function CommentModal({ postId, closeModal }) {
  const { postCommentOnAPost, fetchCommentsForPost, deleteComment, user } =
    useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [commentContent, setCommentContent] = useState("");
  const [localComments, setLocalComments] = useState([]);

  useEffect(() => {
    if (postId) {
      fetchCommentsForPost(postId).then((comments) => {
        const formattedComments = comments.map((comment) => ({
          ...comment,
          createdAt: new Date(comment.createdAt).toLocaleDateString("en-GB"),
        }));
        setLocalComments(formattedComments.reverse());
      });
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    const newComment = {
      id: Date.now(),
      content: commentContent,
      userId: user.id,
      User: { name: "You" },
      createdAt: new Date().toLocaleDateString("en-GB"),
    };

    setLocalComments((prevComments) => [newComment, ...prevComments]);
    setCommentContent("");

    await postCommentOnAPost(postId, commentContent);

    fetchCommentsForPost(postId).then((comments) => {
      const formattedComments = comments.map((comment) => ({
        ...comment,
        createdAt: new Date(comment.createdAt).toLocaleDateString("en-GB"),
      }));
      setLocalComments(formattedComments.reverse());
    });
  };

  const handleDelete = async (commentId) => {
    await deleteComment(commentId);
    setLocalComments((prev) =>
      prev.filter((comment) => comment.id !== commentId)
    );
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className={`p-6 rounded-lg shadow-lg w-96 h-96 flex flex-col relative transition-colors duration-300 ${
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
          onClick={closeModal}
        >
          <FiX />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Comments</h2>

        <div className="flex-grow overflow-y-auto space-y-3 pr-2">
          {localComments.length > 0 ? (
            localComments.map((comment) => (
              <div
                key={comment.id}
                className={`p-3 rounded-md relative transition-colors duration-300 ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{comment.User?.name}</p>
                  <p
                    className={`text-xs ${
                      theme === "light" ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {comment.createdAt}
                  </p>
                </div>
                <p
                  className={
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }
                >
                  {comment.content}
                </p>
                {comment.userId === user.id && (
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full bg-white dark:bg-gray-900 shadow-md"
                    onClick={() => handleDelete(comment.id)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p
              className={theme === "light" ? "text-gray-500" : "text-gray-400"}
            >
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-2 mb-4 mt-4"
        >
          <input
            type="text"
            className={`flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
              theme === "light"
                ? "bg-white border-gray-300 text-gray-900"
                : "bg-gray-700 border-gray-600 text-gray-100"
            }`}
            placeholder="Write a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <FiSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentModal;
