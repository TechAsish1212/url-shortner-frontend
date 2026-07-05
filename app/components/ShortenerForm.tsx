// components/ShortenerForm.tsx
"use client";

import { useState } from "react";

export function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL (include https://)");
      return;
    }

    setIsLoading(true);
    setError("");
    setShortUrl("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate a random short code
    const shortCode = Math.random().toString(36).substring(2, 8);
    const fakeShortUrl = `snapshort.dev/${shortCode}`;
    setShortUrl(fakeShortUrl);
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-400 text-sm">🔗</span>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              placeholder="Paste your long URL here..."
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Shortening...
              </>
            ) : (
              <>
                <span>✨</span> Shorten
              </>
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm pl-1">{error}</p>}
      </form>

      {shortUrl && (
        <div className="mt-6 p-4 bg-blue-50/70 rounded-xl border border-blue-100/60 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-green-500 text-lg">✅</span>
            <span className="text-blue-700 font-mono text-sm truncate">{shortUrl}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex-shrink-0 px-4 py-2 text-sm bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-200 transition-all hover:shadow-sm flex items-center gap-2"
          >
            <span>📋</span> Copy
          </button>
        </div>
      )}

      <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
        <span>⚡ No registration</span>
        <span className="w-px h-3 bg-slate-200"></span>
        <span>🔒 Private & secure</span>
        <span className="w-px h-3 bg-slate-200"></span>
        <span>📊 Basic analytics</span>
      </div>
    </div>
  );
}