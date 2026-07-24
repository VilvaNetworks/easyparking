"use client";

interface MoreDetailsModalProps {
  onClose: () => void;
  /** Admin-authored HTML specific to whichever card was opened (service
   * type or add-on) — rendered above the generic logistics info below. */
  html?: string | null;
  title?: string;
}

// Static drop-off/pick-up logistics info — the same regardless of which
// service type or add-on card the customer opened it from, since this is
// about the physical handover process at each terminal, not the product.
export default function MoreDetailsModal({ onClose, html, title }: MoreDetailsModalProps) {
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-start justify-center bg-black/50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-[720px] mt-10 mb-10 p-8 rounded-[4px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-[#e7701e] text-[#e7701e] rounded cursor-pointer hover:bg-[#e7701e] hover:text-white transition-colors"
        >
          ✕
        </button>

        {html && (
          <div className="mb-6 pb-6 border-b border-gray-100">
            {title && <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-3">{title}</h3>}
            <div
              className="text-[14px] text-[#4a4a4a] leading-relaxed [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-[#e7701e] text-[12px] font-bold uppercase tracking-[0.5px] mb-2">Contact</p>
            <p className="text-[14px] text-[#1a1a1a]">Phone: 0333 004 0262</p>
            <a href="mailto:info@easyparkingltd.com" className="text-[14px] text-[#e7701e] hover:underline">
              info@easyparkingltd.com
            </a>
          </div>
          <div>
            <p className="text-[#e7701e] text-[12px] font-bold uppercase tracking-[0.5px] mb-2">Business Hours</p>
            <p className="text-[14px] text-[#1a1a1a]">Monday to Friday: 9 AM–5 PM</p>
          </div>
        </div>

        <h3 className="text-[20px] font-bold text-[#1a1a1a] mt-6 mb-3">Directions for South Terminal</h3>
        <p className="text-[14px] text-[#4a4a4a] leading-relaxed">
          For South terminal when approaching the south terminal stay in the right-hand lane and follow the signs
          for the short stay car park (pick up and drop off). On entering the barrier after taking your ticket you
          will proceed to the ORANGE CAR PARK – LEVEL 4. Please reach out to our driver with EASY PARKING uniform
          and they will be happy to help you. This is also your meeting point on your return.
        </p>

        <h3 className="text-[20px] font-bold text-[#1a1a1a] mt-6 mb-3">Directions for North Terminal</h3>
        <p className="text-[14px] text-[#4a4a4a] leading-relaxed">
          For North terminal when entering the North terminal stay in the left lane following the signs for the
          short stay car park 6 (the SECOND car park on your right). On entering the barrier after taking your
          ticket you will proceed to the CAR PARK 6 – LEVEL 3. Please reach out to our driver with EASY PARKING
          uniform and they will be happy to help you. This is also your meeting point on your return.
        </p>

        <h3 className="text-[20px] font-bold text-[#1a1a1a] mt-6 mb-3">Additional Info</h3>
        <p className="text-[14px] text-[#4a4a4a] leading-relaxed">
          Please ensure that your vehicle is insured and has a valid road tax, MOT and sufficient petrol as the
          vehicle is parked off the airport. Please print a copy of this booking confirmation and bring it with you
          when you come to drop off your vehicle for your convenience. Please bear in mind that the vehicle will be
          driven to our parking facility which is off-airport storage facility approved by British Parking
          Association and the average mileage travelled will be 10-15 miles. The maximum distance travelled will be
          within 10 mile (one way only) to the storage as per the British Parking Association guideline and
          requirements and then will be driven back to the airport during your collection, not exceeding 20 mile
          which is the maximum mileage it may be moved whilst your vehicle is in our care. We may move your vehicle
          more than this mileage only in case of any emergencies (accidents/roadworks or any other unexpected
          situations) and you will be informed regarding the same should such situation arise.
        </p>
      </div>
    </div>
  );
}
