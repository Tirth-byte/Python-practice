"use client";

import React, { useEffect, useState } from "react";
import { Koji } from "@/components/Koji";
import { Logo } from "@/components/Logo";

const testimonialQuotes = [
  {
    text: "I bounced off Python twice. The school track finally made the why click — I built my first game in a week.",
    author: "Aditi M.",
    role: "First-year student",
  },
  {
    text: "The Python-vs-C breakdown is exactly what my degree skipped. Graduate track is the real deal.",
    author: "Shivam P.",
    role: "CS Undergrad",
  },
  {
    text: "Running code in the browser with instant feedback kept my streak alive for 40 days straight.",
    author: "Riya S.",
    role: "Self-taught developer",
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % testimonialQuotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeQuote = testimonialQuotes[quoteIndex];

  return (
    <div className="min-h-screen flex bg-paper text-ink">
      {/* Left side: Form content */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex justify-center lg:justify-start">
            <Logo size={36} showTagline />
          </div>
          {/* Form wrapper */}
          <div className="bg-surface border border-line p-8 rounded-lg shadow-[0_4px_20px_rgba(26,23,18,0.02)]">
            {children}
          </div>
        </div>
      </div>

      {/* Right side: Branded panel */}
      <div className="hidden lg:flex lg:flex-1 bg-surface-sink border-l border-line flex-col justify-between p-16 relative overflow-hidden select-none">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(216,210,195,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(216,210,195,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Accent circle */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gold-soft/30 border border-line-strong/20" />

        <div className="relative z-10 flex items-center gap-3">
          <Koji width={56} height={56} expression="happy" />
          <span className="font-fraunces text-scale-h2 font-semibold tracking-tight text-ink">
            PyLearn
          </span>
        </div>

        {/* Testimonial slider */}
        <div className="relative z-10 my-auto max-w-lg space-y-6">
          <blockquote className="font-fraunces text-scale-h2 font-medium italic text-ink-2 leading-relaxed">
            &ldquo;{activeQuote.text}&rdquo;
          </blockquote>
          <div>
            <div className="font-semibold text-scale-body text-ink">
              {activeQuote.author}
            </div>
            <div className="text-scale-small text-ink-3">
              {activeQuote.role}
            </div>
          </div>
          {/* Indicator dots */}
          <div className="flex gap-2 pt-2">
            {testimonialQuotes.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === quoteIndex ? "w-4 bg-gold" : "bg-line-strong"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer label */}
        <div className="relative z-10 text-xs text-ink-3">
          Learn Python, properly. Powered by Pyodide in-browser runtime.
        </div>
      </div>
    </div>
  );
}
