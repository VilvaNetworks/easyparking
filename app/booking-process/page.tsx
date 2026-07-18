import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Booking Process - Easy Parking Ltd',
  description: 'Any customer can make booking from us through our website or on telephone. Check the prices, choose the dates and book our service based on your need.',
  alternates: {
    canonical: '/booking-process',
  },
  openGraph: {
    title: 'Booking Process - Easy Parking Ltd',
    description: 'Any customer can make booking from us through our website or on telephone. Check the prices, choose the dates and book our service based on your need.',
    url: 'https://www.easyparkingltd.com/booking-process',
    siteName: 'Easy Parking Ltd',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function BookingProcessPage() {
  const steps = [
    "Any customer can make booking from us through our website or on telephone.",
    "The customer can check the prices, choose the dates and book our service based on their need from the website.",
    "Once a customer decides to make a booking, they can either pay for the service by creating an account with us or as a guest based on their wish.",
    "Once they make payment for the service by filling in all the details, they will be sent a confirmation email, confirming the details and the type of service etc. that they have booked with us.",
    "For customers booking as a guest, their data will be deleted once the service is provided to them.",
    "For customers who choose to be members with us, their data will be saved. Their account will go dormant if they do not make any booking with us in the next 12 months, and their data will be deleted after another 6 months if there is no booking made from the customer in that time."
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Book Our Airport Parking Services",
    "step": steps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "text": step,
    })),
  };

  return (
    <div className="w-full bg-white text-[#2c3e50] font-sans pb-16 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/how-banner.png"
            alt="Booking Process Banner"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center px-4 mt-6">
          <h1 className="text-white text-[32px] sm:text-[40px] md:text-[50px] font-extrabold tracking-[4px] uppercase font-sans">
            Booking Process
          </h1>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1000px] mx-auto border border-gray-200 bg-[#fcfbfa] p-8 md:p-12 shadow-sm">
          <h2 className="text-[#1a1a1a] text-[24px] md:text-[28px] font-extrabold mb-8 font-sans border-b border-gray-200 pb-4">
            How to Book Our Airport Parking Services
          </h2>

          <ol className="space-y-6 list-none p-0 m-0">
            {steps.map((step, idx) => (
              <li key={idx} className="flex gap-4 items-start text-[#4a4a4a] text-[15px] sm:text-[16px] leading-[1.75]">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[14px]">
                  {idx + 1}
                </span>
                <p className="pt-0.5">{step}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 text-center">
            <Link
              href="/car-park-booking-system"
              className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
            >
              Book Your Parking Spot
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
