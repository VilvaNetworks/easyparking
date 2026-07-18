"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const services = [
  {
    id: 1,
    icon: "/images/parking.gif",
    title: "Meet & Greet Parking",
    description:
      "The ultimate convenience! Drive straight to the terminal, hand over your keys to our professional driver, and your car will be waiting for you when you return.",
    link: "/services#1",
  },
  {
    id: 2,
    icon: "/images/driver.gif",
    title: "Valeting Service",
    description:
      "Enjoy our professional valet service with a full clean and inspection, ensuring your car is spotless and well-maintained when you collect it.",
    link: "/services#2",
  },
  {
    id: 3,
    icon: "/images/car-wash.gif",
    title: "Full Car Wash Service",
    description:
      "Comprehensive inside and outside cleaning exterior wash, vacuum, glass polish, dashboard and bumper shine, tyre polish, plus a free fragrance, all for £34.99.",
    link: "/services#3",
  },
  {
    id: 4,
    icon: "/images/car-wash-1.gif",
    title: "Car Wash Only Service",
    description:
      "Full exterior wash to make your car shine brilliantly for only £14.99. Book in advance or at drop-off, with payment by card or cash upon return.",
    link: "/services#4",
  },
  {
    id: 5,
    icon: "/images/charging-station.gif",
    title: "Electric Car Charging",
    description:
      "We can fully charge your car efficiently while you're away. Simply book online or at drop-off and pay upon your return by card or cash.",
    link: "/services#5",
  },
  {
    id: 6,
    icon: "/images/inheritance.gif",
    title: "Transfer Services",
    description:
      "Need your car at a different airport or seaport? We'll deliver it for you. Call ahead to arrange this convenient additional service.",
    link: "/services#6",
  },
];

const OurServices: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative line-art background pattern */}
      <div
        className="absolute top-0 left-0 w-[280px] md:w-[380px] opacity-25 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 280"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#bbbbbb"
          strokeWidth="1"
          className="w-full h-auto"
        >
          <path d="M 30 200 L 60 160 Q 70 150 85 150 L 200 150 Q 215 150 225 160 L 250 200 L 280 200" />
          <path d="M 30 200 L 30 230 Q 30 240 40 240 L 60 240" />
          <circle cx="90" cy="240" r="18" />
          <circle cx="90" cy="240" r="8" />
          <circle cx="240" cy="240" r="18" />
          <circle cx="240" cy="240" r="8" />
          <circle cx="200" cy="50" r="22" />
          <path d="M 200 72 L 200 100" />
          <circle cx="200" cy="50" r="8" />
          <rect x="280" y="30" width="40" height="40" />
          <text x="300" y="58" fontSize="22" fill="#bbbbbb" textAnchor="middle" stroke="none">P</text>
        </svg>
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Section Headers */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#ff8c00] text-[15px] font-bold uppercase tracking-[2.5px] mb-5">
            OUR PARKING SERVICES
          </p>
          <h2 className="text-[#1a1a1a] text-[32px] md:text-[40px] lg:text-[44px] font-extrabold leading-[1.2] tracking-tight">
            Secure, convenient, and easy on your wallet
          </h2>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          grabCursor={true}
          breakpoints={{
            0:    { slidesPerView: 1, spaceBetween: 16 },
            768:  { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {services.map((service) => {
            const isActive = activeCard === service.id;
            return (
              <SwiperSlide key={service.id} style={{ height: "auto" }}>
                <div
                  onClick={() => setActiveCard(isActive ? null : service.id)}
                  className={`bg-[#f2f2f2] !border !border-2  p-10 flex flex-col items-center text-center h-full min-h-[300px] cursor-pointer select-none transition-all duration-300 ${
                    isActive
                      ? "!border-[#b8b8b8]"
                      : "!border-[#b8b8b8] hover:!border-[#ff8c00]"
                  }`}
                >
                  <div className="w-20 h-20 flex items-center justify-center mb-6">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={60}
                      height={60}
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <h3 className="text-[#1a1a1a] text-[20px] font-bold mb-5 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-[#4a4a4a] text-[14px] leading-[1.7] mb-8 grow">
                    {service.description}
                  </p>

                  <Link
                    href={service.link}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    aria-label={`Learn more about ${service.title}`}
                    className="inline-flex items-center gap-2 text-[#1a1a1a] text-[16px] font-semibold hover:text-[#ff8c00] transition-colors duration-300 mt-auto"
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default OurServices;
