"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  Crown,
  LogOut,
} from "lucide-react";

export default function ProfileDropdown({
  profile,
}: {
  profile: {
    name: string;
    email: string;
    avatarUrl: string;
    plan: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)}>
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="h-9 w-9 rounded-full border object-cover cursor-pointer"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 rounded-2xl border bg-surface shadow-xl overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold">{profile.name}</h3>
            <p className="text-sm text-on-surface-variant">
              {profile.email}
            </p>
          </div>

          {/* <div className="p-4 flex items-center gap-2">
            <Crown size={16} />
            <span>{profile.plan} Plan</span>
          </div> */}

          <div className="p-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-surface-container"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-surface-container"
            >
              <Settings size={18} />
              Settings
            </Link>
          </div>

          <div className="border-t p-2">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}