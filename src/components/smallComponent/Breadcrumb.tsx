"use client";
import Link from "next/link";
import React from "react";
import { GoChevronRight } from "react-icons/go";

interface BreadcrumbProps {
  items: {
    label: string;
    link?: string | undefined;
    active?: boolean;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="py-3 text-xs font-semibold uppercase flex items-center justify-start gap-1 text-gray-800 flex-wrap">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.link && item.link.length >= 0 ? (
            <Link href={item.link}>
              <p
                className={`${
                  item.active
                    ? " font-light text-gray-600"
                    : " cursor-pointer text-gray-800"
                }`}
              >
                {item.label}
              </p>
            </Link>
          ) : (
            <p
              // this p for show the content
              className={`${
                item.active
                  ? " font-light text-gray-600"
                  : " cursor-pointer text-gray-800"
              }`}
            >
              {item.label}
            </p>
          )}
          {index < items.length - 1 && (
            <GoChevronRight className="text-blue-500" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
