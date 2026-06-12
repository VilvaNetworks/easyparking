import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import BookingForm from '@/components/BookingForm';
import FlexibleScheduling from '@/components/FlexibleScheduling';
import AboutSection from '@/components/AboutSection';
import ArrivalsDepartures from '@/components/ArrivalsDepartures';
import PremiumParking from '@/components/PremiumParking';
import WhyChooseUs from '@/components/WhyChooseUs';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import BlogSection from '@/components/BlogSection';

export const metadata: Metadata = {
  title: 'Gatwick Airport Parking - Meet & Greet | Easy Parking Ltd',
  description: 'Drive directly to the Gatwick terminal, and our insured drivers will park your vehicle securely. Affordable Meet & Greet valet airport parking services.',
  openGraph: {
    title: 'Gatwick Airport Parking - Meet & Greet | Easy Parking Ltd',
    description: 'Drive directly to the Gatwick terminal, and our insured drivers will park your vehicle securely. Affordable Meet & Greet valet airport parking services.',
    url: 'https://www.easyparkingltd.com',
    siteName: 'Easy Parking Ltd',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Easy Parking Ltd Gatwick Airport Meet & Greet Logo',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gatwick Airport Parking - Meet & Greet | Easy Parking Ltd',
    description: 'Drive directly to the Gatwick terminal, and our insured drivers will park your vehicle securely. Affordable Meet & Greet valet airport parking services.',
    images: ['/images/logo.png'],
  },
};

// Dynamically load the Swiper-heavy OurServices component to optimize PageSpeed Insights score (reduces TBT / blocking JS load)
const OurServices = dynamic(() => import('@/components/OurServices'));

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.easyparkingltd.com/#website",
      "url": "https://www.easyparkingltd.com",
      "name": "Easy Parking Ltd",
      "description": "Smart, secure, and stress-free airport parking solutions at Gatwick Airport.",
      "publisher": {
        "@id": "https://www.easyparkingltd.com/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.easyparkingltd.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the Meet & Greet service work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Drive directly to your Gatwick terminal, where one of our professional chauffeurs will meet you and park your vehicle in our secure facility. On your return, your vehicle is delivered back to the terminal ready for you."
          }
        },
        {
          "@type": "Question",
          "name": "Is my vehicle safe in your parking facility?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, your vehicle is highly secure. Our parking facility features 24/7 CCTV surveillance, secure perimeter fencing, and regular security patrols."
          }
        },
        {
          "@type": "Question",
          "name": "Can I request electric car charging while parked?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We offer professional electric car charging options as an add-on service. Your car will be fully charged and ready for you upon your return."
          }
        }
      ]
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Hero />
      {/* <BookingForm /> */}
      <FlexibleScheduling />
      <AboutSection />
      <ArrivalsDepartures />
      <OurServices />
      <PremiumParking />
      <WhyChooseUs />
      <Gallery />
      <BlogSection />
    </>
  );
}
