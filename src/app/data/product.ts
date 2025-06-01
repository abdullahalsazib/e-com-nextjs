import { StaticImport } from "next/dist/shared/lib/get-img-props";
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string | StaticImport;
  inStock: boolean;
}
//
// import p1 from "@/../public/product-image/image-1.png";
//
// export const products: Product[] = [
//   {
//     id: 1,
//     name: "MSI GS66 Stealth",
//     category: "Gaming Laptop",
//     brand: "MSI",
//     description:
//       '15.6" FHD 240Hz, Intel Core i9-12900H, RTX 3080 Ti, 32GB DDR5, 1TB NVMe SSD',
//     price: 2499.99,
//     originalPrice: 2799.99,
//     rating: 4.5,
//     reviewCount: 86,
//     image: p1,
//     inStock: true,
//     features: [
//       "240Hz refresh rate",
//       "Per-key RGB keyboard",
//       "Cooler Boost Trinity+",
//       "99.9Whr battery",
//     ],
//   },
// ];
