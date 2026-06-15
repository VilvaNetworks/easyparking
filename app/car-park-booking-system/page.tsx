import type { Metadata } from 'next';
import { Suspense } from 'react';
import CarParkBookingWizard from '@/components/CarParkBookingWizard';

export const metadata: Metadata = {
  title: 'Car Park Booking System - Easy Parking Ltd',
  description: 'Book your airport parking at Gatwick Airport. Choose North or South terminal, parking options, valeting services, and complete your reservation.',
};

export default function CarParkBookingSystemPage() {
  return (
    <div className="w-full bg-white text-[#2c3e50] font-sans py-12">
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
