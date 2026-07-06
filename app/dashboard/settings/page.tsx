"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import TopBar from "@/app/components/TopBar";
import CreateLinkModal from "@/app/components/CreateLinkModal";
import { useLinkState } from "@/app/lib/state";
import { Camera, User2Icon } from "lucide-react";
import { MdAddCircle, MdArrowForward, MdContentCopy, MdDelete, MdLanguage, MdRefresh, MdVpnKey } from "react-icons/md";

export default function SettingsPage() {
  const {
    profile,
    updateProfile,
    apiKeys,
    regenerateApiKey,
    domains,
    addDomain,
    deleteDomain,
    links,
    showToast,
    logout,
  } = useLinkState();

  // Profile forms state
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");

  // Domain add state
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const [newDomainInput, setNewDomainInput] = useState("");

  // Sync profile local state on load
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setHandle(profile.handle);
      setEmail(profile.email);
    }
  }, [profile]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !handle.trim() || !email.trim()) return;
    updateProfile(name.trim(), handle.trim(), email.trim());
  };

  const handleAddDomainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomainInput.trim()) return;
    
    // Simple validation
    let domainStr = newDomainInput.trim().toLowerCase();
    domainStr = domainStr.replace(/^(https?:\/\/)?(www\.)?/, ""); // strip protocol/www
    
    if (domainStr.includes("/") || domainStr.length < 4) {
      showToast("Invalid domain format.");
      return;
    }

    addDomain(domainStr);
    setNewDomainInput("");
    setIsAddingDomain(false);
  };

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    showToast("API key copied to clipboard!");
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 12) return key;
    return `${key.slice(0, 8)}••••••••••••••••${key.slice(-4)}`;
  };

  const usagePercent = Math.min((links.length / 100) * 100, 100);

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="md:pl-64 flex flex-col flex-grow min-h-screen">
        <TopBar />

        {/* Content Canvas */}
        <main className="flex-grow px-margin-mobile md:px-margin-desktop py-12 max-w-5xl w-full mx-auto space-y-12">
          
          {/* Header */}
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">Account Settings</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Manage your workspace preferences, domains, and security keys.
            </p>
          </div>

          {/* Bento Grid Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            
            {/* Left Column (Profile & API Keys) */}
            <div className="lg:col-span-7 space-y-gutter">
              
              {/* Profile Details Form */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary"><User2Icon/></span>
                    <h3 className="font-headline-sm text-headline-sm font-bold">Profile Details</h3>
                  </div>
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-[12px] font-bold">
                    Pro Member
                  </span>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-surface-container shadow-inner">
                        <img
                          className="w-full h-full object-cover"
                          alt="Alex Rivera Profile Pic"
                          src={profile.avatarUrl}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast("Avatar editing coming soon!")}
                        className="absolute bottom-0 right-0 bg-primary text-on-primary p-2 rounded-full shadow-md hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]"><Camera/></span>
                      </button>
                    </div>

                    <div className="flex-grow w-full space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:outline-none font-body-md text-on-surface"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                            Public Handle
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-2.5 text-outline">@</span>
                            <input
                              type="text"
                              value={handle}
                              onChange={(e) => setHandle(e.target.value)}
                              className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-8 pr-4 py-2.5 focus:ring-2 focus:ring-primary focus:outline-none font-body-md text-on-surface"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:outline-none font-body-md text-on-surface"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-outline-variant flex justify-end items-center">             
                    <button
                      type="submit"
                      className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-primary/10 cursor-pointer"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>

              {/* TODO */}
              {/* API Access Keys */}
              {/* <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary"><MdVpnKey/></span>
                  <h3 className="font-headline-sm text-headline-sm font-bold">API Access</h3>
                </div>
                <p className="text-on-surface-variant font-body-md mb-6 leading-relaxed">
                  Connect CrixLink to your custom applications or workflows using our secure developer API.
                </p>

                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="p-4 bg-surface-container-low border border-outline-variant rounded-xl flex items-center justify-between group transition-colors hover:bg-surface-container"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-sm text-label-sm text-outline font-semibold">
                          {key.name}
                        </span>
                        <code className="font-label-md text-label-md text-on-surface mt-1 tracking-widest font-mono truncate">
                          {maskApiKey(key.key)}
                        </code>
                      </div>
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopyApiKey(key.key)}
                          className="p-2 text-primary hover:bg-primary-container/20 rounded-lg transition-colors cursor-pointer"
                          title="Copy API Key"
                        >
                          <span className="material-symbols-outlined text-lg"><MdContentCopy/></span>
                        </button>
                        <button
                          onClick={() => regenerateApiKey(key.id)}
                          className="p-2 text-error hover:bg-error-container/20 rounded-lg transition-colors cursor-pointer"
                          title="Regenerate API Key"
                        >
                          <span className="material-symbols-outlined text-lg"><MdRefresh/></span>
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => showToast("Additional keys require enterprise plan.")}
                      className="flex-grow py-3 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span className="material-symbols-outlined"><MdAddCircle/></span>
                      Generate New Key
                    </button>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="px-4 py-3 border border-outline-variant text-on-surface-variant rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
                      title="API Guide"
                    >
                      <span className="material-symbols-outlined">help</span>
                    </a>
                  </div>
                </div>
              </div> */}

            </div>

            {/* Right Column (Domains & Limits) */}
            <div className="lg:col-span-5 space-y-gutter">
              
              {/* Custom Domains Manager */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-sm transition-all hover:shadow-md h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary"><MdLanguage/></span>
                    <h3 className="font-headline-sm text-headline-sm font-bold">Custom Domains</h3>
                  </div>
                  <p className="text-on-surface-variant font-body-md mb-8 leading-relaxed">
                    Personalize your short links by connecting your own branded domain name.
                  </p>

                  <div className="space-y-6 mb-8">
                    {/* Domains List */}
                    {domains.map((domain) => (
                      <div key={domain} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-15 group-hover:opacity-35 transition duration-1000"></div>
                        <div className="relative bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-inner">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-on-surface font-mono">{domain}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 bg-tertiary-fixed-dim rounded-full animate-pulse"></span>
                                <span className="font-label-sm text-label-sm text-tertiary font-bold">
                                  Active
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteDomain(domain)}
                              className="text-on-surface-variant hover:text-error transition-colors p-1.5 rounded-lg hover:bg-error-container/10 cursor-pointer"
                              title="Disconnect Domain"
                            >
                              <span className="material-symbols-outlined"><MdDelete/></span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Domain Trigger/Form */}
                    {isAddingDomain ? (
                      <form onSubmit={handleAddDomainSubmit} className="p-5 border-2 border-primary rounded-xl space-y-4 bg-surface-container-low animate-fade-in">
                        <h4 className="font-bold text-on-surface text-sm">Add Custom Domain</h4>
                        <div className="flex flex-col gap-1">
                          <input
                            type="text"
                            placeholder="e.g. lnk.mybrand.com"
                            value={newDomainInput}
                            onChange={(e) => setNewDomainInput(e.target.value)}
                            className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full text-on-surface font-mono"
                            autoFocus
                            required
                          />
                        </div>
                        <div className="flex justify-end gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setIsAddingDomain(false)}
                            className="px-3 py-1.5 border border-outline-variant text-on-surface-variant rounded-lg hover:bg-surface-container transition-colors font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1.5 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="p-6 border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-4">
                          <span className="material-symbols-outlined text-outline"><MdAddCircle/></span>
                        </div>
                        <h4 className="font-bold text-on-surface mb-1">Add a Domain</h4>
                        <p className="text-on-surface-variant font-label-md mb-6 leading-relaxed">
                          Boost click-through rates with your own branded URLs.
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsAddingDomain(true)}
                          className="w-full bg-secondary text-on-secondary py-3 rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                        >
                          Connect Domain
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-surface-container-low p-4 rounded-xl">
                    <h5 className="font-label-md text-label-md font-bold mb-2 flex items-center gap-2 text-on-surface">
                      <span className="material-symbols-outlined text-[16px] text-primary"><MdLanguage/></span>
                      DNS Setup Guide
                    </h5>
                    <p className="text-[13px] text-on-surface-variant leading-relaxed">
                      Point your domain's A record to{" "}
                      <code className="bg-surface-container-highest px-1.5 py-0.5 rounded font-mono font-bold text-on-surface">
                        75.2.60.5
                      </code>{" "}
                      to complete the connection.
                    </p>
                  </div>

                  {/* Monthly Limits widget */}
                  <div className="bg-primary text-on-primary rounded-xl p-6 relative overflow-hidden group shadow-lg shadow-primary/10">
                    <div className="relative z-10 space-y-4">
                      <div>
                        <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-80 mb-1">
                          Monthly Usage
                        </p>
                        <h4 className="font-headline-sm text-headline-sm font-bold">
                          {links.length} / 100 links
                        </h4>
                      </div>
                      <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${usagePercent}%` }}
                          className="bg-white h-full rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-500"
                        ></div>
                      </div>
                      <button
                        onClick={() => showToast("Subscriptions details coming soon!")}
                        className="text-on-primary font-bold text-label-md flex items-center gap-1 group-hover:translate-x-2 transition-transform cursor-pointer"
                      >
                        Upgrade Workspace
                        <span className="material-symbols-outlined text-sm"><MdArrowForward/></span>
                      </button>
                    </div>
                  </div>
                </div>
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
