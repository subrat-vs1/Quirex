import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL, MEDIA_BASE_URL } from "../../config/api";
import SectionHeader from "../common/SectionHeader";
import TableCard from "../common/TableCard";
import TableImageCell from "../common/TableImageCell";
import TableStatusRows from "../common/TableStatusRows";
import Navbar from "../landing/Navbar";

const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin-user-list`);

      if (response?.data?.code === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Registered Users" className="mb-10" />

          <TableCard>
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
                <TableStatusRows
                  loading={loading}
                  isEmpty={!loading && data.length === 0}
                  colSpan={6}
                />

                {!loading &&
                  data?.map((item, index) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{index + 1}</td>

                      <td className="p-4 font-medium text-gray-800">
                        {item?.name}
                      </td>

                      <td className="p-4 text-gray-600">{item?.email}</td>

                      <td className="p-4">{item?.contact}</td>

                      <td className="p-4 text-gray-600">{item?.address}</td>

                      <td className="p-4">
                        <TableImageCell
                          src={`${MEDIA_BASE_URL}/img/${item?.profile}`}
                          alt="profile"
                          className="h-14 w-20 object-cover rounded-md border"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </TableCard>
        </div>
      </section>
    </>
  );
};

export default UserList;
