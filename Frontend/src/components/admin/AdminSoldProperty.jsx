import React, { useEffect, useState } from "react";
import Navbar from "../landing/NavBar";

import { Trash2 } from "lucide-react";

import axios from "axios";
import { toast } from "sonner";

const AdminSoldProperty = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin-sold-list",
      );

      if (response?.data?.code === 200) {
        setData(response.data.data);
      }
    } catch {
      toast.error("Failed to load sold properties");
    }
  };

  const handleDeleteProperty = async (_id) => {
    if (!confirm("Delete this record?")) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/delete-sold-item",
        { _id },
      );

      if (response?.data?.code === 200) {
        toast.success("Record deleted");
        fetchData();
      } else {
        toast.error(response?.data?.message);
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Sold Properties
            </h2>
          </div>

          {/* Table Card */}
          <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-white">
                <tr className="text-left">
                  <th className="p-4">#</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Area</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Media</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((item, index) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{index + 1}</td>

                    <td className="p-4 font-medium text-gray-800">
                      {item?.name}
                    </td>

                    <td className="p-4 text-gray-600">{item?.email}</td>

                    <td className="p-4">{item?.contact}</td>

                    <td className="p-4">{item?.title}</td>

                    <td className="p-4 font-semibold text-red-500">
                      ${item?.price}
                    </td>

                    <td className="p-4">{item?.area}</td>

                    <td className="p-4">{item?.location}</td>

                    <td className="p-4">
                      <img
                        src={`http://localhost:8080/img/${item?.pic}`}
                        alt=""
                        className="h-14 w-24 object-cover rounded"
                      />
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDeleteProperty(item._id)}
                        className="flex items-center gap-1
                                   text-red-500 hover:text-red-600
                                   mx-auto"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {data?.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No Record Found!</p>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminSoldProperty;
