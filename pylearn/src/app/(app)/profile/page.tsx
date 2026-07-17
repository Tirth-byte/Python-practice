"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Koji } from "@/components/Koji";
import { getLocalProfile } from "@/lib/user";
import { ProgressBar } from "@/components/Progress";
import { Award, Flame, Calendar, CheckSquare, Shield, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Learner";
  const userEmail = session?.user?.email || "learner@pylearn.dev";
  const userTrack = (session?.user as any)?.track || "graduate";

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setProfile(getLocalProfile(session?.user));
  }, [session]);

  const streak = profile?.streak || 3;
  const xp = profile?.xp || 0;
  const level = profile?.level || 1;
  const xpForLevel = 150; // Each level takes 150 XP
  const xpProgress = ((xp % xpForLevel) / xpForLevel) * 100;

  // Unlocked badges
  const badges = [
    { title: "First Print", desc: "Executed print() in sandbox", icon: "✨" },
    { title: "Foundations", desc: "Completed Module 1 test", icon: "🎓" },
    { title: "Flame Keeper", desc: "Maintained a 10-day streak", icon: "🔥" },
  ];

  // Completed courses
  const completedCourses = [
    { title: "Introduction to Programming", level: "Both tracks", duration: "1.5h" },
  ];

  // Mock calendar days for contribution heatmap (15 weeks of grid cells)
  const heatmapCells = Array.from({ length: 90 }, (_, i) => {
    // Randomize activity levels (0: none, 1: low, 2: medium, 3: high)
    // Keep high level for recent days to mimic streak
    if (i > 75) return Math.floor(Math.random() * 2) + 2;
    return Math.floor(Math.random() * 3);
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-gold-soft border-gold/10";
      case 2:
        return "bg-gold/40 border-gold/20";
      case 3:
        return "bg-gold border-gold-ink/20";
      default:
        return "bg-surface-sink border-line";
    }
  };

  return (
    <div className="space-y-8 select-none py-4">
      {/* Profile Header */}
      <div className="bg-surface border border-line rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xs">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gold-soft border border-line-strong flex items-center justify-center text-gold-ink font-semibold text-3xl">
          {userName.charAt(0)}
        </div>

        {/* Identity & Level info */}
        <div className="space-y-3 flex-1 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2">
              <h1 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
                {userName}
              </h1>
              <span className="self-center px-2 py-0.5 bg-gold text-ink text-[10px] font-bold uppercase tracking-wider rounded border border-gold-ink">
                Lvl {level}
              </span>
            </div>
            <p className="text-xs text-ink-3">{userEmail} • <span className="capitalize">{userTrack} Track</span></p>
          </div>

          {/* Level Progress */}
          <div className="max-w-md mx-auto sm:mx-0 space-y-1.5">
            <div className="flex justify-between text-xs text-ink-2">
              <span>Level Progress</span>
              <span className="font-semibold">{xp} / {xpForLevel} XP</span>
            </div>
            <ProgressBar percentage={xpProgress} />
          </div>
        </div>
      </div>

      {/* Grid: Heatmap + Badges */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Heatmap & Courses */}
        <div className="md:col-span-8 space-y-8">
          {/* Heatmap */}
          <div className="bg-surface border border-line rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 font-fraunces text-scale-h3 font-semibold text-ink">
              <Calendar className="w-4 h-4 text-ink-3" />
              <span>Streak Calendar Heatmap</span>
            </div>

            {/* Grid display */}
            <div className="flex flex-wrap gap-1.5 p-2 bg-surface-sink/30 border border-line rounded-md">
              {heatmapCells.map((lvl, idx) => (
                <span
                  key={idx}
                  className={`w-3.5 h-3.5 rounded border transition-colors ${getHeatmapColor(
                    lvl
                  )}`}
                  title={`Activity level: ${lvl}`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] text-ink-3 uppercase font-semibold">
              <span>90 Days of Activity</span>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded bg-surface-sink border border-line" />
                <span className="w-2.5 h-2.5 rounded bg-gold-soft border border-line" />
                <span className="w-2.5 h-2.5 rounded bg-gold/40 border border-line" />
                <span className="w-2.5 h-2.5 rounded bg-gold border border-line" />
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Completed Courses */}
          <div className="space-y-4">
            <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">Completed Courses</h3>
            
            <div className="space-y-3">
              {completedCourses.map((course, idx) => (
                <div
                  key={idx}
                  className="bg-surface border border-line p-4 rounded-lg flex items-center justify-between gap-4 hover:border-line-strong transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-green-soft text-green rounded-lg">
                      <CheckSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-scale-body text-ink leading-tight">
                        {course.title}
                      </h4>
                      <span className="text-[10px] text-ink-3 uppercase tracking-wider font-semibold">
                        {course.level} • {course.duration}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-green font-semibold flex items-center gap-1">
                    Verified Certificate
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Badges & Guide */}
        <div className="md:col-span-4 space-y-6">
          {/* Badges */}
          <div className="bg-surface border border-line rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-2 text-ink font-bold text-xs uppercase tracking-wider border-b border-line pb-3">
              <Shield className="w-4 h-4 text-ink-3" />
              <span>Unlocked Badges ({badges.length})</span>
            </div>

            <div className="space-y-3">
              {badges.map((badge, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-surface-sink/30 border border-line p-3 rounded-lg">
                  <span className="text-2xl select-none">{badge.icon}</span>
                  <div>
                    <h5 className="text-xs font-bold text-ink leading-tight">{badge.title}</h5>
                    <p className="text-[10px] text-ink-2 mt-0.5">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guide guide */}
          <div className="bg-gold-soft/30 border border-line-strong rounded-lg p-5 flex items-start gap-4">
            <Koji width={42} height={42} expression="happy" className="shrink-0" />
            <div className="space-y-1 flex-1 min-w-0">
              <h5 className="font-semibold text-xs text-ink">Level Up Tip</h5>
              <p className="text-[11px] text-ink-2 leading-relaxed">
                Want to unlock the Flame Keeper badge? Practice every day to maintain your streak! Your calendar heatmap highlights active sandbox code runs.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
