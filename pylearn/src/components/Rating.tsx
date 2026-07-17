import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  rating: number;
  reviewsCount?: number;
  showText?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  reviewsCount,
  showText = true,
  className = "",
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`inline-flex items-center gap-1.5 font-sans ${className}`}>
      {/* Average rating text */}
      {showText && (
        <span className="font-semibold text-scale-small text-gold-ink select-none">
          {rating.toFixed(1)}
        </span>
      )}

      {/* Stars */}
      <div className="flex items-center" aria-label={`Rating: ${rating} out of 5 stars`}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-4 h-4 fill-gold stroke-gold"
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            className="w-4 h-4 fill-gold stroke-gold"
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="w-4 h-4 text-line stroke-line-strong fill-transparent"
          />
        ))}
      </div>

      {/* Review count */}
      {reviewsCount !== undefined && showText && (
        <span className="text-scale-small text-ink-3">
          ({reviewsCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};
