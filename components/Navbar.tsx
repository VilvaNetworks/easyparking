"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SvgIcons from "@/components/SvgIcons";

const navLinks = [
  { label: "HOME",         href: "/" },
  { label: "About us",     href: "/about-us" },
  { label: "Services",     href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog",         href: "/blog" },
  { label: "Contact us",   href: "/contact-us" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [popupOpen,      setPopupOpen]      = useState(false);

  return (
    <>
      {/* ───────────────────────── HEADER ───────────────────────── */}
      <header className="w-full sticky top-0 z-50">

        {/* TOP BAR — desktop only */}
        <div
          className="hidden md:block"
          style={{
            backgroundImage: "linear-gradient(180deg,#E7701E 0%,#F09A0F 100%)",
            borderBottom: "1px solid #D6D6D699",
          }}
        >
          <div className="mx-auto flex items-center justify-between flex-wrap" style={{ maxWidth: 1450, padding: "8px 10px" }}>

            {/* LEFT: Email + Phone */}
            <ul className="flex items-center gap-4.5 list-none m-0 p-0">
              <li>
                <a href="mailto:Bookings@easyparkingltd.com" className="group flex items-center gap-1.5 no-underline"
                  style={{ fontFamily: '"Montserrat",Sans-serif', fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>
                  <SvgIcons.Email className="shrink-0 transition-all duration-300 group-hover:fill-[#FFC595]" style={{ width: 14, height: 14, fill: "#FFFFFF" }} />
                  <span className="transition-colors duration-300 group-hover:text-[#FFC595]" style={{ color: "#FFFFFF" }}>
                    Bookings@easyparkingltd.com
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+443330040262" className="group flex items-center gap-1.5 no-underline"
                  style={{ fontFamily: '"Montserrat",Sans-serif', fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>
                  <SvgIcons.Phone className="shrink-0 transition-all duration-300 group-hover:fill-[#FFC595]" style={{ width: 14, height: 14, fill: "#FFFFFF" }} />
                  <span className="transition-colors duration-300 group-hover:text-[#FFC595]" style={{ color: "#FFFFFF" }}>
                    Booking Helpline: +44 333 004 0262
                  </span>
                </a>
              </li>
            </ul>

            {/* RIGHT: My Account + Social Icons */}
            <div className="flex items-center" style={{ gap: 22 }}>
              {/* <Link href="/account" className="group flex items-center gap-1.5 no-underline"
                style={{ fontFamily: '"Montserrat",Sans-serif', fontSize: 15, fontWeight: 500, color: "#FFFFFF" }}>
                <SvgIcons.MyAccount className="shrink-0 transition-all duration-300 group-hover:fill-[#FFC595]" style={{ width: 19, height: 19, fill: "#FFFFFF" }} />
                <span className="transition-colors duration-300 group-hover:text-[#FFC595]" style={{ color: "#FFFFFF" }}>My Account</span>
              </Link> */}

              <div className="flex items-center" style={{ gap: 4 }}>
                {[
                  { icon: <SvgIcons.Facebook style={{ width: 15, height: 15 }} />, label: "Facebook" },
                  { icon: <SvgIcons.Twitter  style={{ width: 15, height: 15 }} />, label: "Twitter"  },
                  { icon: <SvgIcons.Youtube  style={{ width: 15, height: 15 }} />, label: "Youtube"  },
                  { icon: <SvgIcons.Linkedin style={{ width: 15, height: 15 }} />, label: "Linkedin" },
                ].map(({ icon, label }) => (
                  <a key={label} href="#" aria-label={label} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center transition-all duration-300"
                    style={{ width: 26, height: 26, backgroundColor: "transparent", borderRadius: 5 }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF";
                      const svg = e.currentTarget.querySelector("svg");
                      if (svg) svg.style.fill = "#E7701E";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      const svg = e.currentTarget.querySelector("svg");
                      if (svg) svg.style.fill = "rgba(255,255,255,0.988)";
                    }}
                  >
                    {React.cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
                      style: { ...(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>).props.style, fill: "rgba(255,255,255,0.988)", transition: "fill 0.3s" },
                    })}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN NAV BAR */}
        <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #DBDBDB" }}>
          <div className="mx-auto md:px-[0px] px-[16px]" style={{ maxWidth: 1450 }}>
            <div className="flex flex-wrap items-center justify-between" style={{ padding: "5px 0" }}>

              {/* LOGO */}
              <div className="flex items-center justify-start">
                <Link href="/" className="block">
                  <Image src="/images/logo.png" alt="easyparking ltd" width={246} height={85} priority
                    className="w-full lg:h-[100px] h-auto object-contain" style={{ maxWidth: 246 }} />
                </Link>
              </div>

              {/* DESKTOP NAV */}
              <nav className="hidden lg:flex items-center justify-center">
                <ul className="flex items-center list-none m-0 p-0">
                  {navLinks.map((link, i) => (
                    <li key={link.href} className="flex items-center">
                      <Link href={link.href} className="transition-colors duration-200"
                        style={{ fontFamily: '"Montserrat",Sans-serif', fontSize: 13, fontWeight: 600, textTransform: "uppercase", color: "#303030", textDecoration: "none", marginLeft: 12, marginRight: 12, display: "block", whiteSpace: "nowrap" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E7701E")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#303030")}
                      >
                        {link.label}
                      </Link>
                      {i < navLinks.length - 1 && (
                        <span style={{ display: "inline-block", width: 1, height: 13, backgroundColor: "#C5C5C5", flexShrink: 0 }} />
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* RIGHT: Cart + GET IN TOUCH + Hamburger */}
              <div className="flex items-center justify-end mr-[4px]" style={{ width: "16%", gap: 14 }}>
                {/* <a href="#" aria-label="Cart"
                  className="hidden lg:flex items-center gap-1.5 no-underline transition-colors duration-200"
                  style={{ borderRadius: 5, color: "#303030", fontSize: 13, fontFamily: '"Montserrat",Sans-serif', fontWeight: 600 }}
                  onMouseEnter={(e) => { const svg = (e.currentTarget as HTMLElement).querySelector("svg"); if (svg) svg.style.fill = "#F09A0F"; }}
                  onMouseLeave={(e) => { const svg = (e.currentTarget as HTMLElement).querySelector("svg"); if (svg) svg.style.fill = "#E7701E"; }}
                >
                  <span>£0.00</span>
                  <SvgIcons.Cart style={{ width: 26, height: 26, fill: "#E7701E", transition: "fill 0.2s" }} />
                </a> */}

                <button type="button"
                  className="hidden mr-[4px] lg:inline-block cursor-pointer border-none transition-all duration-300"
                  style={{ backgroundImage: "linear-gradient(180deg,#E7701E 0%,#F09A0F 100%)", fontFamily: '"Montserrat",Sans-serif', fontSize: 13, fontWeight: 700, color: "#FFFFFF", padding: "12px 20px", borderRadius: 4, whiteSpace: "nowrap" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundImage = "linear-gradient(180deg,#F09A0F 0%,#E7701E 100%)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundImage = "linear-gradient(180deg,#E7701E 0%,#F09A0F 100%)")}
                  onClick={() => setPopupOpen(true)}
                >
                  GET IN TOUCH
                </button>

                {/* Hamburger */}
                <button type="button" aria-label="Menu Toggle" aria-expanded={mobileMenuOpen}
                  className="flex lg:hidden items-center justify-center border-none cursor-pointer"
                  style={{ backgroundColor: "#E7701E", borderRadius: 4, width: 34, height: 34, padding: 0 }}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen
                    ? <SvgIcons.MenuClose style={{ width: 20, height: 20, fill: "#FFFFFF" }} />
                    : <SvgIcons.MenuOpen  style={{ width: 20, height: 20, fill: "#FFFFFF" }} />
                  }
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ───────────────── MOBILE SIDEBAR OVERLAY ───────────────── */}
      <div
        className="fixed inset-0 z-[9998] lg:hidden"
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* ───────────────── MOBILE SIDEBAR PANEL ─────────────────── */}
      <div
        className="fixed top-0 left-0 z-[9999] lg:hidden h-full overflow-y-auto flex flex-col"
        style={{
          width: 300,
          backgroundColor: "#FFFFFF",
          boxShadow: "4px 0 24px rgba(0,0,0,0.18)",
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Logo + close */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #EBEBEB" }}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/images/logo.png" alt="Easy Parking Ltd" width={160} height={56} className="object-contain" />
          </Link>
          <button type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center border-none cursor-pointer"
            style={{ backgroundColor: "#E7701E", borderRadius: 4, width: 32, height: 32, padding: 0 }}>
            <SvgIcons.MenuClose style={{ width: 18, height: 18, fill: "#FFFFFF" }} />
          </button>
        </div>

        {/* Topbar data: email / phone / my account / socials */}
        <div style={{ backgroundImage: "linear-gradient(180deg,#E7701E 0%,#F09A0F 100%)", padding: "14px 16px 14px" }}>
          <a href="mailto:Bookings@easyparkingltd.com" className="flex items-center gap-2 no-underline mb-3"
            style={{ fontFamily: '"Montserrat",Sans-serif', fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>
            <SvgIcons.Email style={{ width: 13, height: 13, fill: "#FFFFFF", flexShrink: 0 }} />
            Bookings@easyparkingltd.com
          </a>
          <a href="tel:+443330040262" className="flex items-center gap-2 no-underline mb-3"
            style={{ fontFamily: '"Montserrat",Sans-serif', fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>
            <SvgIcons.Phone style={{ width: 13, height: 13, fill: "#FFFFFF", flexShrink: 0 }} />
            Booking Helpline: +44 333 004 0262
          </a>
          {/* <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 no-underline mb-4"
            style={{ fontFamily: '"Montserrat",Sans-serif', fontSize: 13, fontWeight: 500, color: "#FFFFFF" }}>
            <SvgIcons.MyAccount style={{ width: 16, height: 16, fill: "#FFFFFF", flexShrink: 0 }} />
            My Account
          </Link> */}

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {[
              { Icon: SvgIcons.Facebook, label: "Facebook" },
              { Icon: SvgIcons.Twitter,  label: "Twitter"  },
              { Icon: SvgIcons.Youtube,  label: "Youtube"  },
              { Icon: SvgIcons.Linkedin, label: "Linkedin" },
            ].map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center"
                style={{ width: 28, height: 28, backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 4 }}>
                <Icon style={{ width: 13, height: 13, fill: "rgba(255,255,255,0.95)" }} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1">
          <ul className="list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href} style={{ borderBottom: "1px solid #F0F0F0" }}>
                <Link href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className="block transition-all duration-200"
                  style={{ padding: "14px 20px", fontFamily: '"Montserrat",Sans-serif', fontSize: 13, fontWeight: 600, textTransform: "uppercase", color: "#303030", textDecoration: "none" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; (e.currentTarget as HTMLElement).style.backgroundColor = "#E7701E"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#303030"; (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* GET IN TOUCH at bottom */}
        <div className="p-4" style={{ borderTop: "1px solid #EBEBEB" }}>
          <button type="button" className="w-full border-none cursor-pointer transition-all duration-300"
            style={{ backgroundImage: "linear-gradient(180deg,#E7701E 0%,#F09A0F 100%)", fontFamily: '"Montserrat",Sans-serif', fontSize: 13, fontWeight: 700, color: "#FFFFFF", padding: "13px", borderRadius: 4 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundImage = "linear-gradient(180deg,#F09A0F 0%,#E7701E 100%)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundImage = "linear-gradient(180deg,#E7701E 0%,#F09A0F 100%)")}
            onClick={() => { setMobileMenuOpen(false); setPopupOpen(true); }}
          >
            GET IN TOUCH
          </button>
        </div>
      </div>

      {/* ───────────────── GET IN TOUCH POPUP ───────────────────── */}
      {popupOpen && (
        <div className="fixed inset-0 z-10000 flex justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", animation: "fadeIn 0.25s ease" }}
          onClick={() => setPopupOpen(false)}
        >
          <div className="relative overflow-y-auto"
            style={{ backgroundColor: "#FFFFFF", width: 460, maxWidth: "100%", height: "100%", padding: 30, boxShadow: "-8px 0 30px rgba(0,0,0,0.15)", animation: "slideIn 0.3s ease" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute cursor-pointer border-none flex items-center justify-center"
              style={{ top: 14, right: 14, width: 32, height: 32, backgroundColor: "#E7701E", color: "#FFFFFF", fontSize: 20, borderRadius: "50%" }}
              onClick={() => setPopupOpen(false)}>
              ×
            </button>

            <Image src="/images/logo.png" alt="easyparking ltd" width={200} height={70} />
            <h2 style={{ fontSize: 26, margin: "16px 0 8px", color: "#1a1a1a" }}>Customer Support</h2>
            <p style={{ color: "#555555", marginBottom: 18, fontSize: 14 }}>
              Complete the form to confirm your query<br />easy, quick, and secure.
            </p>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input type="text" placeholder="Name" className="w-full outline-none"
                  style={{ padding: "12px 14px", border: "1px solid #DDDDDD", fontSize: 14, backgroundColor: "#FFFFFF" }} />
                <input type="tel" placeholder="Phone Number" required className="w-full outline-none"
                  style={{ padding: "12px 14px", border: "1px solid #DDDDDD", fontSize: 14, backgroundColor: "#FFFFFF" }} />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input type="email" placeholder="Email" required className="w-full outline-none"
                  style={{ padding: "12px 14px", border: "1px solid #DDDDDD", fontSize: 14, backgroundColor: "#FFFFFF" }} />
                <select defaultValue="Select Services" required className="w-full outline-none"
                  style={{ padding: "12px 14px", border: "1px solid #DDDDDD", fontSize: 14, backgroundColor: "#FFFFFF" }}>
                  <option>Select Services</option>
                  <option>Meet &amp; Greet Parking at Gatwick</option>
                  <option>Secure Airport Parking</option>
                  <option>Photographic Vehicle Checks</option>
                  <option>Convenient Collection &amp; Return</option>
                  <option>24/7 Customer Support</option>
                  <option>Affordable &amp; Reliable</option>
                </select>
              </div>
              <textarea rows={4} placeholder="Message" className="w-full outline-none mb-3"
                style={{ padding: "12px 14px", border: "1px solid #DDDDDD", fontSize: 14, backgroundColor: "#FFFFFF", resize: "vertical" }} />
              <button type="submit" className="w-full border-none cursor-pointer transition-all duration-300"
                style={{ backgroundImage: "linear-gradient(180deg,#E7701E 0%,#F09A0F 100%)", fontFamily: '"Montserrat",Sans-serif', fontSize: 13, fontWeight: 700, color: "#FFFFFF", padding: "14px", borderRadius: 4 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundImage = "linear-gradient(180deg,#F09A0F 0%,#E7701E 100%)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundImage = "linear-gradient(180deg,#E7701E 0%,#F09A0F 100%)")}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </>
  );
}
