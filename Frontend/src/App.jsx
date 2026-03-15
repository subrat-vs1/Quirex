import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import useLenis from "./hooks/useLenis";
import { useTheme } from "./hooks/useTheme";

import About from "./components/landing/About";
import ContactUs from "./components/landing/ContactUs";
import Footer from "./components/landing/Footer";
import Home from "./components/landing/Home";
import Login from "./components/landing/Login";
import Property from "./components/landing/Property";
import Services from "./components/landing/Services";
import UserRegister from "./components/landing/UserRegister";

import AddProperty from "./components/admin/AddProperty";
import AdminContactUsList from "./components/admin/AdminContactUsList";
import AdminProfile from "./components/admin/AdminProfile";
import AdminPropertyList from "./components/admin/AdminPropertyList";
import AdminSoldProperty from "./components/admin/AdminSoldProperty";
import UserList from "./components/admin/UserList";

import UserBoughtList from "./components/users/UserBoughtList";
import UserProfile from "./components/users/UserProfile";
import NotFound from "./NotFound";

function App() {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const { resolvedTheme } = useTheme();

  useLenis();

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
      <Toaster position="bottom-right" richColors theme={resolvedTheme} />
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
