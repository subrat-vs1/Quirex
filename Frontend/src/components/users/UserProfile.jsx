import axios from "axios";
import { useEffect } from "react";
import Navbar from "../landing/Navbar";

import { Image, Lock, Mail, MapPin, Phone, User } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { API_BASE_URL } from "../../config/api";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  contact: z.string().min(10),
  password: z.string().min(8),
  address: z.string().min(2),
  profile: z.any(),
});

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));

    if (!userData) return;

    setValue("name", userData?.name);
    setValue("email", userData?.email);
    setValue("contact", userData?.contact);
    setValue("password", userData?.password);
    setValue("address", userData?.address);
  }, [setValue]);

  const handleUpdate = async (data) => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));

    if (!data.profile || data.profile.length === 0) {
      toast.error("Please upload a profile image");
      return;
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("password", data.password);
    formData.append("address", data.address);
    formData.append("profile", data.profile[0]);
    formData.append("userId", userData?._id);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/user-update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response?.data?.code === 200) {
        toast.success(response.data.message);

        localStorage.setItem("userInfo", JSON.stringify(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Profile update failed");
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
          </div>

          {/* Form Card */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <form
              onSubmit={handleSubmit(handleUpdate)}
              className="grid gap-6 md:grid-cols-2"
            >
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium">Your Name</label>

                <div className="flex items-center border rounded-lg px-3">
                  <User size={18} className="text-gray-400" />
                  <input
                    {...register("name")}
                    className="w-full p-2 outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium">Email</label>

                <div className="flex items-center border rounded-lg px-3 bg-gray-100">
                  <Mail size={18} className="text-gray-400" />

                  <input
                    {...register("email")}
                    disabled
                    className="w-full p-2 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>

                <div className="flex items-center border rounded-lg px-3">
                  <Phone size={18} className="text-gray-400" />

                  <input
                    {...register("contact")}
                    className="w-full p-2 outline-none"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 font-medium">Password</label>

                <div className="flex items-center border rounded-lg px-3">
                  <Lock size={18} className="text-gray-400" />

                  <input
                    type="password"
                    {...register("password")}
                    className="w-full p-2 outline-none"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block mb-1 font-medium">Address</label>

                <div className="flex items-center border rounded-lg px-3">
                  <MapPin size={18} className="text-gray-400" />

                  <input
                    {...register("address")}
                    className="w-full p-2 outline-none"
                    placeholder="Your address"
                  />
                </div>
              </div>

              {/* Profile Image */}
              <div>
                <label className="block mb-1 font-medium">
                  Profile Picture
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

              {/* Submit */}
              <div className="md:col-span-2 text-center mt-4">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600
                             text-white font-semibold
                             px-8 py-3 rounded-lg transition"
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

export default UserProfile;
