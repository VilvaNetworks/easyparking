import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms And Conditions For Complaints/Claims - Easy Parking Ltd',
  description: 'Review our terms and conditions regarding vehicle inspections, reports of damages, complaints processing, liability limitations, and claims policies.',
  alternates: {
    canonical: '/terms-and-conditions-for-complaints-claims',
  },
};

const complaintsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.easyparkingltd.com/terms-and-conditions-for-complaints-claims#webpage",
      "url": "https://www.easyparkingltd.com/terms-and-conditions-for-complaints-claims",
      "name": "Terms and Conditions for Complaints/Claims - Easy Parking Ltd",
      "description": "Official terms and conditions outlining policies for complaints, damage claims, repair handling, and vehicle liability with Easy Parking Ltd.",
      "breadcrumb": {
        "@id": "https://www.easyparkingltd.com/terms-and-conditions-for-complaints-claims#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.easyparkingltd.com/terms-and-conditions-for-complaints-claims#breadcrumb",
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
          "name": "Terms and Conditions for Complaints/Claims",
          "item": "https://www.easyparkingltd.com/terms-and-conditions-for-complaints-claims"
        }
      ]
    }
  ]
};

export default function ComplaintsClaimsPage() {
  const terms = [
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

  return (
    <div className="w-full bg-[#faf9f6] text-[#2c3e50] font-sans pb-16 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(complaintsSchema) }}
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
          <h1 className="text-white text-[24px] sm:text-[32px] md:text-[44px] font-extrabold tracking-[2px] sm:tracking-[4px] uppercase font-sans max-w-[800px] mx-auto leading-tight">
            Terms &amp; Conditions for Complaints / Claims
          </h1>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="w-full py-12 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1000px] mx-auto border border-gray-200 bg-white p-6 sm:p-8 md:p-12 shadow-sm rounded-2xl border-t-4 border-t-[#e7701e]">
          <h2 className="text-[#1a1a1a] text-[20px] sm:text-[24px] font-extrabold mb-6 font-sans border-b border-gray-200 pb-4">
            Complaints and Damage Claims Guidelines
          </h2>
          
          <div className="text-[#555555] text-[15px] leading-[1.75] mb-8 font-medium italic space-y-2">
            <p>Inspect your vehicle and report any damages or concerns immediately to our representative.</p>
            <p>You will be asked to send photographic proofs and should not repair the vehicle before we acknowledge your complaint.</p>
          </div>

          <ol className="space-y-5 list-none p-0 m-0">
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
              href="/"
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
