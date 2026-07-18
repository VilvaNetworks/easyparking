// components/ArrivalsDepartures.tsx
import React from "react";
import Image from "next/image";
import BookNowLink from "@/components/BookNowLink";

const ArrivalsDepartures: React.FC = () => {
  return (
    <section className="w-full bg-black relative overflow-hidden">
      <Image
        src="/images/carbg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-left z-0"
        aria-hidden="true"
      />

      {/* Dark gradient overlay - fades from transparent left to black right */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,1) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Mobile-only overlay — dims background image to ~40% on small screens */}
      <div
        className="absolute inset-0 z-0 block lg:hidden"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[530px] md:min-h-[560px]">
          
          {/* LEFT SIDE - Empty (image showing through) */}
          <div className="hidden lg:block"></div>

          {/* RIGHT SIDE - Content */}
          <div className="flex flex-col justify-center py-16 lg:py-20 lg:pl-10">
            
            {/* Small Orange Heading */}
            <p className="text-[#ff8c00] text-[14px] font-bold uppercase tracking-[2.5px] mb-6">
              ARRIVALS AND DEPARTURES MADE EASY
            </p>

            {/* Main Bold White Heading */}
            <h2 className="text-white text-[26px] md:text-[30px] lg:text-[30px] font-extrabold leading-[1.2] mb-7 tracking-tight max-w-[550px]">
              Take the Stress Out of Airport Parking
            </h2>

            {/* Description */}
            <p className="text-white/90 text-[15px] leading-[1.75] mb-10 max-w-[550px] font-normal">
              Parking made easy at Gatwick Airport with Easy Parking skip the
              stress of long walks, last minute airport hassles and park
              conveniently with meet and greet and let our professionals handle
              the rest while you travel with stress free.
            </p>

            {/* Book Now Button */}
            <div>
              <BookNowLink
                className="inline-block bg-[#ff8c00] hover:bg-[#e67e00] text-white font-semibold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Book Now
              </BookNowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArrivalsDepartures;