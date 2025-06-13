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
  id?: number;
  product_id?: number;
  created_at?: string;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    // add more fields as needed
  };
}

export type WishlistItem = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export type WishlistContextType = {
  wishlist: WishlistItemWithProduct[];
  loading: boolean;
  error: string | null;
  addToWishlist: (product: WishlistItemWithProduct) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
  importWishlist: (items: { product_id: number }[]) => Promise<any>;
};
