import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Easy Parking Ltd - Gatwick Airport Valet',
  description: 'Learn about Easy Parking Ltd, a family-run business providing top-tier, secure, and cheap airport valet parking at London Gatwick Airport.',
  alternates: {
    canonical: '/about-us',
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.easyparkingltd.com/about-us/#aboutpage",
  "url": "https://www.easyparkingltd.com/about-us",
  "name": "About Us - Easy Parking Ltd",
  "description": "We are a family run business who strive to provide the best possible service to make your holidays a joyous and unforgettable one.",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://www.easyparkingltd.com/#organization",
    "name": "Easy Parking Ltd",
    "url": "https://www.easyparkingltd.com",
    "description": "Family-run airport parking business providing affordable, secure, and reliable parking solutions at Gatwick Airport.",
    "foundingDate": "2020",
    "areaServed": {
      "@type": "Place",
      "name": "Gatwick Airport, London, UK"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1-2, Johnston Road, Woodford Green",
      "addressLocality": "London",
      "addressRegion": "England",
      "postalCode": "IG8 0XA",
      "addressCountry": "GB"
    },
    "telephone": "+443330040262",
    "email": "Info@easyparkingltd.com",
    "knowsAbout": [
      "Airport Parking",
      "Meet and Greet Parking",
      "Valet Parking",
      "Car Valeting",
      "Electric Vehicle Charging",
      "Airport Transfer Services"
    ]
  }
};

export default function AboutUsPage() {
  const features = [
    ['01. Affordable Rates', '02. 24/7 Service'],
    ['03. Secure Parking', '04. Fast Transfers'],
    ['05. Near Locations', '06. Valet Parking'],
    ['07. Flexible Booking', '08. No Hidden Fees'],
  ];

  return (
    <div className="w-full bg-white text-[#2c3e50] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {/* CSS Injection for Floating Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
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
      `}} />

      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-banner.png"
            alt="About Us Banner"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Dark blue/navy overlay for high contrast */}
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center px-4 mt-6">
          <h1 className="text-white text-[32px] sm:text-[40px] md:text-[50px] font-extrabold tracking-[4px] uppercase font-sans">
            About us
          </h1>
        </div>
      </section>

      {/* ================= SECTION 1: ABOUT OUR COMPANY ================= */}
      <section className="w-full bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Image with Orange Rectangle */}
            <div className="relative w-full flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[540px] aspect-[500/520]">
                {/* Orange rectangle behind image */}
                <div
                  className="absolute top-0 left-0 w-[180px] h-[360px] bg-[#e7701e] z-0 rounded-[20px] animate-float"
                  aria-hidden="true"
                />
                
                {/* Main parking image */}
                <div className="relative z-10 ml-[5px] sm:ml-[35px] mt-[45px] w-full h-full overflow-hidden shadow-xl">
                  <Image
                    src="/images/car.jpg"
                    alt="Underground parking lot with modern cars"
                    fill
                    sizes="(max-width: 768px) 100vw, 540px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col">
              {/* Category */}
              <p className="text-[#e7701e] text-[15px] font-bold uppercase tracking-[2.5px] mb-3">
                ABOUT OUR COMPANY
              </p>

              {/* Heading */}
              <h2 className="text-[#1a1a1a] text-[26px] md:text-[34px] lg:text-[38px] font-extrabold leading-[1.15] mb-6 tracking-tight font-sans">
                Get to Know About Easy Parking
              </h2>

              {/* Description */}
              <p className="text-[#555555] text-[15px] leading-[1.75] mb-8">
                We are a family run business who strive to provide the best possible service to make your holidays a joyous and unforgettable one. What makes us different from others is our hard work and determination to make the change and stand out in the crowd. We know exactly what’s your expectation and how to deliver the same, as we always believe that &ldquo;treating people the way we would love to be treated&rdquo; is the only way to succeed in any business. So, we know the value of your hard-earned money that you pay to us and the service standard that should be provided to keep you happy and comfortable with our service.
              </p>

              {/* Features Grid Box */}
              <div className="border bg-white border-gray-300 rounded-[14px] overflow-hidden mb-8 max-w-[600px] shadow-sm">
                {features.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`grid grid-cols-2 ${
                      rowIndex !== features.length - 1 ? 'border-b border-gray-300' : ''
                    }`}
                  >
                    {row.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={`py-[16px] px-[20px] text-[#1a1a1a] text-[15px] font-bold ${
                          itemIndex === 0 ? 'border-r border-gray-300' : ''
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Book Now Button */}
              <div>
                <Link
                  href="/"
                  className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
                >
                  Book Now
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 2: OUR VISION ================= */}
      <section className="w-full bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative border-t border-gray-100">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Vision Image */}
            <div className="relative w-full flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[540px] aspect-[500/350] overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/about1.jpeg"
                  alt="Our Vision Presentation"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col">
              {/* Heading */}
              <h2 className="text-[#1a1a1a] text-[32px] md:text-[38px] font-extrabold leading-[1.2] mb-6 tracking-tight">
                Our Vision
              </h2>

              {/* Description */}
              <p className="text-[#555555] text-[15px] leading-[1.75] mb-8 max-w-[620px]">
                Our vision is to become the UK's most trusted and customer-focused airport parking service, offering peace of mind with unmatched convenience, top-notch security, and genuine car parking service. Every time.
              </p>

              {/* Book Now Button */}
              <div>
                <Link
                  href="/"
                  className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
                >
                  Book Now
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 3: OUR MISSION ================= */}
      <section className="w-full bg-[#f5f5f5] py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative border-t border-b border-gray-200">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Content */}
            <div className="flex flex-col order-2 lg:order-1">
              {/* Heading */}
              <h2 className="text-[#1a1a1a] text-[32px] md:text-[38px] font-extrabold leading-[1.2] mb-6 tracking-tight">
                Our Mission
              </h2>

              {/* Description */}
              <p className="text-[#555555] text-[15px] leading-[1.75] mb-8 max-w-[620px]">
                Our mission is to deliver safe, reliable, and hassle-free parking solutions, making every traveler's journey smoother with punctual service, professional staff, and round-the-clock vehicle security. All at competitive rates.
              </p>

              {/* Book Now Button */}
              <div>
                <Link
                  href="/"
                  className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Right Column: Mission Image */}
            <div className="relative w-full flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-[540px] aspect-[500/350]  overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/about2.jpeg"
                  alt="Our Mission Analysis"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
