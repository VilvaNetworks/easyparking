import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms And Conditions For Parking Fine/Penalty Notices - Easy Parking Ltd',
  description: 'Learn about our terms and conditions for parking charges, traffic fines, and penalty notices received while your vehicle is in our care.',
  alternates: {
    canonical: '/terms-and-conditions-for-parking-fine-penalty-notices',
  },
};

const finesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.easyparkingltd.com/terms-and-conditions-for-parking-fine-penalty-notices/#webpage",
      "url": "https://www.easyparkingltd.com/terms-and-conditions-for-parking-fine-penalty-notices/",
      "name": "Terms and Conditions For Parking Fine/Penalty Notices - Easy Parking Ltd",
      "description": "Official terms and conditions outlining liability, procedure, and timelines for parking fines and penalty charge notices.",
      "breadcrumb": {
        "@id": "https://www.easyparkingltd.com/terms-and-conditions-for-parking-fine-penalty-notices/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.easyparkingltd.com/terms-and-conditions-for-parking-fine-penalty-notices/#breadcrumb",
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
          "name": "Terms and Conditions For Parking Fine/Penalty Notices",
          "item": "https://www.easyparkingltd.com/terms-and-conditions-for-parking-fine-penalty-notices/"
        }
      ]
    }
  ]
};

export default function ParkingFinePenaltyPage() {
  const terms = [
    "Any parking charge or penalty notice received for your vehicle whilst in our care – after the time the vehicle was handed over to us and before the time the vehicle was picked up back by you (which will be verified from the handover and collection sheet as we record all the details including the time of drop off and pick up) will be paid by us.",
    "You have to inform us as soon as you receive the charge or notice so we get to pay the discounted charge or fine within the 14 days time limit or you have to transfer the charge to us formally so we can get the letter and pay the discounted charge or fine within the stipulated time.",
    "Failure to do this (inform us early allowing us to pay the discounted amount or transfer the charge formally) will result in the charge or fine being shared by the customer as well due to the customer’s negligence."
  ];

  return (
    <div className="w-full bg-[#faf9f6] text-[#2c3e50] font-sans pb-16 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finesSchema) }}
      />
      
      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/how-banner.png"
            alt="Parking Fines Terms Banner"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center px-4 mt-6">
          <h1 className="text-white text-[24px] sm:text-[32px] md:text-[44px] font-extrabold tracking-[2px] sm:tracking-[4px] uppercase font-sans max-w-[850px] mx-auto leading-tight">
            Terms &amp; Conditions for Parking Fine / Penalty Notices
          </h1>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="w-full py-12 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1000px] mx-auto border border-gray-200 bg-white p-6 sm:p-8 md:p-12 shadow-sm rounded-2xl border-t-4 border-t-[#e7701e]">
          <h2 className="text-[#1a1a1a] text-[20px] sm:text-[24px] font-extrabold mb-6 font-sans border-b border-gray-200 pb-4">
            Parking Charge &amp; Penalty Notices Policy
          </h2>
          
          <p className="text-[#555555] text-[15px] sm:text-[16px] leading-[1.75] mb-8 font-medium italic">
            Please read carefully our policy regarding parking tickets, fines, and penalty charge notices (PCNs) that may arise while the vehicle is parked in our care.
          </p>

          <ol className="space-y-6 list-none p-0 m-0">
            {terms.map((term, idx) => (
              <li key={idx} className="flex gap-4 items-start text-[#4a4a4a] text-[14px] sm:text-[15px] leading-[1.75]">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[13px]">
                  {idx + 1}
                </span>
                <p className="pt-0.5 flex-1">{term}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 text-center">
            <Link
              href="/#book_now"
              className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[15px] px-10 py-[12px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
