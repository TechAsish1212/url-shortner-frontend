"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import TopBar from "@/app/components/TopBar";
import CreateLinkModal from "@/app/components/CreateLinkModal";

export default function AnalyticsPage() {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="md:pl-64 flex flex-col flex-grow min-h-screen">
        <TopBar />

        <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
          <div className="max-w-2xl text-center">

            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
             Analytics Coming Soon
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight">
              Powerful Analytics Are On the Way
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              We're building a comprehensive analytics dashboard to help you
              understand your short links with real-time insights and beautiful
              visualizations.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border p-5 text-left">
                <h3 className="font-semibold">📈 Click Analytics</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Total clicks, unique visitors, CTR, and historical trends.
                </p>
              </div>

              <div className="rounded-2xl border p-5 text-left">
                <h3 className="font-semibold">🌍 Geographic Insights</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Country, city, region, and interactive visitor maps.
                </p>
              </div>

              <div className="rounded-2xl border p-5 text-left">
                <h3 className="font-semibold">📱 Device Breakdown</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Mobile, desktop, tablet, browser, and operating system
                  statistics.
                </p>
              </div>

              <div className="rounded-2xl border p-5 text-left">
                <h3 className="font-semibold">🚀 Traffic Sources</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Referrers, social platforms, direct traffic, and campaign
                  performance.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <button
                disabled
                className="rounded-xl bg-primary px-6 py-3 font-medium text-white opacity-60 cursor-not-allowed"
              >
                Analytics Coming Soon
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Global Link Creator Dialog */}
      <CreateLinkModal />
    </div>
  );
}
