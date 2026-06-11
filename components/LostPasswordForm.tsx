"use client";

import React, { useState } from "react";

export default function LostPasswordForm() {
  const [userLogin, setUserLogin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!userLogin.trim()) {
      setError("Username or email address is required.");
      return;
    }

    // Success simulation
    setSuccess(
      "A password reset link has been sent to your email address."
    );
    setUserLogin("");
  };

  return (
    <div className="w-full">
      {/* ================= VALIDATION MESSAGES ================= */}
      {error && (
        <div className="max-w-[660px] mx-auto mb-8 border border-[#d9534f]/40 border-t-2 border-t-[#d9534f] bg-white p-4 text-[14px] text-[#333333] flex items-center gap-3">
          <div className="w-5 h-5 bg-[#d9534f] text-white rounded-full flex items-center justify-center text-[12px] font-extrabold select-none flex-shrink-0">
            !
          </div>
          <span>
            <strong className="text-black font-bold">Error:</strong> {error}
          </span>
        </div>
      )}

      {success && (
        <div className="max-w-[660px] mx-auto mb-8 border border-[#28a745]/40 border-t-2 border-t-[#28a745] bg-white p-4 text-[14px] text-[#333333] flex items-center gap-3">
          <div className="w-5 h-5 bg-[#28a745] text-white rounded-full flex items-center justify-center text-[12px] font-extrabold select-none flex-shrink-0">
            ✓
          </div>
          <span>
            <strong className="text-black font-bold">Success:</strong> {success}
          </span>
        </div>
      )}

      {/* ================= LOST PASSWORD FORM ================= */}
      <div className="max-w-[660px] mx-auto border border-gray-200 bg-[#fcfbfa] p-8 md:p-10 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-[14px] text-gray-600 leading-relaxed">
            Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.
          </p>

          <div>
            <label htmlFor="user_login" className="block text-[14px] font-semibold text-[#1a1a1a] mb-2 select-none">
              Username or email <span className="text-[#cf2e2e]">*</span>
            </label>
            <input
              type="text"
              id="user_login"
              value={userLogin}
              onChange={(e) => setUserLogin(e.target.value)}
              className="w-full bg-white text-[#1a1a1a] border border-gray-300 text-[14px] font-medium outline-none px-4 py-3 focus:border-[#e7701e] transition-colors rounded-none"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-black text-white hover:bg-gray-800 font-extrabold text-[14px] px-8 py-3.5 transition-all duration-300 cursor-pointer uppercase rounded-none"
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
