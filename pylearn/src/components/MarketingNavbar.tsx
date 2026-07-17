"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { Search, Menu, X, LogOut, LayoutDashboard } from "lucide-react";

export const MarketingNavbar: React.FC = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Courses", href: "/courses" },
    { name: "Pricing", href: "/pricing" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-paper/95 transition-all duration-200 border-b ${
        scrolled ? "shadow-sm border-line-strong backdrop-blur-md" : "border-line"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Logo showTagline={false} size={30} />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-scale-small font-semibold relative py-1 transition-colors ${
                  isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Visual Search Box */}
          <div className="relative w-48">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-9 pl-8 pr-3 text-xs bg-surface border border-line rounded-md focus:outline-none focus:ring-1 focus:ring-ink focus:border-ink"
            />
            <Search className="w-3.5 h-3.5 text-ink-3 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {status === "loading" ? (
            <div className="w-20 h-9 bg-surface-sink animate-pulse rounded-md" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="secondary" size="sm">
                  <LayoutDashboard className="w-4 h-4 mr-1.5" />
                  Dashboard
                </Button>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2 text-ink-2 hover:text-red hover:bg-red-soft rounded-md transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {session && (
            <Link href="/dashboard" className="mr-2">
              <Button variant="secondary" size="sm">
                Dashboard
              </Button>
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink-2 hover:text-ink hover:bg-surface-sink rounded-md"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-paper px-4 py-4 space-y-4 animate-fade-in">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full h-10 pl-9 pr-3 text-sm bg-surface border border-line rounded-md"
            />
            <Search className="w-4 h-4 text-ink-3 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-scale-body font-semibold px-2 py-1.5 rounded-md ${
                  pathname === link.href ? "bg-surface-sink text-ink" : "text-ink-2"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Auth Button */}
          {!session && (
            <div className="flex flex-col gap-2 pt-2 border-t border-line">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          {session && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="w-full text-left flex items-center gap-2 text-scale-body font-semibold px-2 py-2 rounded-md text-red hover:bg-red-soft"
            >
              <LogOut className="w-5 h-5" />
              Log out
            </button>
          )}
        </div>
      )}
    </header>
  );
};
export default MarketingNavbar;
