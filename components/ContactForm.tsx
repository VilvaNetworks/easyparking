"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    { value: "meet-greet", label: "Meet & Greet Airport Parking Service" },
    { value: "valeting", label: "Valeting Service" },
    { value: "full-wash", label: "Full Car Wash Service" },
    { value: "outside-wash", label: "Car Wash Outside Only" },
    { value: "ev-charging", label: "Electric Car Charging" },
    { value: "transfers", label: "Transfer Services" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.service) {
      alert("Please select a service");
      return;
    }
    // Simulate API form submission
    setIsSubmitted(true);
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: ""
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="w-full bg-[#e7701e] p-8 md:p-10 shadow-xl rounded-[6px] text-white">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <svg className="w-16 h-16 text-white mb-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-[20px] font-bold mb-2">Message Sent!</h3>
          <p className="text-[14px] opacity-90">Thank you for reaching out. We will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full bg-white text-[#1a1a1a] placeholder-gray-400 text-[14px] font-medium outline-none px-4 py-3 border-0 rounded-[4px] transition-all focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full bg-white text-[#1a1a1a] placeholder-gray-400 text-[14px] font-medium outline-none px-4 py-3 border-0 rounded-[4px] transition-all focus:ring-2 focus:ring-orange-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-white text-[#1a1a1a] placeholder-gray-400 text-[14px] font-medium outline-none px-4 py-3 border-0 rounded-[4px] transition-all focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Custom Select Services Dropdown */}
            <div className="relative">
              {/* Dropdown Trigger */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white text-[#1a1a1a] text-[14px] font-medium px-4 py-3 rounded-[4px] cursor-pointer flex items-center justify-between transition-all select-none focus:ring-2 focus:ring-orange-300 h-[44px]"
              >
                <span className={formData.service ? "text-[#1a1a1a]" : "text-gray-400"}>
                  {services.find((o) => o.value === formData.service)?.label || "Select Services"}
                </span>
                
                {/* Arrow Icon with Rotate animation */}
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Floating Options List */}
              {isOpen && (
                <>
                  {/* Click outside backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                  
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-[4px] shadow-lg z-20 overflow-hidden py-1">
                    {services.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, service: option.value }));
                          setIsOpen(false);
                        }}
                        className="py-[2px] px-[4px] text-black text-[14px] font-medium cursor-pointer transition-colors duration-150 hover:bg-[#e7701e] hover:text-white"
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={4}
              required
              className="w-full bg-white text-[#1a1a1a] placeholder-gray-400 text-[14px] font-medium outline-none px-4 py-3 border-0 rounded-[4px] transition-all focus:ring-2 focus:ring-orange-300 resize-none"
            />
          </div>

          {/* Send Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-white text-[#e7701e] hover:bg-gray-100 font-extrabold text-[14px] uppercase tracking-wider py-4 rounded-[4px] transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg focus:outline-none"
            >
              SEND
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
