import React, { useEffect, useState } from "react";
import Navbar from "../landing/Navbar";
import axios from "axios";
import { toast } from "sonner";
import { Eye } from "lucide-react";

const AdminContactUsList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/contact-us-list",
      );

      if (response?.data?.code === 200) {
        setList(response?.data?.data);
      }
    } catch (error) {
      toast.error("Failed to fetch contact list");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (message) => {
    toast(message);
  };

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Contact Messages</h2>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              {/* Table Head */}
              <thead className="bg-gray-900 text-white text-sm">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3 text-center">View</th>
                </tr>
              </thead>

              {/* Table Body */}
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

                    <td className="px-6 py-3 font-medium">{item.name}</td>

                    <td className="px-6 py-3">{item.email}</td>

                    <td className="px-6 py-3">{item.contact}</td>

                    <td className="px-6 py-3">{item.subject}</td>

                    <td className="px-6 py-3 text-gray-600">
                      {item.message.slice(0, 30)}...
                    </td>

                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => showMessage(item.message)}
                        className="p-2 rounded-md bg-gray-100
                                   hover:bg-red-500 hover:text-white
                                   transition"
                      >
                        <Eye size={18} />
                      </button>
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

export default AdminContactUsList;
