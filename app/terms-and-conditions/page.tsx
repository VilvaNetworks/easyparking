import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookNowLink from "@/components/BookNowLink";
import SidebarScrollSpy from "./SidebarScrollSpy";

export const metadata: Metadata = {
  title: "Terms and Conditions - Easy Parking",
  description: "Please read our terms and conditions carefully, covering cancellations and refunds, booking terms, complaints and damage claims, and parking fine/penalty notices.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

const tcSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.easyparkingltd.com/terms-and-conditions#webpage",
      "url": "https://www.easyparkingltd.com/terms-and-conditions",
      "name": "Terms and Conditions - Easy Parking",
      "description": "Official terms and conditions for Easy Parking covering cancellations and refunds, booking terms, complaints/damage claims, and parking fine/penalty notices.",
      "breadcrumb": {
        "@id": "https://www.easyparkingltd.com/terms-and-conditions#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.easyparkingltd.com/terms-and-conditions#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.easyparkingltd.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Terms and Conditions",
          "item": "https://www.easyparkingltd.com/terms-and-conditions"
        }
      ]
    }
  ]
};

export default function TermsAndConditionsPage() {
  const navItems = [
    { anchor: "1", label: "Cancellations & Refund Policy" },
    { anchor: "2", label: "Booking Terms and Conditions" },
    { anchor: "3", label: "Complaints / Claims" },
    { anchor: "4", label: "Parking Fine / Penalty Notices" },
  ];

  const bookingTerms = [
    "Customer's must make sure that the vehicle is in legal and roadworthy condition including Full Insurance, Road Tax and MOT.",
    "You must not leave any dangerous or illegal substances in the vehicle. You must also remove any house keys, personal belongings, luggage and possessions from the vehicle.",
    "You must comply with any instructions given by the authorized person and hand them over the vehicle key.",
    "Our charges does not include Airport Entry and Exit charges.",
    "On your return to the UK, give us a call once you collect your luggage, so that we can have your car ready for you.",
    "You must produce us the receipt or the card that we have provided you with when handing over the car at the airport. You will also be asked to confirm your identity and any other details to make sure we hand over the vehicle to its owner.",
    "Failure to produce the receipt or the card or in case of any additional details required will delay the release of your vehicle."
  ];

  const complaintsTerms = [
    "We will investigate the damage or the problem thoroughly and let you know of any outcome that we deem is fair and responsible in the given situation.",
    "If we accept liability for the damage, we will then repair your vehicle by the contractors approved by us. We will provide you with a courtesy car during the period of the repair. Under any circumstances, we do not accept any repairs done by any third-party agencies or anyone else under your supervision without our knowledge or without prior written approval from us.",
    "Minor damages, scratches, stones etc. arising due to normal driving road conditions will not be considered in a complaint/claim.",
    "We will not be responsible for dust, bird poo, rain and other concerns arising due to storing the Vehicle in open conditions. Our sites may be open or closed storage facility based on the demand and availability but are all BPA approved parking places and you can be rest assured regarding the safety of the vehicle.",
    "If the customer wishes to record the mileage, they can do so with our vehicle handling staff but should bear in mind that the vehicle will be moved to and from our parking facility which will be less than 10 mile one way as per the BPA authorized guidelines.",
    "We accept no liability for any electrical failure of any part including alarm, windscreens, immobilizers, glass, flat batteries, tyres and alloys and mechanical or structural failures, however caused.",
    "We are also not responsible for any damages that were not visible earlier due to dirt or hidden damages which becomes visible after cleaning or washing of the vehicle.",
    "We are not responsible for any property or things left unattended in your vehicle or in the courtesy cars that we provided you.",
    "We will take responsible care of your vehicle for the period that you have booked with us and paid for. However, if you park for longer than the days you booked with us due to flight delays or other personal reasons, we will charge you in full for those days based on the prices at that time.",
    "If you did not collect your vehicle for longer days and did not attempt to contact us or arrange any alternative plans with us, then we may dispose your vehicle (after reasonable attempts to contact you from our staffs before doing so) and cover any loss incurred by us. We will not refund for any early returns.",
    "You can cancel your bookings up to 14 days after the booking and you will be refunded all the money that you have paid us.",
    "Cancellations made after that 14-day window but at least 48 hours before your booking start time are still refunded, minus a standard administration fee.",
    "No refunds or credit will be given for cancellations within 48 hours of the booking and for the customers who have a booking with us but did not turn up at the date and time specified."
  ];

  const fineTerms = [
    "Any parking charge or penalty notice received for your vehicle whilst in our care – after the time the vehicle was handed over to us and before the time the vehicle was picked up back by you (which will be verified from the handover and collection sheet as we record all the details including the time of drop off and pick up) will be paid by us.",
    "You have to inform us as soon as you receive the charge or notice so we get to pay the discounted charge or fine within the 14 days time limit or you have to transfer the charge to us formally so we can get the letter and pay the discounted charge or fine within the stipulated time.",
    "Failure to do this (inform us early allowing us to pay the discounted amount or transfer the charge formally) will result in the charge or fine being shared by the customer as well due to the customer’s negligence."
  ];

  return (
    <div className="w-full bg-[#faf9f6] text-[#2c3e50] font-sans pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tcSchema) }}
      />

      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/how-banner.png"
            alt="Terms and Conditions Banner"
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
            Terms and Conditions
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT SECTION ================= */}
      <section className="max-w-[1320px] mx-auto py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* LEFT COLUMN: STICKY INDEX NAVBAR */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-[170px] z-40">
            <SidebarScrollSpy navItems={navItems} />
          </div>

          {/* RIGHT COLUMN: DETAILED SECTIONS */}
          <div className="w-full lg:w-3/4 flex flex-col gap-12 sm:gap-16">

            {/* --- SECTION 1: CANCELLATIONS & REFUND POLICY --- */}
            <article
              id="1"
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-[#e7701e]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#e7701e] font-extrabold text-sm">
                      01
                    </span>
                    <span className="text-[#e7701e] text-[13px] font-bold uppercase tracking-wider">
                      Cancellations & Refunds
                    </span>
                  </div>
                  <h2 className="text-[#1a1a1a] text-[22px] sm:text-[26px] font-extrabold font-sans leading-tight mb-5">
                    Cancellations & Refund Policy
                  </h2>
                  <ul className="space-y-3.5 text-[#555555] text-[14px] sm:text-[15px] leading-relaxed">
                    {[
                      "You can cancel your bookings up to 14 days after the booking and you will be refunded all the booking money.",
                      "However, if you wish to cancel after 14 days up to 48 hours prior to your booking, you will be refunded but will be charged an administration fee.",
                      "No refunds or credit will be given for cancellations within 48 hours of booking and for customers who have a booking with us but did not turn up at the date and time specified.",
                      "Any refunds or credits will be paid back only to the original card or account that the customer has used to make the booking with us."
                    ].map((text, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[#e7701e]">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                          </svg>
                        </span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <BookNowLink
                      className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[14px] px-8 py-[10px] rounded-[6px] transition-all duration-300 shadow-sm"
                    >
                      Book Your Parking
                    </BookNowLink>
                  </div>
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src="/images/general/refund-finance.jpg"
                    alt="Finances and invoices"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>
            </article>

            {/* --- SECTION 2: BOOKING TERMS AND CONDITIONS --- */}
            <article
              id="2"
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-[#e7701e]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#e7701e] font-extrabold text-sm">
                  02
                </span>
                <span className="text-[#e7701e] text-[13px] font-bold uppercase tracking-wider">
                  Booking terms
                </span>
              </div>
              <h2 className="text-[#1a1a1a] text-[22px] sm:text-[26px] font-extrabold font-sans leading-tight mb-5">
                Booking Terms and Conditions
              </h2>
              <p className="text-[#555555] text-[14px] sm:text-[15px] leading-relaxed mb-6 font-medium italic">
                Please read our terms and conditions carefully which applies both to direct bookings made through our website and bookings made through any third party (contractor or agents approved by us).
              </p>
              <ol className="space-y-6 list-none p-0 m-0">
                {bookingTerms.map((term, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-[#4a4a4a] text-[14px] sm:text-[15px] leading-[1.75]">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[14px]">
                      {idx + 1}
                    </span>
                    <p className="pt-0.5">{term}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[14px] px-8 py-[10px] rounded-[6px] transition-all duration-300 shadow-sm"
                >
                  Back to Home
                </Link>
              </div>
            </article>

            {/* --- SECTION 3: TERMS AND CONDITIONS FOR COMPLAINTS/CLAIMS --- */}
            <article
              id="3"
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-[#e7701e]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#e7701e] font-extrabold text-sm">
                  03
                </span>
                <span className="text-[#e7701e] text-[13px] font-bold uppercase tracking-wider">
                  Complaints & Claims
                </span>
              </div>
              <h2 className="text-[#1a1a1a] text-[22px] sm:text-[26px] font-extrabold font-sans leading-tight mb-5">
                Terms &amp; Conditions for Complaints / Claims
              </h2>

              <div className="text-[#555555] text-[14px] sm:text-[15px] leading-relaxed mb-6 font-medium italic space-y-2">
                <p>Inspect your vehicle and report any damages or concerns immediately to our representative.</p>
                <p>You will be asked to send photographic proofs and should not repair the vehicle before we acknowledge your complaint.</p>
              </div>

              <ol className="space-y-5 list-none p-0 m-0">
                {complaintsTerms.map((term, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-[#4a4a4a] text-[14px] sm:text-[15px] leading-[1.75]">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[13px]">
                      {idx + 1}
                    </span>
                    <p className="pt-0.5 flex-1">{term}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[14px] px-8 py-[10px] rounded-[6px] transition-all duration-300 shadow-sm"
                >
                  Back to Home
                </Link>
              </div>
            </article>

            {/* --- SECTION 4: TERMS AND CONDITIONS FOR PARKING FINE/PENALTY NOTICES --- */}
            <article
              id="4"
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-[#e7701e]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#e7701e] font-extrabold text-sm">
                  04
                </span>
                <span className="text-[#e7701e] text-[13px] font-bold uppercase tracking-wider">
                  Parking fines & penalties
                </span>
              </div>
              <h2 className="text-[#1a1a1a] text-[22px] sm:text-[26px] font-extrabold font-sans leading-tight mb-5">
                Terms &amp; Conditions for Parking Fine / Penalty Notices
              </h2>

              <p className="text-[#555555] text-[14px] sm:text-[15px] leading-relaxed mb-6 font-medium italic">
                Please read carefully our policy regarding parking tickets, fines, and penalty charge notices (PCNs) that may arise while the vehicle is parked in our care.
              </p>

              <ol className="space-y-6 list-none p-0 m-0">
                {fineTerms.map((term, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-[#4a4a4a] text-[14px] sm:text-[15px] leading-[1.75]">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[13px]">
                      {idx + 1}
                    </span>
                    <p className="pt-0.5 flex-1">{term}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[14px] px-8 py-[10px] rounded-[6px] transition-all duration-300 shadow-sm"
                >
                  Back to Home
                </Link>
              </div>
            </article>

          </div>
        </div>
      </section>
    </div>
  );
}
