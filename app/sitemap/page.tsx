import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import posts from '@/data/blogs.json';

export const metadata: Metadata = {
  title: 'Sitemap - Easy Parking Ltd',
  description: 'User-facing sitemap directory for Easy Parking Ltd. Find quick links to our main pages, airport parking booking system, blog articles, and corporate terms.',
  alternates: {
    canonical: '/sitemap',
  },
};

export default function SitemapPage() {
  const corePages = [
    { label: "Home Page", href: "/" },
    { label: "About Our Company", href: "/about-us" },
    { label: "Our Services Overview", href: "/services" },
    { label: "How Our Service Works", href: "/how-it-works" },
    { label: "Contact Customer Support", href: "/contact-us" },
    { label: "My Member Account Dashboard", href: "/account" },
    { label: "Forgotten Password Recovery", href: "/account/lost-password" },
  ];

  const bookingServices = [
    { label: "Car Park Booking System (Get a Quote)", href: "/car-park-booking-system" },
    { label: "Meet & Greet Parking Service", href: "/services#1" },
    { label: "Valeting Service", href: "/services#2" },
    { label: "Full Car Wash Service (£34.99)", href: "/services#3" },
    { label: "Outside Only Car Wash (£14.99)", href: "/services#4" },
    { label: "Electric Vehicle Fast Charging", href: "/services#5" },
    { label: "Transfer & Chauffeur Services", href: "/services#6" },
  ];

  const infoPolicies = [
    { label: "Booking Process & Guidelines", href: "/booking-process" },
    { label: "Booking Terms and Conditions", href: "/booking-terms-and-conditions" },
    { label: "On the Day of Departure Info", href: "/general-information#1" },
    { label: "On the Day of Arrival Info", href: "/general-information#2" },
    { label: "Cancellations / Refund Policy", href: "/general-information#3" },
    { label: "Complaints & Claims Terms", href: "/terms-and-conditions-for-complaints-claims" },
    { label: "Parking Fine / Penalty Notices Terms", href: "/terms-and-conditions-for-parking-fine-penalty-notices" },
    { label: "Corporate Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <div className="w-full bg-white text-[#2c3e50] font-sans pb-16 md:pb-24">
      
      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/how-banner.png"
            alt="Sitemap Directory Banner"
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
            Sitemap
          </h1>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          
          <div className="text-center mb-12 max-w-[800px] mx-auto">
            <h2 className="text-[#1a1a1a] text-[28px] md:text-[34px] font-extrabold tracking-tight mb-4 font-sans">
              Website Link Directory
            </h2>
            <p className="text-[#555555] text-[15px] leading-relaxed">
              Navigate easily through all the pages, services, articles, and legal documents of the Easy Parking Ltd airport parking web portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            
            {/* CARD 1: Core Navigation */}
            <div className="border border-gray-200 bg-[#fcfbfa] p-6 md:p-8 flex flex-col shadow-sm">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] uppercase tracking-[1px] mb-6 border-b-2 border-[#e7701e] pb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#e7701e] rounded-full" />
                Main Pages
              </h3>
              <ul className="space-y-3.5 list-none p-0 m-0">
                {corePages.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] sm:text-[15px] font-semibold text-[#4a4a4a] hover:text-[#e7701e] transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="text-[#e7701e] font-extrabold text-[16px] leading-none">»</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CARD 2: Booking & Services */}
            <div className="border border-gray-200 bg-[#fcfbfa] p-6 md:p-8 flex flex-col shadow-sm">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] uppercase tracking-[1px] mb-6 border-b-2 border-[#e7701e] pb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#e7701e] rounded-full" />
                Booking &amp; Services
              </h3>
              <ul className="space-y-3.5 list-none p-0 m-0">
                {bookingServices.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] sm:text-[15px] font-semibold text-[#4a4a4a] hover:text-[#e7701e] transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="text-[#e7701e] font-extrabold text-[16px] leading-none">»</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CARD 3: Info & Policies */}
            <div className="border border-gray-200 bg-[#fcfbfa] p-6 md:p-8 flex flex-col shadow-sm">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] uppercase tracking-[1px] mb-6 border-b-2 border-[#e7701e] pb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#e7701e] rounded-full" />
                Policies &amp; Info
              </h3>
              <ul className="space-y-3.5 list-none p-0 m-0">
                {infoPolicies.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] sm:text-[15px] font-semibold text-[#4a4a4a] hover:text-[#e7701e] transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="text-[#e7701e] font-extrabold text-[16px] leading-none">»</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CARD 4: Blog & News */}
            <div className="border border-gray-200 bg-[#fcfbfa] p-6 md:p-8 flex flex-col shadow-sm">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] uppercase tracking-[1px] mb-6 border-b-2 border-[#e7701e] pb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#e7701e] rounded-full" />
                Blog Articles
              </h3>
              <ul className="space-y-3.5 list-none p-0 m-0">
                <li>
                  <Link
                    href="/blog"
                    className="text-[14px] sm:text-[15px] font-extrabold text-[#1a1a1a] hover:text-[#e7701e] transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-[#e7701e] font-extrabold text-[16px] leading-none">»</span>
                    Blog Index Page
                  </Link>
                </li>
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[14px] sm:text-[15px] font-semibold text-[#4a4a4a] hover:text-[#e7701e] transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="text-[#e7701e] font-extrabold text-[16px] leading-none">»</span>
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
