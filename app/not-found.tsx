import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Easy Parking",
  description: "The page you're looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-20 overflow-hidden">
      <div className="max-w-xl w-full text-center">
        <p className="text-[110px] md:text-[160px] font-black leading-none text-[#002f5d]/10 select-none animate-pulse-slow">
          404
        </p>

        <div className="-mt-14 md:-mt-20">
          <h1 className="text-[#002f5d] text-3xl md:text-4xl font-extrabold tracking-tight">
            Looks like you&apos;ve taken a wrong turn
          </h1>
          <p className="text-gray-500 mt-4 text-base md:text-lg">
            We couldn&apos;t find the page you&apos;re looking for. It may have moved, or the address might not be quite right.
          </p>
        </div>

        {/* Animated road + car */}
        <div className="relative h-16 mt-10 mb-8 overflow-hidden" aria-hidden="true">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-gray-300" />
          <div className="absolute top-1/2 -translate-y-1/2 animate-drive">
            <svg width="64" height="32" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="48" height="14" rx="4" fill="#e7701e" />
              <path d="M12 10 L20 2 H40 L48 10 Z" fill="#002f5d" />
              <circle cx="16" cy="26" r="5" fill="#1a1a1a" />
              <circle cx="44" cy="26" r="5" fill="#1a1a1a" />
              <circle cx="16" cy="26" r="2" fill="#ffffff" />
              <circle cx="44" cy="26" r="2" fill="#ffffff" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#e7701e] hover:bg-[#d3630f] text-white font-bold text-sm uppercase tracking-wide px-8 py-3 rounded-[4px] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/car-park-booking-system"
            className="inline-flex items-center justify-center border border-[#002f5d] text-[#002f5d] hover:bg-[#002f5d] hover:text-white font-bold text-sm uppercase tracking-wide px-8 py-3 rounded-[4px] transition-colors"
          >
            Book Parking
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes drive {
          0% { left: -12%; }
          100% { left: 112%; }
        }
        .animate-drive {
          animation: drive 4.5s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
