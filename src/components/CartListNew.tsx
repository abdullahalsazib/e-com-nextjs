import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartListContext";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const CartListNew = () => {
  const { cart, loading, error, cartItemCount, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  // console.log("cart form wishlit: ", cart)

  return (
    <div className=" py-4 h-full">
      {!isAuthenticated ? (
        <>
          <div className=" flex items-center justify-center flex-col gap-2">
            <p className=" text-center text-3xl dark:text-white">
              Sign Up please
            </p>
            <Link
              href={"/register"}
              className=" dark:text-blue-300 underline capitalize text-xl"
            >
              sign up
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className=" h-full w-full flex items-start justify-between flex-col">
            <div className="flex flex-col items-start w-full px-4">
              <h1 className="text-xl font-semibold text-black dark:text-white text-center">
                My Cart
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-300 capitalize">
                {cartItemCount} {cartItemCount === 1 ? "item" : "items"} in Cart
              </p>
            </div>

            <div className="py-3 w-full flex flex-col gap-0 max-h-full px-4">
              {loading ? (
                <p className="text-center py-4">Loading cart...</p>
              ) : error ? (
                <p className="text-red-500 text-center py-4">{error}</p>
              ) : !cart || cart.items.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-300 text-center py-4">
                  Your cart is empty
                </p>
              ) : (
                cart.items.map((item) => <CartItem key={item.ID} item={item} />)
              )}
            </div>

            {cart && cart.items.length > 0 && (
              <div className="px-4 border-t border-gray-100 pt-3 w-full">
                <div className="flex justify-between dark:text-white font-medium mb-3">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/pages/shoping-card"
                    //   onClick={() => setIsOpen(false)}
                    className="w-full py-2 px-4 rounded-full text-sm text-center bg-blue-500 text-white hover:bg-blue-600 duration-200 font-medium"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/pages/shoping-card"
                    //   onClick={() => setIsOpen(false)}
                    className="w-full py-2 px-4 rounded-full text-sm text-center border border-blue-500 text-blue-500 hover:bg-blue-50 duration-200 font-medium"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartListNew;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CartItem = ({ item }: { item: any }) => {
  const { removeFromCart, updateCartItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(item.ID, { quantity: newQuantity });
  };

  return (
    <div className="w-full py-3 flex items-start justify-between border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        {item.product?.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.product.image_url}
            alt={item.product.name}
            className="w-12 h-12 object-cover rounded"
          />
        )}
        <div className="flex-1">
          <h3 className="font-medium text-sm dark:text-white line-clamp-1">
            {item.product?.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            ${item.product?.price?.toFixed(2)}
          </p>
          <div className="flex items-center gap-2 mt-1 dark:text-white">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-6 h-6 flex items-center justify-center border rounded text-sm"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="text-sm w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-6 h-6 flex items-center justify-center border rounded text-sm"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          removeFromCart(item.ID);
          toast.success(`Removed ${item.product?.name} from cart`);
        }}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
    </div>
  );
};
