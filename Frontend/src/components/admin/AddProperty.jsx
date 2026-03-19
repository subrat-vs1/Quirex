import { Home, DollarSign, MapPin, Ruler, FileText, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "../landing/NavBar";

const schema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  price: z.string().min(1, "Price required"),
  area: z.string().min(2, "Area required"),
  location: z.string().min(2, "Location required"),
  description: z.string().min(2, "Description required"),
  pic: z.any(),
});

const AddProperty = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const addProperty = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("area", data.area);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("pic", data.pic[0]);

      const response = await axios.post(
        "http://localhost:8080/api/add-property",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data?.code === 200) {
        toast.success("Property added successfully");
        reset();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Failed to add property");
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Add Property</h2>
          </div>

          {/* Form Card */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <form
              onSubmit={handleSubmit(addProperty)}
              className="grid gap-6 md:grid-cols-2"
            >
              {/* Title */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Property Title
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <Home size={18} className="text-gray-400" />

                  <input
                    {...register("title")}
                    type="text"
                    placeholder="Enter property title"
                    className="w-full p-2 outline-none"
                  />
                </div>

                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Price
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <DollarSign size={18} className="text-gray-400" />

                  <input
                    {...register("price")}
                    type="text"
                    placeholder="Enter price"
                    className="w-full p-2 outline-none"
                  />
                </div>

                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Area */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Area
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <Ruler size={18} className="text-gray-400" />

                  <input
                    {...register("area")}
                    type="text"
                    placeholder="Enter area"
                    className="w-full p-2 outline-none"
                  />
                </div>

                {errors.area && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.area.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Location
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <MapPin size={18} className="text-gray-400" />

                  <input
                    {...register("location")}
                    type="text"
                    placeholder="Enter location"
                    className="w-full p-2 outline-none"
                  />
                </div>

                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  Description
                </label>

                <div className="flex border rounded-lg px-3 pt-2">
                  <FileText size={18} className="text-gray-400 mt-2" />

                  <textarea
                    {...register("description")}
                    rows="3"
                    placeholder="Enter description"
                    className="w-full p-2 outline-none resize-none"
                  />
                </div>

                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Image */}
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  Property Image
                </label>

                <div className="flex items-center border rounded-lg px-3 py-2">
                  <Image size={18} className="text-gray-400 mr-2" />

                  <input
                    {...register("pic")}
                    type="file"
                    accept="image/*"
                    className="w-full text-sm"
                  />
                </div>
              </div>

              {/* Button */}
              <div className="md:col-span-2 text-center mt-4">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600
                             text-white font-semibold
                             px-8 py-3 rounded-lg
                             transition"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProperty;
