"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { seedLeaderboard } from "@/data/users";
import { getLocalProfile } from "@/lib/user";
import { Award, Clock, Trophy, Flame, ShieldAlert, Zap } from "lucide-react";
import { Koji } from "@/components/Koji";

export default function LeaderboardPage() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<"global" | "friends">("global");
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setProfile(getLocalProfile(session?.user));
  }, [session]);

  // Construct dynamic leaderboard sorting user's real XP alongside seeds
  const rawLeaderboard = [
    ...seedLeaderboard.filter((u) => !u.isCurrentUser),
    {
      name: profile?.name || "Learner",
      xp: profile?.xp || 0,
      isCurrentUser: true,
    },
  ];

  // Sort and assign ranks
  const sortedLeaderboard = rawLeaderboard
    .sort((a, b) => b.xp - a.xp)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-[#E0A82E] text-ink border-[#7A5A12]"; // Gold
      case 2:
        return "bg-[#D1D5DB] text-ink border-gray-400"; // Silver
      case 3:
        return "bg-[#CD7F32] text-ink border-amber-800"; // Bronze
      default:
        return "bg-surface-sink text-ink-2 border-line";
    }
  };

  return (
    <div className="space-y-8 select-none py-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-line pb-6 text-center">
        <div className="w-12 h-12 bg-gold-soft border border-gold-ink rounded-full flex items-center justify-center mx-auto text-gold-ink mb-3 shadow-xs">
          <Trophy className="w-6 h-6 text-gold fill-gold" />
        </div>
        <h1 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
          Weekly Leaderboard
        </h1>
        <p className="text-scale-small text-ink-2 mt-1">
          Complete lessons and practice quizzes to gain XP. resets every Monday at 00:00 GMT.
        </p>
      </div>

      {/* Controller Filters and Reset timer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface border border-line p-4 rounded-lg shadow-xs select-none">
        {/* Friends / Global filter */}
        <div className="flex gap-2">
          {(["global", "friends"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer capitalize ${
                filter === tab
                  ? "bg-ink text-paper border-ink"
                  : "bg-surface text-ink-2 border-line hover:border-line-strong hover:bg-surface-sink"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Timer */}
        <div className="flex items-center gap-1.5 text-xs text-ink-3">
          <Clock className="w-4 h-4 text-ink-3" />
          <span>Resets in: <strong>3 days, 16 hours</strong></span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-surface border border-line-strong rounded-xl overflow-hidden shadow-sm">
        <div className="divide-y divide-line">
          
          {/* Table Header */}
          <div className="bg-surface-sink/40 p-4 grid grid-cols-12 text-[10px] font-bold text-ink-3 uppercase tracking-wider">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-7">Learner</div>
            <div className="col-span-3 text-right">Weekly XP</div>
          </div>

          {/* Ranked Rows */}
          {sortedLeaderboard.map((user) => {
            if (filter === "friends" && user.rank > 3) return null; // Simple filter simulation
            
            return (
              <div
                key={user.rank}
                className={`p-4 grid grid-cols-12 items-center text-scale-small transition-colors ${
                  user.isCurrentUser
                    ? "bg-gold-soft/30 border-y border-gold/20 font-semibold"
                    : "hover:bg-surface-sink/20"
                }`}
              >
                {/* Rank Medal */}
                <div className="col-span-2 flex justify-center">
                  <span
                    className={`w-6 h-6 rounded-full border text-[11px] font-bold flex items-center justify-center ${getMedalColor(
                      user.rank
                    )}`}
                  >
                    {user.rank}
                  </span>
                </div>

                {/* Learner details */}
                <div className="col-span-7 flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gold-soft border border-line flex items-center justify-center text-gold-ink font-semibold shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-ink truncate block">
                      {user.name}
                      {user.isCurrentUser && (
                        <span className="ml-1.5 text-[9px] uppercase tracking-wider bg-gold text-ink px-1 rounded font-bold">
                          You
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* XP */}
                <div className="col-span-3 text-right font-mono font-semibold text-ink">
                  {user.xp.toLocaleString()} XP
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mascot box guide */}
      <div className="bg-gold-soft/20 border border-line rounded-lg p-5 flex items-start gap-4 select-none">
        <Koji width={42} height={42} expression="happy" className="shrink-0" />
        <div className="space-y-1.5 flex-grow">
          <h5 className="font-semibold text-xs text-ink flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-gold fill-gold" />
            Rank Promotion Zone
          </h5>
          <p className="text-[11px] text-ink-2 leading-relaxed">
            The top 3 performers at the end of the week receive the <strong>Weekly Champions Badge</strong> on their profile, alongside +150 bonus store XP. Finish the module test on Introduction to Python to claim +50 XP!
          </p>
        </div>
      </div>
    </div>
  );
}
