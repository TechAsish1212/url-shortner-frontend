"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { signin } from "../api/auth/login";

export interface LinkItem {
  id: string;
  title: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdDate: string;
  status: "Active" | "Expired";
  trend?: string;
  sparkline: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  email: string;
  avatarUrl: string;
  plan:string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
}

interface LinkStateContextType {
  links: LinkItem[];
  profile: UserProfile;
  domains: string[];
  apiKeys: ApiKey[];
  shortenLink: (title: string, originalUrl: string, customSlug?: string) => LinkItem;
  deleteLink: (id: string) => void;
  updateProfile: (name: string, handle: string, email: string) => void;
  addDomain: (domain: string) => void;
  deleteDomain: (domain: string) => void;
  regenerateApiKey: (id: string) => void;
  isLoaded: boolean;
  toast: string | null;
  showToast: (message: string) => void;
  isCreateModalOpen: boolean;
  setCreateModalOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const defaultLinks: LinkItem[] = [
  {
    id: "1",
    title: "Product Launch Campaign 2024",
    originalUrl: "https://marketing.acme.com/campaigns/summer-release/utm_source=twitter&utm_medium=social",
    shortUrl: "go.rivera.io/summer24",
    clicks: 12402,
    createdDate: "Oct 24, 2024",
    status: "Active",
    trend: "+12%",
    sparkline: "M0 35 Q 20 10, 40 25 T 80 5 T 100 15",
  },
  {
    id: "2",
    title: "Internal Q4 Documentation",
    originalUrl: "https://docs.google.com/spreadsheets/d/1vP9fA2-internal-resource-key-9283",
    shortUrl: "go.rivera.io/q4docs",
    clicks: 8912,
    createdDate: "Oct 21, 2024",
    status: "Active",
    sparkline: "M0 20 Q 20 30, 50 15 T 100 35",
  },
  {
    id: "3",
    title: "Referral Program Link",
    originalUrl: "https://app.shortlink.com/invite?user=alex_99&code=REFPRGM22",
    shortUrl: "go.rivera.io/refer-alex",
    clicks: 5430,
    createdDate: "Sep 15, 2024",
    status: "Expired",
    sparkline: "M0 38 L 20 30 L 40 32 L 60 10 L 80 15 L 100 5",
  },
  {
    id: "4",
    title: "Customer Support Ticket Auto-Reply",
    originalUrl: "https://help.acme.com/kb/article/how-to-fix-everything-instantly",
    shortUrl: "go.rivera.io/fix-it",
    clicks: 2105,
    createdDate: "Oct 10, 2024",
    status: "Active",
    trend: "+5%",
    sparkline: "M0 5 Q 30 5, 50 20 T 100 20",
  },
  {
    id: "5",
    title: "Latest Podcast Episode",
    originalUrl: "https://spotify.com/episodes/928374/shortlink-deep-dive-into-metrics",
    shortUrl: "go.rivera.io/podcast",
    clicks: 14042,
    createdDate: "Oct 18, 2024",
    status: "Active",
    trend: "+8%",
    sparkline: "M0 35 L 100 5",
  },
];

const defaultProfile: UserProfile = {
  name: "Alex Rivera",
  handle: "arivera",
  email: "alex.rivera@workspace.io",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwOjnFedqEN5unMAvyLWtitiCNuO2FfNjsauQrBfaju3AuYsJPU1OzwGTVqm1CVX9ffKDnoKA8v-c9Y_JDOsefvU0HtLDQLl4KQjt8P1mZDPis5D7bjInYUI_E6emIkRm4UVXtk4430PonbMwa2WQxEUOSb6bDdFebSJZN2aSdN4gU4gRrpWnrOMV745c2l29hP1lDHjMOqIUq2t9y2e2z4H1VlVszPwawzE5-WdwRME5RSP5aQUL3dxQJOtM5lgN7_CIQ20EtOGo",
  plan: "Free Plan",
};

const defaultDomains: string[] = ["go.rivera.io"];

const defaultApiKeys: ApiKey[] = [
  {
    id: "prod",
    name: "Production Key",
    key: "cx_live_4a1c58d04ee8d0113a9b",
  },
];

const LinkStateContext = createContext<LinkStateContextType | undefined>(undefined);

export function LinkStateProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(defaultLinks);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [domains, setDomains] = useState<string[]>(defaultDomains);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(defaultApiKeys);
  const [toast, setToast] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load from localStorage on client side mount
  useEffect(() => {
    try {
      const savedLinks = localStorage.getItem("shortlink_links");
      const savedProfile = localStorage.getItem("shortlink_profile");
      const savedDomains = localStorage.getItem("shortlink_domains");
      const savedApiKeys = localStorage.getItem("shortlink_apikeys");
      const savedAuth = localStorage.getItem("shortlink_authenticated");

      if (savedLinks) setLinks(JSON.parse(savedLinks));
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      if (savedDomains) setDomains(JSON.parse(savedDomains));
      if (savedApiKeys) setApiKeys(JSON.parse(savedApiKeys));
      if (savedAuth === "true") setIsAuthenticated(true);
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("shortlink_links", JSON.stringify(links));
    } catch (e) {
      console.error("Error saving links to localStorage", e);
    }
  }, [links, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("shortlink_profile", JSON.stringify(profile));
    } catch (e) {
      console.error("Error saving profile to localStorage", e);
    }
  }, [profile, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("shortlink_domains", JSON.stringify(domains));
    } catch (e) {
      console.error("Error saving domains to localStorage", e);
    }
  }, [domains, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("shortlink_apikeys", JSON.stringify(apiKeys));
    } catch (e) {
      console.error("Error saving api keys to localStorage", e);
    }
  }, [apiKeys, isLoaded]);

  const showToast = (message: string) => {
    setToast(message);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Actions
  const shortenLink = (title: string, originalUrl: string, customSlug?: string) => {
    const slug = customSlug || Math.random().toString(36).substring(2, 7);
    const domain = domains[0] || "shrt.lnk";
    const shortUrl = `${domain}/${slug}`;
    
    // Generate a random sparkline path for display
    const heights = Array.from({ length: 6 }, () => Math.floor(Math.random() * 30) + 5);
    const sparkline = `M0 ${heights[0]} Q 20 ${heights[1]}, 40 ${heights[2]} T 80 ${heights[3]} T 100 ${heights[4]}`;

    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: title || "Untitled URL",
      originalUrl,
      shortUrl,
      clicks: 0,
      createdDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "Active",
      sparkline,
    };

    setLinks((prev) => [newLink, ...prev]);
    showToast("Link successfully shortened!");
    return newLink;
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
    showToast("Link deleted successfully.");
  };

  const updateProfile = (name: string, handle: string, email: string) => {
    setProfile((prev) => ({
      ...prev,
      name,
      handle,
      email,
    }));
    showToast("Profile details updated.");
  };

  const addDomain = (domain: string) => {
    if (domain && !domains.includes(domain)) {
      setDomains((prev) => [...prev, domain]);
      showToast(`Domain ${domain} connected.`);
    }
  };

  const deleteDomain = (domain: string) => {
    setDomains((prev) => prev.filter((d) => d !== domain));
    showToast(`Domain ${domain} removed.`);
  };

  const regenerateApiKey = (id: string) => {
    const randomHex = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    const newKey = `cx_live_${randomHex}`;

    setApiKeys((prev) =>
      prev.map((key) => (key.id === id ? { ...key, key: newKey } : key))
    );
    showToast("API key regenerated.");
  };

