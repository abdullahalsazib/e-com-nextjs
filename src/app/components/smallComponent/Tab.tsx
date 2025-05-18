"use client";
import React, { useState } from "react";

const Tabs = ({ tab }: { tab: { title: string }[] }) => {
  const [activeIndex, setActiveIndex] = useState(0); // default active: first

  return (
    <ul className="flex items-center justify-start gap-4 capitalize">
      {tab.map((item, index) => (
        <li
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`cursor-pointer py-2 px-4 text-sm font-semibold relative group transition-colors duration-300
            ${
              activeIndex === index
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
        >
          {item.title}
          <span
            className={`absolute left-0 bottom-0 h-0.5 rounded-full bg-blue-500 transition-all duration-300 w-full
              ${
                activeIndex === index
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
          ></span>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
