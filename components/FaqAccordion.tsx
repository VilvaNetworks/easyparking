"use client";

import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqItems: FaqItem[] = [
    {
      question: "How far in advance should I book parking?",
      answer: "You can make a booking with us anytime, even in case your journey was planned at the last moment. We will try our best to provide you with the service you need."
    },
    {
      question: "Is my car safe?",
      answer: "Yes, your car is extremely safe in our care. Our parking lots are fully secure, featuring 24/7 CCTV monitoring, regular patrols, and secure perimeter fencing. We also take condition photos and mileage records on handover."
    },
    {
      question: "Do you offer refunds for canceled bookings?",
      answer: "Yes, we offer refunds for canceled bookings. Cancellations must be made in accordance with our terms and conditions. Generally, you can cancel up to 24 hours prior to your booking start time for a refund, subject to a cancellation fee if applicable. Please refer to our full Terms and Conditions for detailed cancellation rules."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 lg:py-24">
      {/* FAQ Header */}
      <div className="text-center mb-10 md:mb-12">
        <p className="text-[#e7701e] text-[15px] font-bold uppercase tracking-[2.5px] mb-3">
          FAQ
        </p>
        <h2 className="text-[#1a1a1a] text-[32px] md:text-[38px] font-extrabold leading-[1.2] tracking-tight">
          Got Questions? We&apos;ve Got Answers!
        </h2>
      </div>

      {/* Accordion Container */}
      <div className="w-full space-y-4 max-w-[1100px] mx-auto">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-[#e0e0e0] overflow-hidden transition-all duration-300 bg-[#f5f5f5]"
            >
              {/* Accordion Trigger */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between py-5 px-6 sm:px-8 text-left cursor-pointer focus:outline-none select-none transition-colors duration-300"
              >
                <span
                  className={`text-[16px] md:text-[18px] font-bold transition-colors duration-300 ${
                    isOpen ? "text-[#e7701e]" : "text-[#1a1a1a]"
                  }`}
                >
                  {item.question}
                </span>

                {/* Plus / Minus Indicator */}
                <span className="ml-4 flex-shrink-0 text-xl font-semibold">
                  {isOpen ? (
                    <span className="text-[#e7701e]">&#8722;</span> // Minus symbol
                  ) : (
                    <span className="text-[#1a1a1a]">&#43;</span> // Plus symbol
                  )}
                </span>
              </button>

              {/* Accordion Content (Collapsible) */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[500px] border-t border-[#e0e0e0] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="py-5 px-6 sm:px-8 bg-white text-[#555555] text-[15px] leading-[1.75]">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
