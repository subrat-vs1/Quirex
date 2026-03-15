const TableCard = ({ children, className = "" }) => {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-white shadow-lg ${className}`}
    >
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};

export default TableCard;
