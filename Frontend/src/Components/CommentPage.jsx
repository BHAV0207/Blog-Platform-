import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";

function CommentPage() {
  const { user, getUser, getCommentsByUserId, userComments } = useContext(UserContext);
  const [formattedComments, setFormattedComments] = useState([]);

  useEffect(() => {
    const syncing = async () => {
      await getUser();
      if (user?.id) {
        await getCommentsByUserId(user.id);
      }
    };

    syncing();
  }, [user?.id]); // ✅ Fetch only when user ID is available

  useEffect(() => {
    if (userComments.length > 0) {
      const formatted = userComments.map((comment) => ({
        ...comment,
        createdAt: new Date(comment.createdAt).toLocaleDateString("en-GB"), // ✅ Format Date (DD/MM/YYYY)
      }));
      setFormattedComments(formatted);
    }
  }, [userComments]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Comments</h1>
      <div className="mt-4">
        {formattedComments.length > 0 ? (
          formattedComments.map((comment) => (
            <div key={comment.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-lg font-semibold">{comment.content}</h2>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Created on:</span> {comment.createdAt}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Commented on:</span> {comment.BlogPost?.title || "Unknown Post"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You haven't commented on any posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default CommentPage;
