"use client";
import React from "react";
import { GoChevronRight } from "react-icons/go";

interface BreadcrumbProps {
  items: {
    label: string;
    active?: boolean;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="py-3 text-xs font-semibold uppercase flex items-center justify-start gap-1 text-gray-800 flex-wrap">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <p
            className={`${
              item.active ? "font-light text-gray-600" : "text-gray-800"
            }`}
          >
            {item.label}
          </p>
          {index < items.length - 1 && (
            <GoChevronRight className="text-blue-500" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
