'use client';
import { useState } from 'react';

export default function BookingForm() {
  const [dropOffDate, setDropOffDate] = useState('');
  const [dropOffTime, setDropOffTime] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [terminal, setTerminal] = useState('17789');

  return (
    <section id="book_now" className="bg-white py-10 px-4">
      <div className="max-w-[1140px] mx-auto">
        <div className="bg-[#004280] rounded-lg p-6 md:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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
                    className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-xs block mb-1">Drop Off Time</label>
                  <input
                    type="time"
                    value={dropOffTime}
                    onChange={(e) => setDropOffTime(e.target.value)}
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
                    className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-xs block mb-1">Pickup Time</label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-white text-[#2C3E50] text-sm px-3 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#E66F1D]"
                  />
                </div>
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
              <a
                href="/car-park-booking-system"
                className="w-full block text-center bg-[#E66F1D] text-white font-bold text-sm uppercase px-6 py-3 rounded hover:bg-[#c85d15] transition-colors"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
