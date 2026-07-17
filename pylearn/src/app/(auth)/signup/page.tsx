"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input, Field } from "@/components/ui/Input";
import { School, GraduationCap, ArrowRight, Check } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    track: "graduate" as "school" | "graduate",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateStep1 = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});
    try {
      const regRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          track: formData.track,
        }),
      });

      if (!regRes.ok) {
        const errData = await regRes.json();
        setErrors({ submit: errData.error || "Registration failed. Please try again." });
        return;
      }

      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setErrors({ submit: "Authentication failed after registration." });
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1 text-center lg:text-left select-none">
        <h2 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
          {step === 1 ? "Create your free account" : "How should we teach you?"}
        </h2>
        <p className="text-scale-small text-ink-3">
          {step === 1
            ? "Start learning in under a minute. No card needed."
            : "You can change this anytime in settings."}
        </p>
      </div>

      {step === 1 ? (
        <form onSubmit={handleNextStep} className="space-y-4">
          <Field label="Full Name" error={errors.name}>
            <Input
              type="text"
              placeholder="Aditi M."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
          </Field>

          <Field label="Email address" error={errors.email}>
            <Input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />
          </Field>

          <Field label="Password" error={errors.password}>
            <Input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />
          </Field>

          <Button type="submit" variant="primary" className="w-full">
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {/* Divider */}
          <div className="relative my-4 select-none">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-line" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface px-2 text-ink-3">Or register with</span>
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
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-gold-ink hover:underline">
              Log in
            </Link>
          </p>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Selectable Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* School Track Card */}
            <div
              onClick={() => setFormData({ ...formData, track: "school" })}
              className={`p-5 rounded-lg border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between h-44 ${
                formData.track === "school"
                  ? "border-gold bg-gold-soft/20 shadow-md"
                  : "border-line bg-surface hover:border-line-strong hover:bg-surface-sink/30"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="p-2 bg-blue/10 text-blue rounded-md">
                  <School className="w-6 h-6" />
                </div>
                {formData.track === "school" && (
                  <span className="p-1 bg-gold text-ink rounded-full">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-scale-body text-ink">School Level</h3>
                <p className="text-xs text-ink-2 leading-relaxed">
                  Start from zero. Plain language, interactive games, conceptual focus.
                </p>
              </div>
            </div>

            {/* Graduate Track Card */}
            <div
              onClick={() => setFormData({ ...formData, track: "graduate" })}
              className={`p-5 rounded-lg border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between h-44 ${
                formData.track === "graduate"
                  ? "border-gold bg-gold-soft/20 shadow-md"
                  : "border-line bg-surface hover:border-line-strong hover:bg-surface-sink/30"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="p-2 bg-gold-soft text-gold-ink rounded-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                {formData.track === "graduate" && (
                  <span className="p-1 bg-gold text-ink rounded-full">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-scale-body text-ink">Graduate Level</h3>
                <p className="text-xs text-ink-2 leading-relaxed">
                  Give me the real thing. Proper CS terminology, compiler insights, hands-on.
                </p>
              </div>
            </div>
          </div>

          {errors.submit && (
            <p className="text-xs text-red text-center font-semibold">{errors.submit}</p>
          )}

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="w-1/3"
              disabled={isLoading}
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button
              variant="primary"
              className="w-2/3"
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Complete Signup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
