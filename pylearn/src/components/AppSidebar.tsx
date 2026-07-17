"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "./Logo";
import { Koji } from "./Koji";
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  Users,
  Trophy,
  Settings,
  LogOut,
  X,
  User as UserIcon,
} from "lucide-react";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { data: session, update } = useSession();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My learning", href: "/my-learning", icon: BookOpen },
    { name: "Practice", href: "/practice", icon: CheckSquare },
    { name: "Community", href: "/community", icon: Users },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  ];

  const userTrack = (session?.user as any)?.track || "graduate";

  const handleTrackToggle = async () => {
    const newTrack = userTrack === "school" ? "graduate" : "school";
    // Update session client-side
    await update({ track: newTrack });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-surface border-r border-line transition-transform duration-200 ease-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-line">
          <Logo size={28} />
          <button
            onClick={onClose}
            className="p-1 text-ink-3 hover:text-ink md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mascot / Greeting guide in sidebar */}
        <div className="p-4 mx-4 my-3 bg-surface-sink border border-line rounded-lg flex items-center gap-3">
          <Koji width={50} height={50} expression="thinking" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-ink leading-tight">
              Ready to code?
            </p>
            <p className="text-[10px] text-ink-3 truncate">
              Your next lesson is waiting.
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 text-scale-small font-semibold rounded-md transition-colors ${
                  isActive
                    ? "bg-surface-sink text-ink border border-line-strong"
                    : "text-ink-2 hover:bg-surface-sink/50 hover:text-ink border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-gold" : "text-ink-3"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Panel */}
        <div className="p-4 border-t border-line space-y-3 bg-surface-sink/30">
          {/* Active track badge with toggle */}
          <div className="flex items-center justify-between p-2.5 bg-surface border border-line rounded-lg">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-ink-3 font-bold">
                Active Track
              </span>
              <span className="text-xs font-semibold text-ink capitalize">
                {userTrack} Track
              </span>
            </div>
            <button
              onClick={handleTrackToggle}
              className="text-[10px] font-bold text-gold-ink hover:underline cursor-pointer select-none"
            >
              Switch
            </button>
          </div>

          {/* User Info & Settings/Logout */}
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/profile"
              onClick={onClose}
              className="flex items-center gap-2.5 min-w-0 hover:opacity-85 transition-opacity"
            >
              <div className="w-9 h-9 rounded-full bg-gold-soft border border-line flex items-center justify-center text-gold-ink font-semibold">
                {session?.user?.name ? session.user.name.charAt(0) : "U"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-ink truncate leading-tight">
                  {session?.user?.name || "Learner"}
                </span>
                <span className="text-[10px] text-ink-3 truncate">
                  {session?.user?.email}
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-0.5">
              <Link href="/settings" onClick={onClose} title="Settings">
                <span className="p-1.5 text-ink-3 hover:text-ink hover:bg-surface border border-transparent hover:border-line rounded-md block transition-colors">
                  <Settings className="w-3.5 h-3.5" />
                </span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                title="Sign out"
                className="p-1.5 text-ink-3 hover:text-red hover:bg-red-soft rounded-md transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
export default AppSidebar;
