import Hero from '@/components/Hero';
import BookingForm from '@/components/BookingForm';
import FlexibleScheduling from '@/components/FlexibleScheduling';
import AboutSection from '@/components/AboutSection';
import ArrivalsDepartures from '@/components/ArrivalsDepartures';
import OurServices from '@/components/OurServices';
import PremiumParking from '@/components/PremiumParking';
import WhyChooseUs from '@/components/WhyChooseUs';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import BlogSection from '@/components/BlogSection';

export default function HomePage() {
  return (
    <>
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
