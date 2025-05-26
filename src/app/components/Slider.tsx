"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface CarouselProps {
  images: { src: string; alt: string }[];
  autoPlay?: boolean;
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance to trigger slide change
  const minSwipeDistance = 50;

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Auto-advance carousel
  useEffect(() => {
    if (!autoPlay) return;

    const intervalId = setInterval(goToNext, interval);
    return () => clearInterval(intervalId);
  }, [autoPlay, interval, goToNext]);

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
    setTouchStart(null);

    setTouchEnd(null);
  };

  // Preload next and previous images
  useEffect(() => {
    const preloadImages = [
      images[(currentIndex + 1) % images.length].src,
      images[(currentIndex - 1 + images.length) % images.length].src
    ].filter(Boolean);

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [currentIndex, images]);

  return (
    <div className="w-full bg-gray-100 relative overflow-hidden h-[64vh] md:h-[80vh]">
      {/* Carousel container */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div key={`${image.src}-${index}`} className="w-full flex-shrink-0 h-full relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <button
          onClick={goToPrevious}
          className="pointer-events-auto p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
          aria-label="Previous slide"
        >
          <MdKeyboardArrowLeft className="text-2xl md:text-3xl" />
        </button>
        <button
          onClick={goToNext}
          className="pointer-events-auto p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
          aria-label="Next slide"
        >
          <MdKeyboardArrowRight className="text-2xl md:text-3xl" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-white w-6" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
