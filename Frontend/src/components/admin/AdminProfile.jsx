import React, { useEffect } from "react";
import Navbar from "../landing/NavBar";
import { User, Mail, Phone, Lock, MapPin, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email(),
  contact: z.string().min(10, "Invalid phone"),
  password: z.string().min(8, "Minimum 8 characters"),
  address: z.string().min(2, "Address required"),
  profile: z.any().optional(),
});

const AdminProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));

    if (!userData) return;

    setValue("name", userData.name);
    setValue("email", userData.email);
    setValue("contact", userData.contact);
    setValue("password", userData.password);
    setValue("address", userData.address);
  }, [setValue]);

  const handleRegister = async (data) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("contact", data.contact);
      formData.append("password", data.password);
      formData.append("address", data.address);

      if (data.profile?.length > 0) {
        formData.append("profile", data.profile[0]);
      }

      formData.append("userId", userData?._id);

      const response = await axios.put(
        "http://localhost:8080/api/user-update",
        formData,
      );

      if (response?.data?.code === 200) {
        toast.success("Profile updated successfully");

        localStorage.setItem("userInfo", JSON.stringify(response?.data?.data));

        reset();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Update Profile</h2>
          </div>

          {/* Card */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <form
              onSubmit={handleSubmit(handleRegister)}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <User size={18} className="text-gray-400" />

                  <input
                    {...register("name")}
                    className="w-full p-2 outline-none"
                    placeholder="Enter name"
                  />
                </div>

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <Mail size={18} className="text-gray-400" />

                  <input
                    disabled
                    {...register("email")}
                    className="w-full p-2 outline-none bg-gray-100"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <Phone size={18} className="text-gray-400" />

                  <input
                    {...register("contact")}
                    className="w-full p-2 outline-none"
                    placeholder="Phone number"
                  />
                </div>

                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <Lock size={18} className="text-gray-400" />

                  <input
                    type="password"
                    {...register("password")}
                    className="w-full p-2 outline-none"
                  />
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <MapPin size={18} className="text-gray-400" />

                  <input
                    {...register("address")}
                    className="w-full p-2 outline-none"
                    placeholder="Enter address"
                  />
                </div>

                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Profile Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <Image size={18} className="text-gray-400" />

                  <input
                    type="file"
                    {...register("profile")}
                    className="w-full p-2"
                  />
                </div>
              </div>

              {/* Button */}
              <div className="md:col-span-2 text-center mt-6">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white
                             px-8 py-3 rounded-lg font-semibold transition"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProfile;
