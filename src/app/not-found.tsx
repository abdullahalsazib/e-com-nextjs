"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// app/not-found.tsx
export default function NotFound() {
  const navigate = useRouter();
  return (
    <div className="text-center py-20 w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div>
        <h1 className="text-9xl font-bold text-gray-800 dark:text-red-500">
          404
        </h1>
        <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
        <p className="text-lg text-gray-500 mt-2">
          The page you are looking for does not exist.
        </p>
        <Button
          size={"lg"}
          variant={"outline"}
          onClick={() => navigate.push("/")}
          className=" mt-5"
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
}
