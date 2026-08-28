"use client";

import { useEffect } from "react";

interface MoreDetailsModalProps {
  onClose: () => void;
  /** Admin-authored HTML specific to whichever card was opened (service
   * type or add-on) — this is now the ONLY per-card content in the modal;
   * the old hardcoded "Directions for South/North Terminal"/"Additional
   * Info" text has been removed since it was identical for every card
   * regardless of what was actually clicked. */
  description?: string | null;
  html?: string | null;
  title?: string;
}

// Contact/Business Hours stay static (genuinely the same for every card),
// but everything else now comes from whatever the admin has entered for
// this specific service type/add-on (Description + More Details) — see
// CarParkBookingWizard's setMoreDetailsFor() call sites.
export default function MoreDetailsModal({ onClose, description, html, title }: MoreDetailsModalProps) {
  // Without this, the page behind the modal scrolled right along with it —
  // the modal had its own scroll but so did the body underneath, at the same time.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <style jsx>{`
        .ep-modal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #e7701e #f3f4f6;
        }
        .ep-modal-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .ep-modal-scroll::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 8px;
        }
        .ep-modal-scroll::-webkit-scrollbar-thumb {
          background-color: #e7701e;
          border-radius: 8px;
        }
        .ep-modal-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #d56113;
        }
      `}</style>

      <div
        className="ep-modal-scroll relative bg-white w-full max-w-[720px] max-h-[85vh] overflow-y-auto p-8 rounded-[4px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="sticky top-0 float-right -mt-2 -mr-2 w-8 h-8 flex items-center justify-center border border-[#e7701e] text-[#e7701e] bg-white rounded cursor-pointer hover:bg-[#e7701e] hover:text-white transition-colors"
        >
          ✕
        </button>

        {(description || html) && (
          <div className="mb-6 pb-6 border-b border-gray-100 clear-both">
            {title && <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-3">{title}</h3>}
            {description && (
              <div
                className="text-[14px] text-[#4a4a4a] leading-relaxed mb-4 [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            {html && (
              <div
                className="text-[14px] text-[#4a4a4a] leading-relaxed [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 clear-both">
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
      </div>
    </div>
  );
}
