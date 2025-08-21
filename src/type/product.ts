// src/types/product.ts

import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Product {
  name: string;
  description: string;
  price: number | string;
  stock: number | string;
  image_url: string;
  category_id: number | null;
  status?: string;
}
// src/types/product.ts
export interface Product2 {
  ID: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string | null;
  user_id?: number;
  name: string | undefined;
  description: string;
  price: number;
  stock: number;
  image_url: StaticImport | string;
  created_by?: number;
  CategoryID?: number;
  original_price?: number; // Optional field for discounted price
  rating?: number; // Optional field for product rating
  review_count?: number; // Optional field for review count
}

export interface ErrorType {
  err: string;
}
