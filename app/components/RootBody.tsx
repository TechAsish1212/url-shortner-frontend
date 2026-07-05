"use client";

import { usePathname } from "next/navigation";

export default function RootBody({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAuth = pathname === "/login" || pathname === "/signup";

  return (
    <body className={`min-h-full flex flex-col ${isDashboard || isAuth ? "" : "pt-16"}`}>
      {children}
    </body>
  );
}
