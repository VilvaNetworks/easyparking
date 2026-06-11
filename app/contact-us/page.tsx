import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Easy Parking Ltd',
  description: 'Contact Easy Parking Ltd for Gatwick Airport parking assistance, bookings, and customer support. Call +44 333 004 0262 or email Info@easyparkingltd.com.',
};

export default function ContactUsPage() {
  return (
    <div className="w-full bg-white text-[#2c3e50] font-sans">
      
      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-banner.png"
            alt="Contact Us Banner"
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
            Contact us
          </h1>
        </div>
      </section>

      {/* ================= HELPLINE & EMAIL CARDS ================= */}
      <section className="w-full bg-white py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1100px] mx-auto">
            
            {/* Helpline Card */}
            <div className="border border-gray-200 bg-white hover:border-[#e7701e] transition-all duration-300 p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-md group">
              <div className="w-14 h-14 bg-orange-50 text-[#e7701e] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#e7701e] group-hover:text-white transition-colors duration-300">
                <svg aria-hidden="true" className="w-6 h-6 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                </svg>
              </div>
              <h3 className="text-[#1a1a1a] text-[20px] font-bold mb-3 font-sans">
                Booking Helpline
              </h3>
              <p className="text-[#555555] text-[16px] font-semibold">
                <Link href="tel:+443330040262" className="hover:text-[#e7701e] transition-colors duration-300">
                  +44 333 004 0262
                </Link>
              </p>
            </div>

            {/* Email Card */}
            <div className="border border-gray-200 bg-white hover:border-[#e7701e] transition-all duration-300 p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-md group">
              <div className="w-14 h-14 bg-orange-50 text-[#e7701e] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#e7701e] group-hover:text-white transition-colors duration-300">
                <svg aria-hidden="true" className="w-6 h-6 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                </svg>
              </div>
              <h3 className="text-[#1a1a1a] text-[20px] font-bold mb-3 font-sans">
                Email
              </h3>
              <p className="text-[#555555] text-[16px] font-semibold">
                <Link href="mailto:Info@easyparkingltd.com" className="hover:text-[#e7701e] transition-colors duration-300">
                  Info@easyparkingltd.com
                </Link>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CUSTOMER SUPPORT & CONTACT FORM ================= */}
      <section className="w-full bg-[#fcfbfa] py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 border-t border-gray-100">
        <div className="max-w-[1320px] mx-auto">
          
          {/* Section Title */}
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-[#1a1a1a] text-[32px] md:text-[38px] font-extrabold leading-[1.2] tracking-tight">
              Customer Support
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Image */}
            <div className="relative w-full flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[580px] aspect-[500/350] overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/services/img1.png"
                  alt="Customer Handing Over Car Keys"
                  fill
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="w-full">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* ================= GOOGLE MAPS EMBED ================= */}
      <section className="w-full h-[450px] relative overflow-hidden border-t border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.304563820299!2d0.030560877074744747!3d51.60337837183317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a7a0bbfb77c5%3A0xe6bf44b419ec417a!2sJohnston%20Rd%2C%20Woodford%2C%20Woodford%20Green!5e0!3m2!1sen!2suk!4v1718117900000!5m2!1sen!2suk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Easy Parking Registered Office Map Location"
        />
      </section>

    </div>
  );
}
