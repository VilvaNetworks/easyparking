"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const leftFeatures = [
  { id: 1, title: "Close to Terminals",   description: "Only minutes away from both North and South Terminals." },
  { id: 2, title: "Fast & Easy",          description: "Drop off and pick up at the terminal no waiting." },
  { id: 3, title: "Safe & Monitored",     description: "24/7 CCTV, gated lots, and advanced security." },
  { id: 4, title: "Ultimate Convenience", description: "Straight to check-in after handover." },
];

const rightFeatures = [
  { id: 5, title: "Stress-Free Travel",       description: "No shuttles, no searching—just drive and go." },
  { id: 6, title: "For Special Occasions",    description: "Ideal for honeymoons, holidays, and VIP trips." },
  { id: 7, title: "Affordable & Transparent", description: "Clear pricing with no hidden charges." },
  { id: 8, title: "Professional Staff",       description: "Insured, uniformed, and DBS checked team." },
];

// Each card: different top + different horizontal inset — zigzag stepped pattern
const leftPos = [
  { top:  30, left: 100 },   // Card 1 — inset from left edge
  { top: 200, left:  25 },   // Card 2 — steps toward left edge
  { top: 370, left:   0 },   // Card 3 — at left edge
  { top: 535, left:  65 },   // Card 4 — steps back inward
];
const rightPos = [
  { top:  30, right: 100 },  // Card 5 — inset from right edge
  { top: 200, right:  25 },  // Card 6 — steps toward right edge
  { top: 370, right:  0 },  // Card 7 — slightly inset
  { top: 535, right:  65 },  // Card 8 — at right edge
];

