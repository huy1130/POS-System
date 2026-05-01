"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing",  href: "/pricing"  },
  { label: "About",    href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-transparent bg-transparent transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Layers className="h-[18px] w-[18px] text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-gray-900 dark:text-white">Lumio</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "relative text-sm transition-colors pb-0.5",
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex border-gray-400/60 dark:border-gray-500/60 bg-white/20 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-white/20 backdrop-blur-sm"
            >
              Đăng nhập
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="hidden md:flex bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-sm backdrop-blur-sm">
              Đăng ký
            </Button>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/20 dark:border-white/10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm px-6 py-4 space-y-1 md:hidden">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
                )}
                {label}
              </Link>
            );
          })}
          <div className="pt-2 flex gap-2">
            <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">Đăng nhập</Button>
            </Link>
            <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">Đăng ký</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
