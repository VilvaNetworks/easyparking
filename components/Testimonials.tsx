import Image from 'next/image';

const testimonials = [
  {
    name: 'Bobby Farel',
    location: 'Brighton',
    photo: 'https://www.easyparkingltd.com/wp-content/uploads/2025/07/smiling-businessman-face-portrait-wearing-suit-300x214.jpg',
    text: 'Easy Parking made everything simple. I booked online, drove to the terminal, and handed over my keys in minutes. My car was waiting when I landed—clean and secure. I\'ll definitely use them again.',
    rating: 5,
  },
  {
    name: 'Sarah',
    location: 'Crawley',
    photo: 'https://www.easyparkingltd.com/wp-content/uploads/2025/07/young-latin-woman-isolated-yellow-background-happy-smiling-cheerful-300x200.jpg',
    text: 'Traveling with two kids and a lot of luggage is never easy, but Easy Parking\'s Meet & Greet service saved us so much hassle. The staff were polite and helpful, and the car was spotless when we got back.',
    rating: 5,
  },
  {
    name: 'David',
    location: 'Guildford',
    photo: 'https://www.easyparkingltd.com/wp-content/uploads/2025/07/handsome-smiling-man-looking-with-disbelief-300x200.jpg',
    text: 'I was impressed with how organized everything was. Booking was easy, the handover was quick, and the pricing was very reasonable—especially considering the top-tier service. Highly recommended!',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mt-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-[#E66F1D]' : 'text-gray-300'}`}
          viewBox="0 0 1000 1000"
          fill="currentColor"
        >
          <path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"/>
        </svg>
      ))}
    </div>
  );
}

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.easyparkingltd.com/#localbusiness",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
    "reviewCount": testimonials.length,
  },
  "review": testimonials.map((t) => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": t.name,
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": t.rating,
      "bestRating": 5,
    },
    "reviewBody": t.text,
  })),
};

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-[#F0F2F8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <div className="max-w-[1140px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#E66F1D] font-semibold uppercase text-sm tracking-wider mb-2">Our Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50]">
            Trusted by Travelers Across the UK
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-lg p-6 shadow-md flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={t.photo} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2C3E50]">{t.name}</h3>
                  <p className="text-[#7A7A7A] text-sm">{t.location}</p>
                </div>
              </div>
              <p className="text-[#7A7A7A] text-sm leading-relaxed flex-1">{t.text}</p>
              <hr className="my-4 border-gray-100" />
              <StarRating count={t.rating} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
