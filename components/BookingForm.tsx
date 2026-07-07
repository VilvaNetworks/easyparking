'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function BookingForm() {
  const router = useRouter();
  const [dropOffDate, setDropOffDate] = useState('');
  const [dropOffTime, setDropOffTime] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [terminal, setTerminal] = useState('17789');
  const [serviceType, setServiceType] = useState('meet-and-greet');
  const [serviceTypes, setServiceTypes] = useState<{ id?: number; name: string; slug: string }[]>([
    { name: "Meet & Greet", slug: "meet-and-greet" },
    { name: "Park & Ride", slug: "park-and-ride" }
  ]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get("/api/service-types");
        if (res.status === 200) {
          const result = res.data;
          if (result && Array.isArray(result.data) && result.data.length > 0) {
            setServiceTypes(result.data);
            setServiceType(result.data[0].slug);
          }
        }
      } catch (err) {
        console.error("Error fetching service types:", err);
      }
    };
    fetchTypes();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dropOffDate || !dropOffTime || !pickupDate || !pickupTime) {
      return;
    }
    const query = new URLSearchParams({
      dropOffDate,
      dropOffTime,
      pickupDate,
      pickupTime,
      terminal,
      serviceType,
    }).toString();
    router.push(`/car-park-booking-system?${query}`);
  };

  return (
    <section id="book_now" className="bg-white py-10 px-4">
      <div className="max-w-[1140px] mx-auto">
        <div className="bg-[#004280] rounded-lg p-6 md:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {/* Drop Off */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase mb-3 border-b border-white/30 pb-2">
                Drop off Date and Time
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-white/80 text-xs block mb-1">Drop Off Date</label>
                  <input
                    type="date"
                    value={dropOffDate}
                    onChange={(e) => setDropOffDate(e.target.value)}
                    required
                    className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-xs block mb-1">Drop Off Time</label>
                  <input
                    type="time"
                    value={dropOffTime}
                    onChange={(e) => setDropOffTime(e.target.value)}
                    required
                    className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                  />
                </div>
              </div>
            </div>

            {/* Pickup */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase mb-3 border-b border-white/30 pb-2">
                Pickup Date and Time
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-white/80 text-xs block mb-1">Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                    className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-xs block mb-1">Pickup Time</label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    required
                    className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                  />
                </div>
              </div>
            </div>

            {/* Service Type */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase mb-3 border-b border-white/30 pb-2">
                Select Service
              </h4>
              <div>
                <label className="text-white/80 text-xs block mb-1">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                >
                  {serviceTypes.map((st) => (
                    <option key={st.slug} value={st.slug}>{st.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Terminal */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase mb-3 border-b border-white/30 pb-2">
                Select Terminal
              </h4>
              <div>
                <label className="text-white/80 text-xs block mb-1">Terminal</label>
                <select
                  value={terminal}
                  onChange={(e) => setTerminal(e.target.value)}
                  className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                >
                  <option value="17789">Gatwick Airport - North Terminal</option>
                  <option value="17790">Gatwick Airport - South Terminal</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full block text-center bg-[#E66F1D] text-white font-bold text-sm uppercase px-6 py-3 rounded hover:bg-[#c85d15] transition-colors cursor-pointer border-none"
              >
                Get a Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
