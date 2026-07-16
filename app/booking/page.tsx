"use client";

import React, { useState, FormEvent, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLinkState } from "@/app/lib/state";

export default function BookingPage() {
  const router = useRouter();
  const { showToast } = useLinkState();

  // Contact Form State
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  // Guest State
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(1);

  // Interaction State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [rippleEffect, setRippleEffect] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const ctaBtnRef = useRef<HTMLButtonElement>(null);

  // Generate a random booking reference on mount
  useEffect(() => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setBookingRef(`HZ-${randomNum}`);
  }, []);

  const totalGuests = adultCount + childCount;

  // Guest count handlers
  const incrementAdults = () => setAdultCount(prev => prev + 1);
  const decrementAdults = () => {
    if (adultCount > 1) {
      setAdultCount(prev => prev - 1);
    } else {
      showToast("At least 1 adult is required for booking.");
    }
  };

  const incrementChildren = () => setChildCount(prev => prev + 1);
  const decrementChildren = () => {
    if (childCount > 0) {
      setChildCount(prev => prev - 1);
    }
  };

  // Form submission validation & modal trigger
  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showToast("Please enter your Full Name.");
      return;
    }
    if (!mobileNumber.trim()) {
      showToast("Please enter your Mobile Number.");
      return;
    }
    if (!city.trim()) {
      showToast("Please enter your City.");
      return;
    }
    if (!district.trim()) {
      showToast("Please enter your District.");
      return;
    }

    // Trigger ripple effect
    if (ctaBtnRef.current) {
      const rect = ctaBtnRef.current.getBoundingClientRect();
      // Estimate center ripple
      setRippleEffect({
        x: rect.width / 2,
        y: rect.height / 2,
        active: true,
      });
      setTimeout(() => {
        setRippleEffect(prev => ({ ...prev, active: false }));
        setShowSuccessModal(true);
        showToast("Booking request initiated successfully!");
      }, 500);
    } else {
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="bg-horizon-background font-horizon-body text-horizon-on-surface antialiased min-h-screen pb-32 pt-20">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header shadow-sm bg-horizon-background/85 backdrop-blur-md border-b border-horizon-outline-variant/10">
        <div className="flex justify-between items-center w-full px-4 h-16 max-w-2xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-horizon-surface-container-low transition-colors rounded-full active:scale-95 duration-100 cursor-pointer"
            aria-label="Go Back"
          >
            <span className="material-symbols-outlined text-horizon-primary">arrow_back</span>
          </button>
          <h1 className="text-headline-sm font-horizon-headline font-bold text-horizon-primary">Complete Booking</h1>
          <button 
            className="p-2 hover:bg-horizon-surface-container-low transition-colors rounded-full active:scale-95 duration-100 cursor-pointer"
            aria-label="More Options"
          >
            <span className="material-symbols-outlined text-horizon-primary">more_vert</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-5 space-y-6">
        
        {/* Hero Visual Section (Subtle anticipation) */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-horizon-primary/70 via-horizon-primary/20 to-transparent z-10"></div>
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAsubQFd-Cf9h08iCaYHzjsA4Eec4JJdoUh4OZUwLuZpQvd9-7rq8qpxDhnd2ZxpXocgE22WQKQg2AgsVr-_ou6zEQR2YhtTOVxBD6FyH9ZZV5PY9HYNjzYqakTi4WqTF9VzyZ747yzW0L3maDya92C8W8us4gOIJnztKMnut3irixFIN3-v0yaUrQR1DOwk_pYr9_Ja8tkjcKKRueLz4V_iqxgDsZPJ6eBCqh-xI4WmXbBheXktXZa_01QTqU8bfTs98ss8rN1i74_')` 
            }}
          />
          <div className="absolute bottom-4 left-4 z-20">
            <p className="text-white font-horizon-headline text-xl md:text-2xl font-bold leading-tight drop-shadow-md">
              Maldives Serenity Escape
            </p>
            <div className="flex items-center gap-1 text-white/90 mt-1">
              <span className="material-symbols-outlined text-base">location_on</span>
              <span className="text-xs font-medium">Baa Atoll, Maldives</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleBookingSubmit} className="space-y-6">
          
          {/* Section 1: Contact Info */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <span className="material-symbols-outlined text-horizon-primary text-xl">contact_mail</span>
              <h2 className="text-lg font-horizon-headline font-bold text-horizon-primary">Contact Info</h2>
            </div>
            <div className="bg-horizon-surface-container-low rounded-2xl p-5 space-y-4 shadow-[0_4px_20px_rgba(0,51,102,0.05)] border border-horizon-outline-variant/10">
              <div className="grid grid-cols-1 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-xs font-semibold tracking-wider text-horizon-on-surface-variant uppercase">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    className="w-full bg-horizon-surface-bright border border-horizon-outline-variant/20 focus:border-horizon-primary focus:ring-2 focus:ring-horizon-primary/20 rounded-xl px-4 py-3 text-sm placeholder:text-horizon-on-surface-variant/40 outline-none transition-all"
                    placeholder="Johnathan Doe"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label htmlFor="mobile" className="text-xs font-semibold tracking-wider text-horizon-on-surface-variant uppercase">
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    className="w-full bg-horizon-surface-bright border border-horizon-outline-variant/20 focus:border-horizon-primary focus:ring-2 focus:ring-horizon-primary/20 rounded-xl px-4 py-3 text-sm placeholder:text-horizon-on-surface-variant/40 outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>

                {/* City & District */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="city" className="text-xs font-semibold tracking-wider text-horizon-on-surface-variant uppercase">
                      City
                    </label>
                    <input
                      id="city"
                      className="w-full bg-horizon-surface-bright border border-horizon-outline-variant/20 focus:border-horizon-primary focus:ring-2 focus:ring-horizon-primary/20 rounded-xl px-4 py-3 text-sm placeholder:text-horizon-on-surface-variant/40 outline-none transition-all"
                      placeholder="London"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="district" className="text-xs font-semibold tracking-wider text-horizon-on-surface-variant uppercase">
                      District
                    </label>
                    <input
                      id="district"
                      className="w-full bg-horizon-surface-bright border border-horizon-outline-variant/20 focus:border-horizon-primary focus:ring-2 focus:ring-horizon-primary/20 rounded-xl px-4 py-3 text-sm placeholder:text-horizon-on-surface-variant/40 outline-none transition-all"
                      placeholder="Central"
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 2: Guest Details (Interactive UI) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <span className="material-symbols-outlined text-horizon-primary text-xl">group</span>
              <h2 className="text-lg font-horizon-headline font-bold text-horizon-primary">Guest Details</h2>
            </div>
            <div className="bg-horizon-surface-container-low rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,51,102,0.05)] border border-horizon-outline-variant/10">
              <div className="flex flex-col gap-5">
                
                {/* Adults Count */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-horizon-primary">Adults</p>
                    <p className="text-xs text-horizon-on-surface-variant/60">Ages 13+</p>
                  </div>
                  <div className="flex items-center gap-3 bg-horizon-surface-bright border border-horizon-outline-variant/20 rounded-full px-2 py-1 shadow-sm">
                    <button 
                      type="button"
                      onClick={decrementAdults}
                      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-horizon-surface-container-low text-horizon-primary transition-all active:scale-90 cursor-pointer"
                      aria-label="Decrease adults"
                    >
                      <span className="material-symbols-outlined text-lg">remove</span>
                    </button>
                    <span className="font-horizon-headline text-base font-bold min-w-[20px] text-center text-horizon-primary">
                      {adultCount}
                    </span>
                    <button 
                      type="button"
                      onClick={incrementAdults}
                      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-horizon-surface-container-low text-horizon-primary transition-all active:scale-90 cursor-pointer"
                      aria-label="Increase adults"
                    >
                      <span className="material-symbols-outlined text-lg">add</span>
                    </button>
                  </div>
                </div>

                {/* Children Count */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-horizon-primary">Children</p>
                    <p className="text-xs text-horizon-on-surface-variant/60">Ages 2-12</p>
                  </div>
                  <div className="flex items-center gap-3 bg-horizon-surface-bright border border-horizon-outline-variant/20 rounded-full px-2 py-1 shadow-sm">
                    <button 
                      type="button"
                      onClick={decrementChildren}
                      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-horizon-surface-container-low text-horizon-primary transition-all active:scale-90 cursor-pointer"
                      aria-label="Decrease children"
                    >
                      <span className="material-symbols-outlined text-lg">remove</span>
                    </button>
                    <span className="font-horizon-headline text-base font-bold min-w-[20px] text-center text-horizon-primary">
                      {childCount}
                    </span>
                    <button 
                      type="button"
                      onClick={incrementChildren}
                      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-horizon-surface-container-low text-horizon-primary transition-all active:scale-90 cursor-pointer"
                      aria-label="Increase children"
                    >
                      <span className="material-symbols-outlined text-lg">add</span>
                    </button>
                  </div>
                </div>

                {/* Total Guests display */}
                <div className="pt-4 border-t border-horizon-outline-variant/25 flex justify-between items-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-horizon-on-surface-variant/75">
                    Total Guests
                  </p>
                  <p className="text-lg font-horizon-headline font-extrabold text-horizon-primary">
                    {totalGuests}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Trip Planning */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <span className="material-symbols-outlined text-horizon-primary text-xl">explore</span>
              <h2 className="text-lg font-horizon-headline font-bold text-horizon-primary">Trip Planning</h2>
            </div>
            <div className="bg-horizon-surface-container-low rounded-2xl p-5 space-y-4 shadow-[0_4px_20px_rgba(0,51,102,0.05)] border border-horizon-outline-variant/10">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wider text-horizon-on-surface-variant uppercase">
                  Destination
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-horizon-primary/60 text-lg">
                    location_on
                  </span>
                  <input
                    className="w-full bg-horizon-surface-bright border border-horizon-outline-variant/10 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-horizon-primary shadow-sm outline-none cursor-default"
                    readOnly
                    type="text"
                    value="Maldives Serenity Resort"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-horizon-on-surface-variant uppercase">
                    Duration
                  </label>
                  <div className="flex items-center gap-2 bg-horizon-surface-bright border border-horizon-outline-variant/10 rounded-xl px-4 py-3 shadow-sm">
                    <span className="material-symbols-outlined text-horizon-primary text-lg">calendar_today</span>
                    <span className="text-sm font-bold text-horizon-primary">5 Days</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-horizon-on-surface-variant uppercase">
                    Stay
                  </label>
                  <div className="flex items-center gap-2 bg-horizon-surface-bright border border-horizon-outline-variant/10 rounded-xl px-4 py-3 shadow-sm">
                    <span className="material-symbols-outlined text-horizon-primary text-lg">bed</span>
                    <span className="text-sm font-bold text-horizon-primary">4 Nights</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Payment Summary */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <span className="material-symbols-outlined text-horizon-primary text-xl">payments</span>
              <h2 className="text-lg font-horizon-headline font-bold text-horizon-primary">Payment Summary</h2>
            </div>
            <div className="bg-horizon-primary text-white rounded-2xl overflow-hidden shadow-md border border-horizon-primary-container">
              <div className="p-5 space-y-3.5">
                <div className="flex justify-between items-center opacity-80 text-xs tracking-wide">
                  <p className="font-medium">Total Amount</p>
                  <p className="font-semibold">$4,250.00</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold">Advance Payment</p>
                  <p className="text-lg font-horizon-headline font-extrabold text-horizon-primary-fixed">
                    $1,200.00
                  </p>
                </div>
              </div>
              <div className="bg-horizon-primary-container p-4 flex items-start gap-3 border-t border-white/5">
                <span className="material-symbols-outlined text-white text-base mt-0.5">info</span>
                <p className="text-xs text-white/80 leading-tight">
                  Pay the remaining balance at the check-in desk upon arrival at the destination.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Submit Button */}
          <div className="pt-4">
            <button
              ref={ctaBtnRef}
              type="submit"
              className="relative w-full bg-horizon-secondary-container text-horizon-on-secondary-container h-14 rounded-2xl text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer overflow-hidden"
            >
              Complete Booking
              <span className="material-symbols-outlined text-lg">chevron_right</span>

              {/* Simulated Ripple Circle */}
              {rippleEffect.active && (
                <span
                  className="absolute rounded-full bg-white/35 pointer-events-none animate-ripple"
                  style={{
                    left: rippleEffect.x,
                    top: rippleEffect.y,
                    width: "250px",
                    height: "250px",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </button>
          </div>

        </form>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center h-20 px-2 pb-safe bg-horizon-surface-bright border-t border-horizon-outline-variant/20 shadow-[0_-4px_2px_rgba(0,51,102,0.02)]">
        <Link href="/" className="flex flex-col items-center justify-center text-horizon-on-surface-variant hover:text-horizon-primary transition-transform active:scale-90">
          <span className="material-symbols-outlined text-xl">explore</span>
          <span className="text-[10px] font-semibold mt-0.5">Explore</span>
        </Link>
        <div className="flex flex-col items-center justify-center text-horizon-secondary font-bold active:scale-90 cursor-default">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            confirmation_number
          </span>
          <span className="text-[10px] font-bold mt-0.5">Bookings</span>
        </div>
        <a href="#" className="flex flex-col items-center justify-center text-horizon-on-surface-variant hover:text-horizon-primary transition-transform active:scale-90">
          <span className="material-symbols-outlined text-xl">favorite</span>
          <span className="text-[10px] font-semibold mt-0.5">Saved</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-horizon-on-surface-variant hover:text-horizon-primary transition-transform active:scale-90">
          <span className="material-symbols-outlined text-xl">person</span>
          <span className="text-[10px] font-semibold mt-0.5">Profile</span>
        </a>
      </nav>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-horizon-background w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-6 border border-horizon-outline-variant/25 animate-scale-up text-center">
            
            {/* Celebration Icon */}
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <span className="material-symbols-outlined text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>

            <h3 className="text-xl font-horizon-headline font-bold text-horizon-primary">
              Booking Complete!
            </h3>
            <p className="text-sm text-horizon-on-surface-variant mt-1.5">
              Your Maldives Serenity Escape booking has been confirmed.
            </p>

            {/* Receipt Box */}
            <div className="my-5 p-4 bg-horizon-surface-container-low rounded-xl text-left border border-horizon-outline-variant/15 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-horizon-on-surface-variant">Booking Ref:</span>
                <span className="text-horizon-primary font-bold font-mono">{bookingRef}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-horizon-on-surface-variant">Guest Name:</span>
                <span className="text-horizon-primary">{fullName}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-horizon-on-surface-variant">Total Guests:</span>
                <span className="text-horizon-primary">{totalGuests} ({adultCount} Adults, {childCount} Children)</span>
              </div>
              <div className="pt-2 border-t border-horizon-outline-variant/20 flex justify-between text-xs font-bold">
                <span className="text-horizon-on-surface-variant">Advance Paid:</span>
                <span className="text-horizon-secondary">$1,200.00</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push("/");
                }}
                className="w-full bg-horizon-primary text-white py-3 rounded-xl font-bold text-sm hover:opacity-95 active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                Go Back Home
              </button>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full text-horizon-primary border border-horizon-outline-variant/40 py-2.5 rounded-xl font-bold text-sm hover:bg-horizon-surface-container-low active:scale-95 transition-all cursor-pointer"
              >
                View / Edit Booking
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Ripple Animation styles */}
      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
        
        @keyframes scaleUp {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}
