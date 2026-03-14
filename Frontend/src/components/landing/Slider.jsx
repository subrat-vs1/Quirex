import { Home } from "lucide-react";
import Typewriter from "typewriter-effect";

const Slider = () => {
  return (
    <div className="bg-linear-to-r from-blue-50 to-indigo-100 py-16 min-h-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
            <p className="text-lg md:text-xl text-gray-700 mb-4 flex items-center justify-center lg:justify-start">
              <Home className="mr-2 text-red-500" />
              Real Estate Agency
            </p>

            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              <Typewriter
                options={{
                  strings: ["Find the exciting Dream House."],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>

            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Make An Enquiry
            </button>
          </div>

          {/* Image Content */}
          <div className="flex-1 flex justify-center">
            <img
              src="/img/21_1.png"
              alt="Real Estate"
              className="w-full max-w-md lg:max-w-lg h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
