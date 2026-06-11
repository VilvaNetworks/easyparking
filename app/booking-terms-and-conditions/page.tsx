import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Booking Terms and Conditions - Easy Parking Ltd',
  description: 'Please read our terms and conditions carefully which applies both to direct bookings made through our website and bookings made through any third party.',
};

export default function BookingTermsAndConditionsPage() {
  const terms = [
    "Customer's must make sure that the vehicle is in legal and roadworthy condition including Full Insurance, Road Tax and MOT.",
    "You must not leave any dangerous or illegal substances in the vehicle. You must also remove any house keys, personal belongings, luggage and possessions from the vehicle.",
    "You must comply with any instructions given by the authorized person and hand them over the vehicle key.",
    "Our charges does not include Airport Entry and Exit charges.",
    "On your return to the UK, give us a call once you collect your luggage, so that we can have your car ready for you.",
    "You must produce us the receipt or the card that we have provided you with when handing over the car at the airport. You will also be asked to confirm your identity and any other details to make sure we hand over the vehicle to its owner.",
    "Failure to produce the receipt or the card or in case of any additional details required will delay the release of your vehicle."
  ];

  return (
    <div className="w-full bg-white text-[#2c3e50] font-sans pb-16 md:pb-24">
      
      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/how-banner.png"
            alt="Booking Terms and Conditions Banner"
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
            Booking Terms and Conditions
          </h1>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1000px] mx-auto border border-gray-200 bg-[#fcfbfa] p-8 md:p-12 shadow-sm">
          <h2 className="text-[#1a1a1a] text-[24px] md:text-[28px] font-extrabold mb-6 font-sans border-b border-gray-200 pb-4">
            Terms &amp; Conditions
          </h2>
          
          <p className="text-[#555555] text-[15px] sm:text-[16px] leading-[1.75] mb-8 font-medium italic">
            Please read our terms and conditions carefully which applies both to direct bookings made through our website and bookings made through any third party (contractor or agents approved by us).
          </p>

          <ol className="space-y-6 list-none p-0 m-0">
            {terms.map((term, idx) => (
              <li key={idx} className="flex gap-4 items-start text-[#4a4a4a] text-[15px] sm:text-[16px] leading-[1.75]">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[14px]">
                  {idx + 1}
                </span>
                <p className="pt-0.5">{term}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 text-center">
            <Link
              href="/#book_now"
              className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
