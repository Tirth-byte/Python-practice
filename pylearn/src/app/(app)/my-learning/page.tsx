"use client";

import React, { useState } from "react";
import { seedCourses } from "@/data/courses";
import { CourseCard } from "@/components/CourseCard";
import { BookOpen } from "lucide-react";

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState<"all" | "in-progress" | "completed">("all");

  const enrolledCourses = [
    { course: seedCourses[0], progress: 100, status: "completed" },
    { course: seedCourses[1], progress: 14, status: "in-progress" },
  ];

  const filteredEnrolled = enrolledCourses.filter((item) => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });

  return (
    <div className="space-y-8 select-none py-4">
      {/* Header */}
      <div className="border-b border-line pb-6">
        <h1 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
          My learning
        </h1>
        <p className="text-scale-small text-ink-2 mt-1">
          Keep track of your course enrollments and progress.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-line">
        {(["all", "in-progress", "completed"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-scale-small font-semibold border-b-2 capitalize transition-colors cursor-pointer ${
              activeTab === tab
                ? "border-gold text-ink"
                : "border-transparent text-ink-3 hover:text-ink"
            }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      {filteredEnrolled.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnrolled.map(({ course, progress }) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={true}
              progress={progress}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface border border-line rounded-lg space-y-4">
          <div className="w-12 h-12 rounded-full bg-surface-sink flex items-center justify-center mx-auto text-ink-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">No courses found</h3>
          <p className="text-scale-small text-ink-2 max-w-sm mx-auto">
            You don't have any courses matching this status. Explore our catalog to enroll.
          </p>
        </div>
      )}
    </div>
  );
}
