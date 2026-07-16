"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLinkState } from "@/app/lib/state";
import { CreditCard, LogOut, Settings } from "lucide-react";

const NAV_ITEMS = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Developers", href: "/developers" },
];

export default function TopBar() {
  const { profile } = useLinkState();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="docked full-width top-0 sticky z-30 glass-header border-b border-outline-variant">
      <div className="relative flex items-center h-16 px-margin-desktop max-w-container-max mx-auto">
        {/* Logo */}


        {/* Center Navigation */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Profile */}
        <div className="relative ml-auto" ref={menuRef} >
          {/* Avatar Button */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="h-9 w-9 rounded-full border flex items-center justify-center bg-primary text-white font-semibold cursor-pointer"
          >
            {profile.name?.charAt(0).toUpperCase()}
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-outline-variant bg-surface shadow-lg overflow-hidden z-50">
              {/* User Info */}
              <div className="p-4 border-b border-outline-variant">
                <p className="font-semibold text-on-surface">
                  {profile.name}
                </p>
                <p className="text-sm text-on-surface-variant truncate">
                  {profile.email}
                </p>
              </div>

              {/* Plan */}
              <div className="p-4 border-b border-outline-variant">
                <p className="text-xs uppercase text-on-surface-variant">
                  Current Plan
                </p>
                <p className="font-medium text-primary">
                  Free Plan
                </p>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-container"
                >
                  <Settings size={18} />
                  Settings
                </Link>

                <Link
                  href="/pricing"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-container"
                >
                  <CreditCard size={18} />
                  Upgrade Plan
                </Link>
              </div>

              {/* Logout */}
              <div className="p-2 border-t border-outline-variant">
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
