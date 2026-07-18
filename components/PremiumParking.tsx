// components/PremiumParking.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BookNowLink from "@/components/BookNowLink";

const PremiumParking: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const checkMd = () => setIsMd(window.innerWidth >= 768);
    checkMd();
    window.addEventListener("resize", checkMd);
    return () => window.removeEventListener("resize", checkMd);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden"
      style={{ background: isMd
        ? "linear-gradient(to right, #f5f5f5 0%, #f5f5f5 40%, #ffffff 60%, #ffffff 100%)"
        : "linear-gradient(to bottom, #f5f5f5 0%, #f5f5f5 40%, #ffffff 60%, #ffffff 100%)" }}
    >
      <div className="max-w-full mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between justify-start ">

          {/* LEFT SIDE - Content */}
          <div className="flex flex-col md:py-[60px] py-[20px] md:px-[60px] px-[16px]">
            <p className="text-[#ff8c00] text-[14px] font-bold uppercase tracking-[2.5px] mb-5">
              PREMIUM PARKING. AFFORDABLE RATES.
            </p>
            <h2 className="text-[#1a1a1a] text-[24px] md:text-[30px] lg:text-[34px] font-extrabold leading-[1.15] mb-7 tracking-tight">
              Looking for a luxury airport parking ?
            </h2>
            <div className="text-[#4a4a4a] text-[16px] leading-[1.75] mb-8 max-w-[600px]">
              <p>
                Enjoy a seamless, first class parking experience with Easy
                Parking Ltd. Our premium Meet &amp; Greet service ensures you
                park stress free with door to terminal convenience and comfort.
                Our professionals take care of your parking and your vehicle
                behind your back so you can travel with complete peace of mind.
                Starting at just £10,
              </p>
              <p className="mt-4">
                <strong>
                  <em>It&apos;s an affordable luxury for every traveler.</em>
                </strong>
              </p>
            </div>
            <div>
              <BookNowLink
                className="inline-block bg-[#ff8c00] hover:bg-[#e67e00] text-white font-semibold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Book Now
              </BookNowLink>
            </div>
          </div>

          
          <div
            className="md:h-[400px] h-[120px] my-auto md:block hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.9s ease-out, transform 0.9s ease-out",
            }}
          >
            <Image
              src="/images/premium_car_img1.png"
              alt="Luxury car ornament"
              width={200}
              height={300}
              className="w-full h-full object-contain"
            />
          </div>

          
          <div
            className="md:h-[500px] h-fit"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(120px)",
              transition: "opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s",
            }}
          >
            <Image
              src="/images/premium_car_img2.png"
              alt="Premium silver Porsche car"
              width={800}
              height={604}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumParking;
