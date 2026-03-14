import React, { useEffect, useState } from "react";
import Navbar from "../landing/NavBar";
import axios from "axios";

const UserBoughtList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));

      const response = await axios.post(
        "http://localhost:8080/api/user-bought-list",
        { userId: userData?._id },
      );

      if (response?.data?.code === 200) {
        setList(response.data.data);
      }
    } catch (error) {
      console.error("Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-red-500 text-center mb-8">
          Bought Properties
        </h1>

        {/* Table Container */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              {/* Header */}
              <thead className="bg-gray-900 text-white text-sm">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Area</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Media</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y">
                {loading && (
                  <tr>
                    <td colSpan="7" className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                )}

                {!loading && list.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-6">
                      No Record Found
                    </td>
                  </tr>
                )}

                {list.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3">{index + 1}</td>

                    <td className="px-6 py-3 font-medium">{item.title}</td>

                    <td className="px-6 py-3 text-green-600 font-semibold">
                      ${item.price}
                    </td>

                    <td className="px-6 py-3">{item.area}</td>

                    <td className="px-6 py-3 text-gray-600 max-w-xs truncate">
                      {item.description}
                    </td>

                    <td className="px-6 py-3">{item.location}</td>

                    <td className="px-6 py-3">
                      <img
                        src={`http://localhost:8080/img/${item.pic}`}
                        alt={item.title}
                        className="w-24 h-14 object-cover rounded-md border"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserBoughtList;
