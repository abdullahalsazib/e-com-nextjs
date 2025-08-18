export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
          Loading your Web-Site...
        </h1>
        <p className="mt-2 text-gray-600">
          Please wait while we prepare everything
        </p>
      </div>
    </div>
  );
}
