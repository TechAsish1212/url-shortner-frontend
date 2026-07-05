"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLinkState } from "@/app/lib/state";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoaded } = useLinkState();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoaded, isAuthenticated, router]);

  if (!isLoaded || !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-on-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-on-surface-variant font-label-md text-label-md tracking-wider">
            Verifying secure session...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
