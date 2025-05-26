"use client";
import React, { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FcNext, FcPrevious } from "react-icons/fc";

interface Testimonial {
    id: number;
    text: string;
    author: string;
}

const TestimonialSection = () => {
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

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const goToPrev = () => {
        setCurrentTestimonial((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    const goToIndex = (index: number) => {
        setCurrentTestimonial(index);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying) {
            interval = setInterval(() => {
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [currentTestimonial, isAutoPlaying]);
    return (
        <div className="w-full py-3 px-4 md:px-[10%] mb-6">
            <div className="w-full bg-[#F5F7FF] py-6 md:py-10 rounded-lg">
                {/* Testimonial Content */}
                <div className="flex items-center justify-between gap-6 md:gap-10 py-6 md:py-10 px-4 md:px-10 relative">
                    <FaQuoteLeft className="text-4xl md:text-6xl text-gray-300 absolute top-4 left-4 md:left-10 opacity-50" />
                    {/* <FaQuoteLeft className="text-4xl md:text-6xl text-gray-300 absolute bottom-4 right-4 md:right-10 transform rotate-180 opacity-50" /> */}

                    <div className="text-base md:text-lg font-normal text-black w-full flex flex-col">
                        <p className="text-justify mb-4">
                            {testimonials[currentTestimonial].text}
                        </p>
                        <span className="text-right w-full font-medium">
                            {testimonials[currentTestimonial].author}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between py-2 px-4 md:px-10 gap-4">
                    <div className="flex items-center justify-between w-full gap-2">
                        <div className="flex items-center justify-center mt-4">
                            <button className="py-2 px-6 border-2 border-blue-500 rounded-full hover:text-white text-blue-500 hover:border-white hover:bg-blue-500 duration-200 transition-colors text-sm md:text-base">
                                Leave a Review
                            </button>
                            <div className=" px-4 space-x-3">
                                <button
                                    onClick={() => {
                                        setIsAutoPlaying(false);
                                        goToPrev();
                                    }}
                                    className="py-1 px-1 md:py-2 md:px-5 border-2 border-blue-500 rounded-full hover:text-white text-blue-500 hover:border-white hover:bg-blue-500 duration-200 transition-colors text-sm md:text-base"
                                >
                                    <FcPrevious />
                                </button>
                                <button
                                    onClick={() => {
                                        setIsAutoPlaying(false);
                                    }}
                                    className="py-1 px-1 md:py-2 md:px-5 border-2 border-blue-500 rounded-full hover:text-white text-blue-500 hover:border-white hover:bg-blue-500 duration-200 transition-colors text-sm md:text-base"
                                >
                                    <FcNext />
                                </button>
                            </div>
                        </div>
                        <div className="space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setIsAutoPlaying(false);
                                        goToIndex(index);
                                    }}
                                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all ${currentTestimonial === index ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Leave Review Button */}
            </div>
        </div>
    );
};

export default TestimonialSection;
