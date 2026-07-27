import type { Metadata } from 'next';
import Image from 'next/image';
import BookNowLink from '@/components/BookNowLink';

export const metadata: Metadata = {
  title: 'Airport Parking & Car Wash Services | Easy Parking',
  description: 'Explore our full range of Gatwick services: Meet & Greet parking, Park & Ride, full car wash, and exterior-only car wash solutions.',
  alternates: {
    canonical: '/services',
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.easyparkingltd.com/services/#servicepage",
  "url": "https://www.easyparkingltd.com/services",
  "name": "Airport Parking Services - Easy Parking",
  "description": "Discover our airport parking services and car washing options at Gatwick Airport.",
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://www.easyparkingltd.com/#localbusiness",
    "name": "Easy Parking",
    "telephone": "+443330040262"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Easy Parking Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Meet & Greet Airport Parking",
          "description": "Drive to the terminal and our professional driver will park your car. Upon return, your car will be ready at the terminal."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Park & Ride Airport Parking",
          "description": "Drive to our secure car park, leave your car safely parked, and take our shuttle straight to the terminal."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full Car Wash Service",
          "description": "Hand washed by experienced valeters using premium products for a perfect finish."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Car Wash Outside Only",
          "description": "Hand washed and dried exterior clean for £14.99."
        }
      }
    ]
  }
};

export default function ServicesPage() {
  return (
    <div className="w-full bg-white text-[#2c3e50] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      
      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/service.jpg"
            alt="Our Services Banner"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Dark blue/navy overlay */}
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center px-4 mt-6">
          <h1 className="text-white text-[32px] sm:text-[40px] md:text-[50px] font-extrabold tracking-[4px] uppercase font-sans">
            Our Services
          </h1>
        </div>
      </section>

      {/* ================= SERVICE 1: MEET & GREET ================= */}
      <section id="1" className="scroll-mt-20 w-full bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Image */}
            <div className="relative w-full flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[580px] aspect-[500/350] overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/services/img1.png"
                  alt="Meet & Greet Airport Parking Service"
                  fill
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col">
              <h2 className="text-[#1a1a1a] text-[28px] md:text-[34px] lg:text-[38px] font-extrabold leading-[1.15] mb-6 tracking-tight font-sans">
                Meet &amp; Greet Airport Parking Service
              </h2>
              <p className="text-[#555555] text-[15px] leading-[1.75] mb-8">
                The ultimate convenience! Drive to the terminal, and one of our professional drivers will park your car for you. Upon your return, your car will be ready at the terminal.
              </p>
              <div>
                <BookNowLink
                  className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
                >
                  Book Now
                </BookNowLink>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SERVICE 2: FULL CAR WASH ================= */}
      <section id="2" className="scroll-mt-20 w-full bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Image */}
            <div className="relative w-full flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[540px] aspect-[500/350] overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/services/img3.png"
                  alt="Full Car Wash Service"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col">
              <h2 className="text-[#1a1a1a] text-[28px] md:text-[34px] lg:text-[38px] font-extrabold leading-[1.15] mb-6 tracking-tight font-sans">
                Full Car Wash Service
              </h2>
              <p className="text-[#555555] text-[15px] leading-[1.75] mb-8">
                Inside and Outside wash to make your vehicle look clean and shiny. Hand washed by our experienced valeters using premium products for the perfect finish.
              </p>
              <div>
                <BookNowLink
                  className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
                >
                  Book Now
                </BookNowLink>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SERVICE 3: CAR WASH OUTSIDE ONLY ================= */}
      <section id="3" className="scroll-mt-20 w-full bg-[#f5f5f5] py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative border-t border-b border-gray-200">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Content (Alternating) */}
            <div className="flex flex-col order-2 lg:order-1">
              <h2 className="text-[#1a1a1a] text-[28px] md:text-[34px] lg:text-[38px] font-extrabold leading-[1.15] mb-6 tracking-tight font-sans">
                Car Wash Outside Only
              </h2>
              <p className="text-[#555555] text-[15px] leading-[1.75] mb-8">
                Where convenience meets quality! Hand washed and dried, clean and dry for only £14.99. You can make choice of washing your car when you are on holidays, we will clean and wash your car inside and outside and ready to drive when you come back from your journey.
              </p>
              <div>
                <BookNowLink
                  className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
                >
                  Book Now
                </BookNowLink>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative w-full flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-[540px] aspect-[500/350] overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/services/img4.png"
                  alt="Car Wash Outside Only"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SERVICE 4: PARK & RIDE ================= */}
      <section id="4" className="scroll-mt-20 w-full bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Column: Image */}
            <div className="relative w-full flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[580px] aspect-[500/350] overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/car.jpg"
                  alt="Park & Ride Airport Parking Service"
                  fill
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col">
              <h2 className="text-[#1a1a1a] text-[28px] md:text-[34px] lg:text-[38px] font-extrabold leading-[1.15] mb-6 tracking-tight font-sans">
                Park &amp; Ride Airport Parking Service
              </h2>
              <p className="text-[#555555] text-[15px] leading-[1.75] mb-8">
                Prefer to park your own car? Drive to our secure car park, leave your vehicle safely parked, and hop straight onto our shuttle to the terminal. On your return, the same shuttle brings you back to collect your car — a simple, affordable way to park for your trip.
              </p>
              <div>
                <BookNowLink
                  className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
                >
                  Book Now
                </BookNowLink>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
