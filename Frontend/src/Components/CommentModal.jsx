import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { FiSend, FiX, FiTrash2 } from "react-icons/fi"; // ✅ Import Delete Icon

function CommentModal({ postId, closeModal }) {
  const { postCommentOnAPost, fetchCommentsForPost, deleteComment, user } =
    useContext(UserContext);
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
      id: Date.now(), // Temporary ID until API response
      content: commentContent,
      userId: user.id, // ✅ Attach logged-in user's ID
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
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 h-96 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
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
                className="p-3 bg-gray-100 rounded-md relative"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">
                    {comment.User?.name}
                  </p>
                  <p className="text-xs text-gray-500">{comment.createdAt}</p>
                </div>
                <p className="text-gray-700">{comment.content}</p>

                {/* ✅ Show delete button only if the logged-in user owns the comment */}
                {comment.userId === user.id && (
                  <button
                    className="absolute top-2 right-8 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(comment.id)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
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
            className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            placeholder="Write a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <FiSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentModal;
