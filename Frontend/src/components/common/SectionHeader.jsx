const SectionHeader = ({ badge, title, className = "" }) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {badge && (
        <div className="inline-block rounded-lg bg-red-500 px-6 py-2 font-bold text-white mb-4">
          {badge}
        </div>
      )}
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
  );
};

export default SectionHeader;
