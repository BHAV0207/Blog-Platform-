import React, { useContext, useEffect } from "react";
import { UserContext } from "../Store/UserContext";

function CommentPage() {
  const { getCommentsById, userComments } = useContext(UserContext);

  useEffect(() => {
    getCommentsById();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">My Comments</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        {userComments.length > 0 ? (
          userComments.map((comment) => (
            <div key={comment.id} className="border-b py-2">
              <p className="font-semibold">{comment.User.name}: </p>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments available.</p>
        )}
      </div>
    </div>
  );
}

export default CommentPage;
