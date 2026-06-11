import type { Metadata } from 'next';
import { Roboto, Roboto_Slab, Montserrat, Marcellus, Marck_Script } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-roboto',
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-roboto-slab',
});

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
  title: 'HOME - Easy Parking Ltd',
  description: '"Where convenience meets luxury"',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoSlab.variable} ${montserrat.variable} ${marcellus.variable} ${marckScript.variable}`}>
      <body className="font-sans bg-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
