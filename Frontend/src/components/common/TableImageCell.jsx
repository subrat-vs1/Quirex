const TableImageCell = ({
  src,
  alt,
  className = "h-14 w-24 object-cover rounded",
}) => {
  return <img src={src} alt={alt} className={className} />;
};

export default TableImageCell;
