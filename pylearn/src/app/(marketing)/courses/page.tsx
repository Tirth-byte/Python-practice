"use client";

import React, { useState } from "react";
import { seedCourses } from "@/data/courses";
import { CourseCard } from "@/components/CourseCard";
import { Search, SlidersHorizontal, BookOpen } from "lucide-react";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedDuration, setSelectedDuration] = useState<string>("All");

  // Filtering logic
  const filteredCourses = seedCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.promise.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel =
      selectedLevel === "All" ||
      course.level.toLowerCase().includes(selectedLevel.toLowerCase()) ||
      (selectedLevel === "School" && course.level === "Both tracks") ||
      (selectedLevel === "Graduate" && course.level === "Both tracks");

    const matchesDuration =
      selectedDuration === "All" ||
      (selectedDuration === "Short" && parseFloat(course.duration) <= 2) ||
      (selectedDuration === "Medium" && parseFloat(course.duration) > 2);

    return matchesSearch && matchesLevel && matchesDuration;
  });

  return (
    <div className="bg-paper py-12 md:py-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-2xl">
          <span className="text-scale-micro text-gold-ink font-semibold">CURRICULUM CATALOG</span>
          <h1 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
            Explore Python Courses
          </h1>
          <p className="text-scale-body text-ink-2">
            Choose from zero-experience foundations to advanced engineering courses. All run fully in the browser.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-surface border border-line p-4 rounded-lg shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search courses by title or promise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 text-scale-small bg-paper border border-line rounded-md focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink"
            />
            <Search className="w-4 h-4 text-ink-3 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Level Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-ink-2 mr-1 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-ink-3" />
              Filter by Level:
            </span>
            {["All", "School", "Graduate"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer ${
                  selectedLevel === level
                    ? "bg-ink text-paper border-ink"
                    : "bg-surface text-ink-2 border-line hover:border-line-strong hover:bg-surface-sink"
                }`}
              >
                {level} {level !== "All" && "Track"}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar (Desktop Filters) */}
          <div className="lg:col-span-3 space-y-6 hidden lg:block bg-surface border border-line rounded-lg p-5">
            <h3 className="font-semibold text-scale-h3 text-ink border-b border-line pb-3">Filters</h3>
            
            {/* Duration filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-ink-3 uppercase tracking-wider">Duration</label>
              <div className="space-y-1.5">
                {[
                  { id: "All", label: "Any duration" },
                  { id: "Short", label: "Short (Under 2 hours)" },
                  { id: "Medium", label: "Medium (2+ hours)" },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2.5 text-scale-small text-ink-2 cursor-pointer">
                    <input
                      type="radio"
                      name="duration"
                      checked={selectedDuration === item.id}
                      onChange={() => setSelectedDuration(item.id)}
                      className="accent-ink"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Coming Soon Teaser */}
            <div className="border-t border-line pt-4 space-y-3">
              <span className="text-xs font-bold text-ink-3 uppercase tracking-wider">Coming Soon</span>
              <div className="space-y-2.5 opacity-55">
                <div className="p-3 bg-surface-sink rounded border border-line">
                  <h5 className="font-bold text-xs text-ink leading-tight">Loops & Iteration</h5>
                  <span className="text-[10px] text-ink-3 font-semibold uppercase">Module 3</span>
                </div>
                <div className="p-3 bg-surface-sink rounded border border-line">
                  <h5 className="font-bold text-xs text-ink leading-tight">Functions & Modules</h5>
                  <span className="text-[10px] text-ink-3 font-semibold uppercase">Module 4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="lg:col-span-9">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-surface border border-line rounded-lg space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-sink flex items-center justify-center mx-auto text-ink-3">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">No courses found</h3>
                <p className="text-scale-small text-ink-2 max-w-sm mx-auto">
                  We couldn't find any courses matching "{searchQuery}". Try broadening your search or resetting the filters.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
