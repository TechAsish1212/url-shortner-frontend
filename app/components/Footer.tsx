"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2 } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const isAuth = pathname === "/login" || pathname === "/signup";
  if (pathname.startsWith("/dashboard") || isAuth) {
    return null;
  }
  const categories = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Developer API", href: "/developers" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-inverse-surface text-inverse-on-surface border-t border-outline/25 py-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-gutter">
          {/* Logo & Description */}
          <div className="md:col-span-6 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              {/* <Link2 className="h-6 w-6 text-primary-fixed" /> */}
              <span className="text-headline-md font-extrabold text-primary">
                CrixLink
              </span>
            </Link>
            <p className="font-body-md text-body-md text-inverse-on-surface/70 max-w-sm">
              Precision URL management for the modern web ecosystem. Redirection at the edge with real-time deep diagnostics.
            </p>
          </div>

          {/* Categories */}
          <div className="md:col-span-6 grid grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.title} className="space-y-4">
                <h4 className="font-headline-sm text-sm font-bold tracking-wider text-primary-fixed uppercase">
                  {category.title}
                </h4>
                <ul className="space-y-2.5">
                  {category.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-label-md text-label-md text-inverse-on-surface/80 hover:text-primary-fixed transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-16 pt-8 border-t border-outline/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-label-sm text-label-sm text-inverse-on-surface/50">
            © {new Date().getFullYear()} CrixLink Inc. Built for the modern web.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-inverse-on-surface/50 hover:text-primary-fixed transition-colors"
              aria-label="Twitter/X"
            >
              <span className="font-label-sm text-label-sm">Twitter</span>
            </a>
            <a
              href="#"
              className="text-inverse-on-surface/50 hover:text-primary-fixed transition-colors"
              aria-label="GitHub"
            >
              <span className="font-label-sm text-label-sm">GitHub</span>
            </a>
            <a
              href="#"
              className="text-inverse-on-surface/50 hover:text-primary-fixed transition-colors"
              aria-label="Discord"
            >
              <span className="font-label-sm text-label-sm">Discord</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
