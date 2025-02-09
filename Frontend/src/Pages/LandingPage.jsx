import React, { useContext, useState, useEffect } from "react";
import Header from "../Components/Header";
import Login from "../Components/Login";
import Register from "../Components/Register";
import { ModalContext } from "../Store/Context";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { saveData } from "../Utils/CarousalData";
import { Link } from "react-router-dom";

function LandingPage() {
  const { auth } = useContext(ModalContext);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  saveData();

  const carouselData = JSON.parse(localStorage.getItem("blogPosts")) || [];

  const getRandomItems = (data, count) => {
    return data.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const selectedItems = getRandomItems(carouselData, 9);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="bg-gray-100 w-screen min-h-screen flex flex-col overflow-x-hidden">
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Header />
      </div>

      <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 flex flex-col items-center justify-center py-20 px-6 text-center mt-16">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to BlogMania
        </h1>
        <p className="text-xl mb-6 max-w-2xl">
          Your go-to platform for insightful articles. Discover, learn, and
          share!
        </p>
        <Link
          to="/articles"
          className="bg-green-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          Explore Articles
        </Link>
      </div>

      <div className="w-full max-w-7xl mx-auto my-10 px-6">
        <Slider {...settings} className="rounded-lg overflow-hidden shadow-lg">
          {Array.from({ length: Math.ceil(selectedItems.length / 3) }).map(
            (_, index) => (
              <div key={index} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedItems.slice(index * 3, index * 3 + 3).map((item) => (
                    <div
                      className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-center"
                      key={item.id}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-72 object-cover rounded-lg shadow-lg"
                      />
                      <h3 className="text-2xl font-extrabold text-gray-900 mt-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 text-lg font-medium mt-2">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </Slider>
      </div>

      {/* Authentication Forms */}
      <div className="absolute bottom-10">
        {auth === "login" ? <Login /> : <Register />}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} BlogMania. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
