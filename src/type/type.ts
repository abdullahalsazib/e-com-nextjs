/* eslint-disable @typescript-eslint/no-explicit-any */
export type NestedItem = {
  title: string;
  link: string;
};

export type SubItem = {
  title: string;
  link: string;
  nested?: NestedItem[];
};

export type Item = {
  title: string;
  link: string;
  dropDown?: boolean;
  content?: SubItem[];
};

export interface WishlistItemWithProduct {
  id: number;
  created_at?: string;
  product: {
    id: number;
    name: string | undefined;
    price: number;
    image?: string;
  };
}

export type WishlistContextType = {
  wishlist: WishlistItemWithProduct[];
  loading: boolean;
  error: string | null;
  importWishlist: any;
  addToWishlist: (product: WishlistItemWithProduct) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  clearWishlist: () => Promise<void>;
  fetchWishlist: () => Promise<void>;
};

export interface Testimonial {
  id: number;
  text: string;
  author: string;
}

export interface getProdcutType {
  ID: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  status: string;
  stock: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  category?: {
    ID: number;
    Name: string;
    Slug: string;
  };
  vendor: {
    id: number;
    shop_name: string;
    status: string;
  };
}
