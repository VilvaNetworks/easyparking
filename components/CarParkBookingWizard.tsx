"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import TimeDropdown from "./TimeDropdown";
import SelectDropdown from "./SelectDropdown";

const MoreDetailsModal = dynamic(() => import("./MoreDetailsModal"));

type Step = 1 | 2 | 3 | 4;

// The proxy route wraps the backend's ApiResponse error shape one level
// deeper (`{ error: true, message: <backend body> }`), so a validation
// failure surfaces at err.response.data.message.message — unwrap both
// levels before falling back to a generic message. Shared across every API
// call in this wizard (pricing, booking creation, checkout), not just
// payment — previously only checkout used this, so a pricing or
// booking-creation validation failure either failed silently or showed
// Axios's generic "Request failed with status code 422" instead of the
// actual reason, which was only ever visible via DevTools.
const getApiErrorMessage = (err: unknown, fallback: string): string => {
  if (axios.isAxiosError(err)) {
    const payload = err.response?.data as { message?: unknown } | undefined;
    const inner = payload?.message;

    if (typeof inner === "string") {
      return inner;
    }

    if (inner && typeof inner === "object" && "message" in inner) {
      const nested = (inner as { message?: unknown }).message;
      if (typeof nested === "string") {
        return nested;
      }
    }

    return err.message || fallback;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return fallback;
};

// Strip characters as the customer types, rather than only rejecting on
// submit — matches the backend's own validation regex in
// Api/V1/BookingController.php exactly, so nothing that passes here can
// still be rejected by the server for a different reason.
const filterName = (value: string): string => value.replace(/[^\p{L}\s.'-]/gu, "");
const filterPhone = (value: string): string => value.replace(/[^0-9+\-\s()]/g, "");
const filterMakeModel = (value: string): string => value.replace(/[^\p{L}0-9\s.'-]/gu, "");
const filterReg = (value: string): string => value.replace(/[^A-Za-z0-9\s]/g, "");
// Billing address fields aren't sent to the backend at all (display/UX only,
// see the booking payload below) so there's no server-side rule to mirror —
// this just needs to allow normal address punctuation (house numbers, "#",
// "/", commas) while still blocking stray symbol strings.
const filterAddress = (value: string): string => value.replace(/[^\p{L}0-9\s,.'\-#/]/gu, "");

// Minor units (pence) -> display string, matching bookings-details/page.tsx.
const formatAmount = (amount: number, currency: string): string => {
  const value = amount / 100;
  return value.toLocaleString("en-GB", {
    style: "currency",
    currency: currency || "GBP",
  });
};

// Renders admin-authored rich text (service type / add-on descriptions).
// Tailwind's preflight strips default browser list styling, so bullet/
// numbered lists need it explicitly re-added here.
const RICH_TEXT_CLASSES =
  "[&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline " +
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1";

export default function CarParkBookingWizard() {
  const searchParams = useSearchParams();

  // Parse parameters from query string
  const initialDropOffDate = searchParams.get("dropOffDate") || "";
  const initialDropOffTime = searchParams.get("dropOffTime") || "";
  const initialPickupDate = searchParams.get("pickupDate") || "";
  const initialPickupTime = searchParams.get("pickupTime") || "";
  const rawTerminal = searchParams.get("terminal") || "LGW-N";
  // Old WordPress-era links (or the homepage widget before it fetched real
  // terminals) may still carry these legacy post-ID-style values — map them
  // to the real terminal codes rather than passing them through unresolved.
  const initialTerminal =
    rawTerminal === "17789"
      ? "LGW-N"
      : rawTerminal === "17790"
      ? "LGW-S"
      : rawTerminal;

  const initialServiceType = searchParams.get("serviceType") || "meet-and-greet";

  // A stale/direct link (or a page left open across midnight) can carry a
  // drop-off date that's already in the past — the backend would reject it
  // at final submission with a raw 422. Catch it here instead, before the
  // customer ever lands on Step 2, so it surfaces on the date-selection step.
  const hasValidInitialDates = (() => {
    if (!initialDropOffDate || !initialDropOffTime || !initialPickupDate || !initialPickupTime) {
      return false;
    }
    const dropOff = new Date(`${initialDropOffDate}T${initialDropOffTime}`);
    const pickup = new Date(`${initialPickupDate}T${initialPickupTime}`);
    return dropOff.getTime() > Date.now() && pickup.getTime() > dropOff.getTime();
  })();

  // Start at Step 2 based on user screenshots — but only when the dates
  // carried in via query params are actually still valid.
  const [currentStep, setCurrentStep] = useState<Step>(hasValidInitialDates ? 2 : 1);

  // Step 1: Dates & Terminal
  const [dropOffDate, setDropOffDate] = useState(initialDropOffDate);
  const [dropOffTime, setDropOffTime] = useState(initialDropOffTime);
  const [pickupDate, setPickupDate] = useState(initialPickupDate);
  const [pickupTime, setPickupTime] = useState(initialPickupTime);
  const [terminal, setTerminal] = useState(initialTerminal);
  const [selectedServiceType, setSelectedServiceType] = useState(initialServiceType);
  const [dateError, setDateError] = useState("");
  const todayISO = new Date().toISOString().split("T")[0];
  const [moreDetailsFor, setMoreDetailsFor] = useState<{ title: string; html?: string | null } | null>(null);

  // Step 2: Space Packages Selection — the card picked here IS the real
  // service type (selectedServiceType), kept in sync with Step 1's dropdown.
  // Real per-card prices are fetched fresh from the backend's pricing quote
  // endpoint whenever the selected dates or service type list change.
  const [servicePrices, setServicePrices] = useState<Record<string, { total: number; currency: string } | null>>({});
  const [pricesLoading, setPricesLoading] = useState(false);

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

  const [agreeTerms, setAgreeTerms] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [createdRef, setCreatedRef] = useState("");

  // Real server-calculated total from the /api/bookings response — the
  // payment redirect step (Step 4) must display this, never spacePrice/totalPrice.
  const [bookingAmount, setBookingAmount] = useState<number | null>(null);
  const [bookingCurrency, setBookingCurrency] = useState("GBP");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Guards the automatic checkout call so it only fires once per booking
  // (e.g. against React Strict Mode's dev-time double effect invocation).
  // A retry after failure always goes through the explicit button below,
  // which calls startCheckout() directly and bypasses this guard.
  const checkoutStartedRef = useRef(false);

  // Guards the pricing-quote effect below so it waits for the real
  // service-types fetch to settle instead of firing once for the hardcoded
  // placeholder list and again for the real data (a duplicate /api/pricing
  // waterfall back-to-back on every page load). Real state (not a ref) so
  // settling on the fallback path (fetch failed, placeholder stays as-is)
  // still triggers the pricing effect once.
  const [serviceTypesReady, setServiceTypesReady] = useState(false);

  const [serviceTypes, setServiceTypes] = useState<{
    id?: number;
    name: string;
    slug: string;
    description?: string | null;
    more_details?: string | null;
    add_ons?: { id: number; name: string; description?: string | null; more_details?: string | null; price: number; currency: string }[];
  }[]>([
    { name: "Meet & Greet", slug: "meet-and-greet" },
    { name: "Park & Ride", slug: "park-and-ride" }
  ]);

  // Optional extras (e.g. valeting, car wash) for whichever service type is
  // selected — flat one-time fees, added on top of the base parking price.
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<number[]>([]);

  // Selecting a different service type invalidates any previously chosen
  // add-ons (they belong to the old service type's list).
  useEffect(() => {
    setSelectedAddOnIds([]);
  }, [selectedServiceType]);

  const [terminals, setTerminals] = useState<{ id?: number; name: string; code: string }[]>([
    { name: "Gatwick Airport – North Terminal", code: "LGW-N" },
    { name: "Gatwick Airport – South Terminal", code: "LGW-S" }
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
      } finally {
        setServiceTypesReady(true);
      }
    };
    fetchTypes();
  }, []);

  // Fetch dynamic terminals on mount — the select options and the code sent
  // in the booking payload must both reflect what's actually active server-side.
  useEffect(() => {
    const fetchTerminals = async () => {
      try {
        const res = await axios.get("/api/terminals");
        if (res.status === 200) {
          const result = res.data;
          if (result && Array.isArray(result.data) && result.data.length > 0) {
            setTerminals(result.data);
          }
        }
      } catch (err) {
        console.error("Error fetching terminals:", err);
      }
    };
    fetchTerminals();
  }, []);

  // Fetch a real, server-computed price quote per service type whenever the
  // selected dates (or the service type list) change — Step 2 must show a
  // live PricingDefault/PricingCalendar-backed total, not a guessed number.
  useEffect(() => {
    if (!dropOffDate || !pickupDate || serviceTypes.length === 0 || !serviceTypesReady) return;

    let cancelled = false;
    setPricesLoading(true);

    const fetchPrices = async () => {
      let firstError: unknown = null;
      const entries = await Promise.all(
        serviceTypes.map(async (st) => {
          try {
            const res = await axios.get("/api/pricing", {
              params: { service_type: st.slug, dropoff: dropOffDate, pickup: pickupDate },
            });
            const data = res.data?.data;
            return [st.slug, data ? { total: data.total, currency: data.currency } : null] as const;
          } catch (err) {
            console.error(`Error fetching price for ${st.slug}:`, err);
            firstError = firstError ?? err;
            return [st.slug, null] as const;
          }
        })
      );

      if (!cancelled) {
        setServicePrices(Object.fromEntries(entries));
        setPricesLoading(false);
        if (firstError) {
          setToastMessage({
            type: 'error',
            text: getApiErrorMessage(firstError, "Could not load pricing for one or more services. Please check your dates and try again."),
          });
        }
      }
    };

    fetchPrices();

    return () => {
      cancelled = true;
    };
  }, [serviceTypes, dropOffDate, pickupDate, serviceTypesReady]);

  // Populate terminal fields on terminal state changes
  useEffect(() => {
    setDepTerminal(terminal);
    setRetTerminal(terminal);
  }, [terminal]);

  // Auto scroll to top of page when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Toasts had no auto-dismiss at all — they only cleared when the next
  // action happened to overwrite them, so they could sit on screen
  // indefinitely (e.g. the invalid-dates notice below, which has no
  // natural follow-up action until Step 4).
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // If the customer arrived here with dates from the homepage widget (or a
  // stale link) that have since passed, explain why they landed on Step 1
  // instead of silently dropping them there with no context.
  useEffect(() => {
    const cameWithDates = initialDropOffDate && initialDropOffTime && initialPickupDate && initialPickupTime;
    if (cameWithDates && !hasValidInitialDates) {
      setToastMessage({
        type: "error",
        text: "Your selected date has passed — please choose new dates.",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Resolves a terminal code (e.g. "LGW-N") to its real display name from
  // the fetched terminals list, falling back to the raw code if not found.
  const terminalName = (code: string) => terminals.find((t) => t.code === code)?.name || code;

  // Inclusive of both the drop-off AND pick-up calendar dates, matching
  // PricingCalculator.php on the backend — a parking space is occupied on
  // both of those dates, so 22nd -> 30th is 9 days (22,23,...,30), not the
  // 8 "nights" a hotel would count between check-in/check-out. The +1 also
  // guarantees at least 1 day for a same-day booking.
  const calculateDays = (date1Str: string, date2Str: string) => {
    if (!date1Str || !date2Str) return 1;
    const d1 = new Date(date1Str);
    const d2 = new Date(date2Str);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const bookingDays = calculateDays(dropOffDate, pickupDate);
  const selectedQuote = servicePrices[selectedServiceType];
  const spacePrice = selectedQuote ? selectedQuote.total / 100 : 0;

  // Step 2 confirms whatever service type was already chosen (homepage
  // widget or Step 1's dropdown) — it doesn't offer a switcher. Falls back
  // to showing every active type only if the selection doesn't match any
  // real service type (e.g. a stale/invalid slug in the URL).
  const matchingServiceTypes = serviceTypes.filter((st) => st.slug === selectedServiceType);
  const stepTwoServiceTypes = matchingServiceTypes.length > 0 ? matchingServiceTypes : serviceTypes;

  // Add-ons are flat one-time fees (not multiplied by nights) tied to
  // whichever service type is currently selected.
  const availableAddOns = serviceTypes.find((st) => st.slug === selectedServiceType)?.add_ons ?? [];
  const selectedAddOns = availableAddOns.filter((a) => selectedAddOnIds.includes(a.id));
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0) / 100;
  const totalPrice = spacePrice + addOnsTotal;

  const toggleAddOn = (id: number) => {
    setSelectedAddOnIds((prev) => (prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]));
  };

  const submitBooking = async () => {
    setIsSubmitting(true);
    setToastMessage(null);
    try {
      const dropOffAt = `${dropOffDate} ${dropOffTime.length === 5 ? dropOffTime + ":00" : dropOffTime}`;
      const pickupAt = `${pickupDate} ${pickupTime.length === 5 ? pickupTime + ":00" : pickupTime}`;

      const payload = {
        service_type: selectedServiceType,
        terminal_code: terminal,
        customer_name: `${firstName} ${lastName}`,
        customer_email: email,
        customer_phone: phone,
        vehicle_registration: vehicleReg,
        vehicle_make: vehicleMake || "Ford",
        vehicle_model: vehicleModel,
        vehicle_colour: vehicleColor || "Blue",
        dropoff_at: dropOffAt,
        pickup_at: pickupAt,
        notes: flightNum ? `Flight ${flightNum}, return terminal ${terminalName(retTerminal)}` : "No notes",
        add_on_ids: selectedAddOnIds,
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
        setBookingAmount(typeof result.data.amount === "number" ? result.data.amount : null);
        setBookingCurrency(result.data.currency || "GBP");
        setCurrentStep(4);
      } else {
        throw new Error(result?.message || "Booking reference not returned from server");
      }
    } catch (err) {
      console.error(err);
      setToastMessage({ type: 'error', text: getApiErrorMessage(err, "Something went wrong while creating booking. Please try again.") });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Creates a Worldpay hosted-payment-page session for the already-created
  // booking and redirects the browser to it. The booking itself is never
  // recreated here — retries just re-request a checkout session for the
  // same booking_reference, which is what makes retrying safe.
  const startCheckout = useCallback(async () => {
    setCheckoutError(null);
    try {
      const response = await axios.post("/api/payments/checkout", { booking_reference: createdRef }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      const redirectUrl = response.data?.data?.redirect_url;

      if (!redirectUrl) {
        throw new Error("Payment provider did not return a redirect URL.");
      }

      window.location.href = redirectUrl;
    } catch (err) {
      console.error(err);
      setCheckoutError(getApiErrorMessage(err, "Unable to start payment. Please try again."));
    }
  }, [createdRef]);

  // Auto-trigger checkout exactly once when the redirect step mounts with a
  // booking reference in hand.
  useEffect(() => {
    if (currentStep === 4 && createdRef && !checkoutStartedRef.current) {
      checkoutStartedRef.current = true;
      startCheckout();
    }
  }, [currentStep, createdRef, startCheckout]);

  // Actions
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDateError("");
    if (!dropOffDate || !dropOffTime || !pickupDate || !pickupTime) {
      alert("Please specify drop-off and pickup dates and times.");
      return;
    }

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

  return (
    <div className="w-full font-sans text-[#2c3e50] bg-white relative">
      {moreDetailsFor && (
        <MoreDetailsModal
          onClose={() => setMoreDetailsFor(null)}
          title={moreDetailsFor.title}
          html={moreDetailsFor.html}
        />
      )}

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
                0333 004 0262
              </p>
            </div>
          </div>
        </div>

      {/* ================= STEP INDICATOR BAR ================= */}
      <div className="max-w-[1320px] mx-auto mb-10 px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-0 md:gap-4 border border-gray-200 bg-[#fcfbfa] p-6 shadow-sm">
            {[
              { num: 1, label: "Select Dates" },
              { num: 2, label: "Parking Space" },
              { num: 3, label: "Customer Details" },
              { num: 4, label: "Payment" },
            ].map((s, idx, arr) => {
              const isCompleted = currentStep > s.num;
              const isActive = currentStep === s.num;
              const isLast = idx === arr.length - 1;
              return (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div
                      className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-[15px] transition-all duration-300 ${
                        isActive
                          ? "bg-[#e7701e] text-white ring-4 ring-orange-100"
                          : isCompleted
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? "✓" : s.num}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className={`text-[12px] font-bold uppercase tracking-[1px] ${isActive ? "text-[#e7701e]" : "text-gray-400"}`}>
                        Step {s.num}
                      </span>
                      <span className={`text-[15px] font-extrabold ${isActive || isCompleted ? "text-[#1a1a1a]" : "text-gray-500"}`}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                  {/* Connector to the next step — a short vertical tick between
                      stacked rows on mobile/tablet (flex-col), a full-width
                      horizontal line once the bar goes flex-row at md. Kept as
                      its own sibling (not nested in the step above) so it works
                      the same way regardless of which layout is active. */}
                  {!isLast && (
                    <div className="w-0.5 h-5 md:h-0.5 md:flex-1 bg-gray-200 ml-5 md:ml-0 md:mx-6" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

      {/* ================= 3. STEP 1: SELECT DATES FORM ================= */}
      {currentStep === 1 && (
        <div className="max-w-[800px] mx-auto px-4 py-8">
          <form onSubmit={handleStep1Submit} className="border border-gray-200 bg-[#fcfbfa] p-8 shadow-md rounded-lg space-y-6">
            <h2 className="text-[#1a1a1a] text-[22px] font-extrabold mb-4 font-sans">Select Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="wizard-dropoff-date" className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Drop Off Date</label>
                <input
                  id="wizard-dropoff-date"
                  type="date"
                  value={dropOffDate}
                  onChange={(e) => setDropOffDate(e.target.value)}
                  min={todayISO}
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                  required
                />
              </div>
              <div>
                <label htmlFor="wizard-dropoff-time" className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Drop Off Time</label>
                <TimeDropdown
                  id="wizard-dropoff-time"
                  value={dropOffTime}
                  onChange={setDropOffTime}
                  className="w-full bg-white text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="wizard-pickup-date" className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Pickup Date</label>
                <input
                  id="wizard-pickup-date"
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={dropOffDate || todayISO}
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                  required
                />
              </div>
              <div>
                <label htmlFor="wizard-pickup-time" className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Pickup Time</label>
                <TimeDropdown
                  id="wizard-pickup-time"
                  value={pickupTime}
                  onChange={setPickupTime}
                  className="w-full bg-white text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="wizard-service-type" className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Service Type</label>
                <SelectDropdown
                  id="wizard-service-type"
                  value={selectedServiceType}
                  onChange={setSelectedServiceType}
                  options={serviceTypes.map((st) => ({ value: st.slug, label: st.name }))}
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                />
              </div>
              <div>
                <label htmlFor="wizard-terminal" className="block text-[13px] font-bold text-gray-500 mb-1 select-none">Terminal</label>
                <SelectDropdown
                  id="wizard-terminal"
                  value={terminal}
                  onChange={setTerminal}
                  options={terminals.map((t) => ({ value: t.code, label: t.name }))}
                  className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e]"
                />
              </div>
            </div>
            {dateError && (
              <p className="text-red-600 text-sm font-semibold" role="alert">
                {dateError}
              </p>
            )}
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
                  <>
                    <div className="flex justify-between items-center text-sm text-[#4a4a4a] mb-2 font-bold">
                      <span>Space</span>
                      <span>£{spacePrice.toFixed(2)}</span>
                    </div>
                    {selectedAddOns.map((addOn) => (
                      <div key={addOn.id} className="flex justify-between items-center text-sm text-[#4a4a4a] mb-2">
                        <span>{addOn.name}</span>
                        <span>£{(addOn.price / 100).toFixed(2)}</span>
                      </div>
                    ))}
                  </>
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
                    <p className="text-gray-400 text-[14px] mt-1 font-bold">
                      {stepTwoServiceTypes.length + availableAddOns.length} Result{stepTwoServiceTypes.length + availableAddOns.length !== 1 ? "s" : ""} Found
                    </p>
                  </div>

                  {/* Only the service type already chosen (homepage widget or
                      Step 1's dropdown) — price is a live quote from the
                      backend's pricing engine (PricingDefault + PricingCalendar),
                      not a guessed number. */}
                  {stepTwoServiceTypes.map((st) => {
                    const quote = servicePrices[st.slug];
                    const isSelected = selectedServiceType === st.slug;

                    return (
                      <div
                        key={st.slug}
                        onClick={() => setSelectedServiceType(st.slug)}
                        className={`border border-gray-200 bg-[#f9fcff] rounded-[8px] overflow-hidden flex flex-col md:flex-row hover:border-[#e7701e] transition-all duration-300 cursor-pointer ${
                          isSelected ? "ring-2 ring-[#e7701e] border-transparent" : ""
                        }`}
                      >
                        {/* Logo area */}
                        <div className="md:w-[220px] bg-white p-5 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center shrink-0">
                          <div className="border border-gray-200 rounded-[10px] bg-white p-4 shadow-sm w-full flex flex-col items-center">
                            <div className="relative w-full h-[60px]">
                              <Image src="/images/logo.png" fill sizes="150px" className="object-contain" alt="Easy Parking Logo" />
                            </div>
                            <div className="w-full bg-[#1e2a53] text-white text-[11px] py-1 mt-3 text-center uppercase tracking-[0.5px] font-bold rounded-[3px]">
                              {st.name}
                            </div>
                          </div>
                        </div>

                        {/* Middle details */}
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-[#002f5d] text-[20px] font-black tracking-tight">{st.name}</h3>
                            <p className="text-gray-400 text-[12px] font-bold mt-1 uppercase tracking-[0.5px]">
                              {terminalName(terminal)}{" "}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMoreDetailsFor({ title: st.name, html: st.more_details });
                                }}
                                className="text-[#e7701e] lowercase font-normal underline cursor-pointer bg-transparent border-none p-0 ml-1"
                              >
                                More details
                              </button>
                            </p>

                            {st.description && (
                              <div
                                className={`mt-5 text-[13px] text-[#555555] leading-relaxed ${RICH_TEXT_CLASSES}`}
                                dangerouslySetInnerHTML={{ __html: st.description }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Right Price/Select box */}
                        <div className="md:w-[180px] p-6 bg-white flex flex-col justify-between items-center md:items-end md:text-right shrink-0 border-t md:border-t-0 md:border-l border-gray-100">
                          <div className="text-[28px] font-black text-[#002f5d]">
                            {quote
                              ? formatAmount(
                                  quote.total + (isSelected ? selectedAddOns.reduce((sum, a) => sum + a.price, 0) : 0),
                                  quote.currency
                                )
                              : pricesLoading ? "…" : "—"}
                          </div>
                          {isSelected ? (
                            // Already selected — the card's own orange border already
                            // shows that, so a second orange "Select" button here just
                            // duplicates it without doing anything new on click.
                            <div className="w-full font-extrabold text-[14px] uppercase py-2.5 rounded-[4px] mt-6 tracking-[0.5px] text-[#e7701e] text-center flex items-center justify-center gap-1.5">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              Selected
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedServiceType(st.slug);
                              }}
                              className="w-full font-extrabold text-[14px] uppercase py-2.5 rounded-[4px] mt-6 tracking-[0.5px] transition-all cursor-pointer bg-gray-150 text-[#2c3e50] hover:bg-gray-200"
                            >
                              Select
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Add-ons are optional extras on top of the chosen parking
                      space, not another space to pick — deliberately a
                      different, more compact layout (no fake logo box, no
                      "Select" button) so they don't read as another service. */}
                  {availableAddOns.length > 0 && (
                    <div className="pt-2">
                      <h3 className="text-[#002f5d] text-[16px] font-extrabold tracking-tight">Optional Extras</h3>
                      <p className="text-gray-400 text-[12px] font-bold mt-0.5 mb-4 uppercase tracking-[0.5px]">
                        Add any of these on top of your selected parking
                      </p>

                      <div className="space-y-3">
                        {availableAddOns.map((addOn) => {
                          const isChecked = selectedAddOnIds.includes(addOn.id);

                          return (
                            <label
                              key={addOn.id}
                              onClick={() => toggleAddOn(addOn.id)}
                              className={`flex items-center gap-4 border rounded-[8px] bg-white p-4 cursor-pointer transition-all duration-200 ${
                                isChecked
                                  ? "border-[#e7701e] ring-1 ring-[#e7701e] bg-[#fff8f3]"
                                  : "border-dashed border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleAddOn(addOn.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-5 h-5 accent-[#e7701e] shrink-0"
                              />

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[#002f5d] text-[15px] font-bold">{addOn.name}</span>
                                  <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#e7701e] bg-[#fdeee3] px-1.5 py-0.5 rounded">
                                    Extra
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setMoreDetailsFor({ title: addOn.name, html: addOn.more_details });
                                    }}
                                    className="text-[#e7701e] text-[11px] font-normal underline cursor-pointer bg-transparent border-none p-0"
                                  >
                                    More details
                                  </button>
                                </div>

                                {addOn.description && (
                                  <div
                                    className={`mt-1 text-[13px] text-[#666666] leading-snug ${RICH_TEXT_CLASSES}`}
                                    dangerouslySetInnerHTML={{ __html: addOn.description }}
                                  />
                                )}
                              </div>

                              <div className="text-[18px] font-black text-[#002f5d] shrink-0 whitespace-nowrap">
                                +{formatAmount(addOn.price, addOn.currency)}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Actions buttons bottom of Step 2 */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-8 mt-12">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="bg-[#f0f4f8] hover:bg-gray-200 text-[#004280] font-extrabold text-[14px] uppercase px-8 py-3.5 rounded-[4px] inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      Select Dates
                    </button>
                    <button
                      type="button"
                      onClick={handleStep2Submit}
                      disabled={pricesLoading || !selectedQuote}
                      title={pricesLoading || !selectedQuote ? "Waiting for the price to finish loading…" : undefined}
                      className={`bg-[#e7701e] text-white font-extrabold text-[14px] uppercase px-8 py-3.5 rounded-[4px] inline-flex items-center gap-2 shadow-md transition-all ${
                        pricesLoading || !selectedQuote
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-[#d56113] cursor-pointer"
                      }`}
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
                      <label htmlFor="wizard-first-name" className="block text-[13px] font-bold text-gray-500 mb-1">First Name *</label>
                      <input
                        id="wizard-first-name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(filterName(e.target.value))}
                        placeholder="First Name"
                        pattern="[\p{L}\s.'-]+"
                        title="Letters only (spaces, hyphens and apostrophes are fine)"
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="wizard-last-name" className="block text-[13px] font-bold text-gray-500 mb-1">Last Name *</label>
                      <input
                        id="wizard-last-name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(filterName(e.target.value))}
                        placeholder="Last Name"
                        pattern="[\p{L}\s.'-]+"
                        title="Letters only (spaces, hyphens and apostrophes are fine)"
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="wizard-email" className="block text-[13px] font-bold text-gray-500 mb-1">Email Address *</label>
                      <input
                        id="wizard-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="wizard-phone" className="block text-[13px] font-bold text-gray-500 mb-1">Mobile Phone *</label>
                      <input
                        id="wizard-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(filterPhone(e.target.value))}
                        placeholder="Mobile Phone"
                        pattern="[0-9+\-\s()]+"
                        title="Numbers only (spaces, +, - and brackets are fine)"
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
                        <label htmlFor="wizard-address1" className="block text-[13px] font-bold text-gray-500 mb-1">Address Line 1 *</label>
                        <input
                          id="wizard-address1"
                          type="text"
                          value={billingAddress1}
                          onChange={(e) => setBillingAddress1(filterAddress(e.target.value))}
                          placeholder="Street address line 1"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="wizard-address2" className="block text-[13px] font-bold text-gray-500 mb-1">Address Line 2</label>
                        <input
                          id="wizard-address2"
                          type="text"
                          value={billingAddress2}
                          onChange={(e) => setBillingAddress2(filterAddress(e.target.value))}
                          placeholder="Apartment, suite, unit etc. (optional)"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        />
                      </div>
                      <div>
                        <label htmlFor="wizard-city" className="block text-[13px] font-bold text-gray-500 mb-1">Town / City *</label>
                        <input
                          id="wizard-city"
                          type="text"
                          value={billingCity}
                          onChange={(e) => setBillingCity(filterAddress(e.target.value))}
                          placeholder="City"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="wizard-postcode" className="block text-[13px] font-bold text-gray-500 mb-1">Postcode *</label>
                        <input
                          id="wizard-postcode"
                          type="text"
                          value={billingPostcode}
                          onChange={(e) => setBillingPostcode(filterAddress(e.target.value))}
                          placeholder="Postcode"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="wizard-state" className="block text-[13px] font-bold text-gray-500 mb-1">State / Province</label>
                        <input
                          id="wizard-state"
                          type="text"
                          value={billingState}
                          onChange={(e) => setBillingState(filterAddress(e.target.value))}
                          placeholder="State"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        />
                      </div>
                      <div>
                        <label htmlFor="wizard-country" className="block text-[13px] font-bold text-gray-500 mb-1">Country *</label>
                        <SelectDropdown
                          id="wizard-country"
                          value={billingCountry}
                          onChange={setBillingCountry}
                          options={[
                            { value: "United Kingdom", label: "United Kingdom" },
                            { value: "Afghanistan", label: "Afghanistan" },
                            { value: "Germany", label: "Germany" },
                            { value: "France", label: "France" },
                            { value: "United States", label: "United States" },
                          ]}
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        />
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
                        <label htmlFor="wizard-dep-terminal" className="block text-[13px] font-bold text-gray-500 mb-1">Departure Terminal *</label>
                        <SelectDropdown
                          id="wizard-dep-terminal"
                          value={depTerminal}
                          onChange={setDepTerminal}
                          options={terminals.map((t) => ({ value: t.code, label: t.name }))}
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        />
                      </div>
                      <div>
                        <label htmlFor="wizard-ret-terminal" className="block text-[13px] font-bold text-gray-500 mb-1">Return Terminal *</label>
                        <SelectDropdown
                          id="wizard-ret-terminal"
                          value={retTerminal}
                          onChange={setRetTerminal}
                          options={terminals.map((t) => ({ value: t.code, label: t.name }))}
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="wizard-flight-num" className="block text-[13px] font-bold text-gray-500 mb-1">Return Flight Number</label>
                        <input
                          id="wizard-flight-num"
                          type="text"
                          value={flightNum}
                          onChange={(e) => setFlightNum(filterReg(e.target.value.toUpperCase()))}
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
                        <label htmlFor="wizard-vehicle-make" className="block text-[13px] font-bold text-gray-500 mb-1">Vehicle Make *</label>
                        <input
                          id="wizard-vehicle-make"
                          type="text"
                          value={vehicleMake}
                          onChange={(e) => setVehicleMake(filterMakeModel(e.target.value))}
                          placeholder="e.g. Ford, BMW"
                          pattern="[\p{L}0-9\s.'-]+"
                          title="Letters and numbers only"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="wizard-vehicle-model" className="block text-[13px] font-bold text-gray-500 mb-1">Vehicle Model *</label>
                        <input
                          id="wizard-vehicle-model"
                          type="text"
                          value={vehicleModel}
                          onChange={(e) => setVehicleModel(filterMakeModel(e.target.value))}
                          placeholder="e.g. Fiesta, 3 Series"
                          pattern="[\p{L}0-9\s.'-]+"
                          title="Letters and numbers only"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="wizard-vehicle-color" className="block text-[13px] font-bold text-gray-500 mb-1">Vehicle Color *</label>
                        <input
                          id="wizard-vehicle-color"
                          type="text"
                          value={vehicleColor}
                          onChange={(e) => setVehicleColor(filterName(e.target.value))}
                          placeholder="e.g. Black, Silver"
                          pattern="[\p{L}\s.'-]+"
                          title="Letters only"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="wizard-vehicle-reg" className="block text-[13px] font-bold text-gray-500 mb-1">Vehicle Registration No *</label>
                        <input
                          id="wizard-vehicle-reg"
                          type="text"
                          value={vehicleReg}
                          onChange={(e) => setVehicleReg(filterReg(e.target.value.toUpperCase()))}
                          placeholder="e.g. GJ71 REG"
                          pattern="[A-Za-z0-9\s]+"
                          title="Letters and numbers only"
                          className="w-full bg-white text-black text-sm px-4 py-3 border border-gray-300 outline-none focus:border-[#e7701e] rounded-[4px]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: Agreements */}
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

      {/* ================= 5. STEP 4: PAYMENT REDIRECT ================= */}
      {currentStep === 4 && (
        <div className="max-w-[600px] mx-auto px-4 py-16">
          <div className="border border-gray-200 bg-[#fcfbfa] p-8 md:p-10 shadow-md rounded-lg text-center space-y-6">
            {checkoutError ? (
              <>
                <div className="w-16 h-16 bg-red-100 text-[#e71d36] rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <h2 className="text-[#1a1a1a] text-[22px] font-extrabold font-sans">
                  We couldn&apos;t start your payment
                </h2>
                <p className="text-[#555555] text-[14px] leading-relaxed">
                  {checkoutError}
                </p>
                <div className="bg-[#f0f4f8] border border-gray-200 p-4 text-left text-sm text-[#4a4a4a] rounded-[4px]">
                  <p><strong>Booking reference:</strong> {createdRef}</p>
                  <p className="mt-1">Your booking is saved and still pending payment — it&apos;s safe to try again.</p>
                </div>
                <button
                  type="button"
                  onClick={startCheckout}
                  className="w-full bg-[#e7701e] hover:bg-[#d56113] text-white font-extrabold text-[14px] uppercase py-3.5 rounded-[4px] tracking-[1px] transition-all cursor-pointer"
                >
                  Try Payment Again
                </button>
              </>
            ) : (
              <>
                <svg className="animate-spin h-12 w-12 text-[#e7701e] mx-auto" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <h2 className="text-[#1a1a1a] text-[22px] font-extrabold font-sans">
                  Redirecting you to our secure payment provider…
                </h2>
                <p className="text-[#555555] text-[14px] leading-relaxed">
                  Please don&apos;t close this window. You&apos;ll be taken to our payment provider to complete your card payment.
                </p>
                <div className="bg-[#f0f4f8] border border-gray-200 p-4 flex justify-between items-center rounded-[4px]">
                  <span className="text-[#004280] text-[14px] font-extrabold uppercase">Amount Due</span>
                  <span className="text-[22px] font-black text-[#004280]">
                    {bookingAmount !== null ? formatAmount(bookingAmount, bookingCurrency) : "—"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
