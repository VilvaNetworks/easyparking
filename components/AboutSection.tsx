// components/AboutSection.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutSection: React.FC = () => {
  const features = [
    ["01. Affordable Rates", "02. 24/7 Service"],
    ["03. Secure Parking", "04. Fast Transfers"],
    ["05. Near Locations", "06. Valet Parking"],
    ["07. Flexible Booking", "08. No Hidden Fees"],
  ];

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* ===== LEFT SIDE - Image with Orange Rectangle ===== */}
          <div className="relative w-full flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[600px]">
              {/* Orange rectangle - positioned TOP-LEFT behind image */}
              <div
                className="absolute top-0 left-0 w-[200px] h-[400px] bg-[#db7d0b] z-0 rounded-[20px] animate-float"
                aria-hidden="true"
              />
              
              {/* Main parking image - positioned with offset */}
              <div className="relative z-10 ml-[40px] mt-[60px]">
                <Image
                  src="/images/car.jpg"
                  alt="Underground parking lot with modern cars"
                  width={560}
                  height={580}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* ===== RIGHT SIDE - Content ===== */}
          <div className="flex flex-col pt-4 lg:pt-8">
            
            {/* Small Orange Heading */}
            <p className="text-[#ff8c00] text-[15px] font-bold uppercase tracking-[2.5px] mb-5">
              ABOUT&nbsp;&nbsp;OUR&nbsp;&nbsp;COMPANY
            </p>

            {/* Main Bold Heading */}
            <h2 className="text-[#1a1a1a] text-[26px] md:text-[34px] lg:text-[34px] font-extrabold leading-[1.15] mb-[6px] tracking-tight">
              Premium Meet and Greet Parking, Gatwick Airport
            </h2>

            {/* Description */}
            <p className="text-[#555555] text-[15px] leading-[1.75] mb-9 max-w-[600px]">
              At Easy Parking, we have expertise in offering a convenient
              &ldquo;Meet &amp; Greet&rdquo; service to Gatwick Airport, meeting
              the needs of those who love the concept of convenience, comfort,
              and hassle-free parking. From the time you arrive to the time you
              depart, we take care of everything when you travel with us.
            </p>

            {/* Features Table - Rounded box with internal grid */}
            <div className="relative">
            <div className="border bg-white z-10 border-gray-300 rounded-[14px] overflow-hidden mb-[10px] max-w-[600px]">
              {features.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`grid grid-cols-2 ${
                    rowIndex !== features.length - 1
                      ? "border-b border-gray-300"
                      : ""
                  }`}
                >
                  {row.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`py-[16px] px-[16px] text-[#1a1a1a] text-[15px] font-bold ${
                        itemIndex === 0 ? "border-r border-gray-300" : ""
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="absolute z-0 -bottom-[60px] -right-[100px] w-[300px] pointer-events-none opacity-60 hidden md:block">
              <svg
                viewBox="0 0 600 200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#cccccc"
                strokeWidth="1.5"
                className="w-full h-auto"
                aria-hidden="true"
              >
                {/* Charging station */}
                <rect x="50" y="80" width="40" height="100" rx="3" />
                <rect x="55" y="90" width="30" height="20" />
                <line x1="70" y1="180" x2="70" y2="200" />
                
                {/* Car body */}
                <path d="M 130 150 L 160 110 Q 170 100 185 100 L 380 100 Q 400 100 415 115 L 450 150 L 560 150 Q 575 150 575 165 L 575 180 Q 575 195 560 195 L 540 195" />
                <path d="M 130 150 L 130 180 Q 130 195 145 195 L 165 195" />
                <path d="M 240 195 L 460 195" />
                
                {/* Windows */}
                <path d="M 175 145 L 195 115 L 290 115 L 290 145 Z" />
                <path d="M 295 115 L 380 115 Q 395 115 405 125 L 420 145 L 295 145 Z" />
                
                {/* Wheels */}
                <circle cx="205" cy="195" r="25" />
                <circle cx="205" cy="195" r="12" />
                <circle cx="500" cy="195" r="25" />
                <circle cx="500" cy="195" r="12" />
                
                {/* Headlight */}
                <path d="M 445 145 L 470 140 L 470 150 L 450 155 Z" />
                
                {/* Charging cable */}
                <path d="M 90 100 Q 110 90 130 110 Q 140 130 155 130" />
              </svg>
            </div>
            </div>

            {/* Discover More Button */}
            <div>
              <Link
                href="/about-us"
                className="inline-block bg-[#ff8c00] hover:bg-[#e67e00] text-white font-semibold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Car line-drawing decoration in bottom-right */}
      

      {/* Float animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `,
        }}
      />
    </section>
  );
};

export default AboutSection;