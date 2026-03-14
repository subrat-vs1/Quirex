
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BedDouble } from "lucide-react";
import Navbar from "./Navbar";
import { toast } from "sonner";
import axios from "axios";

const Property = () => {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080/api/property-list");
    if (response?.data?.code === 200) {
      setListData(response?.data?.data);
    }
  };

  const location = useLocation();
  const navigate = useNavigate();
  const handleBuy = async (propertyId) => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (!userData?._id) {
      toast.error("Please login to buy property");
      navigate("/login");
      return;
    }
    const response = await axios.post("http://localhost:8080/api/buy", {
      propertyId,
      userId: userData?._id,
    });
    if (response?.data?.code === 200) {
      toast.success(response?.data?.message || "Property bought successfully");
    } else {
      toast.error(response?.data?.message || "Failed to buy property");
    }
  };

  return (
    <>
      {location?.pathname != "/" && <Navbar />}
      <div className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <div className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg justify-block inline-block mb-4">
            Properties
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Featured Listings
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {listData?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`http://localhost:9000/img/${item?.pic}`}
                  className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                />
                <div
                  className="absolute top-3 left-3 bg-white text-red-500
                          font-bold px-3 py-1 rounded shadow"
                >
                  ${item?.price}/Month
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item?.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item?.description}
                </p>

                {/* Property Details */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <BedDouble size={16} />
                    {item?.area}
                  </div>
                </div>

                <button
                  onClick={() => handleBuy(item?._id)}
                  className="w-full bg-red-500 hover:bg-red-600
                       text-white font-semibold py-2 rounded-lg
                       transition"
                >
                  Buy Property
                </button>
              </div>
            </div>
          ))}
        </div>

        {listData?.length === 0 && (
          <h2 className="text-center text-gray-500 mt-10 text-xl">
            No Record Found
          </h2>
        )}
      </div>
    </>
  );
};

export default Property;
