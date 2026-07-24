"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import SvgIcons from "@/components/SvgIcons";
import TimeDropdown from "@/components/TimeDropdown";
import SelectDropdown from "@/components/SelectDropdown";

// Default drop off = today, default pickup = 3 days later, so the widget
// never looks empty on first load.
const getDefaultDropOffISO = () => new Date().toISOString().split("T")[0];
const getDefaultPickupISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().split("T")[0];
};
// TimeDropdown only offers 15-minute slots — round up to the next one so
// "now" never defaults to a slot that's already in the past.
const getCurrentTimeSlot = () => {
  const d = new Date();
  const rounded = Math.ceil((d.getHours() * 60 + d.getMinutes()) / 15) * 15;
  const hours = String(Math.floor(rounded / 60) % 24).padStart(2, "0");
  const minutes = String(rounded % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function Hero() {
  const router = useRouter();
  const [dropOffDate, setDropOffDate] = useState(getDefaultDropOffISO);
  const [dropOffTime, setDropOffTime] = useState(getCurrentTimeSlot);
  const [pickupDate, setPickupDate] = useState(getDefaultPickupISO);
  const [pickupTime, setPickupTime] = useState(getCurrentTimeSlot);
  const [terminal, setTerminal] = useState("LGW-N");
  const [serviceType, setServiceType] = useState("meet-and-greet");
  const [dateError, setDateError] = useState("");
  // Recomputed each render rather than memoized — cheap, and guarantees it's
  // never stale if the page stays open across midnight.
  const todayISO = new Date().toISOString().split("T")[0];
  const [serviceTypes, setServiceTypes] = useState<{ id?: number; name: string; slug: string }[]>([
    { name: "Meet & Greet", slug: "meet-and-greet" },
    { name: "Park & Ride", slug: "park-and-ride" }
  ]);
  const [terminals, setTerminals] = useState<{ id?: number; name: string; code: string }[]>([
    { name: "Gatwick Airport – North Terminal", code: "LGW-N" },
    { name: "Gatwick Airport – South Terminal", code: "LGW-S" }
  ]);
  useEffect(() => {
    // Fetch dynamic service types
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

    // Fetch real terminals so the dropdown (and the code sent downstream)
    // reflects whatever's actually active in the backend, not a guess.
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

  // BookNowLink (used on every other page) sets this flag before navigating
  // here instead of using a "/#book_now" URL hash — pick it up once mounted
  // and scroll to the booking widget ourselves.
  useEffect(() => {
    if (sessionStorage.getItem("scrollToBooking")) {
      sessionStorage.removeItem("scrollToBooking");
      setTimeout(() => {
        document.getElementById("book_now")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDateError("");
    if (!dropOffDate || !dropOffTime || !pickupDate || !pickupTime) {
      return;
    }

    // Catch an invalid date/time selection right here, on the very first
    // page — not several steps later when the backend finally rejects it.
    const dropOff = new Date(`${dropOffDate}T${dropOffTime}`);
    const pickup = new Date(`${pickupDate}T${pickupTime}`);

    if (dropOff.getTime() <= Date.now()) {
      setDateError("Drop off date and time must be in the future.");
      return;
    }
    if (pickup.getTime() <= dropOff.getTime()) {
      setDateError("Pickup date and time must be after drop off.");
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
    <section className="w-full relative" style={{ fontFamily: '"Montserrat",Sans-serif' }}>

      {/* ===== VIDEO BACKGROUND HERO ===== */}
      {/* min-height:600px, height:80vh, max-height:750px */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ minHeight: 600, height: "80vh", maxHeight: 750 }}
      >
        {/* Background image — absolute full cover, z-index:1 */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }} aria-hidden="true">
          <Image
            src="/images/car.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            className="object-cover object-center"
          />
          {/* Dark overlay — rgba(0,0,0,0.35), z-index:2 */}
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.35)", zIndex: 2 }} />
        </div>

        {/* Hero content — z-index:3, text-center, padding:60px 20px 180px */}
        <div
          className="relative w-full text-center mx-auto"
          style={{ zIndex: 3, padding: "60px 20px 180px", maxWidth: 1200 }}
        >
          {/* ── Animated Headline: "Easy Parking" with zigzag underline ── */}
          {/* font: Marcellus serif, 90px desktop → responsive, color:#E7701E */}
          {/* animation: fadeInDown 0.8s ease-out */}
          <div
            className="mb-[10px]"
            style={{ animation: "fadeInDown 0.8s ease-out" }}
          >
            <h1
              className="m-0 text-[42px] sm:text-[54px] md:text-[72px] lg:text-[90px] font-normal leading-[1.1] tracking-[1px]"
              style={{ fontFamily: '"Marcellus","Marck Script",serif', color: "#E7701E" }}
            >
              {/* Wrap for zigzag position — relative inline-block, pb:14px */}
              <span className="relative inline-block pb-[14px]">
                {/* "Easy Parking" text — color:#E7701E, font-bold, z-index:2 */}
                <span className="relative font-bold font-marcellus" style={{ color: "#E7701E", zIndex: 2 }}>
                  Easy Parking
                </span>
                {/* ZigzagUnderline SVG — absolute bottom-0 left-0 w-full h-[12px], z-index:1 */}
                {/* animation: drawLine 1.2s ease-out 0.5s both */}
                <SvgIcons.ZigzagUnderline
                  className="absolute left-0 bottom-0 w-full"
                  style={{ height: 12, zIndex: 1, animation: "drawLine 1.2s ease-out 0.5s both" }}
                />
              </span>
            </h1>
          </div>

          {/* ── Main Heading ── */}
          {/* font: Marck Script cursive, 56px desktop → responsive, color:#FFFFFF */}
          {/* animation: fadeInUp 0.8s ease-out 0.3s both */}
          <h2
            className="font-marck-script font-normal text-white leading-[1.2] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px]"
            style={{
              margin: "20px 0 15px",
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
              animation: "fadeInUp 0.8s ease-out 0.3s both",
            }}
          >
            Traveling at UK airport made easy
          </h2>

          {/* ── Subtitle ── */}
          {/* color:#FFFFFF, 16px, font-weight:300, italic */}
          {/* animation: fadeInUp 0.8s ease-out 0.6s both */}
          <div style={{ marginTop: 10, animation: "fadeInUp 0.8s ease-out 0.6s both" }}>
            <p
              className="m-0 text-white text-[13px] sm:text-[14px] md:text-[16px] font-light italic"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}
            >
              &ldquo;<span style={{ fontWeight: 400 }}>Where convenience meets luxury</span>&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ===== BOOKING FORM SECTION ===== */}
      {/* position:relative z-index:10, margin-top:-130px (pulls up over video), padding:0 20px 60px */}
      <div
        id="book_now"
        className="relative px-5 pb-[60px]"
        style={{ zIndex: 10, marginTop: -60 }}
      >
        {/* max-width:1100px */}
        <div className="mx-auto" style={{ maxWidth: 1100 }}>

          {/* Form card — bg:#FFFFFF, border-radius:8px, shadow, padding:35px 40px */}
          {/* animation: fadeInUp 0.8s ease-out 0.9s both */}
          <div
            className="bg-white"
            style={{
              borderRadius: 8,
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
              padding: "35px 40px",
              animation: "fadeInUp 0.8s ease-out 0.9s both",
            }}
          >
            <form onSubmit={handleSubmit} className="w-full">

              {/* Form grid — 3 cols desktop, 1 col mobile, gap:20px, mb:25px.
                  Terminal + Service Type share the 3rd column (stacked, like
                  the Date/Time pairs in columns 1-2) rather than each getting
                  a whole column, per the reference layout. */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-[20px] mb-[25px]">

                {/* ── Drop Off Date and Time ── */}
                <div style={{ minWidth: 0 }}>
                  {/* Section header — 16px 700 #004280, mb:18px, letter-spacing:0.3px */}
                  <div
                    className="text-[15px] md:text-[16px] font-bold mb-[12px] md:mb-[18px] tracking-[0.3px]"
                    style={{ color: "#004280" }}
                  >
                    Drop off Date and Time
                  </div>
                  {/* Drop Off Date input — h:48px, border:#D1D5DB, 13px 600 uppercase #6B7280 */}
                  <div className="mb-[18px]">
                    <label htmlFor="hero-dropoff-date" className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.5px] mb-[6px]">
                      Drop Off Date
                    </label>
                    <input
                      id="hero-dropoff-date"
                      type="date"
                      value={dropOffDate}
                      onChange={(e) => setDropOffDate(e.target.value)}
                      min={todayISO}
                      required
                      className="w-full outline-none cursor-pointer box-border transition-all duration-300"
                      style={{
                        height: 48,
                        padding: "0 16px",
                        border: "1px solid #D1D5DB",
                        borderRadius: 4,
                        backgroundColor: "#FFFFFF",
                        color: "#6B7280",
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: "inherit",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        appearance: "none",
                        WebkitAppearance: "none",
                      }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E7701E"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(231,112,30,0.1)"; }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#D1D5DB"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                      autoComplete="off"
                    />
                  </div>
                  {/* Drop Off Time input */}
                  <div>
                    <label htmlFor="hero-dropoff-time" className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.5px] mb-[6px]">
                      Drop Off Time
                    </label>
                    <TimeDropdown
                      id="hero-dropoff-time"
                      value={dropOffTime}
                      onChange={setDropOffTime}
                      className="outline-none cursor-pointer box-border transition-all duration-300"
                      style={{
                        height: 48,
                        padding: "0 16px",
                        border: "1px solid #D1D5DB",
                        borderRadius: 4,
                        backgroundColor: "#FFFFFF",
                        color: "#6B7280",
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: "inherit",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                      onFocus={(e: React.FocusEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "#E7701E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(231,112,30,0.1)"; }}
                      onBlur={(e: React.FocusEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                {/* ── Pickup Date and Time ── */}
                <div style={{ minWidth: 0 }}>
                  <div
                    className="text-[15px] md:text-[16px] font-bold mb-[12px] md:mb-[18px] tracking-[0.3px]"
                    style={{ color: "#004280" }}
                  >
                    Pickup Date and Time
                  </div>
                  <div className="mb-[18px]">
                    <label htmlFor="hero-pickup-date" className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.5px] mb-[6px]">
                      Pickup Date
                    </label>
                    <input
                      id="hero-pickup-date"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={dropOffDate || todayISO}
                      required
                      className="w-full outline-none cursor-pointer box-border transition-all duration-300"
                      style={{
                        height: 48,
                        padding: "0 16px",
                        border: "1px solid #D1D5DB",
                        borderRadius: 4,
                        backgroundColor: "#FFFFFF",
                        color: "#6B7280",
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: "inherit",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        appearance: "none",
                        WebkitAppearance: "none",
                      }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E7701E"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(231,112,30,0.1)"; }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#D1D5DB"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="hero-pickup-time" className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.5px] mb-[6px]">
                      Pickup Time
                    </label>
                    <TimeDropdown
                      id="hero-pickup-time"
                      value={pickupTime}
                      onChange={setPickupTime}
                      className="outline-none cursor-pointer box-border transition-all duration-300"
                      style={{
                        height: 48,
                        padding: "0 16px",
                        border: "1px solid #D1D5DB",
                        borderRadius: 4,
                        backgroundColor: "#FFFFFF",
                        color: "#6B7280",
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: "inherit",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                      onFocus={(e: React.FocusEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "#E7701E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(231,112,30,0.1)"; }}
                      onBlur={(e: React.FocusEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                {/* ── Select Terminal + Select Service (stacked in one column) ── */}
                <div style={{ minWidth: 0 }}>
                  <div
                    className="text-[15px] md:text-[16px] font-bold mb-[12px] md:mb-[18px] tracking-[0.3px]"
                    style={{ color: "#004280" }}
                  >
                    Select Terminal
                  </div>
                  <label htmlFor="hero-terminal" className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.5px] mb-[6px]">
                    Terminal
                  </label>
                  <div className="relative w-full mb-[18px]">
                    <SelectDropdown
                      id="hero-terminal"
                      value={terminal}
                      onChange={setTerminal}
                      options={terminals.map((t) => ({ value: t.code, label: t.name }))}
                      className="w-full outline-none cursor-pointer box-border transition-all duration-300"
                      style={{
                        height: 48,
                        padding: "0 16px",
                        border: "1px solid #D1D5DB",
                        borderRadius: 4,
                        backgroundColor: "#FFFFFF",
                        color: "#1A1A1A",
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: "inherit",
                        letterSpacing: "0.5px",
                      }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E7701E"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(231,112,30,0.1)"; }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#D1D5DB"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                    />
                  </div>
                  <label htmlFor="hero-service-type" className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.5px] mb-[6px]">
                    Service Type
                  </label>
                  <div className="relative w-full">
                    <SelectDropdown
                      id="hero-service-type"
                      value={serviceType}
                      onChange={setServiceType}
                      options={serviceTypes.map((st) => ({ value: st.slug, label: st.name }))}
                      className="w-full outline-none cursor-pointer box-border transition-all duration-300"
                      style={{
                        height: 48,
                        padding: "0 16px",
                        border: "1px solid #D1D5DB",
                        borderRadius: 4,
                        backgroundColor: "#FFFFFF",
                        color: "#1A1A1A",
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: "inherit",
                        letterSpacing: "0.5px",
                      }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E7701E"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(231,112,30,0.1)"; }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#D1D5DB"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

              </div>

              {dateError && (
                <p className="text-[#E71D36] text-sm font-semibold text-center mb-[15px]" role="alert">
                  {dateError}
                </p>
              )}

              {/* ── Get a Quote button — full width, h:52px, bg:#E7701E, 16px 600, white ── */}
              <div className="w-full mt-[25px]">
                <button
                  type="submit"
                  className="w-full border-none cursor-pointer transition-all duration-300"
                  style={{
                    height: 52,
                    backgroundColor: "#E7701E",
                    color: "#FFFFFF",
                    borderRadius: 4,
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "inherit",
                    letterSpacing: "0.5px",
                    boxShadow: "0 4px 12px rgba(255,140,0,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#E67E00";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 18px rgba(255,140,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#E7701E";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(255,140,0,0.3)";
                  }}
                  onMouseDown={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
                >
                  Book Now
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* Keyframe animations only — cannot be done inline */}
      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawLine {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to   { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
      `}</style>

    </section>
  );
}