const CARD_W  = 270;
const STAGE_H = 730;

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible,  setVisible]  = useState(false);
  const [carScale, setCarScale] = useState(0.4);

  // One-time trigger for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll-driven scale — based on sectionRef so works on both desktop & mobile.
  // rAF-batched so the layout-forcing getBoundingClientRect() call runs at most
  // once per frame instead of once per scroll event.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      if (!sectionRef.current) return;
      const rect     = sectionRef.current.getBoundingClientRect();
      const winH     = window.innerHeight;
      // progress 0 → 1: section center moves from bottom to top of viewport
      const center   = rect.top + rect.height / 2;
      const progress = 1 - Math.max(0, Math.min(1, center / winH));
      setCarScale(0.4 + progress * 0.75);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#ff8c00] text-[15px] font-bold uppercase tracking-[2.5px] mb-5">
            WHY&nbsp;&nbsp;CHOOSE&nbsp;&nbsp;US?
          </p>
          <h2 className="text-[#1a1a1a] text-[32px] md:text-[40px] lg:text-[44px] font-extrabold leading-[1.2] tracking-tight">
            Leading with Service, Backed by Trust
          </h2>
        </div>

        <div ref={sectionRef}>

          {/* ── DESKTOP ── */}
          <div className="hidden lg:block">
            <div className="relative mx-auto" style={{ height: STAGE_H, maxWidth: 1280 }}>

              {/* Faint watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
                <Image src="/images/carmove.png" alt="" width={720} height={720} className="object-contain" />
              </div>

              {/* Left cards — each at a different top + left offset */}
              {leftFeatures.map((f, i) => (
                <div
                  key={f.id}
                  className="absolute"
                  style={{
                    top:   leftPos[i].top,
                    left:  leftPos[i].left,
                    width: CARD_W,
                    opacity:   visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-70px)",
                    transition: `opacity 0.7s ease-out ${i * 0.13}s, transform 0.7s ease-out ${i * 0.13}s`,
                  }}
                >
                  <div className="bg-[#f5f5f5] border-2 border-[#ff8c00] p-6 text-center">
                    <h3 className="text-[#1a1a1a] text-[17px] font-bold mb-2 leading-snug">{f.title}</h3>
                    <p  className="text-[#4a4a4a] text-[14px] leading-[1.55]">{f.description}</p>
                  </div>
                </div>
              ))}

              {/* Center car — scroll-driven zoom */}
              <div
                className="absolute"
                style={{
                  top:       "50%",
                  left:      "50%",
                  width:     400,
                  transform: `translate(-50%, -50%) scale(${carScale})`,
                  opacity:    carScale > 0.42 ? 1 : 0,
                  transition: "transform 0.15s ease-out, opacity 0.3s ease-out",
                }}
              >
                <Image
                  src="/images/carmove.png"
                  alt="Premium black Rolls Royce car"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Right cards — each at a different top + right offset */}
              {rightFeatures.map((f, i) => (
                <div
                  key={f.id}
                  className="absolute"
                  style={{
                    top:   rightPos[i].top,
                    right: rightPos[i].right,
                    width: CARD_W,
                    opacity:   visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(70px)",
                    transition: `opacity 0.7s ease-out ${i * 0.13}s, transform 0.7s ease-out ${i * 0.13}s`,
                  }}
                >
                  <div className="bg-[#f5f5f5] border-2 border-[#ff8c00] p-6 text-center">
                    <h3 className="text-[#1a1a1a] text-[17px] font-bold mb-2 leading-snug">{f.title}</h3>
                    <p  className="text-[#4a4a4a] text-[14px] leading-[1.55]">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom centered card */}
            <div className="flex justify-center mt-8">
              <div
                className="bg-[#f5f5f5] border-2 border-[#ff8c00] p-6 text-center"
                style={{
                  width:      600,
                  opacity:    visible ? 1 : 0,
                  transform:  visible ? "translateY(0)" : "translateY(30px)",
                  transition: "opacity 0.7s ease-out 0.55s, transform 0.7s ease-out 0.55s",
                }}
              >
                <h3 className="text-[#1a1a1a] text-[17px] font-bold mb-2">Family &amp; Business Friendly</h3>
                <p  className="text-[#4a4a4a] text-[14px] leading-[1.55]">Perfect for families, busy travelers, and more.</p>
              </div>
            </div>
          </div>

          {/* ── MOBILE ── */}
          <div className="flex flex-col gap-4 lg:hidden">

            {/* Mobile car */}
            

            {/* All cards */}
            {[...leftFeatures].map((f, i) => (
              <div
                key={f.id}
                className="bg-[#f5f5f5] border-2 border-[#ff8c00] p-5 text-center"
                style={{
                  opacity:    visible ? 1 : 0,
                  transform:  visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease-out ${i * 0.07}s, transform 0.6s ease-out ${i * 0.07}s`,
                }}
              >
                <h3 className="text-[#1a1a1a] text-[16px] font-bold mb-1">{f.title}</h3>
                <p  className="text-[#4a4a4a] text-[14px] leading-[1.55]">{f.description}</p>
              </div>
            ))}

            <div
              className="flex justify-center my-4"
              style={{
                transform:  `scale(${carScale})`,
                opacity:     carScale > 0.42 ? 1 : 0,
                transition: "transform 0.15s ease-out, opacity 0.3s ease-out",
              }}
            >
              <Image src="/images/carmove.png" alt="Moving car" width={320} height={220} className="object-contain" />
            </div>

            {[...rightFeatures].map((f, i) => (
              <div
                key={f.id}
                className="bg-[#f5f5f5] border-2 border-[#ff8c00] p-5 text-center"
                style={{
                  opacity:    visible ? 1 : 0,
                  transform:  visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease-out ${i * 0.07}s, transform 0.6s ease-out ${i * 0.07}s`,
                }}
              >
                <h3 className="text-[#1a1a1a] text-[16px] font-bold mb-1">{f.title}</h3>
                <p  className="text-[#4a4a4a] text-[14px] leading-[1.55]">{f.description}</p>
              </div>
            ))}

            <div className="bg-[#f5f5f5] border-2 border-[#ff8c00] p-5 text-center">
              <h3 className="text-[#1a1a1a] text-[16px] font-bold mb-1">Family &amp; Business Friendly</h3>
              <p  className="text-[#4a4a4a] text-[14px] leading-[1.55]">Perfect for families, busy travelers, and more.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
