'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  return (
    <div className="max-w-[800px] mx-auto px-4 text-center py-12">
      <div className="border border-gray-200 bg-[#fcfbfa] p-12 shadow-lg space-y-6 rounded-[8px]">
        <div className="w-20 h-20 bg-orange-100 text-[#e7701e] rounded-full flex items-center justify-center mx-auto ring-8 ring-orange-50">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h2 className="text-[#1a1a1a] text-[28px] font-extrabold tracking-tight font-sans">
          Payment Not Completed
        </h2>

        <p className="text-[#555555] text-[16px] leading-relaxed max-w-[600px] mx-auto">
          Your payment was cancelled or could not be completed. You have not been charged, and your
          booking is being held as <strong>pending</strong>.
        </p>

        {reference && (
          <div className="bg-[#f0f4f8] border border-gray-200 p-6 max-w-[500px] mx-auto text-left space-y-2 text-sm text-[#4a4a4a] rounded-[4px]">
            <p><strong>Reservation Code:</strong> {reference}</p>
          </div>
        )}

        <p className="text-[#555555] text-[14px] leading-relaxed max-w-[600px] mx-auto">
          To retry payment, please call our Booking Hotline on{' '}
          <strong className="text-[#002f5d]">+44 333 004 0262</strong> and quote your reservation code above.
        </p>

        <Link
          href={reference ? `/bookings-details?ref=${reference}` : '/bookings-details'}
          className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold text-sm uppercase px-8 py-3.5 rounded tracking-[1px] transition-all duration-300"
        >
          {reference ? 'View Booking Status' : 'Find My Booking'}
        </Link>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <div className="w-full bg-white py-12 min-h-[60vh] flex flex-col justify-center">
      <h1 className="sr-only">Payment Not Completed</h1>
      <Suspense fallback={
        <div className="max-w-[800px] mx-auto px-4 text-center py-12">
          <p className="text-gray-500 font-semibold animate-pulse">Loading…</p>
        </div>
      }>
        <PaymentCancelContent />
      </Suspense>
    </div>
  );
}
