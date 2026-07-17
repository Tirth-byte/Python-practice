"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { seedCourses } from "@/data/courses";
import { CodeEditor } from "@/components/CodeEditor";
import { Button } from "@/components/ui/Button";
import { Koji } from "@/components/Koji";
import { getLocalProfile, completeLesson, UserProfile } from "@/lib/user";
import {
  Play,
  CheckCircle,
  Video,
  FileText,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Info,
  Menu,
  ChevronRight,
  BookOpen,
  Home,
  Check,
  HelpCircle,
  ExternalLink,
  BookOpenCheck,
  Clock,
  Layers
} from "lucide-react";

interface PageProps {
  params: Promise<{
    course: string;
    lesson: string;
  }>;
}

export default function LessonPlayerPage({ params }: PageProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const resolvedParams = use(params);

  const courseSlug = resolvedParams.course;
  const lessonSlug = resolvedParams.lesson;

  // Find course and lesson
  const course = seedCourses.find((c) => c.slug === courseSlug);
  if (!course) {
    return <div className="p-8 text-center text-red">Course not found</div>;
  }

  // Flatten lessons list
  const allLessons = course.sections.flatMap((m) => m.lessons);
  const currentLessonIndex = allLessons.findIndex((l) => l.slug === lessonSlug);
  const lesson = allLessons[currentLessonIndex];

  if (!lesson) {
    return <div className="p-8 text-center text-red">Lesson not found</div>;
  }

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  // Find parent section
  const section = course.sections.find((s) => s.lessons.some((l) => l.slug === lessonSlug));

  // State hooks
  const [userTrack, setUserTrack] = useState<"school" | "graduate">("graduate");
  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "qa">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Load user track & progress from session and local storage
  useEffect(() => {
    if (session?.user) {
      setUserTrack((session.user as any).track || "graduate");
      const profile = getLocalProfile(session.user);
      setLocalProfile(profile);
    } else {
      const profile = getLocalProfile();
      setLocalProfile(profile);
    }
  }, [session]);

  // Handle track switches
  const handleTrackChange = async (track: "school" | "graduate") => {
    setUserTrack(track);
    if (session?.user) {
      const profile = getLocalProfile(session.user);
      profile.track = track;
      localStorage.setItem(`pylearn_user_${profile.email.toLowerCase()}`, JSON.stringify(profile));
      setLocalProfile(profile);
    }
  };

  // Sync completion logic
  const handleCodeSuccess = () => {
    const email = session?.user?.email || "demo@pylearn.dev";
    completeLesson(email, lesson.slug);
    
    // Refresh user profile
    const updated = getLocalProfile(session?.user);
    setLocalProfile(updated);
    
    // Trigger victory modal
    setShowSuccessModal(true);
  };

  // Calculate completion percentage
  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter((l) =>
    localProfile?.completedLessons.includes(l.slug)
  ).length;
  const completionPercentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA] text-[#1C1D1F] overflow-hidden font-sans">
      
      {/* 1. TOP HEADER BAR (Udemy Player-Style) */}
      <header className="h-16 bg-white border-b border-[#D1D7DC] flex items-center justify-between px-6 z-30 select-none shadow-xs shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-[#F8F9FA] rounded-lg text-[#A435F0] transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <div className="h-5 w-px bg-[#D1D7DC]" />
          <div className="flex flex-col">
            {section && (
              <span className="text-[10px] text-[#6A6F73] uppercase tracking-wider font-bold">
                {course.title} • {section.title}
              </span>
            )}
            <span className="text-sm font-bold text-[#1C1D1F] leading-tight">
              Lecture {currentLessonIndex + 1}: {lesson.title}
            </span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs text-[#1C1D1F] font-bold">
                {completedCount} / {totalLessons} lessons completed
              </span>
              <span className="text-[10px] text-[#6A6F73] font-medium">
                {completionPercentage}% complete
              </span>
            </div>
            <div className="w-36 h-2 bg-[#D1D7DC] rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-[#A435F0] transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <Link href="/dashboard">
            <Button variant="secondary" size="sm" className="text-xs border-[#D1D7DC] text-[#1C1D1F] hover:bg-[#F8F9FA] h-9">
              Exit Player
            </Button>
          </Link>
        </div>
      </header>

      {/* Main split viewport */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Main Grid: Clean 50/50 split on desktop */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-[#F8F9FA]">
          
          {/* LEFT COLUMN: Lesson content with independent scrolling (50%) */}
          <div className="h-full overflow-y-auto bg-white border-r border-[#D1D7DC] p-8 lg:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Lesson Summary and Badge */}
              <div className="flex flex-wrap items-center gap-2 select-none">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider px-2 py-0.5 bg-[#A435F0] rounded-sm">
                  Python 3
                </span>
                <span className="text-[10px] font-bold text-[#6A6F73] uppercase tracking-wider px-2 py-0.5 bg-[#D1D7DC]/40 rounded-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lesson.duration}
                </span>
                <span className="text-[10px] font-bold text-[#1C824E] uppercase tracking-wider px-2 py-0.5 bg-[#EBF8F1] rounded-sm flex items-center gap-1">
                  <BookOpenCheck className="w-3 h-3" />
                  {userTrack === "school" ? "School" : "Graduate"} Track
                </span>
              </div>

              {/* Lesson Header Title */}
              <h1 className="text-scale-h1 font-fraunces font-bold text-[#1C1D1F] leading-tight">
                {lesson.title}
              </h1>

              {/* Mascot Explanation Card */}
              <div className="bg-gradient-to-br from-[#F6EBFF]/60 via-[#F8F9FA] to-white border border-[#A435F0]/15 rounded-xl p-6 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#A435F0]" />
                
                <div className="flex items-center justify-between border-b border-[#D1D7DC]/50 pb-3">
                  <div className="flex items-center gap-3">
                    <Koji width={50} height={50} expression={userTrack === "school" ? "happy" : "thinking"} className="shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1C1D1F] uppercase tracking-wider">Koji's Analogy Guide</h4>
                      <span className="text-[9px] text-[#6A6F73]">Friendly contextual guide</span>
                    </div>
                  </div>

                  {/* Track Toggle */}
                  <div className="flex items-center p-0.5 bg-white border border-[#D1D7DC] rounded-lg select-none">
                    <button
                      onClick={() => handleTrackChange("school")}
                      className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-all cursor-pointer ${
                        userTrack === "school"
                          ? "bg-[#5624D0] text-white shadow-xs"
                          : "text-[#6A6F73] hover:text-[#1C1D1F]"
                      }`}
                    >
                      School
                    </button>
                    <button
                      onClick={() => handleTrackChange("graduate")}
                      className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-all cursor-pointer ${
                        userTrack === "graduate"
                          ? "bg-[#1C1D1F] text-white shadow-xs"
                          : "text-[#6A6F73] hover:text-[#1C1D1F]"
                      }`}
                    >
                      Graduate
                    </button>
                  </div>
                </div>

                <p className="text-scale-body text-[#2D2F31] leading-relaxed max-w-2xl font-normal">
                  {userTrack === "school" ? lesson.schoolBody : lesson.graduateBody}
                </p>

                {lesson.exampleBox && (
                  <div className="p-3.5 bg-white rounded-md border border-[#D1D7DC] flex items-start gap-3 text-xs text-[#2D2F31]">
                    <Info className="w-4 h-4 text-[#A435F0] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-[#1C1D1F] block">Syntax Reference</span>
                      <code className="font-mono bg-[#F8F9FA] px-2 py-1 rounded border border-[#D1D7DC] block mt-1 font-semibold text-[#A435F0]">
                        {lesson.exampleBox}
                      </code>
                    </div>
                  </div>
                )}
              </div>

              {/* Tabs details */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-6 border-b border-[#D1D7DC] select-none">
                  {(["overview", "resources", "qa"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2.5 text-xs font-bold border-b-2 capitalize transition-all cursor-pointer tracking-wider ${
                        activeTab === tab
                          ? "border-[#A435F0] text-[#A435F0]"
                          : "border-transparent text-[#6A6F73] hover:text-[#1C1D1F]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="text-scale-small text-[#2D2F31] leading-relaxed bg-[#F8F9FA] border border-[#D1D7DC] rounded-lg p-5 shadow-xs">
                  {activeTab === "overview" && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-[#1C1D1F] flex items-center gap-2 text-xs uppercase tracking-wider text-[#6A6F73]">
                        <BookOpen className="w-4 h-4" />
                        Objective
                      </h4>
                      <p className="text-sm text-[#2D2F31]">{lesson.objective}</p>
                    </div>
                  )}

                  {activeTab === "resources" && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#6A6F73] flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        Additional Materials
                      </h4>
                      <ul className="space-y-2.5">
                        <li>
                          <a
                            href="https://docs.python.org/3/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#A435F0] hover:underline text-xs font-semibold"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Official Python 3 Documentation (docs.python.org)</span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://perso.limsi.fr/jacquet/teaching/python-cheatsheet.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#A435F0] hover:underline text-xs font-semibold"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Python Cheat Sheet PDF Reference Guide</span>
                          </a>
                        </li>
                        <li className="flex items-center gap-2 text-[#6A6F73] text-xs">
                          <Video className="w-3.5 h-3.5" />
                          <span>Interactive Lecture Slides (Preloaded in course player)</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "qa" && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#6A6F73] flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        Discussion & Q&A
                      </h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-white border border-[#D1D7DC] rounded space-y-1">
                          <span className="font-bold text-xs text-[#1C1D1F]">Karan D.</span>
                          <p className="text-xs text-[#2D2F31]">"Does sep= join things if they are numbers or strings?"</p>
                        </div>
                        <div className="p-3 bg-[#F6EBFF] border border-[#A435F0]/20 rounded space-y-1 pl-6 border-l-2 border-[#A435F0]">
                          <span className="font-bold text-xs text-[#A435F0]">Shivam P. (Graduate)</span>
                          <p className="text-xs text-[#2D2F31]">"It converts them to strings first, and then places the separator character between them."</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="flex justify-between items-center pt-6 border-t border-[#D1D7DC] mt-8 select-none">
              {prevLesson ? (
                <Link href={`/learn/${course.slug}/${prevLesson.slug}`}>
                  <Button variant="secondary" size="sm" className="border-[#D1D7DC] text-[#1C1D1F] hover:bg-[#F8F9FA] h-9 px-4">
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Previous
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link href={`/learn/${course.slug}/${nextLesson.slug}`}>
                  <Button variant="primary" size="sm" className="bg-[#1C1D1F] text-white hover:bg-black h-9 px-4">
                    Next Lesson
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/practice">
                  <Button variant="gold" size="sm" className="bg-[#A435F0] text-white hover:bg-[#5624D0] h-9 px-4">
                    Take Course Quiz
                    <Sparkles className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Coding workspace stacked vertically (50%) */}
          <div className="h-full flex flex-col bg-[#1E1E1E] overflow-hidden">
            <CodeEditor
              initialCode={lesson.starterCode}
              objective={lesson.objective}
              expectedOutput={lesson.exampleBox}
              onSuccess={handleCodeSuccess}
            />
          </div>

        </div>

        {/* RIGHT COLUMN: COLLAPSIBLE COURSE CONTENT SIDEBAR */}
        {sidebarOpen && (
          <aside className="w-80 bg-white border-l border-[#D1D7DC] flex flex-col z-20 shrink-0 select-none shadow-sm h-full">
            <div className="p-4 border-b border-[#D1D7DC] flex justify-between items-center bg-[#F8F9FA]">
              <span className="text-xs font-bold text-[#1C1D1F] uppercase tracking-wider">
                Course Syllabus
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-[#6A6F73] hover:text-[#1C1D1F] p-1"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {course.sections.map((mod, modIdx) => (
                <div key={mod.id} className="border-b border-[#D1D7DC]">
                  <div className="px-4 py-3.5 bg-[#F8F9FA] text-xs font-bold text-[#1C1D1F] flex items-center justify-between border-b border-[#D1D7DC]">
                    <span className="truncate pr-2">Module {modIdx + 1}: {mod.title}</span>
                  </div>

                  <div className="py-1 bg-white">
                    {mod.lessons.map((item) => {
                      const isActive = item.slug === lessonSlug;
                      const isLsnCompleted = localProfile?.completedLessons.includes(item.slug);
                      return (
                        <Link
                          key={item.id}
                          href={`/learn/${course.slug}/${item.slug}`}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-xs text-left transition-colors border-l-3 ${
                            isActive
                              ? "bg-[#F6EBFF] text-[#A435F0] font-semibold border-l-[#A435F0]"
                              : "hover:bg-[#F8F9FA] text-[#2D2F31] border-l-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isLsnCompleted ? (
                              <CheckCircle className="w-4 h-4 text-[#A435F0] fill-[#F6EBFF] shrink-0" />
                            ) : (
                              <Play className="w-3.5 h-3.5 text-[#6A6F73] shrink-0" />
                            )}
                            <span className="truncate">{item.title}</span>
                          </div>
                          <span className="text-[10px] text-[#6A6F73] shrink-0 ml-1 font-mono">{item.duration}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* FLOATING TRIGGER IF SIDEBAR CLOSED */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-1/2 right-0 translate-y-[-50%] bg-[#A435F0] hover:bg-[#5624D0] text-white p-2.5 rounded-l-md shadow-md flex items-center justify-center cursor-pointer z-30 transition-colors"
          >
            <ChevronRight className="w-4.5 h-4.5 rotate-180" />
          </button>
        )}

      </div>

      {/* VICTORY CELEBRATION CONGRATS MODAL (Dynamic Physics) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white text-[#1C1D1F] rounded-lg p-6 max-w-md w-full border border-[#D1D7DC] shadow-2xl relative text-center space-y-5 animate-in fade-in zoom-in duration-200">
            
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="text-[#6A6F73] hover:text-[#1C1D1F] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Celebrating Koji */}
            <div className="flex justify-center pt-2">
              <Koji width={96} height={96} expression="celebrating" className="animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A435F0] px-2.5 py-1 bg-[#F6EBFF] rounded-full">
                All Checks Passed!
              </span>
              <h3 className="text-scale-h2 font-fraunces font-bold">
                Objective Achieved!
              </h3>
              <p className="text-xs text-[#6A6F73] leading-relaxed">
                Excellent coding! Your Python code output matches the objective output perfectly. Koji is proud!
              </p>
            </div>

            {/* XP and progress indicators */}
            <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#D1D7DC] flex justify-around items-center select-none">
              <div className="text-center">
                <span className="text-[10px] text-[#6A6F73] uppercase tracking-wider font-semibold block">XP Payout</span>
                <span className="text-lg font-bold text-[#A435F0] flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4 fill-current" />
                  +30 XP
                </span>
              </div>
              <div className="w-px h-8 bg-[#D1D7DC]" />
              <div className="text-center">
                <span className="text-[10px] text-[#6A6F73] uppercase tracking-wider font-semibold block">New Total</span>
                <span className="text-lg font-bold text-[#1C1D1F]">
                  {localProfile?.xp} XP
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="secondary"
                className="flex-1 border-[#D1D7DC] text-[#1C1D1F] hover:bg-[#F8F9FA] text-xs h-10"
                onClick={() => setShowSuccessModal(false)}
              >
                Review Code
              </Button>
              {nextLesson ? (
                <Button
                  variant="primary"
                  className="flex-1 bg-[#A435F0] text-white hover:bg-[#5624D0] text-xs h-10"
                  onClick={() => {
                    setShowSuccessModal(false);
                    router.push(`/learn/${course.slug}/${nextLesson.slug}`);
                  }}
                >
                  Next Lecture
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="flex-1 bg-[#1C1D1F] text-white hover:bg-black text-xs h-10"
                  onClick={() => {
                    setShowSuccessModal(false);
                    router.push("/dashboard");
                  }}
                >
                  Back to Dashboard
                  <Check className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
