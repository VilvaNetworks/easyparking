"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

type Step = 1 | 2 | 3 | 4 | 5;

export default function CarParkBookingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse parameters from query string
  const initialDropOffDate = searchParams.get("dropOffDate") || "";
  const initialDropOffTime = searchParams.get("dropOffTime") || "";
  const initialPickupDate = searchParams.get("pickupDate") || "";
  const initialPickupTime = searchParams.get("pickupTime") || "";
  const rawTerminal = searchParams.get("terminal") || "North Terminal";
  const initialTerminal =
    rawTerminal === "17789"
      ? "North Terminal"
      : rawTerminal === "17790"
      ? "South Terminal"
      : rawTerminal;

  const initialServiceType = searchParams.get("serviceType") || "meet-and-greet";

  const [currentStep, setCurrentStep] = useState<Step>(2); // Start at Step 2 based on user screenshots

  // Step 1: Dates & Terminal
  const [dropOffDate, setDropOffDate] = useState(initialDropOffDate);
  const [dropOffTime, setDropOffTime] = useState(initialDropOffTime);
  const [pickupDate, setPickupDate] = useState(initialPickupDate);
  const [pickupTime, setPickupTime] = useState(initialPickupTime);
  const [terminal, setTerminal] = useState(initialTerminal);
  const [selectedServiceType, setSelectedServiceType] = useState(initialServiceType);

  // Step 2: Space Packages Selection
  const [parkingOption, setParkingOption] = useState<"standard" | "valet-car-wash">("valet-car-wash");

  // Step 3: Customer Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Billing Address
  const [billingAddress1, setBillingAddress1] = useState("");
  const [billingAddress2, setBillingAddress2] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingPostcode, setBillingPostcode] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingCountry, setBillingCountry] = useState("United Kingdom");

  // Flight Details
  const [depTerminal, setDepTerminal] = useState(initialTerminal);
  const [retTerminal, setRetTerminal] = useState(initialTerminal);
  const [flightNum, setFlightNum] = useState("");

  // Vehicle Details
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleReg, setVehicleReg] = useState("");

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "stripe" | "paypal">("paypal");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Step 4: Card details for processing
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [timeLeft, setTimeLeft] = useState(2000);
  const [isHovered, setIsHovered] = useState(false);
  const [createdRef, setCreatedRef] = useState("");

  // Pauseable timer logic for redirecting on Step 5 Success page
  useEffect(() => {
    if (currentStep === 5 && createdRef && !isHovered && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 10) {
            clearInterval(interval);
            router.push(`/bookings-details?ref=${createdRef}`);
            return 0;
          }
          return prev - 10;
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [currentStep, createdRef, isHovered, timeLeft, router]);

  const [serviceTypes, setServiceTypes] = useState<{ id?: number; name: string; slug: string }[]>([
    { name: "Meet & Greet", slug: "meet-and-greet" },
    { name: "Park & Ride", slug: "park-and-ride" }
  ]);

  // Fetch dynamic service types on mount
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get("/api/service-types");
        if (res.status === 200) {
          const result = res.data;
          if (result && Array.isArray(result.data) && result.data.length > 0) {
            setServiceTypes(result.data);
          }
        }
      } catch (err) {
        console.error("Error fetching service types:", err);
      }
    };
    fetchTypes();
  }, []);

  // Populate terminal fields on terminal state changes
  useEffect(() => {
    setDepTerminal(terminal);
    setRetTerminal(terminal);
  }, [terminal]);

  // Auto scroll to top of page when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Helper date formatter: converts YYYY-MM-DD to DD-MM-YYYY
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "15-06-2026"; // Fallback placeholder matching screenshots
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  const getDisplayTime = (timeStr: string, defaultTime: string) => {
    return timeStr || defaultTime;
  };

  // Days Calculation (minimum 1 day)
  const calculateDays = (date1Str: string, date2Str: string) => {
    if (!date1Str || !date2Str) return 1;
    const d1 = new Date(date1Str);
    const d2 = new Date(date2Str);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const bookingDays = calculateDays(dropOffDate, pickupDate);
  const spacePrice = parkingOption === "standard" ? 0.0 : 143.0;
  const totalPrice = spacePrice;

  const submitBooking = async () => {
    setIsSubmitting(true);
    setToastMessage(null);
    try {
      let tCode = "LGW-N";
      if (terminal.toLowerCase().includes("south") || terminal === "17790") {
        tCode = "LGW-S";
      }

      const serviceTypeSlug = parkingOption === "standard" ? "meet-and-greet" : "valet-car-wash";

      const dropOffAt = `${dropOffDate} ${dropOffTime.length === 5 ? dropOffTime + ":00" : dropOffTime}`;
      const pickupAt = `${pickupDate} ${pickupTime.length === 5 ? pickupTime + ":00" : pickupTime}`;

      const payload = {
        service_type: selectedServiceType,
        terminal_code: tCode,
        customer_name: `${firstName} ${lastName}`,
        customer_email: email,
        customer_phone: phone,
        vehicle_registration: vehicleReg,
        vehicle_make: vehicleMake || "Ford",
        vehicle_model: vehicleModel,
        vehicle_colour: vehicleColor || "Blue",
        dropoff_at: dropOffAt,
        pickup_at: pickupAt,
        notes: flightNum ? `Flight ${flightNum}, return terminal ${retTerminal}` : "No notes"
      };

      const response = await axios.post("/api/bookings", payload, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      const result = response.data;

      if (result && result.data && result.data.booking_reference) {
        const ref = result.data.booking_reference;
        setToastMessage({ type: 'success', text: `Booking created successfully! Reference: ${ref}` });
        setCreatedRef(ref);
        setTimeLeft(2000);
        setCurrentStep(5);
      } else {
        throw new Error(result?.message || "Booking reference not returned from server");
      }
    } catch (err: any) {
      console.error(err);
      setToastMessage({ type: 'error', text: err.message || "Something went wrong while creating booking. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Actions
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dropOffDate || !dropOffTime || !pickupDate || !pickupTime) {
      alert("Please specify drop-off and pickup dates and times.");
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Submit = () => {
    setCurrentStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill out required Customer Details.");
      return;
    }
    if (!vehicleReg || !vehicleModel) {
      alert("Please fill out required Vehicle Details.");
      return;
    }
    if (!agreeTerms) {
      alert("You must accept the terms & conditions and refund/cancel policy to proceed.");
      return;
    }

    submitBooking();
  };

  const handleStep4Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardHolder || !cardNumber || !cardExpiry || !cardCvv) {
      alert("Please fill out required payment details.");
      return;
    }
    submitBooking();
  };

  return (
    <div className="w-full font-sans text-[#2c3e50] bg-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-fade-in transition-all duration-300">
          <div className={`p-4 rounded shadow-2xl border text-white font-bold flex items-center gap-3 ${
            toastMessage.type === 'success' ? 'bg-[#2ec4b6] border-[#2ec4b6]' : 'bg-[#e71d36] border-[#e71d36]'
          }`} style={{ minWidth: '300px' }}>
            {toastMessage.type === 'success' ? (
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

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

      {/* ================= STEP INDICATOR BAR ================= */}
      {currentStep !== 5 && (
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
      )}

      {/* ================= 3. STEP 1: SELECT DATES FORM ================= */}
      {currentStep === 1 && (
        <div className="max-w-[800px] mx-auto px-4 py-8">
          <form onSubmit={handleStep1Submit} className="border border-gray-200 bg-[#fcfbfa] p-8 shadow-md rounded-lg space-y-6">
            <h2 className="text-[#1a1a1a] text-[22px] font-extrabold mb-4 font-sans">Select Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div>
                <label className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Service Type</label>
                <select
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value)}
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                >
                  {serviceTypes.map((st) => (
                    <option key={st.slug} value={st.slug}>{st.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Terminal</label>
                <select
                  value={terminal}
                  onChange={(e) => setTerminal(e.target.value)}
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                >
                  <option value="North Terminal">Gatwick Airport - North Terminal</option>
                  <option value="South Terminal">Gatwick Airport - South Terminal</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold text-[16px] py-4 uppercase tracking-[1px] transition-all duration-300 cursor-pointer"
            >
              Get a Quote
            </button>
          </form>
        </div>
      )}

      {/* ================= 4. STEP 2 & 3 SIDEBAR LAYOUT ================= */}
      {(currentStep === 2 || currentStep === 3) && (
        <div className="max-w-[1320px] mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* ── LEFT COLUMN: BOOKING DATES SIDEBAR ── */}
            <div className="lg:col-span-1 border border-gray-200 bg-white p-5 shadow-sm rounded-[4px] lg:sticky lg:top-[170px]">
              <h3 className="text-[#004280] font-bold text-[16px] border-b border-gray-100 pb-3 mb-4 font-sans">
                Booking Dates
              </h3>
              
              {/* Entry Date Box */}
              <div className="bg-[#002f5d] text-white p-4 rounded-[4px] mb-4 text-center">
                <div className="text-[12px] uppercase font-bold tracking-[0.5px] opacity-75">Entry date</div>
                <div className="text-[15px] font-black mt-1">
                  {formatDate(dropOffDate)}, {getDisplayTime(dropOffTime, "6:00")}
                </div>
              </div>

              {/* Exit Date Box */}
              <div className="border border-[#e7701e] bg-white text-[#002f5d] p-4 rounded-[4px] mb-6 text-center">
                <div className="text-[12px] uppercase font-bold tracking-[0.5px] text-[#e7701e]">Exit date</div>
                <div className="text-[15px] font-black mt-1">
                  {formatDate(pickupDate)}, {getDisplayTime(pickupTime, "7:15")}
                </div>
              </div>

              {/* Booking Period */}
              <div className="mb-6">
                <div className="text-gray-400 text-[12px] uppercase font-bold tracking-[0.5px]">Booking period</div>
                <div className="text-[15px] text-[#1a1a1a] font-extrabold mt-1">{bookingDays} days</div>
              </div>

              {/* Order Summary / Total */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-gray-400 text-[12px] uppercase font-bold tracking-[0.5px] mb-3">Order summary</h4>
                
                {currentStep === 3 && (
                  <div className="flex justify-between items-center text-sm text-[#4a4a4a] mb-2 font-bold">
                    <span>Space</span>
                    <span>£{spacePrice.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-end border-t border-dashed border-gray-200 pt-3">
                  <span className="text-[#004280] text-[15px] font-extrabold uppercase">Total</span>
                  <span className="text-[22px] font-black text-[#004280]">£{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: MAIN CONTENT AREA ── */}
            <div className="lg:col-span-3">
              
              {/* ================= STEP 2: PARKING SPACE SELECTION ================= */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-[#002f5d] text-[24px] font-extrabold tracking-tight">Parking Space</h2>
                    <p className="text-gray-400 text-[14px] mt-1 font-bold">2 Results Found</p>
                  </div>

                  {/* PACKAGE 1: STANDARD */}
                  <div
                    onClick={() => setParkingOption("standard")}
                    className={`border border-gray-200 bg-[#f9fcff] rounded-[8px] overflow-hidden flex flex-col md:flex-row hover:border-[#e7701e] transition-all duration-300 cursor-pointer ${
                      parkingOption === "standard" ? "ring-2 ring-[#e7701e] border-transparent" : ""
                    }`}
                  >
                    {/* Logo area */}
                    <div className="md:w-[220px] bg-white p-5 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center shrink-0">
                      <div className="border border-gray-200 rounded-[10px] bg-white p-4 shadow-sm w-full flex flex-col items-center">
                        <div className="relative w-full h-[60px]">
                          <Image src="/images/logo.png" fill sizes="150px" className="object-contain" alt="Easy Parking Logo" />
                        </div>
                        <div className="w-full bg-[#1e2a53] text-white text-[11px] py-1 mt-3 text-center uppercase tracking-[0.5px] font-bold rounded-[3px]">
                          Meet &amp; Greet
                        </div>
                      </div>
                    </div>

                    {/* Middle details */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[#002f5d] text-[20px] font-black tracking-tight">Standard</h3>
                        <p className="text-gray-400 text-[12px] font-bold mt-1 uppercase tracking-[0.5px]">
                          Gatwick Airport - {terminal} <span className="text-[#e7701e] lowercase font-normal ml-2 underline cursor-pointer">More details</span>
                        </p>
                        
                        <ul className="mt-5 space-y-2.5">
                          {[
                            "Meet our uniformed team directly at the terminal",
                            "Direct access to the terminal",
                            "Hassle free handover",
                            "24/7 cctv monitored parking facility",
                            "Easy changes up to 48hrs before departure",
                            "Airport charges included",
                          ].map((feat, fidx) => (
                            <li key={fidx} className="flex items-start gap-2.5 text-[13px] text-[#555555]">
                              <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Price/Select box */}
                    <div className="md:w-[180px] p-6 bg-white flex flex-col justify-between items-center md:items-end md:text-right shrink-0 border-t md:border-t-0 md:border-l border-gray-100">
                      <div className="text-[28px] font-black text-[#002f5d]">£0.00</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setParkingOption("standard");
                        }}
                        className={`w-full font-extrabold text-[14px] uppercase py-2.5 rounded-[4px] mt-6 tracking-[0.5px] transition-all cursor-pointer ${
                          parkingOption === "standard"
                            ? "bg-[#e7701e] text-white shadow-md"
                            : "bg-gray-150 text-[#2c3e50] hover:bg-gray-200"
                        }`}
                      >
                        Select
                      </button>
                    </div>
                  </div>

                  {/* PACKAGE 2: VALET CAR WASH */}
                  <div
                    onClick={() => setParkingOption("valet-car-wash")}
                    className={`border border-gray-200 bg-[#f9fcff] rounded-[8px] overflow-hidden flex flex-col md:flex-row hover:border-[#e7701e] transition-all duration-300 cursor-pointer ${
                      parkingOption === "valet-car-wash" ? "ring-2 ring-[#e7701e] border-transparent" : ""
                    }`}
                  >
                    {/* Logo area */}
                    <div className="md:w-[220px] bg-white p-5 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center shrink-0">
                      <div className="border border-gray-200 rounded-[10px] bg-white p-4 shadow-sm w-full flex flex-col items-center">
                        <div className="relative w-full h-[60px]">
                          <Image src="/images/logo.png" fill sizes="150px" className="object-contain" alt="Easy Parking Logo" />
                        </div>
                        <div className="w-full bg-[#1e2a53] text-white text-[11px] py-1 mt-3 text-center uppercase tracking-[0.5px] font-bold rounded-[3px]">
                          Meet &amp; Greet
                        </div>
                      </div>
                    </div>

                    {/* Middle details */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[#002f5d] text-[20px] font-black tracking-tight">Valet Car Wash</h3>
                        <p className="text-gray-400 text-[12px] font-bold mt-1 uppercase tracking-[0.5px]">
                          Gatwick Airport - {terminal} <span className="text-[#e7701e] lowercase font-normal ml-2 underline cursor-pointer">More details</span>
                        </p>
                        
                        <p className="mt-4 text-[#002f5d] font-extrabold text-[14px]">Enjoy premium quality valet servicing</p>

                        <ul className="mt-4 space-y-2.5">
                          {[
                            "Complete vehicle care, including a full professional clean both on the inside and outside.",
                            "Direct access to the terminal",
                            "Quick and Seamless handover",
                            "24/7 cctv monitored parking facility",
                            "Easy changes up to 48hrs before departure",
                            "Airport charges included",
                          ].map((feat, fidx) => (
                            <li key={fidx} className="flex items-start gap-2.5 text-[13px] text-[#555555]">
                              <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Price/Select box */}
                    <div className="md:w-[180px] p-6 bg-white flex flex-col justify-between items-center md:items-end md:text-right shrink-0 border-t md:border-t-0 md:border-l border-gray-100">
                      <div className="text-[28px] font-black text-[#002f5d]">£143.00</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setParkingOption("valet-car-wash");
                        }}
                        className={`w-full font-extrabold text-[14px] uppercase py-2.5 rounded-[4px] mt-6 tracking-[0.5px] transition-all cursor-pointer ${
                          parkingOption === "valet-car-wash"
                            ? "bg-[#e7701e] text-white shadow-md"
                            : "bg-gray-155 text-[#2c3e50] hover:bg-gray-200"
                        }`}
                      >
                        Select
                      </button>
                    </div>
                  </div>

                  {/* Actions buttons bottom of Step 2 */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-8 mt-12">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="bg-[#f0f4f8] hover:bg-gray-200 text-[#004280] font-extrabold text-[14px] uppercase px-8 py-3.5 rounded-[4px] inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      Select Dates
                    </button>
                    <button
                      onClick={handleStep2Submit}
                      className="bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold text-[14px] uppercase px-8 py-3.5 rounded-[4px] inline-flex items-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      Customer Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 3: CUSTOMER DETAILS CHECKOUT FORM ================= */}
              {currentStep === 3 && (
                <form onSubmit={handleStep3Submit} className="space-y-10">
                  
                  {/* Category Header */}
                  <div>
                    <h2 className="text-[#002f5d] text-[24px] font-extrabold tracking-tight">Customer Details</h2>
                  </div>

                  {/* SECTION 1: Personal info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 border border-gray-150 rounded-[4px]">
                    <div>
                      <label className="block text-[13px] font-bold text-gray-500 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-500 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-500 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-500 mb-1">Mobile Phone *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile Phone"
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        required
                      />
                    </div>
                  </div>

                  {/* SECTION 2: Billing Address */}
                  <div className="space-y-6 bg-white p-6 border border-gray-150 rounded-[4px]">
                    <h3 className="text-[#002f5d] font-bold text-[16px] border-b border-gray-100 pb-2 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#e7701e] inline-block" />
                      Billing Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Address Line 1 *</label>
                        <input
                          type="text"
                          value={billingAddress1}
                          onChange={(e) => setBillingAddress1(e.target.value)}
                          placeholder="Street address line 1"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Address Line 2</label>
                        <input
                          type="text"
                          value={billingAddress2}
                          onChange={(e) => setBillingAddress2(e.target.value)}
                          placeholder="Apartment, suite, unit etc. (optional)"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Town / City *</label>
                        <input
                          type="text"
                          value={billingCity}
                          onChange={(e) => setBillingCity(e.target.value)}
                          placeholder="City"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Postcode *</label>
                        <input
                          type="text"
                          value={billingPostcode}
                          onChange={(e) => setBillingPostcode(e.target.value)}
                          placeholder="Postcode"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">State / Province</label>
                        <input
                          type="text"
                          value={billingState}
                          onChange={(e) => setBillingState(e.target.value)}
                          placeholder="State"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Country *</label>
                        <select
                          value={billingCountry}
                          onChange={(e) => setBillingCountry(e.target.value)}
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px] appearance-none"
                          style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\"/></svg>')", backgroundPosition: "right 16px center", backgroundSize: "16px", backgroundRepeat: "no-repeat" }}
                        >
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="United States">United States</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: Flight Details */}
                  <div className="space-y-6 bg-white p-6 border border-gray-150 rounded-[4px]">
                    <h3 className="text-[#002f5d] font-bold text-[16px] border-b border-gray-100 pb-2 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#e7701e] inline-block" />
                      Flight details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Departure Terminal *</label>
                        <select
                          value={depTerminal}
                          onChange={(e) => setDepTerminal(e.target.value)}
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        >
                          <option value="North Terminal">Gatwick Airport - North Terminal</option>
                          <option value="South Terminal">Gatwick Airport - South Terminal</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Return Terminal *</label>
                        <select
                          value={retTerminal}
                          onChange={(e) => setRetTerminal(e.target.value)}
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        >
                          <option value="North Terminal">Gatwick Airport - North Terminal</option>
                          <option value="South Terminal">Gatwick Airport - South Terminal</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Return Flight Number</label>
                        <input
                          type="text"
                          value={flightNum}
                          onChange={(e) => setFlightNum(e.target.value.toUpperCase())}
                          placeholder="e.g. EZY8123"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: Vehicle Details */}
                  <div className="space-y-6 bg-white p-6 border border-gray-150 rounded-[4px]">
                    <h3 className="text-[#002f5d] font-bold text-[16px] border-b border-gray-100 pb-2 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#e7701e] inline-block" />
                      Vehicle details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Vehicle Make *</label>
                        <input
                          type="text"
                          value={vehicleMake}
                          onChange={(e) => setVehicleMake(e.target.value)}
                          placeholder="e.g. Ford, BMW"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Vehicle Model *</label>
                        <input
                          type="text"
                          value={vehicleModel}
                          onChange={(e) => setVehicleModel(e.target.value)}
                          placeholder="e.g. Fiesta, 3 Series"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Vehicle Color *</label>
                        <input
                          type="text"
                          value={vehicleColor}
                          onChange={(e) => setVehicleColor(e.target.value)}
                          placeholder="e.g. Black, Silver"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-500 mb-1">Vehicle Registration No *</label>
                        <input
                          type="text"
                          value={vehicleReg}
                          onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                          placeholder="e.g. GJ71 REG"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: Payment Method */}
                  <div className="space-y-6 bg-white p-6 border border-gray-150 rounded-[4px]">
                    <h3 className="text-[#002f5d] font-bold text-[16px] border-b border-gray-100 pb-2 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#e7701e] inline-block" />
                      Payment Method
                    </h3>
                    <div className="space-y-4">
                      {[
                        { id: "cash", label: "Cash" },
                        { id: "stripe", label: "Stripe" },
                        { id: "paypal", label: "PayPal" },
                      ].map((pay) => {
                        const isChecked = paymentMethod === pay.id;
                        return (
                          <label
                            key={pay.id}
                            onClick={() => setPaymentMethod(pay.id as "cash" | "stripe" | "paypal")}
                            className={`flex items-center justify-between border rounded-[4px] p-4 cursor-pointer hover:border-gray-300 transition-colors ${
                              isChecked ? "border-[#e7701e] bg-orange-50/10" : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="payment_method"
                                checked={isChecked}
                                onChange={() => setPaymentMethod(pay.id as "cash" | "stripe" | "paypal")}
                                className="w-4 h-4 accent-[#e7701e] cursor-pointer"
                              />
                              <span className="text-sm font-bold text-[#1a1a1a]">{pay.label}</span>
                            </div>
                            {isChecked && (
                              <svg className="w-5 h-5 text-[#e7701e]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* SECTION 6: Agreements */}
                  <div className="space-y-6 bg-white p-6 border border-gray-150 rounded-[4px]">
                    <h3 className="text-[#002f5d] font-bold text-[16px] border-b border-gray-100 pb-2 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#e7701e] inline-block" />
                      Agreements
                    </h3>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-5 h-5 accent-[#e7701e] mt-0.5 shrink-0"
                        required
                      />
                      <span className="text-[13px] text-[#555555] leading-relaxed">
                        I accept the terms &amp; conditions and refund/cancel policy.
                      </span>
                    </label>
                  </div>

                  {/* Action buttons bottom of Step 3 */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-8 mt-12">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="bg-[#f0f4f8] hover:bg-gray-200 text-[#004280] font-extrabold text-[14px] uppercase px-8 py-3.5 rounded-[4px] inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      Parking Space
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold text-[14px] uppercase px-8 py-3.5 rounded-[4px] inline-flex items-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing..." : "Confirm Booking"}
                      {!isSubmitting && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ================= 5. STEP 4: PAYMENT PROCESSING ================= */}
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
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Billing Address</span>
                  <span className="text-[14px] text-[#1a1a1a] font-extrabold">
                    {billingAddress1}
                    {billingAddress2 ? `, ${billingAddress2}` : ""}
                    {`, ${billingCity}`}
                    {billingState ? `, ${billingState}` : ""}
                    {`, ${billingPostcode}`}
                    {`, ${billingCountry}`}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Drop Off Schedule</span>
                  <span className="text-[14px] text-[#1a1a1a] font-extrabold">{formatDate(dropOffDate)} at {dropOffTime}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Pickup Schedule</span>
                  <span className="text-[14px] text-[#1a1a1a] font-extrabold">{formatDate(pickupDate)} at {pickupTime}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Departure Terminal</span>
                  <span className="text-[14px] text-[#e7701e] font-extrabold">{depTerminal}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Return Terminal</span>
                  <span className="text-[14px] text-[#e7701e] font-extrabold">{retTerminal}</span>
                </div>
                {flightNum && (
                  <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                    <span className="text-[14px] text-gray-500 font-bold uppercase">Return Flight Number</span>
                    <span className="text-[14px] text-[#1a1a1a] font-extrabold">{flightNum}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Vehicle Details</span>
                  <span className="text-[14px] text-[#1a1a1a] font-extrabold">
                    {vehicleMake} {vehicleModel} {vehicleColor ? `(${vehicleColor})` : ""} - {vehicleReg}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-3">
                  <span className="text-[14px] text-gray-500 font-bold uppercase">Payment Method</span>
                  <span className="text-[14px] text-[#1a1a1a] font-extrabold uppercase">{paymentMethod}</span>
                </div>
              </div>

              {/* Mock Payment Form */}
              <h4 className="text-[#1a1a1a] text-[16px] font-bold uppercase tracking-[1px] mb-4 border-b border-gray-200 pb-2">
                Mock Payment Card Processing ({paymentMethod.toUpperCase()})
              </h4>
              <form onSubmit={handleStep4Submit} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#1a1a1a] mb-1 select-none">Cardholder Name *</label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
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
                    className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
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
                      className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
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
                      className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="bg-gray-200 hover:bg-gray-300 text-[#1a1a1a] font-bold px-8 py-3.5 transition-colors cursor-pointer rounded-[4px]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold px-10 py-3.5 transition-colors cursor-pointer rounded-[4px] disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : "Confirm & Pay"}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Invoice Summary */}
            <div className="border border-gray-200 bg-[#fcfbfa] p-6 shadow-md space-y-4 rounded-[4px] lg:sticky lg:top-[170px]">
              <h3 className="text-[#1a1a1a] text-[16px] font-bold uppercase tracking-[1.5px] border-b border-gray-200 pb-2">
                Invoice Summary
              </h3>
              <div className="flex justify-between text-sm text-[#4a4a4a]">
                <span>Base Rate ({parkingOption === "standard" ? "Standard" : "Valet Car Wash"})</span>
                <span className="font-bold">£{spacePrice.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-[#1a1a1a]">
                <span className="text-[15px] font-bold">Total Amount Due</span>
                <span className="text-[28px] font-black text-[#e7701e]">£{totalPrice.toFixed(2)}</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= 6. STEP 5: SUCCESS CONFIRMATION ================= */}
      {currentStep === 5 && (
        <div className="max-w-[800px] mx-auto px-4 text-center py-12">
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative border border-gray-200 bg-[#fcfbfa] p-12 shadow-lg space-y-6 rounded-[8px] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-orange-200"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50 animate-pulse">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            
            <h2 className="text-[#1a1a1a] text-[28px] font-extrabold tracking-tight font-sans">
              Booking Complete!
            </h2>
            
            <p className="text-[#555555] text-[16px] leading-relaxed max-w-[600px] mx-auto">
              Thank you, <strong>{firstName}</strong>! Your airport parking reservation with Easy Parking Ltd has been registered successfully. You will be redirected to your booking details in a moment.
            </p>

            <div className="bg-[#f0f4f8] border border-gray-200 p-6 max-w-[500px] mx-auto text-left space-y-2 text-sm text-[#4a4a4a] rounded-[4px]">
              <p><strong>Reservation Code:</strong> {createdRef}</p>
              <p><strong>Location:</strong> Gatwick Airport ({terminal})</p>
              <p><strong>Vehicle:</strong> {vehicleMake} {vehicleModel} (VRN: {vehicleReg})</p>
              <p><strong>Drop Off Date:</strong> {formatDate(dropOffDate)} at {dropOffTime}</p>
            </div>

            {/* <div className="text-xs text-gray-400 italic">
              {isHovered ? "Timer paused. Move mouse away to resume redirection." : `Redirecting in ${(timeLeft / 1000).toFixed(1)}s...`}
            </div> */}

            {/* Visual running countdown line */}
            <div className="absolute bottom-0 left-0 w-full bg-gray-200 h-2">
              <div 
                className="bg-[#e7701e] h-full transition-all duration-100 ease-linear"
                style={{ width: `${(timeLeft / 2000) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
