import type { Metadata } from 'next';
import { Suspense } from 'react';
import CarParkBookingWizard from '@/components/CarParkBookingWizard';

export const metadata: Metadata = {
  title: 'Car Park Booking System - Easy Parking',
  description: 'Book your airport parking at Gatwick Airport. Choose North or South terminal, parking options, valeting services, and complete your reservation.',
  alternates: {
    canonical: '/car-park-booking-system',
  },
  openGraph: {
    title: 'Car Park Booking System - Easy Parking',
    description: 'Book your airport parking at Gatwick Airport. Choose North or South terminal, parking options, valeting services, and complete your reservation.',
    url: 'https://www.easyparkingltd.com/car-park-booking-system',
    siteName: 'Easy Parking',
    locale: 'en_GB',
    type: 'website',
  },
};

const bookingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.easyparkingltd.com/car-park-booking-system/#service",
  "name": "Car Park Booking System",
  "url": "https://www.easyparkingltd.com/car-park-booking-system",
  "provider": {
    "@id": "https://www.easyparkingltd.com/#localbusiness"
  },
  "areaServed": "Gatwick Airport",
  "serviceType": "Airport Meet & Greet / Park & Ride parking booking"
};

export default function CarParkBookingSystemPage() {
  return (
    <div className="w-full bg-white text-[#2c3e50] font-sans py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingSchema) }}
      />
      <h1 className="sr-only">Car Park Booking System</h1>
      <Suspense fallback={
        <div className="max-w-[1300px] mx-auto px-4 text-center py-12">
          <p className="text-gray-500 font-semibold animate-pulse">Loading booking system...</p>
        </div>
      }>
        <CarParkBookingWizard />
      </Suspense>
    </div>
  );
}
