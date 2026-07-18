'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 15000;

type ConfirmationStatus = 'confirming' | 'confirmed' | 'pending';

interface BookingSummary {
  booking_reference: string;
  amount: number;
  currency: string;
  status: string;
  payment_status: string;
}

// Minor units (pence) -> display string, matching bookings-details/page.tsx.
function formatAmount(amount: number, currency: string) {
  const value = amount / 100;
  return value.toLocaleString('en-GB', {
    style: 'currency',
    currency: currency || 'GBP',
  });
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  const [status, setStatus] = useState<ConfirmationStatus>('confirming');
  const [booking, setBooking] = useState<BookingSummary | null>(null);
  const pollStartRef = useRef(0);

  useEffect(() => {
    if (!reference) return;

    let cancelled = false;
    pollStartRef.current = Date.now();

    const poll = async () => {
      try {
        const response = await axios.get(`/api/bookings/${reference}`, {
          headers: { 'Accept': 'application/json' },
        });

        const data = response.data?.data as BookingSummary | undefined;

        if (cancelled) return;

        if (data) {
          setBooking(data);
          if (data.payment_status === 'paid' || data.status === 'confirmed') {
            setStatus('confirmed');
            return;
          }
        }
      } catch (err) {
        // Transient — the webhook race means the booking may briefly 404 or
        // 5xx before it settles. Keep polling until the timeout below.
        console.error('Error polling booking status:', err);
      }

      if (cancelled) return;

      if (Date.now() - pollStartRef.current >= POLL_TIMEOUT_MS) {
        setStatus('pending');
        return;
      }

      setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  if (!reference) {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-16 text-center">
        <div className="border border-gray-200 bg-[#fcfbfa] shadow-md rounded-lg p-8 space-y-4">
          <h2 className="text-[#1a1a1a] text-[22px] font-extrabold font-sans">Booking reference missing</h2>
          <p className="text-[#555555] text-sm leading-relaxed">
            We couldn&apos;t find a booking reference in this link. If you have just completed a payment,
            check your confirmation email or search for your booking below.
          </p>
          <Link
            href="/bookings-details"
            className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold text-sm uppercase px-8 py-3.5 rounded tracking-[1px] transition-all duration-300"
          >
            Find My Booking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 text-center py-12">
      <div className="relative border border-gray-200 bg-[#fcfbfa] p-12 shadow-lg space-y-6 rounded-[8px] overflow-hidden">
        {status === 'confirming' && (
          <>
            <svg className="animate-spin h-14 w-14 text-[#e7701e] mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <h2 className="text-[#1a1a1a] text-[28px] font-extrabold tracking-tight font-sans">
              Confirming your payment…
            </h2>
            <p className="text-[#555555] text-[16px] leading-relaxed max-w-[600px] mx-auto">
              Please wait a moment while we confirm your payment with our provider.
            </p>
          </>
        )}

        {status === 'confirmed' && (
          <>
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h2 className="text-[#1a1a1a] text-[28px] font-extrabold tracking-tight font-sans">
              Booking Complete!
            </h2>

            <p className="text-[#555555] text-[16px] leading-relaxed max-w-[600px] mx-auto">
              Your payment was successful and your airport parking reservation with Easy Parking Ltd is confirmed.
            </p>

            <div className="bg-[#f0f4f8] border border-gray-200 p-6 max-w-[500px] mx-auto text-left space-y-2 text-sm text-[#4a4a4a] rounded-[4px]">
              <p><strong>Reservation Code:</strong> {booking?.booking_reference || reference}</p>
              {booking && (
                <p><strong>Amount Paid:</strong> {formatAmount(booking.amount, booking.currency)}</p>
              )}
            </div>

            <Link
              href={`/bookings-details?ref=${reference}`}
              className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold text-sm uppercase px-8 py-3.5 rounded tracking-[1px] transition-all duration-300"
            >
              View Booking Details
            </Link>
          </>
        )}

        {status === 'pending' && (
          <>
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h2 className="text-[#1a1a1a] text-[28px] font-extrabold tracking-tight font-sans">
              Payment received
            </h2>

            <p className="text-[#555555] text-[16px] leading-relaxed max-w-[600px] mx-auto">
              We&apos;re still confirming your booking — this can take a little longer than usual. Check your
              email for a confirmation, or search your reference on Bookings Details shortly.
            </p>

            <div className="bg-[#f0f4f8] border border-gray-200 p-6 max-w-[500px] mx-auto text-left space-y-2 text-sm text-[#4a4a4a] rounded-[4px]">
              <p><strong>Reservation Code:</strong> {reference}</p>
            </div>

            <Link
              href={`/bookings-details?ref=${reference}`}
              className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold text-sm uppercase px-8 py-3.5 rounded tracking-[1px] transition-all duration-300"
            >
              Check Booking Details
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="w-full bg-white py-12 min-h-[60vh] flex flex-col justify-center">
      <h1 className="sr-only">Booking Payment Confirmation</h1>
      <Suspense fallback={
        <div className="max-w-[800px] mx-auto px-4 text-center py-12">
          <p className="text-gray-500 font-semibold animate-pulse">Loading…</p>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
