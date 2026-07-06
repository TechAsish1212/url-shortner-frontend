"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import TopBar from "@/app/components/TopBar";
import CreateLinkModal from "@/app/components/CreateLinkModal";
import { useLinkState } from "@/app/lib/state";
import { CopyIcon, Link2, MousePointerClick, Search, Trash, TrendingUp } from "lucide-react";

export default function LinksPage() {
  const { links, deleteLink, showToast } = useLinkState();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Expired">("All");

  // Dynamic calculations for stats
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeCount = links.filter((link) => link.status === "Active").length;

  const formatClicks = (clicks: number) => {
    if (clicks >= 1000) {
      return (clicks / 1000).toFixed(1) + "k";
    }
    return clicks.toString();
  };

  // Filter links based on search query and status filter
  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || link.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    showToast("Link copied to clipboard!");
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="md:pl-64 flex flex-col flex-grow min-h-screen">
        <TopBar />

        {/* Content Panel */}
        <main className="flex-grow px-margin-mobile md:px-margin-desktop py-12 max-w-container-max w-full mx-auto space-y-10">
          
          {/* Header & Search/Filter Actions */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Detailed Links</h2>
              <p className="text-on-surface-variant font-body-md">
                Manage and track your {links.length} shortened links.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search input */}
              <div className="relative flex-grow sm:w-80">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                  <Search/> 
                </span>
                <input
                  type="text"
                  placeholder="Search links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all font-body-md text-on-surface shadow-sm"
                />
              </div>

              {/* Status filtering dropdown/tabs */}
              <div className="flex bg-surface-container rounded-xl p-1 border border-outline-variant shadow-sm self-start">
                {(["All", "Active", "Expired"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                      statusFilter === filter
                        ? "bg-surface-container-lowest text-primary shadow-sm"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 font-semibold">Total Clicks</p>
                <h3 className="font-headline-sm text-headline-sm font-black text-on-surface">
                  {formatClicks(totalClicks)}
                </h3>
              </div>
              <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container shadow-inner">
                <span className="material-symbols-outlined font-bold"><TrendingUp/></span>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 font-semibold">Active Links</p>
                <h3 className="font-headline-sm text-headline-sm font-black text-on-surface">
                  {activeCount}
                </h3>
              </div>
              <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center text-on-tertiary-container shadow-inner">
                <span className="material-symbols-outlined font-bold"><Link2/></span>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 font-semibold">Avg. CTR</p>
                <h3 className="font-headline-sm text-headline-sm font-black text-on-surface">8.4%</h3>
              </div>
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container shadow-inner">
                <span className="material-symbols-outlined font-bold"><MousePointerClick/></span>
              </div>
            </div>
          </div>

          {/* Links Data Table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">Created Date</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">Short Link</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">Original URL</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">Clicks</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold text-center">Status</th>
                    <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredLinks.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-4xl mb-2 text-outline">search_off</span>
                        <p className="font-body-lg text-body-lg">No links match your filter criteria.</p>
                        <p className="text-sm">Try checking your search query or status filter.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredLinks.map((link) => (
                      <tr
                        key={link.id}
                        className={`link-row transition-all hover:bg-surface-container-low/30 ${
                          link.status === "Expired" ? "opacity-75 bg-surface-container-low/10" : ""
                        }`}
                      >
                        <td className="px-6 py-5 font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">
                          {link.createdDate}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`font-body-md font-bold ${link.status === "Active" ? "text-primary hover:underline" : "text-on-surface-variant"}`}>
                            {link.shortUrl}
                          </span>
                        </td>
                        <td className="px-6 py-5 max-w-[240px]">
                          <div
                            className="truncate text-on-surface-variant font-body-md font-mono"
                            title={link.originalUrl}
                          >
                            {link.originalUrl}
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-label-md font-bold text-on-surface">
                              {link.clicks.toLocaleString()}
                            </span>
                            {link.trend && (
                              <span className="text-[10px] bg-tertiary/10 text-tertiary px-1.5 py-0.5 rounded font-bold">
                                {link.trend}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-[12px] font-bold ${
                              link.status === "Active"
                                ? "bg-tertiary/10 text-tertiary border border-tertiary/10"
                                : "bg-on-surface-variant/10 text-on-surface-variant border border-on-surface-variant/10"
                            }`}
                          >
                            {link.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => handleCopy(link.shortUrl)}
                              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                              title="Copy Link"
                            >
                              <span className="material-symbols-outlined text-xl"><CopyIcon/></span>
                            </button>
                            <button
                              onClick={() => deleteLink(link.id)}
                              className="p-2 text-on-surface-variant hover:bg-error-container/20 hover:text-error rounded-lg transition-colors cursor-pointer"
                              title="Delete Link"
                            >
                              <span className="material-symbols-outlined text-xl"><Trash/></span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Global Link Creator Dialog */}
      <CreateLinkModal />
    </div>
  );
}
