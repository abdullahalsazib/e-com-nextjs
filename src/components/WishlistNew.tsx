
import { useWishlist } from '@/context/WishlistContext';
import { WishlistItemWithProduct } from '@/type/type';
import Link from 'next/link';
import { toast } from 'sonner';

const WishlistNew = () => {
      const { wishlist, clearWishlist, loading, error } = useWishlist();
  return (
      <>
          <div className=' py-4'>
           
          <div className="flex items-start justify-center flex-col w-full">
            <h1 className="text-xl font-semibold text-black dark:text-white text-center">
              My Wishlist
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-300 capitalize">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} in
              Wishlist
            </p>
          </div>

          {/* <button className="py-2 px-6 text-sm rounded-full border-blue-500 border-2 bg-white text-blue-500 hover:border-blue-400 hover:bg-blue-500 hover:text-white duration-200"> */}
          {/*   View or edit Wishlist */}
          {/* </button> */}

          <div className="py-5 w-full flex items-center justify-center flex-col gap-0 max-h-60 overflow-y-auto">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : wishlist.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-200">Your wishlist is empty</p>
            ) : (
              wishlist.map((item, index) => (
                <WishlistItem key={index} item={item} />
              ))
            )}
          </div>

          <div className="px-5 w-full flex items-center justify-center gap-2 flex-col">
            <button
              onClick={() => clearWishlist()}
              className=" py-2 px-4 text-center"
            >
              Clear all Items
            </button>
            <Link
              href={"/pages/shoping-card"}
              className="flex items-center justify-center w-full py-3 px-6 rounded-full text-sm bg-blue-500 text-white hover:bg-blue-600 duration-200 capitalize font-bold"
            >
              View Full Wishlist
            </Link>
          </div>
        
          </div></>
  )
}

const WishlistItem = ({ item }: { item: WishlistItemWithProduct }) => {
  const { removeFromWishlist } = useWishlist();
  console.log(item.product.image)
  return (
    <div className="w-full px-4 py-2 flex items-center justify-between border-b border-gray-100">
      <div className="flex items-center gap-3">
        {/* {item.product.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-12 h-12 object-cover rounded"
          />
        )} */}
        <div>
          <h3 className="font-medium text-sm">{item.product.name}</h3>
          <p className=" text-black dark:text-green-300 text-sm">${item.product.price}</p>
        </div>
      </div>
      <button
        onClick={() => {
          removeFromWishlist(item.id);
          // console.log("the remove item is trugerd: ", item.id); // for debuging
          toast.success(`Remove item: ${item.product.name}`);
        }}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};
export default WishlistNew