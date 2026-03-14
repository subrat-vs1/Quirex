import { useEffect, useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { Toaster } from "sonner";

import Home from "./components/landing/Home";
import About from "./components/landing/About"
import Services from "./components/landing/Services";
import Property from "./components/landing/Property";
import ContactUs from "./components/landing/ContactUs";
import Footer from "./components/landing/Footer";
import UserRegister from "./components/landing/UserRegister";
import Login from "./components/landing/Login";

import AddProperty from "./components/admin/AddProperty";
import AdminPropertyList from "./components/admin/AdminPropertyList";
import AdminSoldProperty from "./components/admin/AdminSoldProperty";
import UserList from "./components/admin/UserList"
import AdminProfile from "./components/admin/AdminProfile";
import AdminContactUsList from "./components/admin/AdminContactUsList";

import UserProfile from "./components/users/UserProfile";
import UserBoughtList from "./components/users/UserBoughtList";
import NotFound from "./NotFound";

function App() {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserData(user);
  }, [location]);

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/property" element={<Property />} />
        <Route path="/ContactUs" element={<ContactUs />} />

        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<Login />} />

        {userData?.userType === "admin" && (
          <>
            <Route path="/admin-add" element={<AddProperty />} />
            <Route path="/admin-list" element={<AdminPropertyList />} />
            <Route path="/admin-sold" element={<AdminSoldProperty />} />
            <Route path="/admin-user" element={<UserList />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/admin-contact" element={<AdminContactUsList />} />
          </>
        )}

        {userData?.userType === "user" && (
          <>
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-bought" element={<UserBoughtList />} />
            <Route path="/user-property" element={<Property />} />
            <Route path="/ContactUs" element={<ContactUs />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
