"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { AppTopbar } from "@/components/AppTopbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper flex text-ink">
      {/* Sidebar */}
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        {/* Topbar */}
        <AppTopbar onMenuOpen={() => setSidebarOpen(true)} />
        
        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
