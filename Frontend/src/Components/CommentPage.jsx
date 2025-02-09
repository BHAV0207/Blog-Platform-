import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { FiSend, FiX } from "react-icons/fi"; // ✅ Import send and close icons

function CommentPage({ postId, closeModal }) {
  const { postCommentOnAPost, fetchCommentsForPost } = useContext(UserContext);
  const [commentContent, setCommentContent] = useState("");
  const [localComments, setLocalComments] = useState([]);

  useEffect(() => {
    if (postId) {
      fetchCommentsForPost(postId).then((comments) => {
        setLocalComments(comments);
      });
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    await postCommentOnAPost(postId, commentContent);
    setCommentContent("");

    // ✅ Refresh only this post’s comments
    fetchCommentsForPost(postId).then((comments) => {
      setLocalComments(comments);
    });
  };

  return (
    <div
      className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={closeModal} // ✅ Close modal when clicking outside
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 h-96 flex flex-col relative"
        onClick={(e) => e.stopPropagation()} // ✅ Prevent closing when clicking inside
      >
        {/* ✅ Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          onClick={closeModal}
        >
          <FiX />
        </button>

        {/* ✅ Comment Section Title */}
        <h2 className="text-xl font-bold mb-4 text-center">Comments</h2>

        

        {/* ✅ Scrollable Comments Section */}
        <div className="flex-grow overflow-y-auto space-y-3 pr-2">
          {localComments.length > 0 ? (
            localComments.map((comment) => (
              <div key={comment.id} className="p-3 bg-gray-100 rounded-md">
                <p className="font-semibold text-gray-800">{comment.User?.name}</p>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
          )}
        </div>

        {/* ✅ Comment Input */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4 mt-4">
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

export default CommentPage;
