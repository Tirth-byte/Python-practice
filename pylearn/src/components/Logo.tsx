import React from "react";
import Link from "next/link";
import { Koji } from "./Koji";

interface LogoProps {
  showTagline?: boolean;
  size?: number;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  showTagline = false,
  size = 32,
  href = "/",
}) => {
  return (
    <Link href={href} className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 rounded-md">
      <Koji width={size} height={size} className="group-hover:rotate-6 duration-300 transition-transform" />
      <div className="flex flex-col">
        <span className="font-fraunces text-scale-h3 font-semibold text-ink leading-tight tracking-tight select-none">
          PyLearn
        </span>
        {showTagline && (
          <span className="text-[10px] text-ink-3 font-sans tracking-wide uppercase select-none">
            Learn Python, properly.
          </span>
        )}
      </div>
    </Link>
  );
};
