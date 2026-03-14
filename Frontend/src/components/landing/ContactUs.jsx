import { User, Mail, Phone, Pencil, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "./Navbar"

const schemacontact = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  subject: z.string().min(2).max(200),
  message: z.string().min(5).max(1000),
});

const ContactUs = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemacontact),
  });

  const contactUser = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/contact-us",
        data,
      );

      if (response?.data?.code === 200) {
        toast.success("Message sent successfully");
        reset();
        navigate("/");
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <div className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg inline-block mb-4">
              Contact Us
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Send us a Message
            </h2>
          </div>

          {/* Form */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <form
              onSubmit={handleSubmit(contactUser)}
              className="grid gap-6 md:grid-cols-2"
            >
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Your Name
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <User className="text-gray-400" size={18} />

                  <input
                    type="text"
                    placeholder="Enter your name"
                    {...register("name")}
                    className="w-full p-2 outline-none"
                  />
                </div>

                {errors?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Your Email
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <Mail className="text-gray-400" size={18} />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="w-full p-2 outline-none"
                  />
                </div>

                {errors?.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Phone Number
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <Phone className="text-gray-400" size={18} />

                  <input
                    type="text"
                    placeholder="Phone number"
                    {...register("phone")}
                    className="w-full p-2 outline-none"
                  />
                </div>

                {errors?.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Subject
                </label>

                <div className="flex items-center border rounded-lg px-3">
                  <Pencil className="text-gray-400" size={18} />

                  <input
                    type="text"
                    placeholder="Subject"
                    {...register("subject")}
                    className="w-full p-2 outline-none"
                  />
                </div>

                {errors?.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  Message
                </label>

                <div className="flex border rounded-lg px-3 pt-2">
                  <MessageSquare className="text-gray-400 mt-2" size={18} />

                  <textarea
                    rows="4"
                    placeholder="Write your message..."
                    {...register("message")}
                    className="w-full p-2 outline-none resize-none"
                  />
                </div>

                {errors?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 text-center mt-4">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
