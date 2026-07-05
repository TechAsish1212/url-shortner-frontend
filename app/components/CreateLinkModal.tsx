"use client";

import React, { useState } from "react";
import { useLinkState } from "@/app/lib/state";

export default function CreateLinkModal() {
  const { isCreateModalOpen, setCreateModalOpen, shortenLink, domains } = useLinkState();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");

  if (!isCreateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Normalize URL
    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = "https://" + targetUrl;
    }

    shortenLink(title.trim(), targetUrl, slug.trim());
    setTitle("");
    setUrl("");
    setSlug("");
    setCreateModalOpen(false);
  };

  const handleClose = () => {
    setTitle("");
    setUrl("");
    setSlug("");
    setCreateModalOpen(false);
  };

  const activeDomain = domains[0] || "shrt.lnk";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={handleClose}></div>
      <div className="relative bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-lg w-full p-8 shadow-2xl animate-float-up">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-2xl">add_link</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Create New Link</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
              Link Title
            </label>
            <input
              type="text"
              placeholder="e.g. Summer Promo Campaign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none font-body-md text-on-surface"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
              Original Destination URL
            </label>
            <input
              type="text"
              placeholder="e.g. https://my-store.com/promo-landing"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none font-body-md text-on-surface"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
              Custom Path Slug (Optional)
            </label>
            <div className="flex items-stretch rounded-lg overflow-hidden border border-outline-variant focus-within:ring-2 focus-within:ring-primary">
              <span className="bg-surface-container-low px-4 flex items-center border-r border-outline-variant text-outline font-label-md text-label-md">
                {activeDomain}/
              </span>
              <input
                type="text"
                placeholder="summer24"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-surface-container-low px-4 py-3 focus:outline-none font-body-md text-on-surface"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 border border-outline-variant text-on-surface-variant rounded-lg font-bold hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-bold hover:scale-[1.02] active:scale-98 transition-all shadow-md shadow-primary/20"
            >
              Generate Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
