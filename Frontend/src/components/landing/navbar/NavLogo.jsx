import { Link } from "react-router-dom";

const NavLogo = ({ size = "default" }) => {
  const logoClass =
    size === "large"
      ? "w-12 object-contain"
      : "h-8 w-8 object-contain sm:h-10 sm:w-10";

  return (
    <Link to="/" className="flex shrink-0 items-center gap-2">
      <img src="/img/brand-favicon.png" alt="Logo" className={logoClass} />
      <span className="hidden text-lg font-bold text-red-500 sm:inline">
        QUIREX
      </span>
    </Link>
  );
};

export default NavLogo;
