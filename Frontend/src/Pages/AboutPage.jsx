import React, { useContext } from "react";
import Header from "../Components/Header";
import Login from "../Components/Login";
import Register from "../Components/Register";
import { ModalContext } from "../Store/Context";

function AboutPage() { 

  const {auth}  = useContext(ModalContext);
  return (
    
    <div className="max-w-4xl mx-auto p-8">
      <Header />
      <h1 className="text-4xl font-bold mb-6 text-center">About BlogMania</h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        Welcome to <strong>BlogMania</strong>, your ultimate destination for insightful articles, opinions, and ideas!
        Our platform is designed for creators, thinkers, and readers to come together and share knowledge across various domains.
      </p>

      <h2 className="text-2xl font-semibold mt-6">🌟 Our Mission</h2>
      <p className="text-lg text-gray-700 mt-2">
        At BlogMania, we believe in the power of words and the impact of storytelling. Our goal is to provide a 
        space where writers can freely express their thoughts while readers can engage with meaningful content that 
        inspires, educates, and entertains.
      </p>

      <h2 className="text-2xl font-semibold mt-6">📝 What We Offer</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 mt-2 space-y-2">
        <li>🌍 A diverse collection of blog posts on various topics.</li>
        <li>✍️ A platform for aspiring and experienced writers.</li>
        <li>💬 Engaging discussions through comments and feedback.</li>
        <li>📚 Personalized reading recommendations.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">🤝 Join Our Community</h2>
      <p className="text-lg text-gray-700 mt-2">
        Become a part of the BlogMania family! Whether you’re a reader, writer, or just someone who loves to explore
        new ideas, there’s a place for you here.
      </p>

      <h2 className="text-2xl font-semibold mt-6">📩 Get In Touch</h2>
      <p className="text-lg text-gray-700 mt-2">
        Have questions or suggestions? Reach out to us at <a href="mailto:support@blogmania.com" className="text-blue-500 hover:underline">support@blogmania.com</a>.
      </p>

      <p className="text-lg text-gray-700 mt-6 text-center font-semibold">Happy Reading! 📖✨</p>


      <div className="relative z-10 absolute bottom-10">
        {auth === "login" ? <Login /> : <Register />}
      </div>

      {/* ✅ Footer */}
      <footer className="relative z-10 bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} BlogMania. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutPage;
