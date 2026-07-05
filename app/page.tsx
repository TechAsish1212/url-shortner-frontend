"use client";

import React, { useState } from "react";
import MarketingHeader from "@/app/components/MarketingHeader";
import { useLinkState } from "@/app/lib/state";
import Link from "next/link";
import { AppleIcon, Building2, ChartNoAxesCombined, Link2, LinkIcon, Zap } from "lucide-react";
import { MdSecurity, MdSpeed } from "react-icons/md";

export default function Home() {
  const { shortenLink, showToast } = useLinkState();
  const [url, setUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = "https://" + targetUrl;
    }

    try {
      const newLink = shortenLink("Quick Shortened URL", targetUrl);
      setGeneratedLink(newLink.shortUrl);
      setUrl("");
    } catch (err) {
      console.error("Shortening failed", err);
    }
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(`https://${generatedLink}`);
    showToast("Link copied to clipboard!");
  };

  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed-dim selection:text-on-primary-fixed min-h-screen flex flex-col">

      <main className="flex-1 relative overflow-hidden pt-16">
        {/* Hero Section */}
        <section className="hero-gradient relative pt-20 pb-32 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto text-center space-y-12">
            <div className="space-y-6">
              <h1 className="font-display-lg text-display-lg text-on-surface max-w-3xl mx-auto">
                Make every connection <span className="text-primary font-extrabold">count</span>.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                A precision-engineered platform for high-performance URL management, detailed analytics, and custom brand identity.
              </p>
            </div>

            {/* Input Area: Negative Space Layout */}
            <div className="max-w-3xl mx-auto mt-20 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-1000"></div>
              
              <form
                onSubmit={handleSubmit}
                className="relative bg-surface-container-lowest border border-outline-variant p-2 rounded-2xl flex flex-col md:flex-row items-stretch gap-2 transition-all duration-300 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-4"
              >
                <div className="flex-grow flex items-center px-4 py-3 md:py-0">
                  <span className="material-symbols-outlined text-outline mr-3"><Link2 /></span>
                  <input
                    className="w-full bg-transparent border-none font-body-lg text-body-lg placeholder:text-outline-variant outline-none focus:outline-none"
                    placeholder="Paste a long URL to shorten..."
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline-sm text-headline-sm hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/20"
                >
                  Shorten
                  <span className="material-symbols-outlined"><Zap/></span>
                </button>
              </form>

              {/* Show generated URL details */}
              {generatedLink && (
                <div className="mt-6 p-5 bg-surface-container border border-outline-variant rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 animate-float-up">
                  <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
                    <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                    <div className="text-left overflow-hidden">
                      <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Shortened link</p>
                      <a
                        href={`https://${generatedLink}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-headline-sm text-headline-sm font-bold text-primary hover:underline truncate block"
                      >
                        {generatedLink}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopy}
                      className="w-full sm:w-auto px-5 py-3 bg-secondary text-on-secondary rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-secondary/15 cursor-pointer"
                    >
                      <span className="material-symbols-outlined">content_copy</span>
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Badges / Social Proof */}
            <div className="pt-16 animate-fade-in">
              <p className="font-label-sm text-label-sm text-outline mb-8 uppercase tracking-widest">
                Trusted by 50,000+ creators and brands
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 hover:opacity-80 transition-opacity duration-500">
                <div className="h-8 px-4 py-1.5 bg-on-surface-variant/10 rounded flex items-center justify-center font-bold text-xs tracking-widest text-outline">ACME CORP</div>
                <div className="h-8 px-4 py-1.5 bg-on-surface-variant/10 rounded flex items-center justify-center font-bold text-xs tracking-widest text-outline">STARK IND</div>
                <div className="h-8 px-4 py-1.5 bg-on-surface-variant/10 rounded flex items-center justify-center font-bold text-xs tracking-widest text-outline">OSCORP</div>
                <div className="h-8 px-4 py-1.5 bg-on-surface-variant/10 rounded flex items-center justify-center font-bold text-xs tracking-widest text-outline">TYRELL</div>
                <div className="h-8 px-4 py-1.5 bg-on-surface-variant/10 rounded flex items-center justify-center font-bold text-xs tracking-widest text-outline">WAYNE ENT</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 bg-surface-container-low px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Feature 1 */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant hover:border-primary transition-colors duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl"><ChartNoAxesCombined/></span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 font-bold">Real-time Analytics</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Track clicks, geographic data, and referral sources in real-time. Gain deep insights into how your audience interacts with your links.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant hover:border-primary transition-colors duration-300 group">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl"><Building2 /></span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 font-bold">Custom Domains</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Maintain brand consistency by using your own domain name. Transform generic links into recognizable branded assets.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant hover:border-primary transition-colors duration-300 group">
                <div className="w-12 h-12 bg-tertiary-container/10 rounded-xl flex items-center justify-center mb-6 text-tertiary-container group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl"><LinkIcon/></span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 font-bold">API Access</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Scale your workflows with our robust API. Integrate shortening directly into your product or internal marketing automation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Visualization Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Large Image Card */}
            <div className="md:col-span-8 h-[500px] rounded-3xl overflow-hidden relative group border border-outline-variant">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="A futuristic, high-tech dashboard interface showing real-time global link click data on a dark map."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9jKwfoNoDh7M0aRqvc1DnlbjXAXXtuY9DzQLEFpv8vAJTOhEToAFPNCOzWO-jY3GL--W5SgOPTEJxC_V_HzgRSimeD58h8hxqVToixsiCPGJjWdR7Dv8LqXg963sMJg6nWJwRrt_BITdTsektOA27SCeh1nvgBNyY2AFMSr7aIlWHfvwvsQ3T3SHis9QSaT2uv-0FKgqO7UKbTugK5VC_bt7D6JwZ7nsgzBZt4Us91dH2OYFpjhQQL6ekrWHXo10oMLmRsbL5fU4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-10">
                <span className="font-label-sm text-label-sm text-white/80 uppercase mb-2 tracking-widest">Live Insights</span>
                <h2 className="font-headline-md text-headline-md text-white font-bold leading-tight max-w-lg">
                  Understand your audience like never before.
                </h2>
              </div>
            </div>
            {/* Small Floating Card */}
            <div className="md:col-span-4 flex flex-col gap-gutter">
              <div className="bg-primary p-8 rounded-3xl text-on-primary flex-1 flex flex-col justify-between shadow-lg shadow-primary/10">
                <span className="material-symbols-outlined text-4xl"><MdSecurity/></span>
                <div className="mt-8">
                  <h4 className="font-headline-sm text-headline-sm mb-2 font-bold">Enterprise Security</h4>
                  <p className="font-body-md text-body-md opacity-90 leading-relaxed">
                    SSO, 2FA, and granular permissions for team safety.
                  </p>
                </div>
              </div>
              <div className="bg-tertiary-fixed p-8 rounded-3xl text-on-tertiary-fixed flex-1 flex flex-col justify-between shadow-lg shadow-tertiary-fixed/10">
                <span className="material-symbols-outlined text-4xl"><MdSpeed/></span>
                <div className="mt-8">
                  <h4 className="font-headline-sm text-headline-sm mb-2 font-bold">Global Edge</h4>
                  <p className="font-body-md text-body-md opacity-90 leading-relaxed">
                    Redirects delivered via 200+ edge locations globally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop text-center bg-inverse-surface text-inverse-on-surface rounded-t-[4rem] flex flex-col justify-center items-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="font-display-lg text-display-lg font-bold">Ready to optimize your links?</h2>
            <p className="font-body-lg text-body-lg opacity-80 max-w-xl mx-auto">
              Join thousands of businesses already scaling their reach with ShortLink.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-headline-sm hover:scale-105 active:scale-95 transition-transform duration-200 font-bold block"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
