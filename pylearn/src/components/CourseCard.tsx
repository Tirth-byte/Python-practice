import React from "react";
import Link from "next/link";
import { Course } from "@/data/courses";
import { Rating } from "./Rating";
import { BookOpen, Clock } from "lucide-react";

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  progress?: number; // Optional completion progress percentage (0-100)
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isEnrolled = false,
  progress,
}) => {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col bg-surface border border-line rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-custom"
    >
      {/* Thumbnail with 16:9 aspect ratio */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-line">
        <img
          src={
            course.slug === "introduction-to-programming"
              ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
              : "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop"
          }
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-ink text-paper text-[10px] font-semibold rounded select-none">
          {course.price}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        {/* Category eyebrow */}
        <span className="text-scale-micro text-gold-ink font-semibold select-none">
          PYTHON CORE
        </span>

        {/* Title */}
        <h3 className="font-fraunces text-scale-h3 font-semibold text-ink group-hover:text-gold-ink transition-colors line-clamp-2 min-h-[50px] leading-tight">
          {course.title}
        </h3>

        {/* Short divider line */}
        <hr className="border-t border-line w-12" />

        {/* Promise / Description snippet */}
        <p className="text-scale-small text-ink-2 line-clamp-2 leading-relaxed flex-grow">
          {course.promise}
        </p>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-scale-small text-ink-2 select-none border-t border-line pt-3 mt-auto">
          {/* Level Chip */}
          <span className="inline-flex items-center px-2 py-0.5 bg-surface-sink border border-line rounded text-xs font-medium text-ink-2">
            {course.level}
          </span>

          <span className="inline-flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-ink-3" />
            {course.lessonsCount} lessons
          </span>

          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-ink-3" />
            {course.duration}
          </span>
        </div>

        {/* Rating and progress */}
        <div className="flex items-center justify-between mt-2 select-none">
          <Rating rating={course.rating} reviewsCount={course.reviewsCount} />
        </div>

        {/* Progress Bar (if enrolled) */}
        {isEnrolled && progress !== undefined && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-ink-2 mb-1">
              <span>Progress</span>
              <span className="font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-surface-sink rounded-full h-1.5 border border-line">
              <div
                className="bg-gold h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
export default CourseCard;
