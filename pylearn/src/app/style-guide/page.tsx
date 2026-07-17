"use client";

import React, { useState } from "react";
import { Koji } from "@/components/Koji";
import { Button } from "@/components/ui/Button";
import { Input, Field } from "@/components/ui/Input";
import { CourseCard } from "@/components/CourseCard";
import { ProgressRing, ProgressBar } from "@/components/Progress";
import { StatPill } from "@/components/StatPill";
import { Rating } from "@/components/Rating";
import { Flame, Award, Heart, CheckCircle2 } from "lucide-react";
import { seedCourses } from "@/data/courses";

export default function StyleGuide() {
  const [inputText, setInputText] = useState("");
  const testCourse = seedCourses[1]; // Introduction to Python

  const colors = [
    { name: "--paper", value: "#FAF8F3", desc: "Page background" },
    { name: "--surface", value: "#FFFFFF", desc: "Cards" },
    { name: "--surface-sink", value: "#F3EFE6", desc: "Insets, subtle sections" },
    { name: "--line", value: "#E7E2D6", desc: "Hairline borders" },
    { name: "--line-strong", value: "#D8D2C3", desc: "Darker borders" },
    { name: "--ink", value: "#1A1712", desc: "Primary text + buttons" },
    { name: "--ink-2", value: "#55503F", desc: "Secondary body" },
    { name: "--ink-3", value: "#857F6C", desc: "Muted / Captions" },
    { name: "--gold", value: "#E0A82E", desc: "Brand gold accent" },
    { name: "--gold-soft", value: "#F7EDD2", desc: "Tinted backgrounds" },
    { name: "--gold-ink", value: "#7A5A12", desc: "Readable gold text" },
    { name: "--green", value: "#2E7D5B", desc: "Success state" },
    { name: "--red", value: "#C4452F", desc: "Error state" },
    { name: "--blue", value: "#2F6BD6", desc: "School track accent" },
    { name: "--code-bg", value: "#14171C", desc: "Editor background" },
    { name: "--code-surface", value: "#1B1F26", desc: "Editor toolbar" },
  ];

  return (
    <div className="min-h-screen bg-paper py-16 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-line pb-8 space-y-2">
          <span className="text-scale-micro text-gold-ink font-semibold">DESIGN SYSTEM</span>
          <h1 className="font-fraunces text-scale-display font-semibold text-ink leading-none tracking-tight">
            PyLearn Style Guide
          </h1>
          <p className="text-scale-body text-ink-2 max-w-2xl">
            This page renders every design token, utility class, and core UI component used in PyLearn. Check this to audit the look and feel.
          </p>
        </div>

        {/* Mascot section */}
        <section className="space-y-4">
          <h2 className="font-fraunces text-scale-h2 font-semibold text-ink">1. Mascot: Koji</h2>
          <div className="bg-surface border border-line rounded-lg p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center">
            <div className="text-center space-y-2">
              <Koji expression="happy" width={80} height={80} />
              <span className="text-xs font-semibold text-ink-2">Happy (Default)</span>
            </div>
            <div className="text-center space-y-2">
              <Koji expression="thinking" width={80} height={80} />
              <span className="text-xs font-semibold text-ink-2">Thinking</span>
            </div>
            <div className="text-center space-y-2">
              <Koji expression="coding" width={80} height={80} />
              <span className="text-xs font-semibold text-ink-2">Coding (Glasses)</span>
            </div>
            <div className="text-center space-y-2">
              <Koji expression="celebrating" width={80} height={80} />
              <span className="text-xs font-semibold text-ink-2">Celebrating (Crown)</span>
            </div>
          </div>
        </section>

        {/* Colors section */}
        <section className="space-y-4">
          <h2 className="font-fraunces text-scale-h2 font-semibold text-ink">2. Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="bg-surface border border-line rounded-lg p-3 flex flex-col gap-3 shadow-[0_1px_2px_rgba(26,23,18,0.01)]">
                <div
                  className="h-12 w-full rounded border border-line-strong"
                  style={{ backgroundColor: color.value }}
                />
                <div>
                  <h4 className="font-semibold text-xs text-ink font-mono">{color.name}</h4>
                  <p className="text-[10px] text-ink-3">{color.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography scale */}
        <section className="space-y-4">
          <h2 className="font-fraunces text-scale-h2 font-semibold text-ink">3. Typography Scale</h2>
          <div className="bg-surface border border-line rounded-lg p-6 space-y-6">
            <div className="border-b border-line pb-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-ink-3">text-scale-display (Fraunces)</span>
              <span className="text-scale-display font-fraunces font-semibold text-ink">Display Heading 56px</span>
            </div>
            <div className="border-b border-line pb-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-ink-3">text-scale-h1 (Fraunces)</span>
              <span className="text-scale-h1 font-fraunces font-semibold text-ink">Page Heading 36px</span>
            </div>
            <div className="border-b border-line pb-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-ink-3">text-scale-h2 (Fraunces)</span>
              <span className="text-scale-h2 font-fraunces font-semibold text-ink">Section Heading 26px</span>
            </div>
            <div className="border-b border-line pb-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-ink-3">text-scale-h3 (Inter)</span>
              <span className="text-scale-h3 font-semibold text-ink">Card Title 19px</span>
            </div>
            <div className="border-b border-line pb-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-ink-3">text-scale-body (Inter)</span>
              <span className="text-scale-body text-ink-2 max-w-md">Body Paragraph 16px. Clean, legible, high line-height to make paragraphs comfortable to digest.</span>
            </div>
            <div className="border-b border-line pb-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-ink-3">text-scale-small (Inter)</span>
              <span className="text-scale-small text-ink-2">Secondary/Meta Text 14px</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-ink-3">text-scale-micro (Inter uppercase)</span>
              <span className="text-scale-micro font-bold text-gold-ink">EYEBROW TEXT 12.5px</span>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="font-fraunces text-scale-h2 font-semibold text-ink">4. Buttons</h2>
          <div className="bg-surface border border-line rounded-lg p-6 flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary (Ink Fill)</Button>
            <Button variant="secondary">Secondary (Paper/Sink)</Button>
            <Button variant="ghost">Ghost (Ink-2 text)</Button>
            <Button variant="gold">Gold (CTA / Enroll)</Button>
            <Button variant="primary" size="large">Large Button</Button>
            <Button variant="primary" size="sm">Small Button</Button>
            <Button variant="primary" isLoading>Running</Button>
          </div>
        </section>

        {/* Forms & Inputs */}
        <section className="space-y-4">
          <h2 className="font-fraunces text-scale-h2 font-semibold text-ink">5. Form Fields</h2>
          <div className="bg-surface border border-line rounded-lg p-6 max-w-md space-y-4">
            <Field label="Full Name" helperText="Enter your first and last name.">
              <Input
                type="text"
                placeholder="Shivam P."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </Field>

            <Field label="Email Address" error="Please enter a valid email address.">
              <Input
                type="email"
                placeholder="invalid-email"
                defaultValue="invalid-email"
                error="Please enter a valid email address."
              />
            </Field>
          </div>
        </section>

        {/* Indicators and Stats */}
        <section className="space-y-4">
          <h2 className="font-fraunces text-scale-h2 font-semibold text-ink">6. Indicators, Stats & Progress</h2>
          <div className="bg-surface border border-line rounded-lg p-6 space-y-6">
            {/* Stat Pills */}
            <div className="flex flex-wrap gap-4 items-center">
              <StatPill
                icon={<Flame className="w-4 h-4 text-gold fill-gold" />}
                value="40"
                label="streak"
              />
              <StatPill
                icon={<Award className="w-4 h-4 text-gold" />}
                value="1,420"
                label="XP"
              />
              <StatPill
                icon={<Heart className="w-4 h-4 text-red fill-red" />}
                value="5"
                label="lives"
              />
            </div>

            {/* Ratings */}
            <div className="flex flex-wrap gap-6 items-center">
              <Rating rating={4.8} reviewsCount={2536} />
              <Rating rating={5.0} reviewsCount={12} />
              <Rating rating={3.5} showText={false} />
            </div>

            {/* Progress Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex items-center gap-4">
                <ProgressRing percentage={65} size={50} />
                <span className="text-xs text-ink-2 font-semibold">Progress Ring (65%)</span>
              </div>
              <div className="flex items-center gap-4">
                <ProgressRing percentage={100} size={50} />
                <span className="text-xs text-ink-2 font-semibold">Completed (100%)</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Lesson Completion</span>
                  <span>45%</span>
                </div>
                <ProgressBar percentage={45} />
              </div>
            </div>
          </div>
        </section>

        {/* Course Card */}
        <section className="space-y-4">
          <h2 className="font-fraunces text-scale-h2 font-semibold text-ink">7. Course Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {testCourse && (
              <>
                <CourseCard course={testCourse} />
                <CourseCard course={testCourse} isEnrolled progress={75} />
              </>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
