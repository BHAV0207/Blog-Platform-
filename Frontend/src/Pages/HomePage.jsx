import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Store/UserContext";
import { ThemeContext } from "../Store/ThemeContext";
import HomePageHeader from "../Components/HomePageHeader";
import ProfilePage from "../Components/ProfilePage";
import FeedPage from "../Components/FeedPage";
import UserPosts from "../Components/UserPosts";
import CreatePost from "../Components/CreatePost";
import CommentPage from "../Components/CommentPage";

function HomePage() {
  const { user, getUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState("feed");

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === "light"
          ? " text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <div className="sticky top-0 z-50">
        <HomePageHeader
          user={user}
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
      </div>

      <div
        className={`flex-grow p-6 transition-colors duration-300 ${
          theme === "light" ? "bg-white shadow-sm" : "bg-gray-800"
        }`}
      >
        {activeSection === "profile" && <ProfilePage />}
        {activeSection === "feed" && <FeedPage />}
        {activeSection === "posts" && <UserPosts />}
        {activeSection === "createPost" && <CreatePost />}
        {activeSection === "comments" && <CommentPage />}
      </div>
    </div>
  );
}

export default HomePage;
