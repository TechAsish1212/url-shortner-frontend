"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2 } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useLinkState } from "../lib/state";

const NAV_ITEMS = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Developers", href: "/developers" },
];

export default function MarketingHeader() {
  const pathname = usePathname();
  const { profile, isAuthenticated } = useLinkState();

 if (pathname.startsWith("/dashboard")) {
  return null;
}

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant bg-surface/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-container-max items-center justify-between px-margin-desktop"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="CrixLink Home"
          className="flex items-center gap-2"
        >
          <Link2 className="h-5 w-5 text-primary" />
          <span className="text-headline-md font-extrabold text-primary">
            CrixLink
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors hover:text-primary ${
                  isActive
                    ? "font-semibold text-primary"
                    : "text-on-surface-variant"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="font-semibold text-on-surface-variant hover:text-primary"
              >
                Log In
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary"
              >
                Get Started
              </Link>
            </>
          ) : (
            <ProfileDropdown profile={profile} />
          )}
        </div>
      </nav>
    </header>
  );
}
