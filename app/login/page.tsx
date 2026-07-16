"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLinkState } from "@/app/lib/state";
import { ArrowRight, Eye, EyeOff, GitBranchIcon, Link2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signin } from "../api/auth/login";

export default function LoginPage() {
  const { login, isAuthenticated, isLoaded, showToast } = useLinkState();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Track focus states for labels
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isLoaded && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isLoaded, isAuthenticated, router]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email.trim() || !password) return;

  setIsSubmitting(true);

  try {
    const success = await login(
      email.trim(),
      password
    );

    if (success) {
      router.push("/dashboard");
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};

  const handleSocialLogin = async (provider: string) => {
    setIsSubmitting(true);
    try {
      const success = await login(
        `${provider.toLowerCase()}.user@workspace.io`,
        "password123",
      );
      if (success) {
        showToast(`Signed in with ${provider}`);
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mesh-gradient min-h-screen flex flex-col font-body-md text-on-surface antialiased relative overflow-hidden">
      <main className="flex-grow flex items-center justify-center px-4 py-12 z-10">
        <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Login Card */}
          <div className="glass-card rounded-xl p-8 md:p-10 shadow-[0_10px_15px_-3px_rgba(15,23,42,0.05)] bg-white/80 backdrop-blur-md border border-outline-variant">
            {/* Brand Header */}
            <div className="flex flex-col items-center mb-10">
              <div className="mb-4 text-primary">
                <span
                  className="material-symbols-outlined text-[48px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  <Link2 />
                </span>
              </div>
              <h1 className="font-headline-sm text-headline-sm font-extrabold text-primary tracking-tight">
                CrixLink
              </h1>
              <p className="text-on-surface-variant font-label-md text-label-md mt-2">
                Log in to manage your performance links
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label
                  className={`font-label-md text-label-md block transition-colors duration-200 ${isEmailFocused
                      ? "text-primary font-semibold"
                      : "text-on-surface-variant"
                    }`}
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="custom-input w-full px-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md transition-all duration-200 placeholder:text-outline"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label
                    className={`font-label-md text-label-md block transition-colors duration-200 ${isPasswordFocused
                        ? "text-primary font-semibold"
                        : "text-on-surface-variant"
                      }`}
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    className="text-primary font-label-md text-label-md hover:underline decoration-2 underline-offset-4 transition-all"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast("Password recovery link sent to your email!");
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    className="w-full px-4 pr-12 py-3 bg-white border border-outline-variant rounded-lg font-body-md transition-all focus:ring-2 focus:ring-primary focus:outline-none"
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
                      {showPassword ? <Eye /> : <EyeOff />}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary transition-colors cursor-pointer"
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label
                  className="ml-2 font-body-md text-label-md text-on-surface-variant cursor-pointer select-none"
                  htmlFor="remember"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                className="w-full bg-primary text-on-primary py-3.5 px-6 rounded-lg font-headline-sm text-label-md font-bold tracking-wide active:scale-[0.98] hover:bg-primary/90 hover:shadow-lg transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-sm">
                      progress_activity
                    </span>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Log In
                    <span className="material-symbols-outlined text-sm">
                      <ArrowRight />
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white/80 backdrop-blur px-4 font-label-sm text-label-sm text-outline uppercase tracking-widest text-[11px]">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors duration-200 active:scale-95 cursor-pointer"
                disabled={isSubmitting}
              >
                <span>
                  <FcGoogle />
                </span>
                <span className="font-label-md text-label-md text-on-surface">
                  Google
                </span>
              </button>
              <button
                onClick={() => handleSocialLogin("GitHub")}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors duration-200 active:scale-95 cursor-pointer"
                disabled={isSubmitting}
              >
                <span>
                  <FaGithub />
                </span>
                <span className="font-label-md text-label-md text-on-surface">
                  GitHub
                </span>
              </button>
            </div>

            {/* Footer Link */}
            <div className="mt-10 text-center">
              <p className="font-body-md text-label-md text-on-surface-variant">
                Don't have an account?
                <Link
                  className="text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all ml-1"
                  href="/signup"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Circles */}
      <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[60%] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-secondary/5 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
    </div>
  );
}
