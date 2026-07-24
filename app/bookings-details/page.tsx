'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

function BookingDetailsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [bookingRef, setBookingRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  const queryRef = searchParams.get('ref');

  useEffect(() => {
    if (queryRef) {
      setBookingRef(queryRef);
      fetchBookingDetails(queryRef);
    }
  }, [queryRef]);

  const fetchBookingDetails = async (ref: string) => {
    if (!ref.trim()) return;
    setLoading(true);
    setError(null);
    setBookingData(null);
    try {
      const response = await axios.get(`/api/bookings/${ref.trim()}`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      const result = response.data;

      if (result && result.data) {
        setBookingData(result.data);
      } else {
        throw new Error('No booking data found for the provided reference.');
      }
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || err.message || 'An error occurred while fetching details. Please check your network connection.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingRef.trim()) return;
    // Update the URL query param for link shareability
    router.push(`/bookings-details?ref=${bookingRef.trim()}`);
  };

  // Date Formatter: converts ISO string or custom string to readable format
  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Amount formatter
  const formatAmount = (amount: number, currency: string) => {
    const value = amount / 100;
    return value.toLocaleString('en-GB', {
      style: 'currency',
      currency: currency || 'GBP',
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200 border';
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200 border';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 border';
    }
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 w-full" style={{ fontFamily: '"Montserrat",Sans-serif' }}>
      <h1 className="sr-only">Find Your Booking Details</h1>
      {/* Search Section */}
      <div className="bg-[#fcfbfa] border border-gray-200 rounded-lg p-6 md:p-8 shadow-md mb-8">
        <h2 className="text-[#002f5d] text-[20px] md:text-[24px] font-black text-center mb-6">
          Find Your Booking Details
        </h2>
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <label htmlFor="booking-ref-search" className="sr-only">Booking reference</label>
          <input
            id="booking-ref-search"
            type="text"
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
            placeholder="ENTER BOOKING REFERENCE (E.G. EP-20260707-00001)"
            className="flex-1 bg-white text-black font-semibold text-sm px-4 py-3.5 border border-gray-300 rounded focus:outline-none focus:border-[#e7701e] uppercase tracking-[0.5px]"
            required
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#e7701e] hover:bg-[#d56113] disabled:opacity-50 text-white font-extrabold text-sm uppercase px-8 py-3.5 rounded tracking-[1px] transition-all duration-300 cursor-pointer border-none flex items-center justify-center min-w-[140px]"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              'Search'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-5 p-4 bg-red-50 border-l-4 border-[#e71d36] text-[#e71d36] text-sm font-semibold rounded-r">
            {error}
          </div>
        )}
      </div>

      {/* Loading Placeholder */}
      {loading && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-md animate-pulse">
          <p className="text-gray-500 font-bold">Retrieving your booking details...</p>
        </div>
      )}

      {/* Booking Details Display */}
      {bookingData && !loading && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-12">
          {/* Header Card */}
          <div className="bg-[#002f5d] text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-orange-400 font-bold uppercase tracking-[1.5px] text-[12px]">
                Airport Parking Booking
              </span>
              <h3 className="text-white font-extrabold text-[22px] md:text-[26px] mt-1">
                {bookingData.booking_reference}
              </h3>
            </div>
            <div className={`px-4 py-2 border rounded-full font-bold text-xs uppercase ${getStatusBadgeClass(bookingData.status)}`}>
              Status: {bookingData.status}
            </div>
          </div>

          {/* Details Table */}
          <div className="p-6 md:p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 text-xs font-bold text-gray-400 uppercase tracking-[0.5px] w-1/3">
                      Customer Name
                    </td>
                    <td className="py-4 text-sm font-extrabold text-[#1a1a1a]">
                      {bookingData.customer_name}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 text-xs font-bold text-gray-400 uppercase tracking-[0.5px]">
                      Service Type
                    </td>
                    <td className="py-4 text-sm font-extrabold text-[#1a1a1a]">
                      {bookingData.service_type || 'Meet & Greet'}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 text-xs font-bold text-gray-400 uppercase tracking-[0.5px]">
                      Terminal
                    </td>
                    <td className="py-4 text-sm font-extrabold text-[#e7701e]">
                      {bookingData.terminal}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 text-xs font-bold text-gray-400 uppercase tracking-[0.5px]">
                      Drop off Time
                    </td>
                    <td className="py-4 text-sm font-extrabold text-[#1a1a1a]">
                      {formatDateTime(bookingData.dropoff_at)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 text-xs font-bold text-gray-400 uppercase tracking-[0.5px]">
                      Pickup Time
                    </td>
                    <td className="py-4 text-sm font-extrabold text-[#1a1a1a]">
                      {formatDateTime(bookingData.pickup_at)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 text-xs font-bold text-gray-400 uppercase tracking-[0.5px]">
                      Payment Status
                    </td>
                    <td className="py-4 text-sm font-extrabold">
                      <span className={`px-3 py-1 border rounded text-xs uppercase ${getStatusBadgeClass(bookingData.payment_status)}`}>
                        {bookingData.payment_status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-xs font-bold text-gray-400 uppercase tracking-[0.5px]">
                      Total Price
                    </td>
                    <td className="py-4 text-[20px] font-black text-[#002f5d]">
                      {formatAmount(bookingData.amount, bookingData.currency)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingsDetailsPage() {
  return (
    <div className="w-full bg-white py-12 min-h-[60vh] flex flex-col justify-center">
      <Suspense fallback={
        <div className="max-w-[800px] mx-auto px-4 text-center py-12">
          <p className="text-gray-500 font-semibold animate-pulse">Loading...</p>
        </div>
      }>
        <BookingDetailsContent />
      </Suspense>
    </div>
  );
}
