"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLinkState } from "@/app/lib/state";

export default function Sidebar() {
  const pathname = usePathname();
  const { setCreateModalOpen, logout } = useLinkState();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "My Links", href: "/dashboard/links", icon: "link" },
    { name: "Settings", href: "/dashboard/settings", icon: "settings" },
  ];

  return (
    <>
      {/* SideNavBar (Desktop) */}
      <aside className="hidden md:flex flex-col py-base px-4 h-screen w-64 fixed left-0 top-0 bg-surface border-r border-outline-variant z-40">
        <div className="mb-10 px-2 pt-4">
          <Link href="/">
            <h1 className="font-headline-sm text-headline-sm font-extrabold text-primary leading-none flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">link</span>
              ShortLink
            </h1>
          </Link>
          <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70 px-8">Pro Workspace</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md active:scale-95 ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-outline-variant space-y-1 pb-4">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="w-full mb-6 py-3 px-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined">add</span>
            Create New Link
          </button>
          
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors font-label-md text-label-md"
          >
            <span className="material-symbols-outlined">help</span>
            <span>Help Center</span>
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors font-label-md text-label-md"
          >
            <span className="material-symbols-outlined">code</span>
            <span>API Docs</span>
          </a>
          
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-colors font-label-md text-label-md cursor-pointer text-left"
          >
            <span className="material-symbols-outlined text-error">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Floating Action Button (Mobile Only) */}
      <button
        onClick={() => setCreateModalOpen(true)}
        className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center z-50 active:scale-90 transition-transform"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-outline-variant flex items-center justify-around px-4 z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
              >
                {item.icon}
              </span>
              <span className="text-[10px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
