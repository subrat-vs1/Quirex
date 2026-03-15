import { Link } from "react-router-dom";

const NavDesktopMenu = ({
  links,
  actions,
  navLinkClass,
  buttonClass,
  onAction,
  extraContent,
}) => {
  return (
    <div className="hidden items-center gap-4 2xl:flex 2xl:gap-8">
      <ul className="flex items-center gap-2 2xl:gap-6">
        {links.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className={navLinkClass}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {extraContent}

        {actions.map((item, index) => {
          if (item.type === "link") {
            return (
              <Link to={item.to} key={`${item.label}-${index}`}>
                <button className={buttonClass}>{item.label}</button>
              </Link>
            );
          }

          return (
            <button
              key={`${item.label}-${index}`}
              onClick={() => onAction(item.action)}
              className={buttonClass}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavDesktopMenu;
