import React from "react";
import { Quote } from "lucide-react";

const Testimonial = () => {
  const testimonials = [
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, tempore voluptatum! Expedita nobis vel tempore nesciunt.",
      name: "Jacob William",
      role: "Selling Agent",
      img: "/img/1.jpg_1.jpeg",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, tempore voluptatum! Expedita nobis vel tempore nesciunt.",
      name: "Kelian Anderson",
      role: "Selling Agent",
      img: "/img/2.jpg_1.jpeg",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, tempore voluptatum! Expedita nobis vel tempore nesciunt.",
      name: "Adam Joseph",
      role: "Selling Agent",
      img: "/img/3.jpg_2.jpeg",
    },
  ];

  return (
    <section className="bg-[url('/img/20.jpeg')] py-16 min-h-50">
      {/* Heading */}
      <div className="text-center mb-12">
        <div className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg justify-block inline-block mb-4">
          Our Testimonial
        </div>

        <h2 className="text-3xl font-bold text-gray-800">Clients Feedback</h2>
      </div>

      {/* Cards */}
      <div
        className="max-w-7xl mx-auto px-6 grid gap-8
                      grid-cols-1 sm:grid-cols-1 lg:grid-cols-3"
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl
                       transition p-6 relative"
          >
            {/* Quote Icon */}
            <div
              className="absolute -top-5 left-6 bg-red-500 text-white
                            p-3 rounded-full shadow-lg"
            >
              <Quote size={20} />
            </div>

            {/* Text */}
            <p className="text-gray-600 mt-6 mb-6 text-sm leading-relaxed">
              {item.text}
            </p>

            {/* User */}
            <div className="flex items-center gap-4">
              <img
                src={item.img}
                className="w-14 h-14 rounded-full object-cover"
                alt={item.name}
              />

              <div>
                <h4 className="font-semibold text-gray-800">{item.name}</h4>

                <p className="text-red-500 text-sm font-medium">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
