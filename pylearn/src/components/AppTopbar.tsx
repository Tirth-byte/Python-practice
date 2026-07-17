"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, Flame, Award, ChevronRight } from "lucide-react";
import { StatPill } from "./StatPill";
import Link from "next/link";

interface AppTopbarProps {
  onMenuOpen: () => void;
}

export const AppTopbar: React.FC<AppTopbarProps> = ({ onMenuOpen }) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Generate breadcrumb items
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { label, href, isLast: index === pathSegments.length - 1 };
  });

  // Mock stats matching the demo user
  const streak = 15;
  const xp = 640;

  return (
    <header className="h-16 bg-surface border-b border-line flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 select-none">
      {/* Left side: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="p-2 text-ink-2 hover:text-ink hover:bg-surface-sink rounded-md md:hidden"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="hidden sm:flex items-center text-xs font-sans text-ink-3">
          <Link href="/dashboard" className="hover:text-ink transition-colors font-medium">
            PyLearn
          </Link>
          {breadcrumbs.length > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1" />}
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.href}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1" />}
              {crumb.isLast ? (
                <span className="font-semibold text-ink max-w-[200px] truncate">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-ink transition-colors max-w-[150px] truncate"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right side: Stats + Profile */}
      <div className="flex items-center gap-3">
        {/* Streak Pill */}
        <StatPill
          icon={<Flame className="w-4 h-4 text-gold fill-gold" />}
          value={streak}
          label="days"
          className="border-line"
        />

        {/* XP Pill */}
        <StatPill
          icon={<Award className="w-4 h-4 text-gold" />}
          value={xp}
          label="XP"
          className="border-line"
        />

        {/* Small Avatar circle */}
        <Link href="/profile" className="focus:outline-none focus:ring-2 focus:ring-ink rounded-full">
          <div className="w-9 h-9 rounded-full bg-gold-soft border border-line-strong hover:border-gold transition-colors flex items-center justify-center text-gold-ink font-semibold">
            {session?.user?.name ? session.user.name.charAt(0) : "U"}
          </div>
        </Link>
      </div>
    </header>
  );
};
export default AppTopbar;
