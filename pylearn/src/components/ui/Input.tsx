import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  className = "",
  error,
  ...props
}) => {
  return (
    <input
      className={`w-full h-11 px-3.5 bg-surface border rounded-md font-sans text-scale-small text-ink placeholder:text-ink-3 transition-colors focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink ${
        error ? "border-red focus:ring-red focus:border-red" : "border-line focus:ring-ink focus:border-ink hover:border-line-strong"
      } ${className}`}
      {...props}
    />
  );
};

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <label
      className={`block font-sans font-semibold text-scale-small text-ink mb-1.5 select-none ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

interface FieldProps {
  label: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

export const Field: React.FC<FieldProps> = ({
  label,
  error,
  helperText,
  children,
  className = "",
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <Label>{label}</Label>
      {children}
      {error ? (
        <span className="mt-1 text-xs text-red font-medium">{error}</span>
      ) : helperText ? (
        <span className="mt-1 text-xs text-ink-3">{helperText}</span>
      ) : null}
    </div>
  );
};
