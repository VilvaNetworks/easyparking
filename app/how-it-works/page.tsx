import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BookNowLink from '@/components/BookNowLink';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'How Airport Parking Works | Easy Parking Ltd',
  description: 'Discover how simple departure check-ins and arrival car pick-ups are handled at London Gatwick Terminal. Review our parking and valet procedures.',
  alternates: {
    canonical: '/how-it-works',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.easyparkingltd.com/how-it-works/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How far in advance should I book parking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can make a booking with us anytime, even in case your journey was planned at the last moment. We will try our best to provide you with the service you need."
      }
    },
    {
      "@type": "Question",
      "name": "Is my car safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, your car is extremely safe in our care. Our parking lots are fully secure, featuring 24/7 CCTV monitoring, regular patrols, and secure perimeter fencing. We also take condition photos and mileage records on handover."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer refunds for canceled bookings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer refunds for canceled bookings. Cancellations must be made in accordance with our terms and conditions. Generally, you can cancel up to 24 hours prior to your booking start time for a refund, subject to a cancellation fee if applicable. Please refer to our full Terms and Conditions for detailed cancellation rules."
      }
    }
  ]
};

export default function HowItWorksPage() {
  return (
    <div className="w-full bg-white text-[#2c3e50] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/works/work.jpeg"
            alt="How It Works Banner"
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
            How It Works
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT SECTION ================= */}
      <section className="w-full bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Stacked Images */}
            <div className="flex flex-col gap-6 w-full max-w-[620px] mx-auto lg:mx-0">
              <div className="relative w-full aspect-[736/489] overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/works/img1.jpeg"
                  alt="Rows of cars parked inside Easy Parking's secure, well-lit indoor facility"
                  fill
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-[800/800] max-h-[489px] overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/works/img2.jpeg"
                  alt="Toyota SUV in parking garage"
                  fill
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column: Detailed Text */}
            <div className="flex flex-col">
              <h2 className="text-[#1a1a1a] text-[32px] md:text-[38px] font-extrabold leading-[1.2] mb-6 tracking-tight font-sans">
                Your Journey With Easy Parking, Step By Step
              </h2>

              <div className="space-y-6 text-[#555555] text-[15px] leading-[1.75] mb-8">
                <div>
                  <h3 className="text-[#1a1a1a] font-bold text-[16px] mb-2 uppercase tracking-[0.5px]">
                    On The Day Of Your Departure
                  </h3>
                  <p>
                    Drive straight to the terminal, where a professional, insured and DBS-checked Easy Parking employee will meet you with a <span className="font-bold text-[#e7701e]">HAPPY SMILE</span>, take your keys, and take it from there. Your car goes into one of our fully secure, 24/7 CCTV-monitored car parks while you head off to your gate. For the full departure checklist — documents, photos, mileage records — see our <Link href="/general-information#1" className="text-[#e7701e] font-semibold hover:underline">General Information</Link> page.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#1a1a1a] font-bold text-[16px] mb-2 uppercase tracking-[0.5px]">
                    On The Day Of Your Arrival
                  </h3>
                  <p>
                    Landed and ready to go home? Just call us once you&apos;ve collected your luggage, and your car will be waiting at the terminal meeting point by the time you get there — no queues, no shuttle buses. Full collection details are on our <Link href="/general-information#2" className="text-[#e7701e] font-semibold hover:underline">General Information</Link> page.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#1a1a1a] font-bold text-[16px] mb-2 uppercase tracking-[0.5px]">
                    Our Commitment to Quality and Value
                  </h3>
                  <p>
                    At Easy Parking, we are committed to providing affordable, secure, and convenient parking solutions for all travelers. Whether you&apos;re flying from the North or South Terminal, our established team of parking experts will ensure your experience is smooth from start to finish. With on-the-ground experts, you can trust that you&apos;re in safe hands no matter which parking option you choose.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#1a1a1a] font-bold text-[16px] mb-2 uppercase tracking-[0.5px]">
                    Book Your Parking Now
                  </h3>
                  <p>
                    Secure your spot today and enjoy hassle-free airport parking at Gatwick. Visit our <Link href="/car-park-booking-system" className="text-[#e7701e] font-semibold hover:underline">Online Booking Page</Link> or call us at <span className="font-bold text-[#e7701e]">+44 333 004 0262</span>.
                  </p>
                </div>
              </div>

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

      {/* ================= FAQ ACCORDION SECTION ================= */}
      <section className="w-full bg-[#fcfbfa] border-t border-b border-gray-100">
        <FaqAccordion />
      </section>

    </div>
  );
}
