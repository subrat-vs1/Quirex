import Navbar from "./Navbar"
import { Building2, Users, ShieldCheck, MapPin } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <div className="inline-block bg-red-100 text-red-500 px-5 py-1 rounded-full font-semibold mb-3">
              About Us
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              Find Your Perfect Property With Confidence
            </h1>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Our platform is designed to simplify the process of discovering
              and purchasing properties. We connect buyers with high-quality
              listings while providing a transparent and secure experience.
            </p>
          </div>
          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <img
              src="/img/1.jpg.jpeg"
              alt="About"
              className="rounded-xl shadow-lg"
            />

            {/* Text */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                A Modern Real Estate Platform
              </h2>

              <p className="text-gray-600 mb-4">
                Our web application allows users to explore properties,
                communicate with agents, and manage their purchases in a
                seamless digital environment. The goal is to make property
                discovery simple, transparent, and accessible.
              </p>

              <p className="text-gray-600 mb-6">
                Users can browse property listings, view details such as price,
                location, and area, and securely purchase properties. The
                platform also allows administrators to manage listings and
                respond to customer inquiries efficiently.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Building2 className="text-red-500" />
                  <span className="font-medium">Quality Listings</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="text-red-500" />
                  <span className="font-medium">Trusted Buyers</span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-red-500" />
                  <span className="font-medium">Secure Transactions</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-red-500" />
                  <span className="font-medium">Verified Locations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              We aim to provide a reliable and user-friendly platform that
              simplifies the property buying experience. By combining modern
              technology with a transparent system, we help users discover
              properties that match their needs and make informed decisions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
