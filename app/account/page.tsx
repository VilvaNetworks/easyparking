import type { Metadata } from "next";
import Image from "next/image";
import AccountForms from "@/components/AccountForms";

export const metadata: Metadata = {
  title: "Account - Easy Parking Ltd",
  description: "Access your Easy Parking Ltd account dashboard, view recent orders, manage addresses, and update account details.",
  alternates: {
    canonical: "/account",
  },
};

export default function AccountPage() {
  return (
    <div className="w-full bg-white text-[#2c3e50] font-sans pb-16 md:pb-24">
      
      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/account-banner.png"
            alt="Account Banner"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center px-4 mt-6">
          <h1 className="text-white text-[32px] sm:text-[40px] md:text-[50px] font-extrabold tracking-[4px] uppercase font-sans">
            Account
          </h1>
        </div>
      </section>

      {/* ================= FORMS CONTAINER ================= */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <AccountForms />
      </section>

    </div>
  );
}
