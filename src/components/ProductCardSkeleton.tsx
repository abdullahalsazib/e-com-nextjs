import { Skeleton } from "./ui/skeleton";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className=" rounded-sm shadow-sm p-3 flex flex-col gap-2">
      {/* Image */}
      <div className="flex items-center justify-center">
        <Skeleton className="h-[200px] w-[200px] rounded-md " />
      </div>

      {/* Title + Price */}
      <div className="flex items-center justify-between w-full">
        <Skeleton className="h-5 w-28 rounded " /> {/* product name */}
        <Skeleton className="h-5 w-16 rounded " /> {/* price */}
      </div>

      {/* Description */}
      <Skeleton className="h-4 w-full rounded " />
      <Skeleton className="h-4 w-2/3 rounded " />

      {/* Rating */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24 rounded " />
        <Skeleton className="h-3 w-6 rounded " />
      </div>

      {/* Button */}
      <Skeleton className="h-8 w-full rounded-full " />
    </div>
  );
};

export default ProductCardSkeleton;
