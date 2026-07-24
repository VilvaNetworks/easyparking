import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Your Booking Details - Easy Parking',
  description: 'Look up your Easy Parking airport parking booking by reference number.',
  alternates: {
    canonical: '/bookings-details',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function BookingsDetailsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
