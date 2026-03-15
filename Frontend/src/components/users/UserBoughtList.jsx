import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL, MEDIA_BASE_URL } from "../../config/api";
import SectionHeader from "../common/SectionHeader";
import TableCard from "../common/TableCard";
import TableImageCell from "../common/TableImageCell";
import TableStatusRows from "../common/TableStatusRows";
import Navbar from "../landing/Navbar";

const UserBoughtList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));

      const response = await axios.post(`${API_BASE_URL}/user-bought-list`, {
        userId: userData?._id,
      });

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
        <SectionHeader title="Bought Properties" className="mb-8" />

        <TableCard>
          <table className="w-full text-left">
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

            <tbody className="divide-y">
              <TableStatusRows
                loading={loading}
                isEmpty={!loading && list.length === 0}
                colSpan={7}
              />

              {!loading &&
                list.map((item, index) => (
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
                      <TableImageCell
                        src={`${MEDIA_BASE_URL}/img/${item.pic}`}
                        alt={item.title}
                        className="w-24 h-14 object-cover rounded-md border"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TableCard>
      </section>
    </>
  );
};

export default UserBoughtList;
