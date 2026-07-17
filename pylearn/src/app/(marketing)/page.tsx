"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Koji } from "@/components/Koji";
import { Button } from "@/components/ui/Button";
import { CourseCard } from "@/components/CourseCard";
import { StatPill } from "@/components/StatPill";
import { seedCourses } from "@/data/courses";
import {
  Flame,
  Award,
  ArrowRight,
  School,
  GraduationCap,
  Play,
  Terminal,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { motion } from "motion/react";

export default function LandingPage() {
  const { data: session } = useSession();
  const featuredCourses = seedCourses.slice(0, 2);

  // Stagger helper for motion
  const animContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const animItem = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="bg-paper overflow-hidden select-none pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative py-16 md:py-24 border-b border-line">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(216,210,195,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(216,210,195,0.15)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (55% width approx) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-soft border border-line rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-ink">
                  Now Live: In-Browser Python 3
                </span>
              </div>

              <h1 className="font-fraunces text-scale-display font-semibold text-ink leading-tight tracking-tight">
                Python that finally makes sense — taught your way.
              </h1>

              <p className="text-scale-body text-ink-2 max-w-xl leading-relaxed mx-auto lg:mx-0">
                Two paths, one platform. Whether you're starting from zero or levelling up to real
                engineering, PyLearn teaches, tests, and lets you build — all in the browser, nothing
                to install.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href={session ? "/dashboard" : "/signup"} className="w-full sm:w-auto">
                  <Button variant="primary" size="large" className="w-full sm:w-auto">
                    {session ? "Go to Dashboard" : "Start learning free"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/courses" className="w-full sm:w-auto">
                  <Button variant="secondary" size="large" className="w-full sm:w-auto">
                    Browse courses
                  </Button>
                </Link>
              </div>

              {/* Trust Row */}
              <div className="pt-4 border-t border-line flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-scale-small text-ink-3">
                <span className="font-semibold text-ink">12,000+ learners</span>
                <span>•</span>
                <span className="font-semibold text-ink">4.8 average rating</span>
                <span>•</span>
                <span>No credit card required</span>
              </div>
            </div>

            {/* Right Column: Stylized lesson/coding card + Koji */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Background shadow card */}
                <div className="absolute inset-0 bg-gold-soft border border-line-strong rounded-xl translate-x-3 translate-y-3" />

                {/* Main Card visual */}
                <div className="relative bg-surface border border-line-strong rounded-xl p-6 shadow-custom space-y-5">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red" />
                      <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green" />
                    </div>
                    <span className="text-[10px] font-mono text-ink-3">lesson_1_print.py</span>
                  </div>

                  <div className="flex gap-4">
                    <Koji width={76} height={76} expression="coding" className="shrink-0" />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-gold-ink">
                        Koji's Guide
                      </span>
                      <p className="text-xs text-ink-2 leading-relaxed">
                        To print messages, type your text inside quotes. Try running:
                      </p>
                    </div>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="p-3 bg-code-bg rounded border border-code-line font-mono text-xs text-code-text space-y-1">
                    <div className="text-code-muted"># Print greetings</div>
                    <div>
                      <span className="text-gold">print</span>
                      <span>(</span>
                      <span className="text-green-600">"Hello, PyLearn!"</span>
                      <span>)</span>
                    </div>
                  </div>

                  {/* Stats Pill Overlay */}
                  <div className="flex items-center justify-between pt-1 select-none">
                    <StatPill
                      icon={<Flame className="w-3.5 h-3.5 text-gold fill-gold" />}
                      value="15"
                      label="streak"
                      className="text-xs"
                    />
                    <StatPill
                      icon={<Award className="w-3.5 h-3.5 text-gold" />}
                      value="640"
                      label="XP"
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF STRIP */}
      <section className="py-8 bg-surface-sink border-b border-line select-none">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
          <p className="text-scale-micro text-ink-3 font-semibold uppercase tracking-wider">
            Used by students and developers at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-scale-h3 font-fraunces font-bold text-ink-3">
            <span className="opacity-80">Stanford</span>
            <span className="opacity-80">MIT Coding Lab</span>
            <span className="opacity-80">TechAcademy</span>
            <span className="opacity-80">PyCommunity</span>
          </div>
        </div>
      </section>

      {/* 3. TWO TRACKS */}
      <section className="py-16 md:py-24 border-b border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-scale-micro text-gold-ink font-semibold">THE LEARNING ENGINE</span>
            <h2 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
              One platform. Two distinct paths.
            </h2>
            <p className="text-scale-small text-ink-2">
              We reject the one-size-fits-all model. PyLearn serves the same curriculum in two
              completely different ways depending on your target background.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* School Track Card */}
            <div className="bg-surface border border-line rounded-lg p-8 flex flex-col justify-between space-y-6 hover:shadow-custom duration-200 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue/10 text-blue rounded-lg flex items-center justify-center">
                  <School className="w-6 h-6" />
                </div>
                <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">School Level</h3>
                <p className="text-scale-small text-ink-2 leading-relaxed">
                  <strong>Start from zero.</strong> Plain English explainers, animations, interactive games,
                  and smaller code challenges. Koji guides you through every syntax wall and builds up
                  logical intuition step-by-step.
                </p>
              </div>
              <div className="border-t border-line pt-4">
                <span className="text-xs text-blue font-semibold">Perfect for: High schoolers, absolute beginners</span>
              </div>
            </div>

            {/* Graduate Track Card */}
            <div className="bg-surface border border-line rounded-lg p-8 flex flex-col justify-between space-y-6 hover:shadow-custom duration-200 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gold-soft text-gold-ink rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">Graduate Level</h3>
                <p className="text-scale-small text-ink-2 leading-relaxed">
                  <strong>Give me the real thing.</strong> Proper computer science terminology, underlying mechanics
                  (Python memory vs C pointers), IDE layouts, and dense, complex coding challenges. Perfect
                  for fast switchers.
                </p>
              </div>
              <div className="border-t border-line pt-4">
                <span className="text-xs text-gold-ink font-semibold">Perfect for: CS students, bootcamp grads, career switchers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-16 md:py-24 border-b border-line bg-surface-sink/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-scale-micro text-gold-ink font-semibold">METHODOLOGY</span>
            <h2 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
              A curriculum designed to stick.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <span className="font-fraunces text-4xl font-bold text-line-strong block">01</span>
              <h4 className="font-semibold text-scale-body text-ink">Learn a topic</h4>
              <p className="text-scale-small text-ink-2 leading-relaxed">
                A short, concise explainer from Koji with one clean example. No 30-minute videos to sit through.
              </p>
            </div>
            <div className="space-y-3">
              <span className="font-fraunces text-4xl font-bold text-line-strong block">02</span>
              <h4 className="font-semibold text-scale-body text-ink">Practice</h4>
              <p className="text-scale-small text-ink-2 leading-relaxed">
                A quick quiz after every topic checks your parsing knowledge. Earn XP and lock in your streak.
              </p>
            </div>
            <div className="space-y-3">
              <span className="font-fraunces text-4xl font-bold text-line-strong block">03</span>
              <h4 className="font-semibold text-scale-body text-ink">Build a project</h4>
              <p className="text-scale-small text-ink-2 leading-relaxed">
                Apply your skills immediately on portfolio builders, solo or coding live with a peer.
              </p>
            </div>
            <div className="space-y-3">
              <span className="font-fraunces text-4xl font-bold text-line-strong block">04</span>
              <h4 className="font-semibold text-scale-body text-ink">Level up</h4>
              <p className="text-scale-small text-ink-2 leading-relaxed">
                Unlock the next module, climb the global ranking leaderboard, and claim badges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED CURRICULUM */}
      <section className="py-16 md:py-24 border-b border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
            <div className="space-y-2">
              <span className="text-scale-micro text-gold-ink font-semibold">GET STARTED</span>
              <h2 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
                Featured Curriculum
              </h2>
            </div>
            <Link href="/courses" className="text-scale-small font-semibold text-gold-ink hover:underline inline-flex items-center gap-1">
              View all courses
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CODE-IN-BROWSER TEASER (DARK Surface) */}
      <section className="py-16 md:py-24 bg-code-bg border-y border-code-line text-code-text relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(224,168,46,0.08),transparent)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side text */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs text-gold font-mono">
                <Terminal className="w-4 h-4" />
                <span>WebAssembly Sandbox</span>
              </div>
              <h2 className="font-fraunces text-scale-h1 font-semibold text-white leading-tight">
                Runs entirely in your browser.
              </h2>
              <p className="text-scale-small text-code-muted leading-relaxed">
                No local environment configuration, no node installs, and no local PATH errors. PyLearn
                loads Pyodide, compiling and running your Python scripts in a fast sandbox directly in
                your browser tab.
              </p>
              <div className="pt-2">
                <Link href={session ? "/dashboard" : "/signup"}>
                  <Button variant="gold" size="sm">
                    Open Sandbox Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side mock editor */}
            <div className="lg:col-span-7 rounded-lg border border-code-line bg-code-surface overflow-hidden shadow-2xl">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#171a21] border-b border-code-line select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-code-muted font-mono ml-2">sandbox_quick.py</span>
                </div>
                <span className="text-[10px] text-green font-mono">Interpreter Online</span>
              </div>

              {/* Code display */}
              <div className="p-4 font-mono text-xs text-code-text space-y-1.5 bg-code-bg">
                <div>
                  <span className="text-[#89DDFF] font-semibold">import</span>
                  <span className="text-code-text"> math</span>
                </div>
                <div className="text-code-muted"># Calculate circular area</div>
                <div>
                  <span className="text-code-text">radius = </span>
                  <span className="text-[#F78C6C]">5</span>
                </div>
                <div>
                  <span className="text-code-text">area = math.pi * (radius ** </span>
                  <span className="text-[#F78C6C]">2</span>
                  <span className="text-code-text">)</span>
                </div>
                <div>
                  <span className="text-[#C792EA]">print</span>
                  <span>(</span>
                  <span className="text-[#ECC48D]">f"Circular Area: </span>
                  <span className="text-[#89DDFF] font-semibold">{"{"}</span>
                  <span className="text-code-text">area</span>
                  <span className="text-[#89DDFF] font-semibold">:.2f{"}"}</span>
                  <span className="text-[#ECC48D]" style={{ color: "#c3e88d" }}>"</span>
                  <span>)</span>
                </div>
              </div>

              {/* Console preview */}
              <div className="p-4 border-t border-code-line bg-code-surface font-mono text-[11px] text-code-muted">
                <div className="text-xs text-code-text font-bold mb-1.5 select-none">CONSOLE OUTPUT</div>
                <div className="text-green select-all">Circular Area: 78.54</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-16 md:py-24 border-b border-line bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-scale-micro text-gold-ink font-semibold">REVIEWS</span>
            <h2 className="font-fraunces text-scale-h1 font-semibold text-ink">
              Learner Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-paper border border-line rounded-lg space-y-4">
              <p className="font-fraunces text-scale-small text-ink-2 italic leading-relaxed">
                "I bounced off Python twice. The school track finally made the why click — I built my
                first game in a week."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-soft flex items-center justify-center text-gold-ink font-bold text-xs">
                  AM
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-ink">Aditi M.</h5>
                  <span className="text-[10px] text-ink-3">First-Year Student</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-paper border border-line rounded-lg space-y-4">
              <p className="font-fraunces text-scale-small text-ink-2 italic leading-relaxed">
                "The Python-vs-C breakdown is exactly what my degree skipped. Graduate track is the
                real deal."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-soft flex items-center justify-center text-gold-ink font-bold text-xs">
                  SP
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-ink">Shivam P.</h5>
                  <span className="text-[10px] text-ink-3">CS Undergrad</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-paper border border-line rounded-lg space-y-4">
              <p className="font-fraunces text-scale-small text-ink-2 italic leading-relaxed">
                "Running code in the browser with instant feedback kept my streak alive for 40 days
                straight."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-soft flex items-center justify-center text-gold-ink font-bold text-xs">
                  RS
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-ink">Riya S.</h5>
                  <span className="text-[10px] text-ink-3">Self-Taught Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA BAND */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gold-soft border border-line-strong rounded-xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden select-none shadow-sm">
          {/* Subtle logo background mark */}
          <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none transform rotate-12 scale-150">
            <Koji width={200} height={200} />
          </div>

          <div className="max-w-xl mx-auto space-y-3 relative z-10">
            <h2 className="font-fraunces text-scale-h1 font-semibold text-gold-ink leading-tight">
              Your first program is ten minutes away.
            </h2>
            <p className="text-scale-small text-ink-2">
              Set up your profile, choose your learning track, and run your first line of Python
              today. Completely free.
            </p>
          </div>

          <div className="relative z-10">
            <Link href="/signup">
              <Button variant="primary" size="large" className="bg-ink hover:bg-ink-2 text-paper">
                Create free account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
