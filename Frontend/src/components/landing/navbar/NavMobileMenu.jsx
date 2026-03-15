import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const menuVariants = {
  hidden: { opacity: 0, y: -8, height: 0 },
  visible: { opacity: 1, y: 0, height: "auto" },
  exit: { opacity: 0, y: -8, height: 0 },
};

const NavMobileMenu = ({
  isOpen,
  links,
  actions,
  navLinkClass,
  buttonClass,
  onClose,
  onAction,
  extraContent,
}) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="overflow-hidden pb-4 2xl:hidden"
        >
          <ul className="space-y-2">
            {links.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={navLinkClass} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2">
            {extraContent && <div className="pb-2">{extraContent}</div>}

            {actions.map((item, index) => {
              if (item.type === "link") {
                return (
                  <Link
                    to={item.to}
                    key={`${item.label}-${index}`}
                    className="w-full"
                    onClick={onClose}
                  >
                    <button className={`${buttonClass} w-full`}>
                      {item.label}
                    </button>
                  </Link>
                );
              }

              return (
                <button
                  key={`${item.label}-${index}`}
                  onClick={() => {
                    onAction(item.action);
                    onClose();
                  }}
                  className={`${buttonClass} w-full`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavMobileMenu;
