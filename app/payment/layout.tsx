import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment - Easy Parking',
  description: 'Secure payment confirmation for your Easy Parking airport parking booking.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
