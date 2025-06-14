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
  created_at: string;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export type WishlistContextType = {
  wishlist: WishlistItemWithProduct[];
  loading: boolean;
  error: string | null;
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  clearWishlist: () => Promise<void>;
  fetchWishlist: () => Promise<void>;
};
