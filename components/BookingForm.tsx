'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TimeDropdown from '@/components/TimeDropdown';
import SelectDropdown from '@/components/SelectDropdown';

export default function BookingForm() {
  const router = useRouter();
  const [dropOffDate, setDropOffDate] = useState('');
  const [dropOffTime, setDropOffTime] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [terminal, setTerminal] = useState('LGW-N');
  const [serviceType, setServiceType] = useState('meet-and-greet');
  const [dateError, setDateError] = useState('');
  const todayISO = new Date().toISOString().split('T')[0];
  const [serviceTypes, setServiceTypes] = useState<{ id?: number; name: string; slug: string }[]>([
    { name: "Meet & Greet", slug: "meet-and-greet" },
    { name: "Park & Ride", slug: "park-and-ride" }
  ]);
  const [terminals, setTerminals] = useState<{ id?: number; name: string; code: string }[]>([
    { name: "Gatwick Airport – North Terminal", code: "LGW-N" },
    { name: "Gatwick Airport – South Terminal", code: "LGW-S" }
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

    const fetchTerminals = async () => {
      try {
        const res = await axios.get("/api/terminals");
        if (res.status === 200) {
          const result = res.data;
          if (result && Array.isArray(result.data) && result.data.length > 0) {
            setTerminals(result.data);
            setTerminal(result.data[0].code);
          }
        }
      } catch (err) {
        console.error("Error fetching terminals:", err);
      }
    };
    fetchTerminals();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDateError('');
    if (!dropOffDate || !dropOffTime || !pickupDate || !pickupTime) {
      return;
    }

    const dropOff = new Date(`${dropOffDate}T${dropOffTime}`);
    const pickup = new Date(`${pickupDate}T${pickupTime}`);

    if (dropOff.getTime() <= Date.now()) {
      setDateError('Drop off date and time must be in the future.');
      return;
    }
    if (pickup.getTime() <= dropOff.getTime()) {
      setDateError('Pickup date and time must be after drop off.');
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
                  <label htmlFor="bf-dropoff-date" className="text-white/80 text-xs block mb-1">Drop Off Date</label>
                  <input
                    id="bf-dropoff-date"
                    type="date"
                    value={dropOffDate}
                    onChange={(e) => setDropOffDate(e.target.value)}
                    min={todayISO}
                    required
                    className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                  />
                </div>
                <div>
                  <label htmlFor="bf-dropoff-time" className="text-white/80 text-xs block mb-1">Drop Off Time</label>
                  <TimeDropdown
                    id="bf-dropoff-time"
                    value={dropOffTime}
                    onChange={setDropOffTime}
                    className="bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
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
                  <label htmlFor="bf-pickup-date" className="text-white/80 text-xs block mb-1">Pickup Date</label>
                  <input
                    id="bf-pickup-date"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={dropOffDate || todayISO}
                    required
                    className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                  />
                </div>
                <div>
                  <label htmlFor="bf-pickup-time" className="text-white/80 text-xs block mb-1">Pickup Time</label>
                  <TimeDropdown
                    id="bf-pickup-time"
                    value={pickupTime}
                    onChange={setPickupTime}
                    className="bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
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
                <label htmlFor="bf-service-type" className="text-white/80 text-xs block mb-1">Service Type</label>
                <SelectDropdown
                  id="bf-service-type"
                  value={serviceType}
                  onChange={setServiceType}
                  options={serviceTypes.map((st) => ({ value: st.slug, label: st.name }))}
                  className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                />
              </div>
            </div>

            {/* Terminal */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase mb-3 border-b border-white/30 pb-2">
                Select Terminal
              </h4>
              <div>
                <label htmlFor="bf-terminal" className="text-white/80 text-xs block mb-1">Terminal</label>
                <SelectDropdown
                  id="bf-terminal"
                  value={terminal}
                  onChange={setTerminal}
                  options={terminals.map((t) => ({ value: t.code, label: t.name }))}
                  className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                />
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

            {dateError && (
              <p className="md:col-span-5 text-red-300 text-sm font-semibold text-center" role="alert">
                {dateError}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
