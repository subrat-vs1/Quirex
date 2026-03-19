import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Navbar from "../landing/Navbar";

const UserList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin-user-list",
      );

      if (response?.data?.code === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Registered Users
            </h2>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-white">
                <tr className="text-left">
                  <th className="p-4">#</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Profile</th>
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

                    <td className="p-4 text-gray-600">{item?.address}</td>

                    <td className="p-4">
                      <img
                        src={`http://localhost:8080/img/${item?.profile}`}
                        alt="profile"
                        className="h-14 w-20 object-cover rounded-md border"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data?.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No Record Found!</p>
          )}
        </div>
      </section>
    </>
  );
};

export default UserList;
