import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'How Airport Parking Works | Easy Parking Ltd',
  description: 'Discover how simple departure check-ins and arrival car pick-ups are handled at London Gatwick Terminal. Review our parking and valet procedures.',
};

export default function HowItWorksPage() {
  return (
    <div className="w-full bg-white text-[#2c3e50] font-sans">
      
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
                  alt="Modern Home Indoor Garage"
                  fill
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="object-cover"
                  priority
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
                How It Works
              </h2>

              <div className="space-y-6 text-[#555555] text-[15px] leading-[1.75] mb-8">
                <div>
                  <h4 className="text-[#1a1a1a] font-bold text-[16px] mb-2 uppercase tracking-[0.5px]">
                    On The Day Of Your Departure
                  </h4>
                  <p>
                    Drive to the terminal and hand over your car to our professional, insured and DBS checked Easy Parking Employee – who will meet and greet you with a <span className="font-bold text-[#e7701e]">HAPPY SMILE</span> and clarify you of any doubts that you may have. Our staff will take photos of the car and note down the mileage and all the other required details to ensure that your car stays as safe as possible in our care. Sign the necessary documents after reading the instructions carefully which you can also find in the information section here. Hand over your car keys and head forward to your departure terminal, without having to worry about your car as all our car parks are full safe and secure, with CCTV recordings and is monitored 24/7.
                  </p>
                </div>

                <div>
                  <h4 className="text-[#1a1a1a] font-bold text-[16px] mb-2 uppercase tracking-[0.5px]">
                    On The Day Of Your Arrival
                  </h4>
                  <p>
                    On the day of your arrival, which can be a very hectic and tiring day as you would wish to reach your home soon and have a nice warm coffee or rest, give us a call once you land at the Airport and collect your luggage&apos;s. We will have your car ready for collection at the terminal meeting point, where you can collect your car from our staff and drive home with peace.
                  </p>
                </div>

                <div>
                  <h4 className="text-[#1a1a1a] font-bold text-[16px] mb-2 uppercase tracking-[0.5px]">
                    Our Commitment to Quality and Value
                  </h4>
                  <p>
                    At Easy Parking, we are committed to providing affordable, secure, and convenient parking solutions for all travelers. Whether you&apos;re flying from the North or South Terminal, our established team of parking experts will ensure your experience is smooth from start to finish. With on-the-ground experts, you can trust that you&apos;re in safe hands no matter which parking option you choose.
                  </p>
                </div>

                <div>
                  <h4 className="text-[#1a1a1a] font-bold text-[16px] mb-2 uppercase tracking-[0.5px]">
                    Book Your Parking Now
                  </h4>
                  <p>
                    Secure your spot today and enjoy hassle-free airport parking at Gatwick. Visit our <Link href="/#book_now" className="text-[#e7701e] font-semibold hover:underline">[Online Booking Page]</Link> or call us at <span className="font-bold text-[#e7701e]">+44 333 004 0262</span>.
                  </p>
                </div>
              </div>

              <div>
                <Link
                  href="/#book_now"
                  className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[16px] px-12 py-[14px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
                >
                  Book Now
                </Link>
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
