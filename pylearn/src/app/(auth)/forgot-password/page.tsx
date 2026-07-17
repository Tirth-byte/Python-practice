"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input, Field } from "@/components/ui/Input";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1 text-center lg:text-left select-none">
        <h2 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
          Reset password
        </h2>
        <p className="text-scale-small text-ink-3">
          If your account exists, we will send you a reset link.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Email address">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Send Reset Link
          </Button>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-xs font-semibold text-ink-2 hover:text-ink select-none pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </form>
      ) : (
        <div className="space-y-6 text-center lg:text-left select-none">
          <div className="p-4 bg-green-soft border border-green/20 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green shrink-0 mt-0.5" />
            <div className="space-y-1 text-left text-xs">
              <span className="font-semibold text-green block">Link Sent Successfully</span>
              <span className="text-ink-2 leading-relaxed">
                If that email exists, we've sent a reset link. Check your inbox and spam folder.
              </span>
            </div>
          </div>

          <Link href="/login" className="block">
            <Button variant="secondary" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
