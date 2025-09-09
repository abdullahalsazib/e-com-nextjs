"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import img1 from "@/../public/about5.png";
import img2 from "@/../public/about3.png";
import img3 from "@/../public/about5.png";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  buttonText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Flone - Minimal",
    subtitle: "React Template",
    description:
      "A versatile React eCommerce Template for different purposes that emphasizes creativity, efficiency, & diversity.",
    image: img1,
    buttonText: "Shop Now",
  },
  {
    id: 2,
    title: "Summer Collection",
    subtitle: "2024 Edition",
    description:
      "Discover our latest summer collection featuring modern designs and premium quality materials for the perfect style.",
    image: img2,
    buttonText: "Explore Collection",
  },
  {
    id: 3,
    title: "Premium Quality",
    subtitle: "Best Products",
    description:
      "Experience excellence with our carefully curated selection of premium products designed for modern lifestyle.",
    image: img3,
    buttonText: "View Products",
  },
];

export default function ModernCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full max-w-full mx-auto bg-white rounded-none overflow-hidden">
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="relative h-full bg-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

              {/* IMAGE SECTION */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full sm:w-3/5 md:w-1/2 h-1/2 sm:h-3/4 md:h-full">
                <motion.div
                  initial={{ rotate: -5, scale: 0.9 }}
                  animate={{ rotate: 5, scale: 1 }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-48 h-56 sm:w-64 sm:h-72 md:w-80 md:h-96 bg-white rounded-lg shadow-2xl transform rotate-12 overflow-hidden">
                    <Image
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 md:-top-10 md:-left-10 w-20 h-24 sm:w-24 sm:h-32 md:w-32 md:h-40 bg-white rounded-lg shadow-xl transform -rotate-12 overflow-hidden opacity-80">
                    <Image
                      src={img1}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 md:-bottom-8 md:-right-8 w-16 h-20 sm:w-20 sm:h-28 md:w-28 md:h-36 bg-white rounded-lg shadow-xl transform rotate-45 overflow-hidden opacity-70">
                    <Image
                      src={slides[currentSlide].image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* TEXT SECTION */}
              <div className="relative z-10 h-full flex items-center">
                <div className="w-full sm:w-4/5 md:w-1/2 px-4 sm:px-8 md:pl-12 lg:pl-20 pt-4 sm:pt-0">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-gray-900 leading-none mb-1 sm:mb-2 text-balance">
                      {slides[currentSlide].title}
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-gray-900 leading-none mb-4 sm:mb-6 md:mb-8 text-balance">
                      {slides[currentSlide].subtitle}
                    </h2>
                  </motion.div>

                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-sm md:max-w-md text-pretty"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-sm sm:text-base md:text-lg font-semibold rounded-none">
                      {slides[currentSlide].buttonText}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg rounded-full w-10 h-10 sm:w-12 sm:h-12 touch-manipulation"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg rounded-full w-10 h-10 sm:w-12 sm:h-12 touch-manipulation"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      {/* Dots */}
      <div className="flex justify-center space-x-2 sm:space-x-3 py-4 sm:py-6 md:py-8 bg-white">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
              index === currentSlide
                ? "bg-gray-900 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
