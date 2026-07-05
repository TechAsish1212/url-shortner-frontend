"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLinkState } from "@/app/lib/state";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Eye, EyeClosed, EyeOff, Lock, Mail, User } from "lucide-react";

export default function SignupPage() {
  const { signup, login, isAuthenticated, isLoaded, showToast } = useLinkState();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isLoaded && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isLoaded, isAuthenticated, router]);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { percent: 0, text: "Enter at least 8 characters", colorClass: "text-on-surface-variant", barClass: "bg-outline-variant" };

    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 25;
    if (/\d/.test(password)) score += 25;
    if (/[^a-zA-Z\d]/.test(password)) score += 25;

    if (score <= 25) {
      return { percent: 25, text: "Weak", colorClass: "text-error", barClass: "bg-error" };
    } else if (score <= 50) {
      return { percent: 50, text: "Fair", colorClass: "text-amber-500", barClass: "bg-amber-500" };
    } else if (score <= 75) {
      return { percent: 75, text: "Strong", colorClass: "text-secondary", barClass: "bg-secondary" };
    } else {
      return { percent: 100, text: "Very Strong", colorClass: "text-tertiary", barClass: "bg-tertiary" };
    }
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password || !termsAccepted) return;

    if (password.length < 8) {
      showToast("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await signup(name.trim(), email.trim(), password);
      if (success) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      showToast("Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignup = async (provider: string) => {
    setIsSubmitting(true);
    try {
      const success = await login(`${provider.toLowerCase()}.user@workspace.io`, "password123");
      if (success) {
        showToast(`Signed up with ${provider}`);
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mesh-gradient min-h-screen flex flex-col font-body-md text-on-surface relative overflow-hidden">
    

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center px-4 py-24 z-10">
        
        <div className="w-full max-w-[480px] glass-card rounded-xl shadow-sm p-8 md:p-10 flex flex-col gap-8 transition-all hover:shadow-lg bg-white/80 backdrop-blur-md border border-outline-variant">
          
          {/* Header Section */}
          <div className="text-center">
            <h1 className="font-headline-md text-headline-md text-on-background mb-2">
              Create your account
            </h1>
            <p className="font-body-md text-on-surface-variant">
              Start shortening and managing your links with ease.
            </p>
          </div>

          {/* Social Signups */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleSocialSignup("Google")}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded border border-outline-variant hover:bg-surface-container-low transition-colors duration-200 active:scale-[0.98] cursor-pointer"
              disabled={isSubmitting}
            >
              <span><FcGoogle /></span>
              <span className="font-label-md text-label-md text-on-surface">Google</span>
            </button>
            <button 
              onClick={() => handleSocialSignup("GitHub")}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded border border-outline-variant hover:bg-surface-container-low transition-colors duration-200 active:scale-[0.98] cursor-pointer"
              disabled={isSubmitting}
            >
              <span><FaGithub /></span>
              <span className="font-label-md text-label-md text-on-surface">GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="flex-shrink mx-4 font-label-sm text-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider">
              Or continue with email
            </span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  <User/>
                </span>
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md transition-all focus:ring-2 focus:ring-primary focus:outline-none" 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  <Mail/>
                </span>
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md transition-all focus:ring-2 focus:ring-primary focus:outline-none" 
                  id="email" 
                  placeholder="john@example.com" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="password">
                Password
              </label>
             <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  <Lock/>
                </span>
                <input 
                  className="w-full pl-12 pr-12 py-3 bg-white border border-outline-variant rounded-lg font-body-md transition-all focus:ring-2 focus:ring-primary focus:outline-none" 
                  id="password" 
                  placeholder="••••••••" 
                  required 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? <Eye/> : <EyeOff/>}
                  </span>
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="mt-2">
                <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${strength.percent}%` }}
                    className={`h-full transition-all duration-500 ease-out ${strength.barClass}`}
                  ></div>
                </div>
                <p className={`font-label-sm text-label-sm mt-1 transition-colors duration-300 font-semibold ${strength.colorClass}`}>
                  {strength.text}
                </p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 mt-2">
              <input 
                className="mt-1 w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary cursor-pointer" 
                id="terms" 
                required 
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label className="font-body-md text-[14px] text-on-surface-variant cursor-pointer select-none" htmlFor="terms">
                I agree to the <a className="text-primary hover:underline" href="#" onClick={(e) => { e.preventDefault(); showToast("Terms of service loaded."); }}>Terms of Service</a> and <a className="text-primary hover:underline" href="#" onClick={(e) => { e.preventDefault(); showToast("Privacy policy loaded."); }}>Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              className="w-full py-4 bg-primary text-on-primary font-headline-sm text-label-md font-bold rounded-lg shadow-md hover:bg-primary/95 hover:scale-[1.01] active:scale-95 transition-all duration-200 mt-4 cursor-pointer disabled:opacity-75 disabled:pointer-events-none" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Redirection */}
          <div className="text-center">
            <p className="font-body-md text-on-surface-variant">
              Already have an account? 
              <Link className="text-primary font-semibold hover:underline ml-1" href="/login">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>

   
      {/* Background Blurs */}
      <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[60%] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-secondary/5 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
    </div>
  );
}
