"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4 | 5;

export default function CarParkBookingWizard() {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Step 1: Dates & Terminal
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [terminal, setTerminal] = useState("North Terminal");

  // Step 2: Space & Add-ons Selection
  const [parkingOption, setParkingOption] = useState<"meet-greet" | "park-ride">("meet-greet");
  const [addOnCarWash, setAddOnCarWash] = useState(false);
  const [addOnEvCharge, setAddOnEvCharge] = useState(false);

  // Step 3: Customer Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleReg, setVehicleReg] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [flightNumber, setFlightNumber] = useState("");

  // Step 4: Booking Summary
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Calculation parameters
  const basePrice = parkingOption === "meet-greet" ? 79.99 : 59.99;
  const washPrice = 34.99;
  const evPrice = 20.00;
  const totalPrice = basePrice + (addOnCarWash ? washPrice : 0) + (addOnEvCharge ? evPrice : 0);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dropOffDate || !dropOffTime || !pickupDate || !pickupTime) {
      alert("Please select all departure and arrival dates/times.");
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Submit = () => {
    setCurrentStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !vehicleReg || !vehicleModel) {
      alert("Please fill out all required personal and vehicle details.");
      return;
    }
    setCurrentStep(4);
  };

  const handleStep4Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardHolder || !cardNumber || !cardExpiry || !cardCvv) {
      alert("Please fill out mock payment details to complete the simulation booking.");
      return;
    }
    setCurrentStep(5);
  };

  return (
    <div className="w-full font-sans">
      
      {/* ================= STEP INDICATOR BAR ================= */}
      <div className="max-w-[1320px] mx-auto mb-10 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-200 bg-[#fcfbfa] p-6 shadow-sm">
          {[
            { num: 1, label: "Select Dates" },
            { num: 2, label: "Parking Space" },
            { num: 3, label: "Customer Details" },
            { num: 4, label: "Booking Summary" },
          ].map((s) => {
            const isCompleted = currentStep > s.num;
            const isActive = currentStep === s.num;
            return (
              <div key={s.num} className="flex items-center gap-3 w-full justify-center md:justify-start">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[15px] transition-all duration-300 ${
                    isActive
                      ? "bg-[#e7701e] text-white ring-4 ring-orange-100"
                      : isCompleted
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? "✓" : s.num}
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <span className={`text-[12px] font-bold uppercase tracking-[1px] ${isActive ? "text-[#e7701e]" : "text-gray-400"}`}>
                    Step {s.num}
                  </span>
                  <span className={`text-[15px] font-extrabold ${isActive || isCompleted ? "text-[#1a1a1a]" : "text-gray-500"}`}>
                    {s.label}
                  </span>
                </div>
                {s.num < 4 && (
                  <div className="hidden xl:block flex-1 h-[2px] bg-gray-200 mx-6" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= HEADER GRAPHIC ================= */}
      {currentStep !== 5 && (
        <div className="max-w-[1320px] mx-auto px-4 mb-10">
          <div className="bg-[#002f5d] text-white flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-6 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute right-0 top-0 w-[400px] h-full bg-orange-500/10 -skew-x-12 transform origin-top-right pointer-events-none" />
            
            <div className="flex items-center gap-6 z-10">
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 animate-bounce">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.122-4.11-6.928-6.927l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H3.613a2.25 2.25 0 00-2.25 2.25v1.372z" />
                </svg>
              </div>
              <div>
                <span className="text-orange-400 font-bold tracking-[2px] uppercase text-[13px] md:text-[14px]">
                  Easy Parking Airport Valet
                </span>
                <h2 className="text-white font-extrabold text-[28px] md:text-[36px] tracking-tight mt-1">
                  Car Park Booking System
                </h2>
              </div>
            </div>
            <div className="z-10 text-center md:text-right">
              <p className="text-orange-400 font-extrabold text-[18px] md:text-[20px]">
                Booking Hotline
              </p>
              <p className="text-white font-black text-[22px] md:text-[26px] tracking-wide mt-1">
                +44 333 004 0262
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 1 CONTENT ================= */}
      {currentStep === 1 && (
        <div className="max-w-[1320px] mx-auto px-4 relative">
          
          {/* Form wrapper with background map */}
          <div className="relative border border-gray-200 overflow-hidden shadow-md">
            
            {/* Absolute Map Background */}
            <div className="absolute inset-0 z-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.304563820299!2d0.030560877074744747!3d51.60337837183317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a7a0bbfb77c5%3A0xe6bf44b419ec417a!2sJohnston%20Rd%2C%20Woodford%2C%20Woodford%20Green!5e0!3m2!1sen!2suk!4v1718117900000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(20%) opacity(80%)" }}
                allowFullScreen={false}
                loading="lazy"
                title="Sitemap Location Map"
              />
              <div className="absolute inset-0 bg-[#001730]/40 backdrop-blur-[2px]" />
            </div>

            {/* Overlaid Form Content Container */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-[1100px] mx-auto">
              <form onSubmit={handleStep1Submit} className="bg-white/95 backdrop-blur-[8px] border border-gray-200 p-8 md:p-10 shadow-xl rounded-none">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
                  
                  {/* Drop off Date & Time */}
                  <div className="space-y-4">
                    <h3 className="text-[#1a1a1a] font-bold text-[15px] uppercase tracking-[1px] border-b border-gray-200 pb-2 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#e7701e] rounded-full inline-block" />
                      Drop off Date &amp; Time
                    </h3>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Drop Off Date</label>
                      <input
                        type="date"
                        value={dropOffDate}
                        onChange={(e) => setDropOffDate(e.target.value)}
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Drop Off Time</label>
                      <input
                        type="time"
                        value={dropOffTime}
                        onChange={(e) => setDropOffTime(e.target.value)}
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                        required
                      />
                    </div>
                  </div>

                  {/* Pickup Date & Time */}
                  <div className="space-y-4">
                    <h3 className="text-[#1a1a1a] font-bold text-[15px] uppercase tracking-[1px] border-b border-gray-200 pb-2 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#e7701e] rounded-full inline-block" />
                      Pickup Date &amp; Time
                    </h3>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Pickup Date</label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Pickup Time</label>
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                        required
                      />
                    </div>
                  </div>

                  {/* Select Terminal */}
                  <div className="space-y-4">
                    <h3 className="text-[#1a1a1a] font-bold text-[15px] uppercase tracking-[1px] border-b border-gray-200 pb-2 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#e7701e] rounded-full inline-block" />
                      Select Terminal
                    </h3>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Terminal</label>
                      <select
                        value={terminal}
                        onChange={(e) => setTerminal(e.target.value)}
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] appearance-none"
                        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\"/></svg>')", backgroundPosition: "right 16px center", backgroundSize: "16px", backgroundRepeat: "no-repeat" }}
                      >
                        <option value="North Terminal">Gatwick Airport - North Terminal</option>
                        <option value="South Terminal">Gatwick Airport - South Terminal</option>
                      </select>
                    </div>
                  </div>

                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold text-[16px] py-4 uppercase tracking-[1px] transition-all duration-300 shadow-md cursor-pointer"
                  >
                    Get a Quote
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>
      )}

      {/* ================= STEP 2 CONTENT ================= */}
      {currentStep === 2 && (
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="border border-gray-200 bg-[#fcfbfa] p-8 md:p-12 shadow-md">
            <h3 className="text-[#1a1a1a] text-[22px] font-extrabold mb-6 font-sans">
              Choose Parking Option &amp; Add-ons
            </h3>

            {/* Parking Packages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Option 1: Meet & Greet */}
              <div
                onClick={() => setParkingOption("meet-greet")}
                className={`border-2 p-6 cursor-pointer bg-white transition-all duration-300 flex flex-col justify-between ${
                  parkingOption === "meet-greet" ? "border-[#e7701e] ring-2 ring-orange-100" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div>
                  <h4 className="text-[18px] font-bold text-[#1a1a1a] mb-2 flex items-center justify-between">
                    <span>Meet &amp; Greet Valet</span>
                    <input
                      type="radio"
                      checked={parkingOption === "meet-greet"}
                      onChange={() => setParkingOption("meet-greet")}
                      className="accent-[#e7701e]"
                    />
                  </h4>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                    Drive directly to the Gatwick Terminal, and a professional insured driver will park your vehicle. Premium, convenience focus.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                  <span className="text-[13px] text-gray-400 font-bold uppercase">Rate</span>
                  <span className="text-[24px] font-black text-[#e7701e]">£79.99</span>
                </div>
              </div>

              {/* Option 2: Park & Ride */}
              <div
                onClick={() => setParkingOption("park-ride")}
                className={`border-2 p-6 cursor-pointer bg-white transition-all duration-300 flex flex-col justify-between ${
                  parkingOption === "park-ride" ? "border-[#e7701e] ring-2 ring-orange-100" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div>
                  <h4 className="text-[18px] font-bold text-[#1a1a1a] mb-2 flex items-center justify-between">
                    <span>Premium Park &amp; Ride</span>
                    <input
                      type="radio"
                      checked={parkingOption === "park-ride"}
                      onChange={() => setParkingOption("park-ride")}
                      className="accent-[#e7701e]"
                    />
                  </h4>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                    Park at our secure compound near the airport and take our free shuttle bus directly to your terminal. Highly secure and budget-friendly.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                  <span className="text-[13px] text-gray-400 font-bold uppercase">Rate</span>
                  <span className="text-[24px] font-black text-[#e7701e]">£59.99</span>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <h4 className="text-[#1a1a1a] text-[16px] font-bold uppercase tracking-[1px] mb-4 border-b border-gray-200 pb-2">
              Optional Add-on Valeting Services
            </h4>
            <div className="space-y-4 mb-8">
              {/* Wash Add-on */}
              <label className="flex items-center justify-between bg-white border border-gray-200 p-4 cursor-pointer hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={addOnCarWash}
                    onChange={(e) => setAddOnCarWash(e.target.checked)}
                    className="w-5 h-5 accent-[#e7701e]"
                  />
                  <div>
                    <p className="text-[15px] font-bold text-[#1a1a1a]">Full Inside &amp; Outside Car Wash</p>
                    <p className="text-[13px] text-gray-400">Hand wash, dry, inside vacuum, dashboard shine</p>
                  </div>
                </div>
                <span className="text-[16px] font-black text-[#1a1a1a]">+$34.99</span>
              </label>

              {/* Charging Add-on */}
              <label className="flex items-center justify-between bg-white border border-gray-200 p-4 cursor-pointer hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={addOnEvCharge}
                    onChange={(e) => setAddOnEvCharge(e.target.checked)}
                    className="w-5 h-5 accent-[#e7701e]"
                  />
                  <div>
                    <p className="text-[15px] font-bold text-[#1a1a1a]">Electric Vehicle (EV) Fast Charging</p>
                    <p className="text-[13px] text-gray-400">Batteries topped up to 100% and ready at return terminal</p>
                  </div>
                </div>
                <span className="text-[16px] font-black text-[#1a1a1a]">+$20.00</span>
              </label>
            </div>

            {/* Price block and actions */}
            <div className="bg-[#002f5d] text-white p-6 mb-8 flex justify-between items-center">
              <div>
                <span className="text-orange-400 text-xs font-bold uppercase tracking-[1px]">Total Quote Estimate</span>
                <p className="text-[32px] font-black leading-none mt-1">£{totalPrice.toFixed(2)}</p>
              </div>
              <div className="text-right text-[13px] text-gray-300 max-w-[280px]">
                Estimates based on parking dates from {dropOffDate} ({dropOffTime}) to {pickupDate} ({pickupTime}).
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-200 hover:bg-gray-300 text-[#1a1a1a] font-bold px-8 py-3.5 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleStep2Submit}
                className="bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold px-10 py-3.5 transition-colors cursor-pointer"
              >
                Next Step
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= STEP 3 CONTENT ================= */}
      {currentStep === 3 && (
        <div className="max-w-[1000px] mx-auto px-4">
          <form onSubmit={handleStep3Submit} className="border border-gray-200 bg-[#fcfbfa] p-8 md:p-12 shadow-md">
            <h3 className="text-[#1a1a1a] text-[22px] font-extrabold mb-6 font-sans">
              Enter Personal &amp; Vehicle Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1.5 select-none">First Name *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1.5 select-none">Last Name *</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1.5 select-none">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1.5 select-none">Mobile Phone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1.5 select-none">Vehicle Registration No (VRN) *</label>
                <input
                  type="text"
                  value={vehicleReg}
                  onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                  placeholder="E.G. GJ71 REG"
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1.5 select-none">Vehicle Make/Model *</label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="E.G. Ford Fiesta Black"
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1.5 select-none">Return Flight Number (Optional)</label>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                  placeholder="E.G. EZY8123"
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="bg-gray-200 hover:bg-gray-300 text-[#1a1a1a] font-bold px-8 py-3.5 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold px-10 py-3.5 transition-colors cursor-pointer"
              >
                Next Step
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ================= STEP 4 CONTENT ================= */}
      {currentStep === 4 && (
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Summary */}
            <div className="lg:col-span-2 border border-gray-200 bg-[#fcfbfa] p-8 md:p-10 shadow-md">
              <h3 className="text-[#1a1a1a] text-[20px] font-extrabold mb-6 font-sans">
                Review Booking Details
              </h3>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Customer</span>
                  <span className="text-[14px] text-[#1a1a1a] font-extrabold">{firstName} {lastName}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Contact Phone</span>
                  <span className="text-[14px] text-[#1a1a1a] font-extrabold">{phone}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Email</span>
                  <span className="text-[14px] text-[#1a1a1a] font-extrabold">{email}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Drop Off Schedule</span>
                  <span className="text-[14px] text-[#1a1a1a] font-extrabold">{dropOffDate} at {dropOffTime}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Pickup Schedule</span>
                  <span className="text-[14px] text-[#1a1a1a] font-extrabold">{pickupDate} at {pickupTime}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Terminal</span>
                  <span className="text-[14px] text-[#e7701e] font-extrabold">{terminal}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Vehicle Details</span>
                  <span className="text-[14px] text-[#1a1a1a] font-extrabold">{vehicleModel} ({vehicleReg})</span>
                </div>
                {flightNumber && (
                  <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                    <span className="text-[14px] text-gray-500 font-bold uppercase">Return Flight</span>
                    <span className="text-[14px] text-[#1a1a1a] font-extrabold">{flightNumber}</span>
                  </div>
                )}
              </div>

              {/* Mock Payment */}
              <h4 className="text-[#1a1a1a] text-[16px] font-bold uppercase tracking-[1px] mb-4 border-b border-gray-200 pb-2">
                Mock Payment Card Processing
              </h4>
              <form onSubmit={handleStep4Submit} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1 select-none">Cardholder Name *</label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1 select-none">16-Digit Card Number *</label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1 select-none">Expiry Date *</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1 select-none">CVV Code *</label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="***"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="bg-gray-200 hover:bg-gray-300 text-[#1a1a1a] font-bold px-8 py-3.5 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold px-10 py-3.5 transition-colors cursor-pointer"
                  >
                    Confirm &amp; Pay
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Price Invoice Summary */}
            <div className="border border-gray-200 bg-[#fcfbfa] p-6 shadow-md space-y-4">
              <h3 className="text-[#1a1a1a] text-[16px] font-bold uppercase tracking-[1.5px] border-b border-gray-200 pb-2">
                Invoice Summary
              </h3>
              <div className="flex justify-between text-sm text-[#4a4a4a]">
                <span>Base Rate ({parkingOption === "meet-greet" ? "Meet & Greet" : "Park & Ride"})</span>
                <span className="font-bold">£{basePrice.toFixed(2)}</span>
              </div>
              {addOnCarWash && (
                <div className="flex justify-between text-sm text-[#4a4a4a]">
                  <span>Full Valet Car Wash</span>
                  <span className="font-bold">£{washPrice.toFixed(2)}</span>
                </div>
              )}
              {addOnEvCharge && (
                <div className="flex justify-between text-sm text-[#4a4a4a]">
                  <span>EV Charge Recharge</span>
                  <span className="font-bold">£{evPrice.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-[#1a1a1a]">
                <span className="text-[15px] font-bold">Total Amount Due</span>
                <span className="text-[28px] font-black text-[#e7701e]">£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 text-xs text-orange-800 leading-relaxed rounded-none">
                <strong>Booking Guarantee:</strong> Free cancellations up to 24 hours prior to departure time. Secure vehicle storage under constant 24/7 CCTV surveillance monitoring.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= STEP 5: BOOKING SUCCESS ================= */}
      {currentStep === 5 && (
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <div className="border border-gray-200 bg-[#fcfbfa] p-12 md:p-16 shadow-lg space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50 animate-pulse">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            
            <h2 className="text-[#1a1a1a] text-[28px] md:text-[34px] font-extrabold tracking-tight font-sans">
              Booking Complete!
            </h2>
            
            <p className="text-[#555555] text-[16px] leading-relaxed max-w-[600px] mx-auto">
              Thank you, <strong>{firstName}</strong>! Your airport parking reservation with Easy Parking Ltd has been registered successfully. A confirmation email with parking details and instructions has been sent to <strong>{email}</strong>.
            </p>

            <div className="bg-[#f0f4f8] border border-gray-200 p-6 max-w-[500px] mx-auto text-left space-y-2 text-sm text-[#4a4a4a]">
              <p><strong>Reservation Code:</strong> EP-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p><strong>Location:</strong> Gatwick Airport ({terminal})</p>
              <p><strong>Vehicle:</strong> {vehicleModel} (VRN: {vehicleReg})</p>
              <p><strong>Drop Off:</strong> {dropOffDate} at {dropOffTime}</p>
            </div>

            <div className="pt-6">
              <Link
                href="/"
                className="inline-block bg-black hover:bg-gray-800 text-white font-extrabold text-[15px] px-12 py-[14px] uppercase tracking-[1px] transition-all duration-300"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
