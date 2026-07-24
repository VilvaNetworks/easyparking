"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import SelectDropdown from "@/components/SelectDropdown";

interface GetInTouchPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function GetInTouchPopup({ open, onClose }: GetInTouchPopupProps) {
  const [gitForm, setGitForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [gitSubmitting, setGitSubmitting] = useState(false);
  const [gitSubmitted, setGitSubmitted] = useState(false);
  const [gitError, setGitError] = useState("");

  const closeGetInTouch = () => {
    onClose();
    setGitForm({ name: "", phone: "", email: "", service: "", message: "" });
    setGitSubmitting(false);
    setGitSubmitted(false);
    setGitError("");
  };

  const handleGetInTouchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setGitForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetInTouchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGitError("");
    setGitSubmitting(true);
    try {
      // source lets the backend route this to the Complaints mailbox
      // separately from the main Contact Us page submissions.
      await axios.post(
        "/api/contact",
        { ...gitForm, source: "get-in-touch-popup" },
        { headers: { "Content-Type": "application/json" } }
      );
      setGitSubmitted(true);
    } catch (err) {
      console.error("Error submitting Get In Touch form:", err);
      setGitError("Something went wrong sending your message. Please try again or call us directly.");
    } finally {
      setGitSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* ───────────────── GET IN TOUCH POPUP ───────────────────── */}
      <div className="fixed inset-0 z-10000 flex justify-end"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", animation: "fadeIn 0.25s ease" }}
        onClick={closeGetInTouch}
      >
        <div className="relative overflow-y-auto"
          style={{ backgroundColor: "#FFFFFF", width: 460, maxWidth: "100%", height: "100%", padding: 30, boxShadow: "-8px 0 30px rgba(0,0,0,0.15)", animation: "slideIn 0.3s ease" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" aria-label="Close" className="absolute cursor-pointer border-none flex items-center justify-center"
            style={{ top: 14, right: 14, width: 32, height: 32, backgroundColor: "#E7701E", color: "#FFFFFF", fontSize: 20, borderRadius: "50%" }}
            onClick={closeGetInTouch}>
            ×
          </button>

          <Image src="/images/logo.png" alt="easyparking" width={200} height={70} />
          <h2 style={{ fontSize: 26, margin: "16px 0 8px", color: "#1a1a1a" }}>Customer Support</h2>

          {gitSubmitted ? (
            <div className="flex flex-col items-center text-center py-10">
              <svg className="w-16 h-16 text-[#e7701e] mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: "#555555", fontSize: 14 }}>Thank you for reaching out. We will get back to you shortly.</p>
            </div>
          ) : (
            <>
              <p style={{ color: "#555555", marginBottom: 18, fontSize: 14 }}>
                Complete the form to confirm your query<br />easy and quick.
              </p>

              <form onSubmit={handleGetInTouchSubmit}>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <label htmlFor="git-name" className="sr-only">Name</label>
                  <input id="git-name" type="text" name="name" value={gitForm.name} onChange={handleGetInTouchChange} placeholder="Name" required className="w-full outline-none"
                    style={{ padding: "12px 14px", border: "1px solid #DDDDDD", fontSize: 14, backgroundColor: "#FFFFFF" }} />
                  <label htmlFor="git-phone" className="sr-only">Phone Number</label>
                  <input id="git-phone" type="tel" name="phone" value={gitForm.phone} onChange={handleGetInTouchChange} placeholder="Phone Number" required className="w-full outline-none"
                    style={{ padding: "12px 14px", border: "1px solid #DDDDDD", fontSize: 14, backgroundColor: "#FFFFFF" }} />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <label htmlFor="git-email" className="sr-only">Email</label>
                  <input id="git-email" type="email" name="email" value={gitForm.email} onChange={handleGetInTouchChange} placeholder="Email" required className="w-full outline-none"
                    style={{ padding: "12px 14px", border: "1px solid #DDDDDD", fontSize: 14, backgroundColor: "#FFFFFF" }} />
                  <label htmlFor="git-service" className="sr-only">Service</label>
                  <SelectDropdown
                    id="git-service"
                    value={gitForm.service}
                    onChange={(value) => setGitForm((prev) => ({ ...prev, service: value }))}
                    placeholder="Select Services"
                    options={[
                      { value: "Meet & Greet Parking at Gatwick", label: "Meet & Greet Parking at Gatwick" },
                      { value: "Airport Parking", label: "Airport Parking" },
                      { value: "Photographic Vehicle Checks", label: "Photographic Vehicle Checks" },
                      { value: "Convenient Collection & Return", label: "Convenient Collection & Return" },
                      { value: "24/7 Customer Support", label: "24/7 Customer Support" },
                      { value: "Affordable & Reliable", label: "Affordable & Reliable" },
                    ]}
                    className="w-full outline-none"
                    style={{ padding: "12px 14px", border: "1px solid #DDDDDD", fontSize: 14, backgroundColor: "#FFFFFF" }}
                  />
                </div>
                <label htmlFor="git-message" className="sr-only">Message</label>
                <textarea id="git-message" rows={4} name="message" value={gitForm.message} onChange={handleGetInTouchChange} placeholder="Message" required className="w-full outline-none mb-3"
                  style={{ padding: "12px 14px", border: "1px solid #DDDDDD", fontSize: 14, backgroundColor: "#FFFFFF", resize: "vertical" }} />

                {gitError && (
                  <p className="text-[#e71d36] text-[13px] font-semibold mb-3" role="alert">
                    {gitError}
                  </p>
                )}

                <button type="submit" disabled={gitSubmitting} className="w-full border-none cursor-pointer transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundImage: "linear-gradient(180deg,#E7701E 0%,#F09A0F 100%)", fontFamily: '"Montserrat",Sans-serif', fontSize: 13, fontWeight: 700, color: "#FFFFFF", padding: "14px", borderRadius: 4 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundImage = "linear-gradient(180deg,#F09A0F 0%,#E7701E 100%)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundImage = "linear-gradient(180deg,#E7701E 0%,#F09A0F 100%)")}
                >
                  {gitSubmitting ? "SENDING…" : "Send"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </>
  );
}
