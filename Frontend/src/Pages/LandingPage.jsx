import React, { useContext } from "react";
import Header from "../Components/Header";
import Login from "../Components/Login";
import Register from "../Components/Register";
import { ModalContext } from "../Store/Context";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { saveData } from "../Utils/CarousalData";

function LandingPage() {
  const { auth } = useContext(ModalContext);

  saveData();

  const carouselData = JSON.parse(localStorage.getItem("blogPosts")) || [];

  // Function to get three random items from the carousel data
  const getRandomItems = (data, count) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Get three random items for the carousel
  const selectedItems = getRandomItems(carouselData, 3);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-gray-100 w-screen h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-grow overflow-hidden p-6">
        <Slider
          {...settings}
          className="w-full max-w-full px-4 overflow-hidden"
        >
          {selectedItems.map((item) => (
            <div
              className="p-6 transition-transform transform hover:scale-105 bg-white rounded-lg shadow-md flex flex-col items-center text-center overflow-hidden p-6"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.title}
                className="max-w-full max-h-[500px] w-auto h-auto rounded-lg shadow-lg mb-4 object-contain overflow-hidden"
              />
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-lg font-medium max-w-2xl">
                {item.description}
              </p>
            </div>
          ))}
        </Slider>
      </div>
      {auth === "login" ? <Login /> : <Register />}
    </div>
  );
}

export default LandingPage;
