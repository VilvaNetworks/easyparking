"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

interface BookNowLinkProps {
  className?: string;
  children: React.ReactNode;
}

// Sends the visitor to the home page's booking widget without ever putting
// a hash fragment in the URL. If already on the home page, just scrolls;
// otherwise stashes a flag for Hero.tsx to pick up after navigation.
export default function BookNowLink({ className, children }: BookNowLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById("book_now")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      sessionStorage.setItem("scrollToBooking", "1");
      router.push("/");
    }
  };

  return (
    <Link href="/" onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
