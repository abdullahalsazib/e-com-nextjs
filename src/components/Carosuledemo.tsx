/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Flone - Minimal",
    subtitle: "React Template",
    description:
      "A versatile React eCommerce Template for different purposes that emphasizes creativity, efficiency, & diversity.",
    image: "/modern-tech-dashboard-with-clean-interface.jpg",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    title: "Summer Collection",
    subtitle: "2024 Edition",
    description:
      "Discover our latest summer collection featuring modern designs and premium quality materials for the perfect style.",
    image: "/connected-network-nodes-with-flowing-data-streams.jpg",
    buttonText: "Explore Collection",
  },
  {
    id: 3,
    title: "Premium Quality",
    subtitle: "Best Products",
    description:
      "Experience excellence with our carefully curated selection of premium products designed for modern lifestyle.",
    image: "/colorful-data-viz.png",
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
    <div className="relative w-full max-w-6xl mx-auto bg-white rounded-none overflow-hidden">
      <div className="relative h-[600px] md:h-[700px]">
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

              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full">
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
                  <div className="w-80 h-96 bg-white rounded-lg shadow-2xl transform rotate-12 overflow-hidden">
                    <img
                      src={slides[currentSlide].image || "/placeholder.svg"}
                      alt={slides[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-10 -left-10 w-32 h-40 bg-white rounded-lg shadow-xl transform -rotate-12 overflow-hidden opacity-80">
                    <img
                      src={slides[currentSlide].image || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-28 h-36 bg-white rounded-lg shadow-xl transform rotate-45 overflow-hidden opacity-70">
                    <img
                      src={slides[currentSlide].image || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="relative z-10 h-full flex items-center">
                <div className="w-1/2 pl-12 md:pl-20">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-none mb-2 text-balance">
                      {slides[currentSlide].title}
                    </h1>
                    <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-none mb-8 text-balance">
                      {slides[currentSlide].subtitle}
                    </h2>
                  </motion.div>

                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md text-pretty"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg font-semibold rounded-none">
                      {slides[currentSlide].buttonText}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg rounded-full w-12 h-12"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg rounded-full w-12 h-12"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      <div className="flex justify-center space-x-3 py-8 bg-white">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
