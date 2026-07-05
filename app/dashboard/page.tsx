"use client";

import React from "react";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import TopBar from "@/app/components/TopBar";
import CreateLinkModal from "@/app/components/CreateLinkModal";
import { useLinkState } from "@/app/lib/state";

export default function Dashboard() {
  const { links, deleteLink, showToast, profile } = useLinkState();

  // Dynamic calculations
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeCount = links.filter((link) => link.status === "Active").length;

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    showToast("Link copied to clipboard!");
  };

  // Recent 5 links
  const recentLinks = links.slice(0, 5);

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Sidebar for desktop / Mobile navigation */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="md:pl-64 flex flex-col flex-grow min-h-screen">
        <TopBar />

        {/* Dashboard Panels */}
        <main className="flex-grow px-margin-mobile md:px-margin-desktop py-12 max-w-container-max w-full mx-auto space-y-12">
          {/* Greeting */}
          <div>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2 font-extrabold">
              Welcome back, {profile.name.split(" ")[0]}.
            </h2>
            <p className="text-on-surface-variant font-body-lg text-body-lg">
              Here's what's happening with your workspace today.
            </p>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Stat: Total Clicks */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant flex flex-col justify-between h-48 relative overflow-hidden group shadow-sm">
              <div className="z-10">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
                  Total Clicks
                </p>
                <p className="font-display-lg text-display-lg text-primary font-black">
                  {totalClicks.toLocaleString()}
                </p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">ads_click</span>
              </div>
              <div className="flex items-center gap-2 text-tertiary font-bold">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span className="text-sm">+12% from last week</span>
              </div>
            </div>

            {/* Stat: Active Links */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant flex flex-col justify-between h-48 relative overflow-hidden group shadow-sm">
              <div className="z-10">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
                  Active Links
                </p>
                <p className="font-display-lg text-display-lg text-secondary font-black">
                  {activeCount.toLocaleString()}
                </p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">link</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-bold">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span className="text-sm">All systems operational</span>
              </div>
            </div>

            {/* Upgrade banner CTA */}
            <div className="bg-primary-container p-8 rounded-2xl border border-primary text-on-primary-container flex flex-col justify-center h-48 relative overflow-hidden shadow-lg shadow-primary/20">
              <div className="relative z-10">
                <p className="font-headline-sm text-headline-sm font-bold mb-2">Grow your reach</p>
                <p className="text-sm mb-4 opacity-90">
                  Upgrade to Pro for custom domains and advanced deep linking.
                </p>
                <button
                  onClick={() => showToast("Subscription options coming soon!")}
                  className="bg-surface-container-lowest text-primary font-bold py-2 px-4 rounded-lg text-sm hover:scale-105 transition-all shadow-sm cursor-pointer"
                >
                  Explore Plans
                </button>
              </div>
            </div>
          </div>

          {/* Recent Links Listing */}
          <div>
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Recent Links</h3>
              <Link
                href="/dashboard/links"
                className="text-primary font-bold text-sm flex items-center gap-1 hover:underline group"
              >
                View all links
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
              {/* Table Header (Desktop) */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-outline-variant bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">
                <div className="col-span-5">Link Details</div>
                <div className="col-span-3 text-center">Shortened URL</div>
                <div className="col-span-2 text-center">Activity Trend</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-outline-variant">
                {recentLinks.length === 0 ? (
                  <div className="p-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl mb-2 text-outline">link_off</span>
                    <p className="font-body-lg text-body-lg">No links found in your workspace.</p>
                    <p className="text-sm">Click "Create New Link" to generate your first link!</p>
                  </div>
                ) : (
                  recentLinks.map((link) => (
                    <div
                      key={link.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 items-center link-row group hover:bg-surface-container-low/40 transition-colors"
                    >
                      {/* Name & Target */}
                      <div className="col-span-5 flex flex-col min-w-0">
                        <span className="font-body-md text-body-md font-bold text-on-surface truncate">
                          {link.title}
                        </span>
                        <span className="text-sm text-on-surface-variant truncate font-mono">
                          {link.originalUrl}
                        </span>
                      </div>

                      {/* Short Link copy trigger */}
                      <div className="col-span-3 flex justify-center">
                        <div
                          onClick={() => handleCopy(link.shortUrl)}
                          className="bg-secondary-container/5 text-secondary border border-secondary-container/10 px-3 py-1.5 rounded-lg font-label-md text-label-md flex items-center gap-2 cursor-pointer hover:bg-secondary-container/15 hover:border-secondary-container/20 group/btn transition-colors"
                        >
                          <span className="font-mono">{link.shortUrl}</span>
                          <span className="material-symbols-outlined text-base text-secondary/70 group-hover/btn:text-secondary">
                            content_copy
                          </span>
                        </div>
                      </div>

                      {/* Sparkline Visualizer */}
                      <div className="col-span-2 flex justify-center">
                        <div className="flex flex-col items-center">
                          <svg className="w-24 h-8" viewBox="0 0 100 40">
                            <path
                              className={`sparkline ${
                                link.status === "Active" ? "text-tertiary" : "text-outline"
                              }`}
                              d={link.sparkline}
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeWidth="2.5"
                            />
                          </svg>
                          <span className="text-[10px] text-outline font-bold mt-1">
                            {link.clicks.toLocaleString()} clicks
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="col-span-2 flex justify-end gap-1.5">
                        <Link
                          href="/dashboard/links"
                          className="p-2 hover:bg-surface-container rounded-lg material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
                          title="View Analytics"
                        >
                          bar_chart
                        </Link>
                        <button
                          onClick={() => deleteLink(link.id)}
                          className="p-2 hover:bg-error-container/20 rounded-lg material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-error transition-colors"
                          title="Delete Link"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Global Link Creator Dialog */}
      <CreateLinkModal />
    </div>
  );
}
