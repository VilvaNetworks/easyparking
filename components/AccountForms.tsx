"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AccountForms() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRemember, setLoginRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [registerEmail, setRegisterEmail] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!loginUsername.trim()) {
      setError("Username is required.");
      return;
    }
    if (!loginPassword) {
      setError("Password is required.");
      return;
    }

    // Success simulation
    setSuccess("Login successful! Redirecting...");
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!registerEmail.trim()) {
      setError("Email address is required.");
      return;
    }

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      setError("Please provide a valid email address.");
      return;
    }

    // Success simulation
    setSuccess("Registration successful! A link to set a new password has been sent to your email address.");
    setRegisterEmail("");
  };

  return (
    <div className="w-full">
      {/* ================= VALIDATION MESSAGES ================= */}
      {error && (
        <div className="max-w-[1320px] mx-auto mb-10 border border-[#d9534f]/40 border-t-2 border-t-[#d9534f] bg-white p-4 text-[14px] text-[#333333] flex items-center gap-3">
          <div className="w-5 h-5 bg-[#d9534f] text-white rounded-full flex items-center justify-center text-[12px] font-extrabold select-none flex-shrink-0">
            !
          </div>
          <span>
            <strong className="text-black font-bold">Error:</strong> {error}
          </span>
        </div>
      )}

      {success && (
        <div className="max-w-[1320px] mx-auto mb-10 border border-[#28a745]/40 border-t-2 border-t-[#28a745] bg-white p-4 text-[14px] text-[#333333] flex items-center gap-3">
          <div className="w-5 h-5 bg-[#28a745] text-white rounded-full flex items-center justify-center text-[12px] font-extrabold select-none flex-shrink-0">
            ✓
          </div>
          <span>
            <strong className="text-black font-bold">Success:</strong> {success}
          </span>
        </div>
      )}

      {/* ================= FORMS GRID ================= */}
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* LOGIN FORM COLUMN */}
        <div>
          <h2 className="text-[#1a1a1a] text-[24px] font-bold mb-4 font-sans">
            Login
          </h2>
          <div className="border border-gray-200 bg-[#fcfbfa] p-8 md:p-10 shadow-sm">
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label htmlFor="account-login-username" className="block text-[14px] font-semibold text-[#1a1a1a] mb-2 select-none">
                  Username or email address <span className="text-[#cf2e2e]">*</span>
                </label>
                <input
                  id="account-login-username"
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full bg-white text-[#1a1a1a] border border-gray-300 text-[14px] font-medium outline-none px-4 py-3 focus:border-[#e7701e] transition-colors rounded-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="account-login-password" className="block text-[14px] font-semibold text-[#1a1a1a] mb-2 select-none">
                  Password <span className="text-[#cf2e2e]">*</span>
                </label>
                <div className="relative">
                  <input
                    id="account-login-password"
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-white text-[#1a1a1a] border border-gray-300 text-[14px] font-medium outline-none px-4 py-3 focus:border-[#e7701e] transition-colors pr-12 rounded-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-3">
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800 font-extrabold text-[14px] px-8 py-3.5 transition-all duration-300 cursor-pointer uppercase rounded-none"
                >
                  Log in
                </button>
                <label className="flex items-center gap-2 cursor-pointer select-none text-[14px] font-semibold text-[#1a1a1a]">
                  <input
                    type="checkbox"
                    checked={loginRemember}
                    onChange={(e) => setLoginRemember(e.target.checked)}
                    className="w-4 h-4 border border-gray-300 rounded-none bg-white checked:bg-black checked:border-black focus:ring-0 focus:outline-none cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              <div className="pt-2">
                <Link
                  href="/account/lost-password"
                  className="text-[#3a7bd5] hover:text-[#e7701e] text-[14px] transition-colors duration-300"
                >
                  Lost your password?
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* REGISTER FORM COLUMN */}
        <div>
          <h2 className="text-[#1a1a1a] text-[24px] font-bold mb-4 font-sans">
            Register
          </h2>
          <div className="border border-gray-200 bg-[#fcfbfa] p-8 md:p-10 shadow-sm">
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div>
                <label htmlFor="account-register-email" className="block text-[14px] font-semibold text-[#1a1a1a] mb-2 select-none">
                  Email address <span className="text-[#cf2e2e]">*</span>
                </label>
                <input
                  id="account-register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full bg-white text-[#1a1a1a] border border-gray-300 text-[14px] font-medium outline-none px-4 py-3 focus:border-[#e7701e] transition-colors rounded-none"
                  required
                />
                <p className="text-[13px] text-gray-500 mt-2.5 leading-relaxed">
                  A link to set a new password will be sent to your email address.
                </p>
              </div>

              <div className="text-[13px] text-gray-500 mt-6 leading-relaxed">
                <p>
                  Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#3a7bd5] hover:text-[#e7701e] transition-colors duration-300 font-medium"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800 font-extrabold text-[14px] px-8 py-3.5 transition-all duration-300 cursor-pointer uppercase rounded-none"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
