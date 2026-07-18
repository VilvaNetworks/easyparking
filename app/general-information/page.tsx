import type { Metadata } from "next";
import Image from "next/image";
import BookNowLink from "@/components/BookNowLink";
import SidebarScrollSpy from "./SidebarScrollSpy";

export const metadata: Metadata = {
  title: "General Information | Easy Parking Ltd",
  description: "Read essential instructions for your airport meet & greet parking at London Gatwick. View departure check-ins, arrival returns, refund policies, and vehicle limits.",
  alternates: {
    canonical: "/general-information",
  },
};

const generalInfoSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.easyparkingltd.com/general-information#webpage",
      "url": "https://www.easyparkingltd.com/general-information",
      "name": "General Information - Easy Parking Ltd",
      "description": "General instructions and airport procedures for Meet & Greet Gatwick parking at Easy Parking Ltd, including departure check-ins, arrival collections, cancellations and differently-abled customer info.",
      "breadcrumb": {
        "@id": "https://www.easyparkingltd.com/general-information#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.easyparkingltd.com/general-information#breadcrumb",
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
          "name": "General Information",
          "item": "https://www.easyparkingltd.com/general-information"
        }
      ]
    }
  ]
};

export default function GeneralInformationPage() {
  const navItems = [
    { anchor: "1", label: "On The Day Of Your Departure" },
    { anchor: "2", label: "On the Day of Arrival" },
    { anchor: "3", label: "Cancellations & Refund Policy" },
    { anchor: "4", label: "Differently Abled Info" },
    { anchor: "5", label: "Vehicle Restrictions" },
    { anchor: "6", label: "Departure Procedure" },
    { anchor: "7", label: "Arrival Procedure" },
  ];

  return (
    <div className="w-full bg-[#faf9f6] text-[#2c3e50] font-sans pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generalInfoSchema) }}
      />

      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-banner.png"
            alt="General Information Banner"
            fill
            sizes="100vw"
            className="object-cover object-center animate-pulse-slow"
            priority
          />
          {/* Dark blue/navy overlay for high contrast */}
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center px-4 mt-6">
          <h1 className="text-white text-[30px] sm:text-[38px] md:text-[48px] font-extrabold tracking-[4px] uppercase font-sans">
            General Information
          </h1>
          <p className="text-orange-100 text-[14px] sm:text-[16px] mt-2 font-medium max-w-[600px] mx-auto tracking-wide">
            Everything you need to know for a smooth and stress-free airport parking experience.
          </p>
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
            
            {/* --- SECTION 1 --- */}
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
                      Pre-Flight checklist
                    </span>
                  </div>
                  <h2 className="text-[#1a1a1a] text-[22px] sm:text-[26px] font-extrabold font-sans leading-tight mb-5">
                    On The Day Of Your Departure
                  </h2>
                  <ul className="space-y-3.5 text-[#555555] text-[14px] sm:text-[15px] leading-relaxed">
                    {[
                      "Make sure to take the booking confirmation with you ready to be handed over to our dedicated staff at the terminal.",
                      "Make sure you have the necessary road tax, insurance and MOT for your vehicle while leaving the vehicle with us and that the vehicle is in road-worthy condition.",
                      "Check your vehicle and make sure you take all your personal belongings or valuable items with you and do not leave any items or dangerous goods in your vehicle. If any issue arises due to any materials or toxic or illegal substances in your car, you will be held responsible for any damage or legal consequences.",
                      "Give only the car key and not any other key or belongings to the staff.",
                      "Our staff will take photos of your vehicle and note down mileage and other necessary details.",
                      "Sign the necessary documents and speak to our staff in case of any doubts or queries. Remember to obtain the collection receipt or confirmation from our staff which you will need to show when you return to collect your vehicle.",
                      "In case of special needs customer, you can request us for any additional help required by phone or email so that we can be aware of it and help you in a safe and timely manner without any additional cost. We are always happy to help you.",
                      "Get ahead with your travel and proceed to your terminal without having to worry about your car."
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
                    src="/images/general/departure-watch.jpg"
                    alt="Checking watch on departure day"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>
            </article>

            {/* --- SECTION 2 --- */}
            <article
              id="2"
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-[#e7701e]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="order-2 md:order-1 relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src="/images/general/arrival-traveler.jpg"
                    alt="Man traveling on return flight"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#e7701e] font-extrabold text-sm">
                      02
                    </span>
                    <span className="text-[#e7701e] text-[13px] font-bold uppercase tracking-wider">
                      Arrival collections
                    </span>
                  </div>
                  <h2 className="text-[#1a1a1a] text-[22px] sm:text-[26px] font-extrabold font-sans leading-tight mb-5">
                    On the Day of Arrival
                  </h2>
                  <ul className="space-y-3.5 text-[#555555] text-[14px] sm:text-[15px] leading-relaxed">
                    {[
                      "Once you arrive at the terminal, collect your luggage's and call us so we can have your car ready for collection.",
                      "Meet us at the meeting terminal.",
                      "Make sure to show the collection receipt/confirmation and your ID so that we can hand over the car for your collection.",
                      "We will not be able to hand you over the car in case you fail to show the collection receipt/confirmation and the proper ID documents.",
                      "Make sure you have paid for all the days of parking/other services availed with us.",
                      "If you are not able to return on the scheduled date and time due to any flight cancellations or personal reasons you can call us or email us, and we can have the booking amended for you for which you can pay the additional charges incurred at the time of the collection of your car.",
                      "We will not be able to release your car if there is any outstanding money that needs to be paid.",
                      "Drive home safe and sound and remember our company and our service when you plan your travel next time."
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
              </div>
            </article>

            {/* --- SECTION 3 --- */}
            <article
              id="3"
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-[#e7701e]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#e7701e] font-extrabold text-sm">
                      03
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

            {/* --- SECTION 4 --- */}
            <article
              id="4"
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-[#e7701e]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="order-2 md:order-1 relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src="/images/general/disabled-info.jpg"
                    alt="Assistance for disabled customers"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#e7701e] font-extrabold text-sm">
                      04
                    </span>
                    <span className="text-[#e7701e] text-[13px] font-bold uppercase tracking-wider">
                      Special assistance
                    </span>
                  </div>
                  <h2 className="text-[#1a1a1a] text-[22px] sm:text-[26px] font-extrabold font-sans leading-tight mb-5">
                    Differently Abled Info
                  </h2>
                  <ul className="space-y-3.5 text-[#555555] text-[14px] sm:text-[15px] leading-relaxed">
                    {[
                      "Meet and Greet will be an excellent alternative for differently abled customers who would find it difficult to use transfer buses.",
                      "Your car is collected from the terminal when you leave for your trip and brought back to you at the terminal on your return.",
                      "Please inform us if you need any assistance and our Easy Parking drivers will be very happy to help you."
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
              </div>
            </article>

            {/* --- SECTION 5 --- */}
            <article
              id="5"
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-[#e7701e]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#e7701e] font-extrabold text-sm">
                      05
                    </span>
                    <span className="text-[#e7701e] text-[13px] font-bold uppercase tracking-wider">
                      Vehicle limits
                    </span>
                  </div>
                  <h2 className="text-[#1a1a1a] text-[22px] sm:text-[26px] font-extrabold font-sans leading-tight mb-5">
                    Vehicle Restrictions
                  </h2>
                  <ul className="space-y-3.5 text-[#555555] text-[14px] sm:text-[15px] leading-relaxed">
                    {[
                      "We do not accept very large vehicles, trailers and caravans.",
                      "We only accept cars, 7 seater, 9 seaters and vans (up to 3.5tonne)."
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
                    src="/images/general/restrictions.jpg"
                    alt="Vehicle specifications and restrictions"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>
            </article>

            {/* --- SECTION 6 --- */}
            <article
              id="6"
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-[#e7701e]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src="/images/general/departure-procedure.jpg"
                    alt="Departure Terminal procedure at Gatwick"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#e7701e] font-extrabold text-sm">
                      06
                    </span>
                    <span className="text-[#e7701e] text-[13px] font-bold uppercase tracking-wider">
                      Terminal instructions
                    </span>
                  </div>
                  <h2 className="text-[#1a1a1a] text-[22px] sm:text-[26px] font-extrabold font-sans leading-tight mb-5">
                    Departure Procedure
                  </h2>
                  <div className="text-[#555555] text-[14px] sm:text-[15px] leading-relaxed space-y-6">
                    <p className="font-semibold text-gray-700">
                      We at Easy Parking, are committed to give you a smooth and hassle-free service in parking your vehicle for your journey from Gatwick Airport, when you book with us. On the day of your departure, call us{" "}
                      <span className="text-[#e7701e] font-extrabold">20 minutes</span> before reaching the Gatwick Airport on{" "}
                      <a href="tel:+443330040262" className="text-[#e7701e] font-extrabold hover:underline">
                        0333 004 0262
                      </a>.
                    </p>

                    <div className="border-l-4 border-l-orange-400 pl-4 py-1">
                      <h3 className="font-extrabold text-[#1a1a1a] text-[15px] uppercase tracking-wider mb-2">
                        North Terminal
                      </h3>
                      <p>
                        For North terminal when entering the North terminal stay in the{" "}
                        <span className="font-bold text-gray-800">left lane</span> following the signs for the{" "}
                        <span className="font-bold text-gray-800 underline">short stay car park 6</span>{" "}
                        <em>(the SECOND car park on your right)</em>. On entering the barrier after taking your ticket you will proceed to the{" "}
                        <span className="font-bold text-gray-800">level 3 of car park 6.</span> Please reach out to our driver with{" "}
                        <span className="font-bold text-[#e7701e]">EASY PARKING</span> uniform and they will be happy to help you. This is also your meeting point on return.
                      </p>
                    </div>

                    <div className="border-l-4 border-l-orange-400 pl-4 py-1">
                      <h3 className="font-extrabold text-[#1a1a1a] text-[15px] uppercase tracking-wider mb-2">
                        South Terminal
                      </h3>
                      <p>
                        For South terminal when approaching the south terminal stay in the right-hand lane and follow the signs for the{" "}
                        <span className="font-bold text-gray-800">short stay car park</span> (pick up and drop off). On entering the barrier after taking your ticket you will proceed to the{" "}
                        <span className="font-bold text-gray-800 underline">orange car park 3 - level 4</span>. Please reach out to our driver with{" "}
                        <span className="font-bold text-[#e7701e]">EASY PARKING</span> uniform and they will be happy to help you. This is also your meeting point on your return.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <BookNowLink
                      className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[14px] px-8 py-[10px] rounded-[6px] transition-all duration-300 shadow-sm"
                    >
                      Book Your Parking
                    </BookNowLink>
                  </div>
                </div>
              </div>
            </article>

            {/* --- SECTION 7 --- */}
            <article
              id="7"
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-t-[#e7701e]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#e7701e] font-extrabold text-sm">
                      07
                    </span>
                    <span className="text-[#e7701e] text-[13px] font-bold uppercase tracking-wider">
                      Return collections
                    </span>
                  </div>
                  <h2 className="text-[#1a1a1a] text-[22px] sm:text-[26px] font-extrabold font-sans leading-tight mb-5">
                    Arrival Procedure
                  </h2>
                  <div className="text-[#555555] text-[14px] sm:text-[15px] leading-relaxed space-y-4">
                    <p className="font-semibold text-gray-700">
                      On your return, please call us on{" "}
                      <a href="tel:+443330040262" className="text-[#e7701e] font-extrabold hover:underline">
                        +44 333 004 0262
                      </a>{" "}
                      once you finish your Immigration. Our driver will hand over the car back to you as quickly and swiftly as possible.
                    </p>
                    <p>
                      Meet us at the designated pick-up location depending on the terminal you arrive at (same as your departure meeting point). Remember to have your collection receipt and ID ready.
                    </p>
                  </div>
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
                    src="/images/general/arrival-procedure.jpg"
                    alt="Arrival collection at Gatwick terminal"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>
    </div>
  );
}
