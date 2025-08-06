"use client";

import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  text: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "My first order arrived today in perfect condition. From the time I sent a question about the item to making the purchase, to the shipping and now the delivery, your company, Tecs, has stayed in touch. Such great service. I look forward to shopping on your site in the future and would highly recommend it.",
    author: "- Tama Brown",
  },
  {
    id: 2,
    text: "I've been a customer for over a year now and the service is consistently excellent. Fast shipping, quality products, and responsive customer support make this my go-to tech store.",
    author: "- Alex Johnson",
  },
  {
    id: 3,
    text: "The product selection is amazing and prices are competitive. I especially appreciate the detailed product descriptions that help me make informed decisions.",
    author: "- Sarah Williams",
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToIndex = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [current, isAutoPlaying]);

  return (
    <div className="w-full px-4 md:px-[10%] py-6">
      <Card className="bg-muted py-6">
        <CardHeader className="flex items-center justify-between px-6">
          <CardTitle className="text-xl text-center w-full">
            What Our Customers Say
          </CardTitle>
        </CardHeader>

        <CardContent className="relative px-6">
          <FaQuoteLeft className="text-4xl text-gray-300 absolute top-0 left-0 opacity-30" />
          <p className="text-base md:text-lg text-muted-foreground text-justify mb-4 z-10 relative">
            {testimonials[current].text}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 px-6">
          <div className="w-full text-right font-semibold text-primary">
            {testimonials[current].author}
          </div>

          <div className="flex items-center justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => alert("Navigate to review form")}
          >
            Leave a Review
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestimonialSection;
