"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Carousel: React.FC<{
  images: { src: string; alt: string }[];
}> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance to trigger slide change
  const minSwipeDistance = 50;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();

    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="w-full bg-slate-400 relative overflow-hidden h-[64vh] md:h-auto">
      {/* Carousel container */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full">
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="h-full flex w-full items-center justify-between absolute top-0 left-0 px-4 md:px-[10%]">
        <button
          onClick={goToPrevious}
          className="py-2 px-2 md:py-3 md:px-3 bg-gray-800/80 text-white shadow-md hover:bg-gray-300 duration-200 hover:text-blue-400 rounded-full z-10"
          aria-label="Previous slide"
        >
          <MdKeyboardArrowLeft className="text-xl md:text-2xl" />
        </button>
        <button
          onClick={goToNext}
          className="py-2 px-2 md:py-3 md:px-3 bg-gray-800/80 text-white shadow-md hover:bg-gray-300 duration-200 hover:text-blue-400 rounded-full z-10"
          aria-label="Next slide"
        >
          <MdKeyboardArrowRight className="text-xl md:text-2xl" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all ${
              currentIndex === index ? "bg-white w-4 md:w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
