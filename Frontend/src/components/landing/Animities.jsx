import {
  Car,
  Waves,
  ShieldCheck,
  Stethoscope,
  Library,
  BedDouble,
  Home,
  Landmark,
  ArrowRight,
} from "lucide-react";

const OurAmenities = () => {
  const amenities = [
    { title: "Parking Space", icon: Car },
    { title: "Swimming Pool", icon: Waves },
    { title: "Private Security", icon: ShieldCheck },
    { title: "Medical Center", icon: Stethoscope },
    { title: "Library Area", icon: Library },
    { title: "King Size Beds", icon: BedDouble },
    { title: "Smart Homes", icon: Home },
    { title: "Bridge Garden", icon: Landmark },
  ];

  return (
    <section className="bg-linear-to-r from-blue-50 to-indigo-100 py-16 min-h-50">
      {/* Heading */}
      <div className="text-center mb-12">
        <div className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg justify-block inline-block mb-4">
          Our Amenities
        </div>

        <h2 className="text-3xl font-bold text-gray-800">Building Amenities</h2>
      </div>

      {/* Amenities Grid */}
      <div className="max-w-7xl mx-auto px-6 grid gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
      >

        {amenities.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center relative"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100 text-red-500 group-hover:bg-red-500 group-hover:text-white transition"
              >
                <Icon size={28} />
              </div>

              {/* Title */}
              <h4 className="font-semibold text-gray-800 mb-4">{item.title}</h4>

              {/* Arrow Button */}
              <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-500  group-hover:text-white transition"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurAmenities;
