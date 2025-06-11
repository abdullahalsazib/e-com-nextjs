import Link from "next/link";

// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">404 - Product Not Found</h1>
      <p>The product you&apos;re looking for does not exist.</p>
      <div className=" flex items-center justify-center py-10">
        <Link
          href={"/"}
          className=" py-2 px-4 font-semibold text-3xl capitalize rounded-lg bg-blue-500 hover:bg-blue-600 text-white "
        >
          Home jack sparrow
        </Link>
      </div>
    </div>
  );
}
