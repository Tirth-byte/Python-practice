import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold";
  size?: "default" | "large" | "sm";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "default",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  // Base classes with transition duration
  let baseClasses =
    "inline-flex items-center justify-center font-sans font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  // Size classes
  let sizeClasses = "h-[44px] px-6 text-scale-small";
  if (size === "large") {
    sizeClasses = "h-[52px] px-8 text-scale-body";
  } else if (size === "sm") {
    sizeClasses = "h-[36px] px-4 text-xs";
  }

  // Variant classes
  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses =
        "bg-ink text-paper border border-ink hover:bg-ink-2 hover:border-ink-2 active:scale-98 shadow-[0_1px_2px_rgba(26,23,18,0.05)]";
      break;
    case "secondary":
      variantClasses =
        "bg-surface text-ink border border-line hover:border-line-strong hover:bg-surface-sink active:scale-98";
      break;
    case "ghost":
      variantClasses =
        "bg-transparent text-ink-2 hover:text-ink hover:bg-surface-sink active:bg-line";
      break;
    case "gold":
      variantClasses =
        "bg-gold text-ink border border-gold-ink hover:bg-opacity-90 active:scale-98 shadow-[0_1px_2px_rgba(224,168,46,0.1)]";
      break;
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 width-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
export default Button;
