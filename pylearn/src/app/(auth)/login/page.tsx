"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input, Field } from "@/components/ui/Input";
import { ArrowRight, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [formData, setFormData] = useState({
    email: "demo@pylearn.dev", // Pre-fill for ease of testing
    password: "password",      // Pre-fill for ease of testing
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!formData.email) {
      setErrors({ email: "Email is required." });
      return;
    }
    if (!formData.password) {
      setErrors({ password: "Password is required." });
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setErrors({ submit: "Invalid email or password." });
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1 text-center lg:text-left select-none">
        <h2 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
          Welcome back
        </h2>
        <p className="text-scale-small text-ink-3">
          Pick up where Koji left off.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="p-3 bg-red-soft border border-red/20 rounded-md flex items-start gap-2.5 text-xs text-red font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.submit}</span>
          </div>
        )}

        <Field label="Email address" error={errors.email}>
          <Input
            type="email"
            placeholder="demo@pylearn.dev"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />
        </Field>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center select-none">
            <label className="block font-sans font-semibold text-scale-small text-ink">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-ink-3 hover:text-ink hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
          />
          {errors.password && (
            <span className="mt-1 text-xs text-red font-medium block">{errors.password}</span>
          )}
        </div>

        <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
          Sign in
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {/* Divider */}
        <div className="relative my-4 select-none">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-line" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface px-2 text-ink-3">Or sign in with</span>
          </div>
        </div>

        {/* Social placeholder buttons */}
        <div className="grid grid-cols-2 gap-3 select-none">
          <Button
            type="button"
            variant="secondary"
            className="w-full text-xs h-10 flex items-center justify-center gap-2"
            onClick={() => {}}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full text-xs h-10 flex items-center justify-center gap-2"
            onClick={() => {}}
          >
            <svg className="w-4 h-4 text-ink shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </Button>
        </div>

        <p className="text-center text-xs text-ink-3 pt-2 select-none">
          New to PyLearn?{" "}
          <Link href="/signup" className="font-semibold text-gold-ink hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-8 text-xs text-ink-3">Loading Login Interface...</div>}>
      <LoginForm />
    </Suspense>
  );
}
