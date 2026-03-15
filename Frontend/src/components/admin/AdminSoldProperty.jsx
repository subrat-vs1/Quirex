import { useEffect, useState } from "react";
import Navbar from "../landing/Navbar";

import { Trash2 } from "lucide-react";

import axios from "axios";
import { toast } from "sonner";
import { API_BASE_URL, MEDIA_BASE_URL } from "../../config/api";
import SectionHeader from "../common/SectionHeader";
import TableActionButton from "../common/TableActionButton";
import TableCard from "../common/TableCard";
import TableImageCell from "../common/TableImageCell";
import TableStatusRows from "../common/TableStatusRows";

const AdminSoldProperty = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin-sold-list`);

      if (response?.data?.code === 200) {
        setData(response.data.data);
      }
    } catch {
      toast.error("Failed to load sold properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (_id) => {
    if (!confirm("Delete this record?")) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/delete-sold-item`, {
        _id,
      });

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
          <SectionHeader title="Sold Properties" className="mb-10" />

          <TableCard>
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
                <TableStatusRows
                  loading={loading}
                  isEmpty={!loading && data.length === 0}
                  colSpan={10}
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

                      <td className="p-4">{item?.title}</td>

                      <td className="p-4 font-semibold text-red-500">
                        ${item?.price}
                      </td>

                      <td className="p-4">{item?.area}</td>

                      <td className="p-4">{item?.location}</td>

                      <td className="p-4">
                        <TableImageCell
                          src={`${MEDIA_BASE_URL}/img/${item?.pic}`}
                          alt={item?.title || "Property"}
                        />
                      </td>

                      <td className="p-4 text-center">
                        <TableActionButton
                          onClick={() => handleDeleteProperty(item._id)}
                          className="flex items-center gap-1
                                   text-red-500 hover:text-red-600
                                   mx-auto"
                        >
                          <Trash2 size={16} />
                          Delete
                        </TableActionButton>
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

export default AdminSoldProperty;
