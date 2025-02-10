import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { FiMoreVertical, FiX } from "react-icons/fi"; // ✅ Import icons

function CommentPage() {
  const {
    user,
    getUser,
    getCommentsByUserId,
    userComments,
    updateComment,
    deleteComment,
  } = useContext(UserContext);

  const [formattedComments, setFormattedComments] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateContent, setUpdateContent] = useState("");
  const [updateCommentId, setUpdateCommentId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null); // ✅ Track which comment menu is open

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

  // ✅ Handle Update (with correct comment ID)
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateCommentId) return;

    await updateComment(updateCommentId, { content: updateContent });
    await getCommentsByUserId(user.id);

    setUpdateModal(false);
    setUpdateCommentId(null);
    setUpdateContent("");
  };

  // ✅ Open Update Modal (Set content & ID)
  const openUpdateModal = (comment) => {
    setUpdateCommentId(comment.id);
    setUpdateContent(comment.content);
    setUpdateModal(true);
    setDropdownOpen(null); // ✅ Close dropdown menu
  };

  const handleDeleteComment = async (id) => {
    await deleteComment(id);
    await getCommentsByUserId(user.id);
    setDropdownOpen(null); // ✅ Close dropdown menu after deleting
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Comments</h1>
      <div className="mt-4">
        {formattedComments.length > 0 ? (
          formattedComments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 p-4 bg-gray-100 rounded-lg relative"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {comment.User?.name || "Unknown User"}
                </h2>

                {/* ✅ Three Dots Button (Menu Toggle) */}
                <button
                  className="text-gray-600 hover:text-black p-2"
                  onClick={() =>
                    setDropdownOpen(
                      dropdownOpen === comment.id ? null : comment.id
                    )
                  }
                >
                  <FiMoreVertical size={20} />
                </button>
              </div>

              {/* ✅ Dropdown Menu for Update & Delete */}
              {dropdownOpen === comment.id && (
                <div className="absolute top-10 right-2 bg-white border shadow-lg rounded-md w-40 z-50">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => openUpdateModal(comment)}
                  >
                    Update
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              )}

              {/* ✅ Comment Content */}
              <h2 className="text-lg font-semibold">{comment.content}</h2>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Created on:</span>{" "}
                {comment.createdAt}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Commented on:</span>{" "}
                {comment.BlogPost?.title || "Unknown Post"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            You haven't commented on any posts yet.
          </p>
        )}
      </div>

      {/* ✅ Update Modal */}
      {updateModal && (
        <div
          className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setUpdateModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ✅ Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
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
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your updated comment..."
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
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
