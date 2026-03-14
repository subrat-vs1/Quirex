import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserData(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsMenuOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClass =
    "text-gray-800 font-bold hover:text-red-500 transition-colors duration-200 block md:inline md:px-2 py-2";
  const buttonClass =
    "px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors duration-200";

  // Admin Navbar
  if (userData?.userType === "admin") {
    return (
      <>
        <nav className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
          <div className="max-w-8xl mx-auto px-20">
            <div className="flex justify-between items-center h-18">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/img/favicon.png"
                  alt="Logo"
                  className="mr-2 w-12 object-contain"
                />
                <span className="text-red-500 font-bold text-lg hidden sm:inline">
                  QUIREX
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <ul className="flex gap-6">
                  <li>
                    <Link to="/" className={navLinkClass}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin-add" className={navLinkClass}>
                      Add
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin-list" className={navLinkClass}>
                      List
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin-sold" className={navLinkClass}>
                      Sold
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin-user" className={navLinkClass}>
                      User
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin-profile" className={navLinkClass}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin-contact" className={navLinkClass}>
                      Contact
                    </Link>
                  </li>
                </ul>
                <button onClick={handleLogout} className={buttonClass}>
                  LogOut
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-800 hover:text-red-500 transition-colors"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden pb-4">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-add"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Add
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-list"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      List
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-sold"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sold
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-user"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      User
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-profile"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-contact"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                <button
                  onClick={handleLogout}
                  className={`${buttonClass} w-full mt-4`}
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        </nav>
      </>
    );
  }

  // User Navbar
  else if (userData?.userType === "user") {
    return (
      <>
        <nav className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-20">
            <div className="flex justify-between items-center h-18">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/img/favicon.png"
                  alt="Logo"
                  className="h-8 w-8 object-contain"
                />
                <span className="text-red-500 font-bold text-lg hidden sm:inline">
                  QUIREX
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <ul className="flex gap-6">
                  <li>
                    <Link to="/" className={navLinkClass}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-property" className={navLinkClass}>
                      Property
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-bought" className={navLinkClass}>
                      Bought
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-profile" className={navLinkClass}>
                      Profile
                    </Link>
                  </li>
                </ul>
                <button onClick={handleLogout} className={buttonClass}>
                  LogOut
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-800 hover:text-red-500 transition-colors"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden pb-4">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user-property"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Property
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user-bought"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Bought
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user-profile"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
                <button
                  onClick={handleLogout}
                  className={`${buttonClass} w-full mt-4`}
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        </nav>
      </>
    );
  }

  // Guest Navbar
  else {
    return (
      <>
        <nav className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-20">
            <div className="flex justify-between items-center h-18">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/img/favicon.png"
                  alt="Logo"
                  className="h-8 w-8 object-contain"
                />
                <span className="text-red-500 font-bold text-lg hidden sm:inline">
                  QUIREX
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <ul className="flex gap-6">
                  <li>
                    <Link to="/" className={navLinkClass}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className={navLinkClass}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className={navLinkClass}>
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/property" className={navLinkClass}>
                      Property
                    </Link>
                  </li>
                  <li>
                    <Link to="/ContactUS" className={navLinkClass}>
                      ContactUs
                    </Link>
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Link to="/register">
                    <button className={buttonClass}>Registration</button>
                  </Link>
                  <Link to="/login">
                    <button className={buttonClass}>Login</button>
                  </Link>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-800 hover:text-red-500 transition-colors"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden pb-4">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/property"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Property
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/ContactUS"
                      className={navLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ContactUs
                    </Link>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 mt-4">
                  <Link to="/register" className="w-full">
                    <button className={`${buttonClass} w-40`}>
                      Registration
                    </button>
                  </Link>
                  <Link to="/login" className="w-full">
                    <button className={`${buttonClass} w-40`}>Login</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </>
    );
  }
};

export default Navbar;
