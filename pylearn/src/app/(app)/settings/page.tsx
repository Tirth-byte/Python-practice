"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Koji } from "@/components/Koji";
import { School, GraduationCap, CheckCircle2, Save, Trash2, Bell, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const userTrack = (session?.user as any)?.track || "graduate";

  const [activeTrack, setActiveTrack] = useState<"school" | "graduate">(userTrack);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    setIsSaved(false);

    try {
      // Call NextAuth session update to persist the chosen track
      await update({ track: activeTrack });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 select-none py-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="border-b border-line pb-6">
        <h1 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
          Account Settings
        </h1>
        <p className="text-scale-small text-ink-2 mt-1">
          Manage your course settings, notifications, and active learning track.
        </p>
      </div>

      {/* 1. Track Switcher */}
      <div className="bg-surface border border-line rounded-lg p-6 space-y-4">
        <h3 className="font-fraunces text-scale-h3 font-semibold text-ink border-b border-line pb-3">
          Select Your Active Track
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* School Track Card */}
          <div
            onClick={() => setActiveTrack("school")}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex flex-col justify-between h-36 ${
              activeTrack === "school"
                ? "border-gold bg-gold-soft/20 shadow-xs"
                : "border-line bg-surface hover:border-line-strong hover:bg-surface-sink/30"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue/10 text-blue rounded">
                <School className="w-5 h-5" />
              </div>
              {activeTrack === "school" && (
                <span className="p-0.5 bg-gold text-ink rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
            <div className="space-y-0.5">
              <h4 className="font-semibold text-xs text-ink">School Level</h4>
              <p className="text-[11px] text-ink-2 leading-relaxed">
                Plain language, animations, conceptual focus. Perfect for beginners.
              </p>
            </div>
          </div>

          {/* Graduate Track Card */}
          <div
            onClick={() => setActiveTrack("graduate")}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex flex-col justify-between h-36 ${
              activeTrack === "graduate"
                ? "border-gold bg-gold-soft/20 shadow-xs"
                : "border-line bg-surface hover:border-line-strong hover:bg-surface-sink/30"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-gold-soft text-gold-ink rounded">
                <GraduationCap className="w-5 h-5" />
              </div>
              {activeTrack === "graduate" && (
                <span className="p-0.5 bg-gold text-ink rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
            <div className="space-y-0.5">
              <h4 className="font-semibold text-xs text-ink">Graduate Level</h4>
              <p className="text-[11px] text-ink-2 leading-relaxed">
                CS terminology, compiler mechanics, hands-on. Perfect for career switchers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Notifications Preferences (mock) */}
      <div className="bg-surface border border-line rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-line pb-3">
          <Bell className="w-4 h-4 text-ink-3" />
          <h3 className="font-fraunces text-scale-h3 font-semibold text-ink">
            Notifications
          </h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-start gap-3 text-xs text-ink-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="mt-0.5 accent-ink" />
            <div>
              <span className="font-semibold text-ink block">Daily Streak Reminders</span>
              <span>Receive a friendly reminder from Koji when your streak is about to reset.</span>
            </div>
          </label>
          <label className="flex items-start gap-3 text-xs text-ink-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="mt-0.5 accent-ink" />
            <div>
              <span className="font-semibold text-ink block">Weekly Leaderboard Digests</span>
              <span>Weekly summaries of your league rank promotions.</span>
            </div>
          </label>
        </div>
      </div>

      {/* 3. Action Row with Success alert */}
      <div className="flex items-center justify-between">
        {isSaved ? (
          <div className="flex items-center gap-2 text-xs text-green font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            Settings saved successfully!
          </div>
        ) : (
          <div />
        )}

        <Button onClick={handleSave} variant="primary" isLoading={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* 4. Danger Zone */}
      <div className="bg-red-soft/20 border border-red/20 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2 text-red font-bold text-xs uppercase tracking-wider border-b border-red/10 pb-3">
          <ShieldAlert className="w-4 h-4" />
          <span>Danger Zone</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-ink-2">
          <div>
            <span className="font-bold text-ink block">Delete PyLearn Account</span>
            <span>Permanently delete all streak counts, XP scores, and progress tokens.</span>
          </div>
          <Button variant="secondary" className="border-red/30 text-red hover:bg-red-soft/40 hover:border-red">
            <Trash2 className="w-4 h-4 mr-1.5" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
