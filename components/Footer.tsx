"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SvgIcons from "@/components/SvgIcons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
];

const generalLinks = [
  { label: "On the Day of Your Departure", href: "/general-information#1" },
  { label: "On the Day of Arrival", href: "/general-information#2" },
  { label: "Cancellations / Refund Policy", href: "/general-information#3" },
  { label: "Booking Process", href: "/booking-process" },
  { label: "Booking Terms and Conditions", href: "/booking-terms-and-conditions" },
  { label: "Terms and Conditions for Complaints/Claims", href: "/terms-and-conditions-for-complaints-claims" },
  { label: "Terms and Conditions For Parking Fine/Penalty Notices", href: "/terms-and-conditions-for-parking-fine-penalty-notices" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const serviceLinks = [
  { label: "Meet & Greet Airport Parking Service", href: "/services#1" },
  { label: "Valeting Service", href: "/services#2" },
  { label: "Full Car Wash Service – £34.99", href: "/services#3" },
  { label: "Car Wash Outside Only – £14.99", href: "/services#4" },
  { label: "Electric Car Charging", href: "/services#5" },
  { label: "Transfer Services", href: "/services#6" },
];

/* Reusable link hover handler */
const linkHover = {
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => ((e.currentTarget as HTMLElement).style.color = "#E7701E"),
  onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => ((e.currentTarget as HTMLElement).style.color = "#333333"),
};

export default function Footer() {
  return (
    <footer style={{ width: "100%", fontFamily: '"Montserrat",Sans-serif' }}>

      {/* ===== MAIN FOOTER — bg:#F5F5F5 with subtle diamond pattern ===== */}
      <div
        style={{
          backgroundColor: "#F5F5F5",
          backgroundImage: [
            "linear-gradient(45deg,rgba(255,140,0,0.04) 25%,transparent 25%)",
            "linear-gradient(-45deg,rgba(255,140,0,0.04) 25%,transparent 25%)",
            "linear-gradient(45deg,transparent 75%,rgba(255,140,0,0.04) 75%)",
            "linear-gradient(-45deg,transparent 75%,rgba(255,140,0,0.04) 75%)",
          ].join(","),
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0,0 20px,20px -20px,-20px 0px",
          padding: "clamp(30px,5vw,60px) 0 clamp(25px,4vw,50px)",
          color: "#333333",
        }}
      >
        {/* max-width:1400px, padding:0 40px — responsive 1→2→3→5 cols */}
        <div
          className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[30px] items-start px-5 sm:px-6 lg:px-10"
          style={{ maxWidth: 1400 }}
        >

          {/* ── COL 1: Logo + Description + Social — full width on sm/md ── */}
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1" style={{ minWidth: 0 }}>

            {/* Logo — /images/logo.png, width:180px */}
            <div style={{ marginBottom: 20 }}>
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="easyparking ltd"
                  width={180}
                  height={62}
                  className="h-auto"
                  style={{ width: 180, objectFit: "contain" }}
                />
              </Link>
            </div>

            {/* Description — #333333 15px 400, line-height 1.6, max-width 280px */}
            <p style={{ color: "#333333", fontSize: 15, lineHeight: 1.6, margin: "0 0 20px 0", maxWidth: 280, fontWeight: 400 }}>
              Smart, secure, and stress-free parking solutions. Your space, just a click away.
            </p>

            {/* Social Icons — 32×32px, bg:#E7701E, border-radius:4px, icon 16px white, gap:8px */}
            {/* hover bg:#E67E00, translateY(-2px) */}
            <div className="flex items-center" style={{ gap: 8 }}>
              {[
                { Icon: SvgIcons.Facebook, label: "Facebook" },
                { Icon: SvgIcons.Twitter, label: "Twitter" },
                { Icon: SvgIcons.Youtube, label: "Youtube" },
              ].map(({ Icon, label }) => (
                <Link
                  key={label}
                  href="/"
                  aria-label={label}
                  className="inline-flex items-center justify-center transition-all duration-300"
                  style={{ width: 32, height: 32, borderRadius: 4, backgroundColor: "#E7701E", textDecoration: "none" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#E67E00"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#E7701E"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  <Icon style={{ width: 16, height: 16, fill: "#FFFFFF" }} />
                </Link>
              ))}
            </div>
          </div>

          {/* ── COL 2: Quick Links ── */}
          <div style={{ minWidth: 0 }}>
            {/* Heading — Montserrat 18px 700 #1a1a1a uppercase, letter-spacing:0.5px, mb:25px */}
            <h3 style={{ color: "#1A1A1A", fontSize: 18, fontWeight: 700, margin: "0 0 25px 0", padding: 0, textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: '"Montserrat",sans-serif' }}>
              QUICK LINKS
            </h3>
            <ul className="list-none p-0 m-0">
              {quickLinks.map((l) => (
                <li key={l.href} style={{ marginBottom: 14 }}>
                  <Link
                    href={l.href}
                    className="transition-colors duration-300 no-underline"
                    style={{ color: "#333333", fontSize: 15, lineHeight: 1.5, fontWeight: 400, display: "inline-block" }}
                    {...linkHover}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 3: General Information ── */}
          <div style={{ minWidth: 0 }}>
            <h3 style={{ color: "#1A1A1A", fontSize: 18, fontWeight: 700, margin: "0 0 25px 0", padding: 0, textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: '"Montserrat",sans-serif' }}>
              GENERAL INFORMATION
            </h3>
            <ul className="list-none p-0 m-0">
              {generalLinks.map((l) => (
                <li key={l.href} style={{ marginBottom: 14 }}>
                  <Link
                    href={l.href}
                    className="transition-colors duration-300 no-underline"
                    style={{ color: "#333333", fontSize: 15, lineHeight: 1.5, fontWeight: 400, display: "inline-block" }}
                    {...linkHover}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 4: Our Services ── */}
          <div style={{ minWidth: 0 }}>
            <h3 style={{ color: "#1A1A1A", fontSize: 18, fontWeight: 700, margin: "0 0 25px 0", padding: 0, textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: '"Montserrat",sans-serif' }}>
              OUR SERVICES
            </h3>
            <ul className="list-none p-0 m-0">
              {serviceLinks.map((l) => (
                <li key={l.href} style={{ marginBottom: 14 }}>
                  <Link
                    href={l.href}
                    className="transition-colors duration-300 no-underline"
                    style={{ color: "#333333", fontSize: 15, lineHeight: 1.5, fontWeight: 400, display: "inline-block" }}
                    {...linkHover}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 5: Help & Support — full width on sm/md ── */}
          {/* Top border/padding only applies while this column wraps onto its
              own row (sm/md/lg); at xl it sits inline with cols 2-4, so the
              separator would push its heading out of line with theirs. */}
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1 border-t border-black/8 pt-7.5 xl:border-t-0 xl:pt-0" style={{ minWidth: 0 }}>
            <h3 style={{ color: "#1A1A1A", fontSize: 18, fontWeight: 700, margin: "0 0 25px 0", padding: 0, textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: '"Montserrat",sans-serif' }}>
              HELP &amp; SUPPORT
            </h3>

            {/* Contact list — gap:12px per item, icon 16px fill:#E7701E, text 15px #333333, hover #E7701E */}
            <ul className="list-none p-0" style={{ margin: "0 0 25px 0" }}>
              {/* Phone */}
              <li style={{ marginBottom: 16 }}>
                <a
                  href="tel:+443330040262"
                  className="flex items-start no-underline transition-colors duration-300 group"
                  style={{ gap: 12, color: "#333333", fontSize: 15, lineHeight: 1.5 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E7701E")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#333333")}
                >
                  {/* icon: 18×18px container, icon 16px fill #E7701E */}
                  <span className="inline-flex items-center justify-center shrink-0" style={{ width: 18, height: 18, marginTop: 3 }}>
                    <SvgIcons.Phone style={{ width: 16, height: 16, fill: "#E7701E" }} />
                  </span>
                  <span style={{ flex: 1 }}>+44 333 004 0262</span>
                </a>
              </li>

              {/* Business Hours */}
              <li style={{ marginBottom: 16 }}>
                <a
                  href="https://www.google.com/maps/place/1-2+Johnston+Rd,+Woodford,+Woodford+Green+IG8+0XA,+UK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start no-underline transition-colors duration-300"
                  style={{ gap: 12, color: "#333333", fontSize: 15, lineHeight: 1.5 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E7701E")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#333333")}
                >
                  <span className="inline-flex items-center justify-center shrink-0" style={{ width: 18, height: 18, marginTop: 3 }}>
                    <SvgIcons.Clock style={{ width: 16, height: 16, fill: "#E7701E" }} />
                  </span>
                  <span style={{ flex: 1 }}>
                    <strong style={{ color: "#1A1A1A", fontWeight: 700, display: "inline-block" }}>Business Hours</strong>
                    <br />Monday to Friday 9 AM–5 PM
                  </span>
                </a>
              </li>

              {/* Info email */}
              <li style={{ marginBottom: 16 }}>
                <a
                  href="mailto:Info@easyparkingltd.com"
                  className="flex items-start no-underline transition-colors duration-300"
                  style={{ gap: 12, color: "#333333", fontSize: 15, lineHeight: 1.5 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E7701E")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#333333")}
                >
                  <span className="inline-flex items-center justify-center shrink-0" style={{ width: 18, height: 18, marginTop: 3 }}>
                    <SvgIcons.Email style={{ width: 16, height: 16, fill: "#E7701E" }} />
                  </span>
                  <span style={{ flex: 1 }}>Info@easyparkingltd.com</span>
                </a>
              </li>

              {/* Bookings email */}
              <li style={{ marginBottom: 16 }}>
                <a
                  href="mailto:Bookings@easyparkingltd.com"
                  className="flex items-start no-underline transition-colors duration-300"
                  style={{ gap: 12, color: "#333333", fontSize: 15, lineHeight: 1.5 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E7701E")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#333333")}
                >
                  <span className="inline-flex items-center justify-center shrink-0" style={{ width: 18, height: 18, marginTop: 3 }}>
                    <SvgIcons.Email style={{ width: 16, height: 16, fill: "#E7701E" }} />
                  </span>
                  <span style={{ flex: 1 }}>Bookings@easyparkingltd.com</span>
                </a>
              </li>

              {/* Complaints email */}
              <li style={{ marginBottom: 16 }}>
                <a
                  href="mailto:Complaints@easyparkingltd.com"
                  className="flex items-start no-underline transition-colors duration-300"
                  style={{ gap: 12, color: "#333333", fontSize: 15, lineHeight: 1.5 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E7701E")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#333333")}
                >
                  <span className="inline-flex items-center justify-center shrink-0" style={{ width: 18, height: 18, marginTop: 3 }}>
                    <SvgIcons.Email style={{ width: 16, height: 16, fill: "#E7701E" }} />
                  </span>
                  <span style={{ flex: 1 }}>Complaints@easyparkingltd.com</span>
                </a>
              </li>

              {/* Registered Address */}
              <li style={{ marginBottom: 16 }}>
                <a
                  href="https://www.google.com/maps/place/1-2+Johnston+Rd,+Woodford,+Woodford+Green+IG8+0XA,+UK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start no-underline transition-colors duration-300"
                  style={{ gap: 12, color: "#333333", fontSize: 15, lineHeight: 1.5 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E7701E")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#333333")}
                >
                  <span className="inline-flex items-center justify-center shrink-0" style={{ width: 18, height: 18, marginTop: 3 }}>
                    <SvgIcons.MapPin style={{ width: 16, height: 16, fill: "#E7701E" }} />
                  </span>
                  <span style={{ flex: 1 }}>
                    <strong style={{ color: "#1A1A1A", fontWeight: 700, display: "inline-block" }}>Registered address</strong>
                    <br />1-2, Johnston Road, Woodford Green, England, IG8 0XA
                  </span>
                </a>
              </li>
            </ul>

            {/* Newsletter — text 15px #333333, input h:48px padding:12px 16px, submit 60×48px bg:#E7701E */}
            <p style={{ color: "#333333", fontSize: 15, margin: "20px 0 15px 0", lineHeight: 1.5 }}>
              Join Easy Parking Ltd for the latest tips and updates.
            </p>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-newsletter-email" className="sr-only">Email Address</label>
              <div
                className="flex w-full overflow-hidden"
                style={{ backgroundColor: "#FFFFFF", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
              >
                {/* Input — flex:1, padding:12px 16px, h:48px, bg white, #333333 14px */}
                <input
                  id="footer-newsletter-email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="flex-1 border-none outline-none"
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#FFFFFF",
                    color: "#333333",
                    fontSize: 14,
                    height: 48,
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
                {/* Submit button — 60×48px, bg:#E7701E, icon 20px white, hover bg:#E67E00 */}
                <button
                  type="submit"
                  aria-label="Submit"
                  className="flex items-center justify-center border-none cursor-pointer shrink-0 transition-colors duration-300"
                  style={{ width: 60, height: 48, backgroundColor: "#E7701E", padding: 0 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#E67E00")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#E7701E")}
                >
                  <SvgIcons.Send style={{ width: 20, height: 20, fill: "#FFFFFF" }} />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* ===== BOTTOM BAR — bg:#E7701E, padding:18px 0, text white 14px centered ===== */}
      <div style={{ backgroundColor: "#E7701E", padding: "18px 0" }}>
        <div className="mx-auto text-center px-5 sm:px-10" style={{ maxWidth: 1400 }}>
          <p style={{ color: "#FFFFFF", fontSize: 14, margin: 0, fontWeight: 400 }}>
            © Copyright 2025. All Rights Reserved By Easy Parking Ltd.
          </p>
        </div>
      </div>

    </footer>
  );
}
