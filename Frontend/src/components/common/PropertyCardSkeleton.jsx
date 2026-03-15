const PropertyCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <div className="h-52 w-full animate-pulse bg-gray-200" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
        <div className="h-9 w-full animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
