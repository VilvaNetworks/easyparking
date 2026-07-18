import type { Metadata } from 'next';
import { Montserrat, Marcellus, Marck_Script } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marcellus',
});

const marckScript = Marck_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marck-script',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.easyparkingltd.com'),
  title: 'Easy Parking Ltd - Secure Gatwick Airport Meet & Greet Parking',
  description: 'Smart, secure, and stress-free airport parking solutions at London Gatwick. Book your Meet & Greet or Valet parking space with Easy Parking Ltd today.',
  keywords: ['gatwick parking', 'airport parking', 'meet and greet', 'valet parking', 'easy parking', 'gatwick valet'],
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Easy Parking Ltd - Secure Gatwick Airport Meet & Greet Parking',
    description: 'Smart, secure, and stress-free airport parking solutions at London Gatwick. Book your Meet & Greet or Valet parking space with Easy Parking Ltd today.',
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
    title: 'Easy Parking Ltd - Secure Gatwick Airport Meet & Greet Parking',
    description: 'Smart, secure, and stress-free airport parking solutions at London Gatwick.',
    images: ['/images/logo.png'],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.easyparkingltd.com/#organization",
  "name": "Easy Parking Ltd",
  "url": "https://www.easyparkingltd.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.easyparkingltd.com/images/logo.png"
  },
  "sameAs": [
    "https://www.facebook.com/easyparkingltd",
    "https://twitter.com/easyparkingltd"
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.easyparkingltd.com/#localbusiness",
  "name": "Easy Parking Ltd",
  "image": "https://www.easyparkingltd.com/images/car.jpg",
  "url": "https://www.easyparkingltd.com",
  "telephone": "+443330040262",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1-2, Johnston Road, Woodford Green",
    "addressLocality": "London",
    "addressRegion": "England",
    "postalCode": "IG8 0XA",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.605378,
    "longitude": 0.031575
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "17:00"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${marcellus.variable} ${marckScript.variable}`}>
      <body className="font-sans bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
