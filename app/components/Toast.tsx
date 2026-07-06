"use client";

import React from "react";
import { useLinkState } from "@/app/lib/state";
import { CheckCircle } from "lucide-react";

export default function Toast() {
  const { toast } = useLinkState();

  return (
    <div
      className={`fixed bottom-8 right-8 bg-tertiary-container text-on-tertiary-container px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 font-bold font-label-md transition-all duration-300 ${
        toast
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-24 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <span
        className="material-symbols-outlined text-on-tertiary-container"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        <CheckCircle/>
      </span>
      <span>{toast}</span>
    </div>
  );
}
