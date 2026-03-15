import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { KeyRound, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { API_BASE_URL } from "../../config/api";
import Navbar from "./Navbar";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, data);
      if (response?.data?.code === 200) {
        toast.success("Login successful");
        localStorage.setItem("userInfo", JSON.stringify(response?.data?.data));
        if (response?.data?.data?.userType === "admin") {
          navigate("/admin-add");
        } else if (response?.data?.data?.userType === "user") {
          navigate("/user-property");
        }
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Login failed. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-20">
        <div className="max-w-md mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-8">
            <div className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg justify-block inline-block mb-4">
              Welcome Back
            </div>

            <h2 className="text-3xl font-bold text-gray-800">Login Here</h2>
          </div>

          {/* Login Card */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Your Email
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <Mail size={18} className="text-gray-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="w-full p-2 outline-none"
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Password
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <KeyRound size={18} className="text-gray-400" />

                  <input
                    type="password"
                    placeholder="Enter your password"
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

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600
                           text-white font-semibold
                           py-3 rounded-lg transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
