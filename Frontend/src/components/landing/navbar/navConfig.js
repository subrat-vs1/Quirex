export const NAV_CONFIG = {
  guest: {
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/services", label: "Services" },
      { to: "/property", label: "Property" },
      { to: "/ContactUs", label: "ContactUs" },
    ],
    actions: [
      { type: "link", to: "/register", label: "Registration" },
      { type: "link", to: "/login", label: "Login" },
    ],
  },
  user: {
    links: [
      { to: "/", label: "Home" },
      { to: "/user-property", label: "Property" },
      { to: "/user-bought", label: "Bought" },
      { to: "/user-profile", label: "Profile" },
    ],
    actions: [{ type: "button", action: "logout", label: "LogOut" }],
  },
  admin: {
    links: [
      { to: "/", label: "Home" },
      { to: "/admin-add", label: "Add" },
      { to: "/admin-list", label: "List" },
      { to: "/admin-sold", label: "Sold" },
      { to: "/admin-user", label: "User" },
      { to: "/admin-profile", label: "Profile" },
      { to: "/admin-contact", label: "Contact" },
    ],
    actions: [{ type: "button", action: "logout", label: "LogOut" }],
  },
};
