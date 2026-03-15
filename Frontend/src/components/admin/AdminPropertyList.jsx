import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL, MEDIA_BASE_URL } from "../../config/api";
import PropertyCard from "../common/PropertyCard";
import PropertyCardSkeleton from "../common/PropertyCardSkeleton";
import SectionHeader from "../common/SectionHeader";
import Navbar from "../landing/Navbar";

const AdminPropertyList = () => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/property-list`);

      if (response?.data?.code === 200) {
        setListData(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (_id) => {
    if (!confirm("Delete this property?")) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/delete-property`, {
        _id,
      });

      if (response?.data?.code === 200) {
        toast.success("Property deleted");
        fetchData();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="py-16 bg-gray-50">
        <SectionHeader badge="Properties" title="Featured Listings" />

        <div className="max-w-7xl mx-auto px-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <PropertyCardSkeleton key={`admin-property-loading-${index}`} />
              ))
            : listData?.map((item) => (
                <PropertyCard
                  key={item._id}
                  item={item}
                  mediaBaseUrl={MEDIA_BASE_URL}
                  buttonLabel="Delete Property"
                  onAction={handleDeleteProperty}
                  actionIcon={<Trash2 size={16} />}
                />
              ))}
        </div>

        {!loading && listData?.length === 0 && (
          <h2 className="text-center text-gray-500 mt-10 text-xl">
            No Record Found
          </h2>
        )}
      </div>
    </>
  );
};

export default AdminPropertyList;
