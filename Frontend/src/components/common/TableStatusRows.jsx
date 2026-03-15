const TableStatusRows = ({ loading, isEmpty, colSpan, skeletonRows = 4 }) => {
  if (loading) {
    return (
      <>
        {Array.from({ length: skeletonRows }).map((_, index) => (
          <tr key={`skeleton-${index}`}>
            <td colSpan={colSpan} className="px-6 py-3">
              <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
            </td>
          </tr>
        ))}
      </>
    );
  }

  if (isEmpty) {
    return (
      <tr>
        <td colSpan={colSpan} className="py-6 text-center">
          No Record Found
        </td>
      </tr>
    );
  }

  return null;
};

export default TableStatusRows;
