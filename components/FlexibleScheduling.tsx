// components/FlexibleScheduling.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface FeatureCard {
  id: number;
  icon: string;
  title: string;
  description: string;
  link: string;
  highlighted?: boolean;
}

const features: FeatureCard[] = [
  {
    id: 1,
    icon: "/images/one.gif",
    title: "Cost-Effective Parking Solutions",
    description:
      "Enjoy our competitive pricing, designed according to short-term and long-term parking requirements. Our prices are formulated to ensure optimal value for money, without settling for anything less than convenience, safety, and quality.",
    link: "/how-it-works",
  },
  {
    id: 2,
    icon: "/images/two.gif",
    title: "Hassle-Free",
    description:
      "Plans are meant to change and we are aware of it. Enjoy freedom that lets you cancel your booking at liberty at all times without having to pay cancellation fees.",
    link: "/how-it-works",
    highlighted: true,
  },
  {
    id: 3,
    icon: "/images/three.gif",
    title: "Safe & Secure Facilities",
    description:
      "We understand the safety of your vehicle is our prime responsibility. Our parking lots have round the clock surveillance and security along with trained security personnel present on the premises to ensure that your vehicle is safe with us",
    link: "/how-it-works",
  },
];

const FlexibleScheduling: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-4 md:py-20 md:px-6">
      <div className="max-w-[1300px] mx-auto">
        {/* Small Orange Heading */}
        <h2 className="text-center text-[#ff8c00] text-base font-bold uppercase tracking-[3px] mb-6">
          FLEXIBLE&nbsp;&nbsp;SCHEDULING
        </h2>

        {/* Main Heading */}
        <h2 className="text-center text-[#1a1a1a] text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight mb-14">
          Looking for Budget-Friendly Airport Parking?
        </h2>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`
                bg-white p-10 flex flex-col items-center text-center
                border border-2 border-[#a0a0a0] transition-all duration-300
                ${
                  feature.highlighted
                    ? "border-[#ff8c00]"
                    : "border-gray-200 hover:border-[#ff8c00]"
                }
              `}
            >
              {/* Icon Container */}
              <div className="w-[120px] h-[120px] bg-[#f0f0f0] flex items-center justify-center mb-8">
                <div className="relative w-[60%] h-[60%]">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Card Title */}
              <h3 className="text-[#1a1a1a] text-[20px] font-bold mb-6 leading-snug">
                {feature.title}
              </h3>

              {/* Card Description */}
              <p className="text-[#333333] text-[14px] leading-[1.8] mb-8 flex-grow">
                {feature.description}
              </p>

              {/* Learn More Button */}
              <Link
                href={feature.link}
                className="inline-flex items-center gap-2 text-[#1a1a1a] text-base font-semibold hover:text-[#ff8c00] transition-colors duration-300 mt-auto"
              >
                <span>Learn More</span>
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 192 512"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlexibleScheduling;