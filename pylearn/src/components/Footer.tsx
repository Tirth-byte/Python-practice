"use client";

import React from "react";
import Link from "next/link";
import { Koji } from "./Koji";
import { Button } from "./ui/Button";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-line text-ink-2 select-none">
      {/* Top section: Columns and newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand/Mascot Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Koji width={36} height={36} />
              <span className="font-fraunces text-scale-h3 font-semibold text-ink">
                PyLearn
              </span>
            </div>
            <p className="text-scale-small text-ink-2 max-w-sm leading-relaxed">
              Premium, editorial, hands-on learning for Python developers. Build real programs in your browser with zero installs.
            </p>
            <div className="pt-2">
              <span className="italic text-xs text-ink-3">Learn Python, properly.</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div>
            <h4 className="text-scale-micro text-gold-ink font-semibold mb-4 select-none">
              PRODUCT & LEARN
            </h4>
            <ul className="space-y-2.5 text-scale-small text-ink-2">
              <li>
                <Link href="/courses" className="hover:text-ink transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-ink transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-ink transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-ink transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-scale-micro text-gold-ink font-semibold mb-4 select-none">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-scale-small text-ink-2">
              <li>
                <Link href="/about" className="hover:text-ink transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <span className="opacity-50 cursor-not-allowed">Blog (Soon)</span>
              </li>
              <li>
                <span className="opacity-50 cursor-not-allowed">Careers</span>
              </li>
              <li>
                <span className="opacity-50 cursor-not-allowed">Contact</span>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="space-y-4">
            <h4 className="text-scale-micro text-gold-ink font-semibold mb-4 select-none">
              NEWSLETTER
            </h4>
            <p className="text-xs text-ink-3">
              Weekly Python tips from Koji. No spam, just core programming insight.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="your.email@address.com"
                className="h-10 px-3 text-xs bg-paper border border-line rounded-md focus:outline-none focus:ring-1 focus:ring-ink focus:border-ink"
                required
              />
              <Button type="submit" variant="primary" size="sm" className="h-10">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-line mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-3 gap-4">
          <div>
            &copy; {new Date().getFullYear()} PyLearn. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
