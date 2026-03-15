import axios from "axios";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "../../config/api";
import SectionHeader from "../common/SectionHeader";
import TableActionButton from "../common/TableActionButton";
import TableCard from "../common/TableCard";
import TableStatusRows from "../common/TableStatusRows";
import Navbar from "../landing/Navbar";

const AdminContactUsList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/contact-us-list`);

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
        <SectionHeader title="Contact Messages" className="mb-10" />

        <TableCard className="shadow-md">
          <table className="w-full text-left">
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

                    <td className="px-6 py-3 font-medium">{item.name}</td>

                    <td className="px-6 py-3">{item.email}</td>

                    <td className="px-6 py-3">
                      {item?.contact || item?.phone || "-"}
                    </td>

                    <td className="px-6 py-3">{item?.subject || "-"}</td>

                    <td className="px-6 py-3 text-gray-600">
                      {item?.message ? `${item.message.slice(0, 30)}...` : "-"}
                    </td>

                    <td className="px-6 py-3 text-center">
                      <TableActionButton
                        onClick={() => showMessage(item.message)}
                        className="p-2 rounded-md bg-gray-100
                                   hover:bg-red-500 hover:text-white
                                   transition"
                      >
                        <Eye size={18} />
                      </TableActionButton>
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

export default AdminContactUsList;
