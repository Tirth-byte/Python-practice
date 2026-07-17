import React from "react";

interface KojiProps {
  className?: string;
  width?: number;
  height?: number;
  expression?: "happy" | "thinking" | "coding" | "celebrating";
}

export const Koji: React.FC<KojiProps> = ({
  className = "",
  width = 64,
  height = 64,
  expression = "happy",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="15 8 70 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none transition-transform duration-300 hover:scale-105 ${className}`}
      aria-label="Koji the Python Mascot"
    >
      {/* Shadow */}
      <ellipse cx="50" cy="85" rx="35" ry="8" fill="rgba(26,23,18,0.06)" />

      {/* Body Coil (Green Coil) */}
      <path
        d="M20 75 C 20 65, 35 55, 50 55 C 65 55, 80 65, 80 75 C 80 82, 68 85, 50 85 C 32 85, 20 82, 20 75 Z"
        fill="#2E7D5B"
      />
      <path
        d="M28 72 C 28 66, 38 60, 50 60 C 62 60, 72 66, 72 72 C 72 76, 62 78, 50 78 C 38 78, 28 76, 28 72 Z"
        fill="#3A9870"
      />

      {/* S-Shape Neck */}
      <path
        d="M42 62 C 40 45, 55 45, 50 32"
        stroke="#2E7D5B"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M42 62 C 40 45, 55 45, 50 32"
        stroke="#3A9870"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Head */}
      <rect
        x="36"
        y="14"
        width="28"
        height="24"
        rx="12"
        fill="#2E7D5B"
        className="transition-all"
      />
      <rect
        x="38"
        y="16"
        width="24"
        height="20"
        rx="10"
        fill="#3A9870"
      />

      {/* Eyes with white glints */}
      {expression === "happy" && (
        <>
          <circle cx="44" cy="24" r="4.5" fill="#1A1712" />
          <circle cx="45.5" cy="22.5" r="1.5" fill="#FFFFFF" />

          <circle cx="56" cy="24" r="4.5" fill="#1A1712" />
          <circle cx="57.5" cy="22.5" r="1.5" fill="#FFFFFF" />
        </>
      )}

      {expression === "thinking" && (
        <>
          {/* Sidelong eyes */}
          <circle cx="42" cy="23" r="4.5" fill="#1A1712" />
          <circle cx="43.5" cy="21.5" r="1.5" fill="#FFFFFF" />

          <circle cx="54" cy="23" r="4.5" fill="#1A1712" />
          <circle cx="55.5" cy="21.5" r="1.5" fill="#FFFFFF" />

          {/* Thinking brow / angle */}
          <path d="M39 17 L46 19" stroke="#1A1712" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M51 19 L58 17" stroke="#1A1712" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}

      {expression === "coding" && (
        <>
          {/* Focused eyes */}
          <circle cx="45" cy="24" r="4" fill="#1A1712" />
          <circle cx="46" cy="23" r="1.2" fill="#FFFFFF" />

          <circle cx="55" cy="24" r="4" fill="#1A1712" />
          <circle cx="56" cy="23" r="1.2" fill="#FFFFFF" />

          {/* Mini orange glasses/tint */}
          <rect x="40" y="20" width="9" height="7" rx="2" stroke="#E0A82E" strokeWidth="1.5" fill="rgba(224, 168, 46, 0.15)" />
          <rect x="51" y="20" width="9" height="7" rx="2" stroke="#E0A82E" strokeWidth="1.5" fill="rgba(224, 168, 46, 0.15)" />
          <line x1="49" y1="23" x2="51" y2="23" stroke="#E0A82E" strokeWidth="1.5" />
        </>
      )}

      {expression === "celebrating" && (
        <>
          {/* Happy squinting arch eyes */}
          <path d="M41 26 C 41 22, 47 22, 47 26" stroke="#1A1712" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M53 26 C 53 22, 59 22, 59 26" stroke="#1A1712" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* Cheeks (Soft Pink) */}
      <circle cx="40" cy="28" r="2.5" fill="#E88D82" opacity="0.6" />
      <circle cx="60" cy="28" r="2.5" fill="#E88D82" opacity="0.6" />

      {/* Smile/Mouth */}
      <path
        d="M47 30 Q50 33 53 30"
        stroke="#1A1712"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Tiny Red Tongue Sticking Out */}
      <path
        d="M49.5 31.5 C49 34, 51 34, 50.5 31.5"
        stroke="#C4452F"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="#C4452F"
      />

      {/* Gold Hat/Crown for Celebrations */}
      {expression === "celebrating" && (
        <path
          d="M42 14 L45 8 L50 12 L55 8 L58 14 Z"
          fill="#E0A82E"
          stroke="#7A5A12"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};
