"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { seedCourses } from "@/data/courses";
import { seedProjects } from "@/data/projects";
import { getLocalProfile } from "@/lib/user";
import { useState, useEffect } from "react";
import { ProgressRing } from "@/components/Progress";
import { StatPill } from "@/components/StatPill";
import { Button } from "@/components/ui/Button";
import { Koji } from "@/components/Koji";
import {
  Flame,
  Award,
  Trophy,
  ArrowRight,
  Play,
  CheckCircle2,
  Lock,
  ChevronRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Learner";
  const userTrack = (session?.user as any)?.track || "graduate";

  const [profile, setProfile] = useState<any>(null);
  
  useEffect(() => {
    setProfile(getLocalProfile(session?.user));
    
    const handleUpdate = () => {
      setProfile(getLocalProfile(session?.user));
    };
    window.addEventListener("pylearn_user_update", handleUpdate);
    return () => {
      window.removeEventListener("pylearn_user_update", handleUpdate);
    };
  }, [session]);

  const streak = profile?.streak || 3;
  const xp = profile?.xp || 0;
  const rank = profile?.level > 1 ? Math.max(1, 6 - profile.level) : 5;

  // Let's get the active courses
  const programmingCourse = seedCourses[0];
  const pythonCourse = seedCourses[1];
  const recommendedProject = seedProjects[0];

  // Dynamic python course modules completion
  const pythonModules = [
    { name: "print() and output", completed: !!profile?.completedLessons?.includes("print-and-output"), slug: "print-and-output" },
    { name: "Variables & assignment", completed: !!profile?.completedLessons?.includes("variables"), slug: "variables" },
    { name: "Dynamic data types", completed: !!profile?.completedLessons?.includes("data-types"), slug: "data-types" },
    { name: "User input via input()", completed: !!profile?.completedLessons?.includes("input"), slug: "input" },
    { name: "Operators & Math", completed: !!profile?.completedLessons?.includes("operators"), slug: "operators" },
    { name: "Strings & formatting", completed: !!profile?.completedLessons?.includes("strings"), slug: "strings" },
    { name: "Decision making (if/else)", completed: !!profile?.completedLessons?.includes("conditionals"), slug: "conditionals" },
  ];

  const completedPythonCount = pythonModules.filter((m) => m.completed).length;
  const pythonPercentage = Math.round((completedPythonCount / pythonModules.length) * 100);

  const paths = [
    {
      course: programmingCourse,
      percentage: 100,
      status: "completed",
      modules: [
        { name: "What is a program?", completed: true },
        { name: " deterministic execution", completed: true },
        { name: "Python vs C", completed: true, gradOnly: true },
        { name: "IDEs and Platforms", completed: true, gradOnly: true },
      ],
    },
    {
      course: pythonCourse,
      percentage: pythonPercentage,
      status: pythonPercentage === 100 ? "completed" : "in-progress",
      modules: pythonModules,
    },
  ];

  return (
    <div className="space-y-8 select-none py-4">
      {/* 1. GREETING HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
            Welcome back, {userName}
          </h1>
          <p className="text-scale-small text-ink-2 mt-1">
            You're on the <strong className="capitalize">{userTrack} track</strong>. Let's keep that streak burning!
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="flex items-center gap-3">
          <StatPill
            icon={<Flame className="w-4 h-4 text-gold fill-gold" />}
            value={streak}
            label="day streak"
          />
          <StatPill
            icon={<Award className="w-4 h-4 text-gold" />}
            value={xp}
            label="total XP"
          />
        </div>
      </div>

      {/* 2. MAIN LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Path details & Course continue card) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Continue Card */}
          <div className="bg-surface border border-line-strong rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-ink">
                CONTINUE LEARNING
              </span>
              <h3 className="font-fraunces text-scale-h2 font-semibold text-ink leading-tight">
                {pythonCourse.title}
              </h3>
              <p className="text-scale-small text-ink-2">
                Next lesson: <strong>Variables</strong> (Section 1 • Lecture 2)
              </p>
            </div>

            <Link href={`/learn/${pythonCourse.slug}/variables`}>
              <Button variant="gold" className="w-full md:w-auto font-bold flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Resume Lesson
              </Button>
            </Link>
          </div>

          {/* Core Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface border border-line p-5 rounded-lg space-y-1 shadow-xs">
              <span className="text-[10px] font-bold text-ink-3 uppercase">Weekly Streak</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-fraunces text-3xl font-semibold text-ink">{streak}</span>
                <span className="text-xs text-ink-3">days</span>
              </div>
              <p className="text-[11px] text-green font-medium">🔥 Active for 2 weeks straight</p>
            </div>

            <div className="bg-surface border border-line p-5 rounded-lg space-y-1 shadow-xs">
              <span className="text-[10px] font-bold text-ink-3 uppercase">Daily XP Goal</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-fraunces text-3xl font-semibold text-ink">120</span>
                <span className="text-xs text-ink-3">/ 150 XP</span>
              </div>
              <div className="w-full bg-surface-sink h-1.5 rounded-full mt-2 overflow-hidden border border-line">
                <div className="bg-gold h-full rounded-full" style={{ width: "80%" }} />
              </div>
            </div>

            <div className="bg-surface border border-line p-5 rounded-lg space-y-1 shadow-xs">
              <span className="text-[10px] font-bold text-ink-3 uppercase">Weekly Leaderboard</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-fraunces text-3xl font-semibold text-ink">#{rank}</span>
                <span className="text-xs text-ink-3">place</span>
              </div>
              <p className="text-[11px] text-gold-ink font-medium">🏆 Top 3 in gold league</p>
            </div>
          </div>

          {/* Your Learning Path */}
          <div className="space-y-4">
            <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">Your Learning Path</h3>
            
            <div className="space-y-6">
              {paths.map((path) => (
                <div key={path.course.id} className="bg-surface border border-line rounded-lg overflow-hidden shadow-xs">
                  {/* Path Header */}
                  <div className="p-5 border-b border-line flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <ProgressRing percentage={path.percentage} size={48} />
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-ink-3">
                          {path.status === "completed" ? "COMPLETED" : "IN PROGRESS"}
                        </span>
                        <h4 className="font-fraunces text-scale-h3 font-semibold text-ink leading-tight">
                          {path.course.title}
                        </h4>
                      </div>
                    </div>

                    <Link href={`/courses/${path.course.slug}`} className="p-1.5 border border-line rounded hover:bg-surface-sink transition-colors">
                      <ChevronRight className="w-4 h-4 text-ink-3" />
                    </Link>
                  </div>

                  {/* Modules Path */}
                  <div className="p-5 space-y-3 bg-surface-sink/10">
                    {path.modules.map((mod: any, idx) => {
                      if (mod.gradOnly && userTrack === "school") return null;

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded border flex items-center justify-between text-scale-small ${
                            mod.completed
                              ? "bg-green-soft/10 border-green/20 text-ink-2"
                              : mod.isCurrent
                              ? "bg-gold-soft/10 border-gold/30 text-ink font-semibold"
                              : "bg-surface border-line text-ink-3"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {mod.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-green" />
                            ) : mod.isCurrent ? (
                              <span className="w-4 h-4 rounded-full bg-gold border border-gold-ink flex items-center justify-center text-[9px] text-ink font-bold animate-pulse">
                                ▶
                              </span>
                            ) : (
                              <Lock className="w-4 h-4 text-ink-3" />
                            )}

                            <span>{mod.name}</span>
                          </div>

                          {mod.isCurrent && (
                            <Link href={`/learn/${path.course.slug}/${mod.slug}`}>
                              <span className="text-xs text-gold-ink font-semibold hover:underline">
                                Start
                              </span>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar (Recommendations & Highlights) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recommended Project */}
          <div className="bg-surface border border-line rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-2 text-gold-ink font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Recommended Project</span>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-fraunces text-scale-h3 font-semibold text-ink leading-tight">
                {recommendedProject.title}
              </h4>
              <p className="text-xs text-ink-2 leading-relaxed line-clamp-3">
                {recommendedProject.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-ink-3 font-semibold uppercase">
              {recommendedProject.requires.map((req, idx) => (
                <span key={idx} className="bg-surface-sink border border-line px-1.5 py-0.5 rounded">
                  {req}
                </span>
              ))}
            </div>

            <Link href="/projects" className="block pt-2">
              <Button variant="secondary" className="w-full text-xs">
                View Project Details
              </Button>
            </Link>
          </div>

          {/* Guide helper */}
          <div className="bg-gold-soft/30 border border-line-strong rounded-lg p-5 flex items-start gap-4">
            <Koji width={56} height={56} expression="happy" className="shrink-0" />
            <div className="space-y-1 flex-1 min-w-0">
              <h5 className="font-semibold text-xs text-ink">Pro Tip from Koji</h5>
              <p className="text-[11px] text-ink-2 leading-relaxed">
                Stuck on a lesson? Toggle your track in the sidebar to view a simplified analogy, or ask standard Python questions in the Community feed!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
