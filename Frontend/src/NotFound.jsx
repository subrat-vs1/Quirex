import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/landing/Navbar";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <img
            src="/img/not-found-illustration.png"
            alt="Not Found"
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
