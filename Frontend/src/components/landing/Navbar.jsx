import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../theme/ThemeToggle";
import NavDesktopMenu from "./navbar/NavDesktopMenu";
import NavLogo from "./navbar/NavLogo";
import NavMobileMenu from "./navbar/NavMobileMenu";
import { NAV_CONFIG } from "./navbar/navConfig";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserData(user);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleAction = (action) => {
    if (action === "logout") {
      handleLogout();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navLinkClass =
    "block whitespace-nowrap py-2 text-gray-800 font-bold transition-colors duration-200 hover:text-red-500 2xl:inline 2xl:px-2";
  const buttonClass =
    "px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors duration-200";

  const userRole =
    userData?.userType === "admin"
      ? "admin"
      : userData?.userType === "user"
        ? "user"
        : "guest";

  const menuConfig = NAV_CONFIG[userRole];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-20">
        <div className="flex min-h-18 items-center justify-between">
          <NavLogo />

          <NavDesktopMenu
            links={menuConfig.links}
            actions={menuConfig.actions}
            navLinkClass={navLinkClass}
            buttonClass={buttonClass}
            onAction={handleAction}
            extraContent={<ThemeToggle />}
          />

          <button
            className="text-gray-800 transition-colors hover:text-red-500 2xl:hidden"
            onClick={toggleMenu}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <NavMobileMenu
          isOpen={isMenuOpen}
          links={menuConfig.links}
          actions={menuConfig.actions}
          navLinkClass={navLinkClass}
          buttonClass={buttonClass}
          onClose={() => setIsMenuOpen(false)}
          onAction={handleAction}
          extraContent={<ThemeToggle />}
        />
      </div>
    </nav>
  );
};

export default Navbar;
