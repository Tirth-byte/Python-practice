import React from "react";
import { Koji } from "@/components/Koji";

export default function AboutPage() {
  return (
    <div className="bg-paper py-16 md:py-24 select-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-scale-micro text-gold-ink font-semibold">OUR MISSION</span>
          <h1 className="font-fraunces text-scale-display font-semibold text-ink leading-tight">
            Python that finally makes sense.
          </h1>
          <p className="text-scale-body text-ink-3 italic font-fraunces">
            "Learn Python, properly."
          </p>
        </div>

        {/* Mascot Centerpiece */}
        <div className="flex justify-center py-4">
          <div className="p-8 bg-surface border border-line rounded-full shadow-[0_4px_20px_rgba(26,23,18,0.02)]">
            <Koji expression="coding" width={100} height={100} />
          </div>
        </div>

        {/* About Body */}
        <div className="space-y-6 text-scale-body text-ink-2 leading-relaxed">
          <p>
            PyLearn was built to address a common problem: programming platforms that feel like either sterile academic exercises or fast-paced video games with no depth. We believe in high-fidelity learning—combining interactive, instant-run browser execution with rigorous, concept-focused editorial instruction.
          </p>

          <h3 className="font-fraunces text-scale-h2 font-semibold text-ink pt-4">
            The Two-Track Philosophy
          </h3>
          <p>
            Everyone learns differently. CS majors or career-switching engineers might want correct terminology, dynamic typing details, memory addresses, and comparisons to C. High schoolers or hobbyists starting from scratch might want simple explanations, analogies, and quick visual wins.
          </p>
          <p>
            Instead of making you choose between two different platforms, PyLearn built the dual-track core. Toggle between <strong>School Track</strong> and <strong>Graduate Track</strong> at any moment, and watch the text, objective level, and compiler requirements adapt to your focus.
          </p>

          <h3 className="font-fraunces text-scale-h2 font-semibold text-ink pt-4">
            No-Setup browser execution
          </h3>
          <p>
            Getting stuck on installation (PATH variables, IDE setup, dependency conflicts) kills more developer journeys than actual coding. That's why PyLearn runs a full local Python 3 interpreter in your browser tab using WebAssembly and Pyodide. Run your scripts in less than 50 milliseconds, capture inputs, print outputs, and solve quizzes instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