const login = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const response = await signin({
      email,
      password,
    });

    const data = await response.json();

    if (!response.ok) {
      showToast(data.message || "Login failed");
      return false;
    }

    // Save JWT
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // Save User
    if (data.data) {
      setProfile({
        name: data.data.name,
        handle: data.data.name?.toLowerCase() || "",
        email: data.data.email,
        avatarUrl: data.data.avatar || "",
        plan: data.data.plan || "Free Plan",
      });
    }

    setIsAuthenticated(true);
    localStorage.setItem("shortlink_authenticated", "true");

    showToast("Login successful");

    return true;
  } catch (error) {
    console.error(error);
    showToast("Authentication failed");
    return false;
  }
};

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    if (password.length < 8) {
      showToast("Password must be at least 8 characters.");
      return false;
    }

    const handle = email.split("@")[0].toLowerCase();
    const newProfile = {
      name,
      handle,
      email,
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${handle}`,
      plan: "Free Plan"
    };

    setProfile(newProfile);
    setIsAuthenticated(true);
    localStorage.setItem("shortlink_authenticated", "true");
    showToast("Account created successfully!");
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("shortlink_authenticated");
    showToast("Logged out successfully.");
  };

  return (
    <LinkStateContext.Provider
      value={{
        links,
        profile,
        domains,
        apiKeys,
        shortenLink,
        deleteLink,
        updateProfile,
        addDomain,
        deleteDomain,
        regenerateApiKey,
        isLoaded,
        toast,
        showToast,
        isCreateModalOpen,
        setCreateModalOpen,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </LinkStateContext.Provider>
  );
}

export function useLinkState() {
  const context = useContext(LinkStateContext);
  if (context === undefined) {
    throw new Error("useLinkState must be used within a LinkStateProvider");
  }
  return context;
}
