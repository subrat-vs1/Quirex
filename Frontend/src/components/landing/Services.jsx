import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Services = () => {
  const location = useLocation();
  const cards = [
    {
      title: "Buy a home",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      img: "/img/service-buy-home.png",
      aos: "fade-right",
    },
    {
      title: "Rent a home",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      img: "/img/service-rent-home.png",
      aos: "zoom-in-up",
    },
    {
      title: "Sell a home",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      img: "/img/service-sell-home.png",
      aos: "fade-left",
    },
  ];

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <>
      {location?.pathname !== "/" && <Navbar />}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 py-8 min-h-100 overflow-x-clip">
        <div className="text-center mb-8">
          <div className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg justify-block inline-block mb-4">
            Our Services
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Our Main Focus</h2>
        </div>
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <div
                key={i}
                data-aos={card.aos}
                className="bg-white shadow-lg p-6 text-center rounded-lg"
              >
                <img
                  src={card.img}
                  className="w-1/2 mx-auto"
                  alt={card.title}
                />

                <h3 className="py-3 text-xl font-bold">{card.title}</h3>

                <p>{card.text}</p>

                <p className="py-4 text-green-600">
                  <span className="bg-gray-100 px-3 py-2 rounded">
                    Find A Home →
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
