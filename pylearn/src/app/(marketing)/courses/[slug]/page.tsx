"use client";

import React, { use, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { seedCourses } from "@/data/courses";
import { Rating } from "@/components/Rating";
import { Button } from "@/components/ui/Button";
import { Koji } from "@/components/Koji";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Play,
  Lock,
  Calendar,
  Globe,
  Award,
  Video,
  FileText,
  Smartphone,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const course = seedCourses.find((c) => c.slug === slug);
  const [accordionOpen, setAccordionOpen] = useState<Record<string, boolean>>({
    "c1-s1": true,
    "c2-s1": true,
  });

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper py-16 px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 bg-red-soft rounded-full flex items-center justify-center text-red mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="font-fraunces text-scale-h1 font-semibold text-ink">Course not found</h1>
          <p className="text-scale-small text-ink-2">
            The course you are looking for does not exist in our catalog.
          </p>
          <Link href="/courses" className="block">
            <Button variant="primary">Browse Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleAccordion = (id: string) => {
    setAccordionOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEnroll = () => {
    if (session) {
      // Find the first lesson
      const firstLesson = course.sections[0]?.lessons[0];
      if (firstLesson) {
        router.push(`/learn/${course.slug}/${firstLesson.slug}`);
      } else {
        router.push("/dashboard");
      }
    } else {
      router.push(`/signup?callbackUrl=/courses/${course.slug}`);
    }
  };

  const totalLessons = course.sections.reduce((acc, sec) => acc + sec.lessons.length, 0);

  return (
    <div className="bg-paper min-h-screen select-none pb-12">
      {/* 1. DARK HERO BAND */}
      <section className="bg-code-bg text-code-text py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(224,168,46,0.06),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-5">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-code-muted">
              <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
              <span>/</span>
              <span className="text-code-text truncate">{course.title}</span>
            </div>

            <h1 className="font-fraunces text-scale-display font-semibold text-white leading-tight tracking-tight max-w-3xl">
              {course.title}
            </h1>

            <p className="text-scale-body text-code-muted leading-relaxed max-w-2xl">
              {course.promise}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-2 text-xs text-code-muted select-none">
              <span className="px-2 py-0.5 bg-code-surface border border-code-line text-white rounded font-medium">
                {course.level}
              </span>
              <Rating rating={course.rating} reviewsCount={course.reviewsCount} />
              <span>12,403 students enrolled</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> English (CC)
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-code-muted">Created by</span>
              <span className="font-semibold text-white flex items-center gap-1">
                <Koji width={20} height={20} expression="happy" />
                PyLearn / Koji
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAGE CONTENT GRID (udemy layout split) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Main Details) */}
          <div className="lg:col-span-8 space-y-10">
            {/* What you'll learn */}
            <div className="bg-surface border border-line rounded-lg p-6 space-y-4">
              <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">What you'll learn</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-scale-small text-ink-2">
                {course.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline border-b border-line pb-3">
                <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">Course Content</h3>
                <span className="text-xs text-ink-3">
                  {course.sections.length} section • {totalLessons} lectures • {course.duration} total length
                </span>
              </div>

              <div className="border border-line rounded-lg overflow-hidden bg-surface">
                {course.sections.map((section) => {
                  const isOpen = !!accordionOpen[section.id];
                  return (
                    <div key={section.id} className="border-b border-line last:border-b-0">
                      {/* Accordion Trigger */}
                      <button
                        onClick={() => toggleAccordion(section.id)}
                        className="w-full flex items-center justify-between p-4 bg-surface-sink hover:bg-line/40 transition-colors text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          {isOpen ? <ChevronUp className="w-4 h-4 text-ink-3" /> : <ChevronDown className="w-4 h-4 text-ink-3" />}
                          <div>
                            <span className="font-semibold text-scale-body text-ink">{section.title}</span>
                          </div>
                        </div>
                        <span className="text-xs text-ink-3">
                          {section.lessons.length} lectures • {section.lessons.reduce((acc, l) => acc + parseInt(l.duration), 0)} min
                        </span>
                      </button>

                      {/* Accordion Content */}
                      {isOpen && (
                        <div className="divide-y divide-line">
                          {section.lessons.map((lesson) => {
                            // First 2 lessons of the course are previews
                            const isPreview = lesson.slug === "what-is-a-program" || lesson.slug === "print-and-output";
                            
                            return (
                              <div
                                key={lesson.id}
                                className="p-4 flex items-center justify-between text-scale-small text-ink-2 hover:bg-surface-sink/30"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <Play className="w-3.5 h-3.5 text-ink-3 shrink-0" />
                                  <span className="truncate">{lesson.title}</span>
                                  {lesson.track === "graduate" && (
                                    <span className="px-1.5 py-0.5 bg-gold-soft border border-line text-[9px] uppercase tracking-wider font-bold text-gold-ink rounded shrink-0">
                                      Grad Only
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-4 shrink-0 text-xs text-ink-3">
                                  {isPreview ? (
                                    <button
                                      onClick={handleEnroll}
                                      className="text-gold-ink hover:underline font-bold"
                                    >
                                      Preview
                                    </button>
                                  ) : (
                                    <Lock className="w-3.5 h-3.5 text-ink-3" />
                                  )}
                                  <span>{lesson.duration}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Requirements & Description */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">Requirements</h3>
                <ul className="list-disc list-inside text-scale-small text-ink-2 space-y-1.5 pl-2">
                  {course.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">Description</h3>
                <p className="text-scale-small text-ink-2 leading-relaxed">
                  PyLearn presents a high-fidelity learning experience designed specifically for Python.
                  Unlike standard course repositories, we support two dynamic teaching tracks (School level
                  and Graduate level) that compile your scripts in-browser in real time using the Pyodide WebAssembly
                  runtime. In this module, you will practice syntax structure, understand programming paradigms,
                  and learn why Python is highly valued across analytics, web, and automation.
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6 border-t border-line pt-8">
              <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">Student Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="text-center p-6 bg-surface border border-line rounded-lg space-y-1 shadow-xs">
                  <span className="font-fraunces text-5xl font-semibold text-gold-ink">{course.rating}</span>
                  <div className="flex justify-center">
                    <Rating rating={course.rating} showText={false} />
                  </div>
                  <span className="text-xs text-ink-3 block">Course Rating</span>
                </div>
                <div className="md:col-span-2 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const percentages = [80, 15, 4, 1, 0];
                    const percent = percentages[5 - stars];
                    return (
                      <div key={stars} className="flex items-center gap-3 text-xs text-ink-2">
                        <span className="w-12 text-right">{stars} stars</span>
                        <div className="flex-1 bg-surface-sink rounded-full h-2 border border-line">
                          <div className="bg-gold h-full rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="w-8">{percent}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Individual review list */}
              <div className="space-y-4 pt-4 border-t border-line">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold-soft flex items-center justify-center text-gold-ink font-semibold text-xs">
                      AM
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-ink">Aditi M.</h5>
                      <div className="flex items-center gap-1.5">
                        <Rating rating={5} showText={false} />
                        <span className="text-[10px] text-ink-3">a week ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-scale-small text-ink-2 leading-relaxed italic pl-10">
                    "I loved the school track explanation of input output variables. It is the first time it actually clicked for me."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Enrollment Card) */}
          <div className="lg:col-span-4 lg:sticky lg:top-20 z-20">
            <div className="bg-surface border border-line-strong rounded-lg p-6 shadow-custom space-y-6">
              {/* Image Preview placeholder */}
              <div className="relative aspect-video w-full rounded overflow-hidden border border-line-strong select-none">
                <img
                  src={
                    course.slug === "introduction-to-programming"
                      ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                      : "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-ink shadow-lg font-bold text-lg hover:scale-105 transition-transform cursor-pointer">
                    ▶
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-fraunces font-bold text-ink">{course.price}</span>
                  {course.price === "Free" && (
                    <span className="text-xs text-green font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-green-soft rounded border border-green/20">
                      Open Sandbox
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-3">Full lifetime access to core files</p>
              </div>

              <Button onClick={handleEnroll} variant="gold" className="w-full text-sm font-bold">
                {session ? "Go to Course Player" : "Enrol now"}
              </Button>

              {/* Course Includes list */}
              <div className="space-y-3 pt-4 border-t border-line select-none">
                <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                  This course includes:
                </span>
                <ul className="space-y-2 text-scale-small text-ink-2">
                  <li className="flex items-center gap-2.5">
                    <Video className="w-4 h-4 text-ink-3 shrink-0" />
                    <span>In-browser live sandbox runtime</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-ink-3 shrink-0" />
                    <span>{totalLessons} adaptive lessons</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-ink-3 shrink-0" />
                    <span>Course completion certificate</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4 text-ink-3 shrink-0" />
                    <span>Access on tablet and desktop</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
