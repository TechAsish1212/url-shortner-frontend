"use client";

import React from "react";
import Link from "next/link";
import { useLinkState } from "@/app/lib/state";

export default function TopBar() {
  const { profile } = useLinkState();

  return (
    <header className="docked full-width top-0 sticky z-30 glass-header border-b border-outline-variant">
      <div className="flex justify-between items-center h-16 px-margin-desktop max-w-container-max mx-auto">
        {/* Mobile Branding */}
        <div className="md:hidden">
          <Link href="/">
            <span className="font-headline-md text-headline-md font-bold text-primary">ShortLink</span>
          </Link>
        </div>

        {/* Desktop Left Nav Mock Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className="font-body-md text-body-md text-primary font-bold border-b-2 border-primary">
            Platform
          </Link>
          <a
            href="/pricing"
            onClick={(e) => e.preventDefault()}
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-transform hover:scale-105"
          >
            Pricing
          </a>
          <Link
            href="/dashboard/links"
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-transform hover:scale-105"
          >
            Analytics
          </Link>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-transform hover:scale-105"
          >
            Resources
          </a>
        </div>

        {/* User Search & Profile Area */}
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container rounded-full cursor-pointer">
            search
          </button>
          <Link href="/dashboard/settings">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant hover:ring-2 hover:ring-primary transition-all">
              <img
                className="w-full h-full object-cover"
                alt={`${profile.name}'s Avatar`}
                src={profile.avatarUrl}
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
