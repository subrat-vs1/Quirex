import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  ImagePlus,
  KeyRound,
  Mail,
  MapPinHouse,
  Phone,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Navbar from "./Navbar";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().length(10, "Phone number must be at least 10 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
  address: z.string().min(1, "Address is required"),
  profile: z.any().optional(),
});

const UserRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleRegistration = async (data) => {
    try {
      const formData = new FormData();
      console.log("FORM DATA:", data);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("contact", data.contact);
      formData.append("password", data.password);
      formData.append("address", data.address);
      if (data.profile?.[0]) {
        formData.append("profile", data.profile[0]);
      }

      const response = await axios.post(
        "http://localhost:8080/api/user-register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data?.code === 200) {
        toast.success("Registration successful!");
      } else {
        toast.error(
          response?.data?.message || "Registration failed. Please try again.",
        );
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className=" flex items-center justify-center bg-gray-50 p-18">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Register Here
          </h2>

          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name
                </label>

                <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-red-400">
                  <User className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter your name"
                    className="w-full py-2 outline-none"
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Email
                </label>

                <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-red-400">
                  <Mail className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className="w-full py-2 outline-none"
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>

                <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-red-400">
                  <Phone className="text-gray-400 mr-2" />
                  <input
                    type="tel"
                    {...register("contact")}
                    placeholder="Enter phone number"
                    className="w-full py-2 outline-none"
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>

                <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-red-400">
                  <KeyRound className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className="w-full py-2 outline-none"
                  />
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Address
                </label>

                <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-red-400">
                  <MapPinHouse className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    {...register("address")}
                    placeholder="Enter your address"
                    className="w-full py-2 outline-none"
                  />
                </div>

                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Profile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Profile Picture
                </label>

                <div className="flex items-center border rounded-lg px-3 py-2">
                  <ImagePlus className="text-gray-400 mr-2" />
                  <input
                    type="file"
                    {...register("profile")}
                    className="w-full text-sm"
                  />
                </div>

                {errors.profile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.profile.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
