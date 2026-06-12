"use client";

import React, { useState, useRef, useEffect } from "react";
import SvgIcons from "@/components/SvgIcons";

export default function Hero() {
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [terminal, setTerminal] = useState("17789");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full relative" style={{ fontFamily: '"Montserrat",Sans-serif' }}>

      {/* ===== VIDEO BACKGROUND HERO ===== */}
      {/* min-height:600px, height:80vh, max-height:750px */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ minHeight: 600, height: "80vh", maxHeight: 750 }}
      >
        {/* Video wrapper — absolute full cover, z-index:1 */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }} aria-hidden="true">
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-center block"
            autoPlay
            muted
            playsInline
            loop
            poster="/images/hero-poster.jpg"
          >
            <source src="/images/banner-vid.mkv" type="video/x-matroska" />
          </video>
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

              {/* Form grid — 3 cols desktop, 1 col mobile, gap:30px, mb:25px */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-[30px] mb-[25px]">

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
                    <input
                      type="date"
                      value={dropOffDate}
                      onChange={(e) => setDropOffDate(e.target.value)}
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
                    <input
                      type="time"
                      value={dropOffTime}
                      onChange={(e) => setDropOffTime(e.target.value)}
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
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
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
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
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
                </div>

                {/* ── Select Terminal ── */}
                <div style={{ minWidth: 0 }}>
                  <div
                    className="text-[15px] md:text-[16px] font-bold mb-[12px] md:mb-[18px] tracking-[0.3px]"
                    style={{ color: "#004280" }}
                  >
                    Select Terminal
                  </div>
                  {/* Custom select wrapper — relative, ChevronDown arrow at right:14px */}
                  <div className="relative w-full">
                    <select
                      value={terminal}
                      onChange={(e) => setTerminal(e.target.value)}
                      className="w-full outline-none cursor-pointer box-border transition-all duration-300"
                      style={{
                        height: 48,
                        padding: "0 40px 0 16px",
                        border: "1px solid #D1D5DB",
                        borderRadius: 4,
                        backgroundColor: "#FFFFFF",
                        color: "#1A1A1A",
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: "inherit",
                        letterSpacing: "0.5px",
                        appearance: "none",
                        WebkitAppearance: "none",
                      }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E7701E"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(231,112,30,0.1)"; }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#D1D5DB"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                    >
                      <option value="17789">Gatwick Airport - North Terminal</option>
                      <option value="17790">Gatwick Airport - South Terminal</option>
                    </select>
                    {/* ChevronDown arrow — absolute right:14px top:50%, 18×18px, color:#6B7280, pointer-events:none */}
                    <SvgIcons.ChevronDown
                      className="absolute pointer-events-none"
                      style={{
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 18,
                        height: 18,
                        color: "#6B7280",
                      }}
                    />
                  </div>
                </div>

              </div>

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
                  Get a Quote
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
