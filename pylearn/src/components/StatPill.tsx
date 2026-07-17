import React from "react";

interface StatPillProps {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
  className?: string;
}

export const StatPill: React.FC<StatPillProps> = ({
  icon,
  value,
  label,
  className = "",
}) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface border border-line rounded-full select-none shadow-[0_1px_2px_rgba(26,23,18,0.02)] ${className}`}>
      {icon ? (
        <span className="flex items-center justify-center">{icon}</span>
      ) : (
        <span className="w-2 h-2 rounded-full bg-gold" />
      )}
      <span className="font-semibold text-scale-small text-ink">
        {value}
      </span>
      <span className="text-scale-small text-ink-3">
        {label}
      </span>
    </div>
  );
};
export default StatPill;
