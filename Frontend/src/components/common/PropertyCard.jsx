import { motion } from "framer-motion";
import { BedDouble } from "lucide-react";

const PropertyCard = ({
  item,
  mediaBaseUrl,
  buttonLabel,
  onAction,
  actionIcon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="group overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={`${mediaBaseUrl}/img/${item?.pic}`}
          alt={item?.title || "Property"}
          className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 rounded bg-white px-3 py-1 font-bold text-red-500 shadow">
          ${item?.price}/Month
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold text-gray-800">
          {item?.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {item?.description}
        </p>

        <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <BedDouble size={16} />
            {item?.area}
          </div>
        </div>

        <button
          onClick={() => onAction(item?._id)}
          className="w-full rounded-lg bg-red-500 py-2 font-semibold text-white transition hover:bg-red-600"
        >
          {actionIcon ? (
            <span className="inline-flex items-center gap-2">
              {actionIcon}
              {buttonLabel}
            </span>
          ) : (
            buttonLabel
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
