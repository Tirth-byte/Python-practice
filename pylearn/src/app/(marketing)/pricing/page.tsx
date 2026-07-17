"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      desc: "Learn the fundamentals of Python with no credit card required.",
      features: [
        "Access to Introduction to Programming",
        "Access to Introduction to Python",
        "Run code directly in the browser via Pyodide",
        "Weekly public leaderboard ranking",
        "Basic level completion badges",
      ],
      cta: "Start Learning Free",
      href: "/signup",
      popular: false,
    },
    {
      name: "Pro Track",
      price: "$19",
      period: "/month",
      desc: "Accelerate your learning with detailed projects, advanced courses, and cohort-style practice.",
      features: [
        "Everything in Starter",
        "All advanced modules (Loops, Functions, Data Structures)",
        "Premium portfolio projects (Mad Libs, Calculator, Bot)",
        "Build with a Friend collaborative coding",
        "Verified Course Certificates of Completion",
        "Priority community Q&A and support",
      ],
      cta: "Unlock Pro Track",
      href: "/signup",
      popular: true,
    },
  ];

  return (
    <div className="bg-paper py-16 md:py-24 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-scale-micro text-gold-ink font-semibold">PRICING PLANS</span>
          <h1 className="font-fraunces text-scale-display font-semibold text-ink leading-tight">
            Fair pricing. Taught your way.
          </h1>
          <p className="text-scale-body text-ink-2">
            Choose the path that fits your goals. Start with our free core curriculum and upgrade anytime to unlock premium features and collaborative coding.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-surface border rounded-lg p-8 relative flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-custom ${
                plan.popular ? "border-gold ring-1 ring-gold" : "border-line"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-ink text-[10px] font-bold uppercase tracking-wider rounded-full border border-gold-ink">
                  MOST POPULAR
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-ink-3 mt-1.5">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1 pt-2 border-t border-line">
                  <span className="font-fraunces text-4xl font-semibold text-ink">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-scale-small text-ink-3">{plan.period}</span>
                  )}
                </div>

                <ul className="space-y-3 pt-2 text-scale-small text-ink-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-green shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link href={plan.href}>
                  <Button
                    variant={plan.popular ? "gold" : "primary"}
                    className="w-full h-11"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="pt-16 border-t border-line space-y-8 max-w-3xl mx-auto">
          <h2 className="font-fraunces text-scale-h2 font-semibold text-ink text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1.5">
              <h4 className="font-semibold text-scale-body text-ink">Can I change my track after joining?</h4>
              <p className="text-scale-small text-ink-2 leading-relaxed">
                Yes! You can toggle between the School level (plain language, visual focus) and the Graduate level (CS terminology, code-first) in your settings at any time. Your progress is synced across both.
              </p>
            </div>
            
            <div className="space-y-1.5">
              <h4 className="font-semibold text-scale-body text-ink">Do I need to install Python on my machine?</h4>
              <p className="text-scale-small text-ink-2 leading-relaxed">
                No, nothing to install! PyLearn executes your code directly in the browser sandbox using Pyodide (WebAssembly), meaning you can code and test your scripts on any laptop or tablet instantly.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-semibold text-scale-body text-ink">Is there a long term commitment for Pro?</h4>
              <p className="text-scale-small text-ink-2 leading-relaxed">
                No contract. You can cancel your subscription at any time with a single click in your settings, and you will continue to have access until the end of your billing cycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
