"use client";

import React, { useEffect, useState } from "react";

interface SidebarScrollSpyProps {
  navItems: {
    anchor: string;
    label: string;
  }[];
}

export default function SidebarScrollSpy({ navItems }: SidebarScrollSpyProps) {
  const [activeAnchor, setActiveAnchor] = useState<string>("1");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // triggers when section is in the middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveAnchor(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.anchor);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.anchor);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [navItems]);

  const handleScrollTo = (e: React.MouseEvent, anchor: string) => {
    e.preventDefault();
    const element = document.getElementById(anchor);
    if (element) {
      // Offset scroll by header height + mobile nav height
      const offset = 160;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveAnchor(anchor);
      window.history.replaceState(null, "", `#${anchor}`);
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Navigation List */}
      <div className="hidden lg:block bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-36">
        <h3 className="text-[#2c3e50] font-bold text-lg mb-4 tracking-wide uppercase border-b pb-3 border-gray-200">
          Navigation Index
        </h3>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activeAnchor === item.anchor;
            return (
              <a
                key={item.anchor}
                href={`#${item.anchor}`}
                onClick={(e) => handleScrollTo(e, item.anchor)}
                className={`text-left pl-4 py-2 border-l-2 transition-all duration-300 font-semibold text-[14px] no-underline ${
                  isActive
                    ? "border-[#e7701e] text-[#e7701e] bg-orange-50/40"
                    : "border-gray-200 text-gray-500 hover:text-[#2c3e50] hover:border-gray-400"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Mobile Horizontal Navigation Slider */}
      <div className="block lg:hidden sticky top-[95px] z-40 bg-white border-b border-gray-200 py-3 overflow-x-auto whitespace-nowrap scrollbar-none shadow-sm -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8">
        <div className="flex gap-3">
          {navItems.map((item) => {
            const isActive = activeAnchor === item.anchor;
            return (
              <a
                key={item.anchor}
                href={`#${item.anchor}`}
                onClick={(e) => handleScrollTo(e, item.anchor)}
                className={`inline-block px-4 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 no-underline ${
                  isActive
                    ? "bg-[#e7701e] text-white shadow-sm shadow-orange-500/25"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
