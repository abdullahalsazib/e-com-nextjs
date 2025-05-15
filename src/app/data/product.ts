interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string | StaticImport;
  inStock: boolean;
  features?: string[];
}

import p1 from "@/../public/product-image/image-1.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export const products: Product[] = [
  {
    id: 1,
    name: "MSI GS66 Stealth",
    category: "Gaming Laptop",
    brand: "MSI",
    description:
      '15.6" FHD 240Hz, Intel Core i9-12900H, RTX 3080 Ti, 32GB DDR5, 1TB NVMe SSD',
    price: 2499.99,
    originalPrice: 2799.99,
    rating: 4.5,
    reviewCount: 86,
    image: p1,
    inStock: true,
    features: [
      "240Hz refresh rate",
      "Per-key RGB keyboard",
      "Cooler Boost Trinity+",
      "99.9Whr battery",
    ],
  },
  {
    id: 2,
    name: 'MacBook Pro 14"',
    category: "Professional Laptop",
    brand: "Apple",
    description: "M1 Pro chip, 16GB RAM, 512GB SSD, Liquid Retina XDR display",
    price: 1999.0,
    rating: 4.8,
    reviewCount: 124,
    image: p1,
    inStock: true,
    features: [
      "M1 Pro 8-core CPU",
      "14-core GPU",
      "16-core Neural Engine",
      "Up to 17 hours battery",
    ],
  },
  {
    id: 3,
    name: "Dell XPS 15",
    category: "Ultrabook",
    brand: "Dell",
    description:
      '15.6" 4K UHD+, Intel Core i7-12700H, 16GB DDR5, RTX 3050 Ti, 1TB SSD',
    price: 1799.99,
    originalPrice: 1999.99,
    rating: 4.3,
    reviewCount: 67,
    image: p1,
    inStock: true,
    features: [
      "InfinityEdge display",
      "CNC machined aluminum",
      "Killer Wi-Fi 6",
      "86Whr battery",
    ],
  },
  {
    id: 4,
    name: "ASUS ROG Zephyrus G14",
    category: "Gaming Laptop",
    brand: "ASUS",
    description:
      '14" QHD 120Hz, AMD Ryzen 9 6900HS, RTX 3060, 16GB DDR5, 1TB SSD',
    price: 1499.99,
    rating: 4.6,
    reviewCount: 92,
    image: p1,
    inStock: false,
    features: [
      "AniMe Matrix LED lid",
      "Ergonomic hinge design",
      "ROG Intelligent Cooling",
      "76Whr battery",
    ],
  },
  {
    id: 5,
    name: "Lenovo ThinkPad X1 Carbon",
    category: "Business Laptop",
    brand: "Lenovo",
    description:
      '14" WUXGA, Intel Core i7-1260P, 16GB LPDDR5, 512GB SSD, Windows 11 Pro',
    price: 1699.0,
    originalPrice: 1899.0,
    rating: 4.4,
    reviewCount: 54,
    image: p1,
    inStock: true,
    features: [
      "Military-grade durability",
      "Ultra-light 1.12kg",
      "Legendary ThinkPad keyboard",
      "Rapid Charge technology",
    ],
  },
  {
    id: 6,
    name: "HP Spectre x360",
    category: "2-in-1 Laptop",
    brand: "HP",
    description:
      '13.5" 3K2K OLED, Intel Core i7-1250U, 16GB RAM, 1TB SSD, Stylus included',
    price: 1399.99,
    rating: 4.7,
    reviewCount: 78,
    image: p1,
    inStock: true,
    features: [
      "360° hinge design",
      "Gem-cut aluminum chassis",
      "Bang & Olufsen audio",
      "Up to 16 hours battery",
    ],
  },
  {
    id: 7,
    name: "Razer Blade 15",
    category: "Gaming Laptop",
    brand: "Razer",
    description:
      '15.6" QHD 240Hz, Intel Core i7-12800H, RTX 3070 Ti, 16GB DDR5, 1TB SSD',
    price: 2299.99,
    originalPrice: 2499.99,
    rating: 4.5,
    reviewCount: 63,
    image: p1,
    inStock: true,
    features: [
      "CNC aluminum unibody",
      "THX Spatial Audio",
      "Vapor chamber cooling",
      "Razer Chroma RGB",
    ],
  },
  {
    id: 8,
    name: "Microsoft Surface Laptop 5",
    category: "Ultrabook",
    brand: "Microsoft",
    description:
      '13.5" PixelSense Touch, Intel Core i5-1235U, 8GB RAM, 256GB SSD',
    price: 999.99,
    rating: 4.2,
    reviewCount: 45,
    image: p1,
    inStock: true,
    features: [
      "Alcantara fabric keyboard",
      "Omnisonic speakers",
      "Instant On feature",
      "Up to 18 hours battery",
    ],
  },
];
