// src/components/CategoryDropdown.tsx
"use client";

import { getCategorys } from "@/services/category.service";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export default function CategoryDropdown() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategorys();
        console.log(data.data);
        setCategories(data.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <label
        htmlFor="category"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Select Category
      </label>
      <select
        id="category"
        value={selected ?? ""}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="" disabled>
          -- Select a category --
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
