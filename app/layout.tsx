import type { Metadata } from "next";
import "./globals.css";
import { LinkStateProvider } from "@/app/lib/state";
import Toast from "@/app/components/Toast";
import MarketingHeader from "./components/MarketingHeader";
import RootBody from "@/app/components/RootBody";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "ShortLink | Precision URL Management",
  description:
    "A precision-engineered platform for high-performance URL management, detailed analytics, and custom brand identity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <RootBody>
        <LinkStateProvider>
          <MarketingHeader />
          {children}
          <Toast />
          <Footer />
        </LinkStateProvider>
      </RootBody>
    </html>
  );
}
