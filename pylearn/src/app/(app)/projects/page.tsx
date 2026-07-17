"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getLocalProfile } from "@/lib/user";
import { seedProjects, Project } from "@/data/projects";
import { seedUsers } from "@/data/users";
import { Button } from "@/components/ui/Button";
import { Koji } from "@/components/Koji";
import {
  Lock,
  Unlock,
  CheckCircle,
  Users,
  Terminal,
  Upload,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  Users2,
} from "lucide-react";

export default function ProjectsPage() {
  const { data: session } = useSession();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [buildMode, setBuildMode] = useState<"solo" | "friend" | null>(null);
  const [submissionCode, setSubmissionCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [friendError, setFriendError] = useState("");
  const [friendSuccess, setFriendSuccess] = useState("");
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setProfile(getLocalProfile(session?.user));
  }, [session]);

  // Demo user completed topics: "Foundations", "print() and output", "Variables"
  const completedTopics = ["Foundations", "Variables"];

  const checkProjectUnlocked = (project: Project) => {
    return project.requires.every((req) => {
      // Allow lowercase comparisons
      return completedTopics.some(
        (ct) => ct.toLowerCase() === req.toLowerCase()
      );
    });
  };

  const handleStartProject = (project: Project, mode: "solo" | "friend") => {
    setSelectedProject(project);
    setBuildMode(mode);
    setIsSubmitted(false);
    setSubmissionCode("");
    setFriendEmail("");
    setFriendError("");
    setFriendSuccess("");
  };

  const handleFriendValidate = (e: React.FormEvent) => {
    e.preventDefault();
    setFriendError("");
    setFriendSuccess("");

    if (!friendEmail) return;

    // Check if the friend is in our seed users list
    const friend = seedUsers.find((u) => u.email === friendEmail);
    if (!friend) {
      setFriendError("User not found. Make sure they are registered on PyLearn.");
      return;
    }

    // Check if friend has completed the required topics
    const friendCompleted = ["Variables", "Foundations", "input()", "Conditionals", "Operators", "Strings"];
    const friendEligible = selectedProject?.requires.every((req) => {
      return friendCompleted.some((c) => c.toLowerCase() === req.toLowerCase());
    });

    if (!friendEligible) {
      setFriendError(
        `${friend.name} has not completed the required topics for this project.`
      );
      return;
    }

    setFriendSuccess(`Connected with ${friend.name}! You are both ready to build.`);
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionCode) return;

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-8 select-none py-4">
      {/* Header */}
      {!selectedProject && (
        <div className="border-b border-line pb-6">
          <h1 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
            Portfolio Projects
          </h1>
          <p className="text-scale-small text-ink-2 mt-1">
            Build real software programs to solidify your skills. Complete required topics to unlock.
          </p>
        </div>
      )}

      {/* Projects Grid */}
      {!selectedProject && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seedProjects.map((project) => {
            const isUnlocked = checkProjectUnlocked(project);
            
            return (
              <div
                key={project.id}
                className={`bg-surface border rounded-lg p-6 flex flex-col justify-between space-y-6 transition-all duration-200 ${
                  isUnlocked
                    ? "border-line hover:border-line-strong hover:shadow-custom"
                    : "border-line bg-surface-sink/10 opacity-75"
                }`}
              >
                <div className="space-y-4">
                  {/* Badge Row */}
                  <div className="flex justify-between items-center select-none">
                    <span className="text-[10px] font-bold text-gold-ink uppercase tracking-wider bg-gold-soft px-2 py-0.5 rounded border border-line-strong">
                      {project.level}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-ink-3">
                      {isUnlocked ? (
                        <span className="text-green flex items-center gap-1 font-semibold">
                          <Unlock className="w-3.5 h-3.5" /> Unlocked
                        </span>
                      ) : (
                        <span className="text-ink-3 flex items-center gap-1 font-semibold">
                          <Lock className="w-3.5 h-3.5" /> Locked
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="font-fraunces text-scale-h3 font-semibold text-ink leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-ink-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Completion Gate Check */}
                  <div className="space-y-1.5 pt-2 border-t border-line select-none">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-ink-3">
                      REQUIRED TOPICS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.requires.map((req, idx) => {
                        const hasCompleted = completedTopics.some(
                          (ct) => ct.toLowerCase() === req.toLowerCase()
                        );
                        return (
                          <span
                            key={idx}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 border ${
                              hasCompleted
                                ? "bg-green-soft border-green/10 text-green"
                                : "bg-surface border-line text-ink-3"
                            }`}
                          >
                            {hasCompleted ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Lock className="w-3 h-3" />
                            )}
                            {req}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Build buttons */}
                <div className="pt-2 border-t border-line flex flex-col sm:flex-row gap-2">
                  <Button
                    variant={isUnlocked ? "primary" : "secondary"}
                    disabled={!isUnlocked}
                    onClick={() => handleStartProject(project, "solo")}
                    className="w-full text-xs font-semibold"
                  >
                    Build Solo
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={!isUnlocked}
                    onClick={() => handleStartProject(project, "friend")}
                    className="w-full text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    Build with Friend
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Workspace / Submission Page */}
      {selectedProject && buildMode && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left panel: Info & Instructions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface border border-line rounded-lg p-5 space-y-4">
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs text-gold-ink font-semibold hover:underline flex items-center gap-1"
              >
                ← Back to projects
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-ink-3 uppercase">
                  PROJECT SPECIFICATION
                </span>
                <h3 className="font-fraunces text-scale-h3 font-semibold text-ink leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-ink-2 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Resources */}
              <div className="space-y-2 border-t border-line pt-3">
                <span className="text-[10px] font-bold text-ink-3 uppercase">Resources</span>
                <ul className="space-y-2 text-xs text-gold-ink">
                  {selectedProject.resources.map((res, idx) => (
                    <li key={idx} className="hover:underline cursor-pointer">
                      • {res}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Friend connection box */}
            {buildMode === "friend" && (
              <div className="bg-surface border border-line rounded-lg p-5 space-y-3">
                <div className="flex items-center gap-1 text-gold-ink font-semibold text-xs uppercase tracking-wider">
                  <Users className="w-4 h-4 text-gold" />
                  <span>Build with a Friend</span>
                </div>
                <p className="text-xs text-ink-2 leading-relaxed">
                  Invite another PyLearn user to code collaboratively. They must have unlocked this project.
                </p>

                {!friendSuccess ? (
                  <div className="space-y-3">
                    {profile && profile.connections && profile.connections.length > 0 && (
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-3">
                          Select from connections:
                        </label>
                        <select
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val) {
                              setFriendSuccess(`Connected with ${val}! You are both ready to build.`);
                            }
                          }}
                          className="w-full h-9 px-2 text-xs bg-paper border border-line rounded-md focus:outline-none focus:ring-1 focus:ring-ink"
                        >
                          <option value="">-- Select connection --</option>
                          {profile.connections.map((name: string) => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                        <div className="relative my-2 select-none">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-line" />
                          </div>
                          <div className="relative flex justify-center text-[9px] uppercase">
                            <span className="bg-surface px-2 text-ink-3">Or type email</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleFriendValidate} className="space-y-2">
                      <input
                        type="email"
                        placeholder="friend@pylearn.dev"
                        value={friendEmail}
                        onChange={(e) => setFriendEmail(e.target.value)}
                        className="w-full h-9 px-3 text-xs bg-paper border border-line rounded-md focus:outline-none focus:ring-1 focus:ring-ink focus:border-ink"
                      />
                      {friendError && (
                        <span className="text-[10px] text-red font-medium block">{friendError}</span>
                      )}
                      <Button type="submit" variant="secondary" className="w-full text-xs h-9">
                        Connect Friend
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="p-3 bg-green-soft border border-green/10 rounded flex items-start gap-2.5 text-[11px] text-ink-2">
                    <CheckCircle className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span>{friendSuccess}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right panel: Submission interface */}
          <div className="lg:col-span-8 bg-surface border border-line rounded-lg p-6 space-y-5">
            <h3 className="font-fraunces text-scale-h3 font-semibold text-ink border-b border-line pb-3">
              Submit Your Python Solution
            </h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmitCode} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block font-sans font-semibold text-xs text-ink-2">
                    Paste your Python script below
                  </label>
                  <textarea
                    rows={12}
                    value={submissionCode}
                    onChange={(e) => setSubmissionCode(e.target.value)}
                    placeholder={`# Paste your script here\n# e.g.\nprint("Welcome to ${selectedProject.title}")`}
                    className="w-full p-4 font-mono text-xs bg-code-bg text-code-text border border-code-line rounded-md focus:outline-none focus:ring-2 focus:ring-ink"
                    required
                  />
                </div>

                <div className="flex justify-between items-center select-none pt-2">
                  <div className="flex items-center gap-1 text-[11px] text-ink-3">
                    <Info className="w-4 h-4 text-gold-ink shrink-0" />
                    <span>Koji will run test validations against your code.</span>
                  </div>

                  <Button type="submit" variant="primary">
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Code
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-5 select-none">
                <div className="w-14 h-14 bg-green-soft border border-green/20 rounded-full flex items-center justify-center mx-auto text-green animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2 max-w-sm mx-auto">
                  <h3 className="font-fraunces text-scale-h2 font-semibold text-ink">
                    Code Accepted!
                  </h3>
                  <p className="text-scale-small text-ink-2">
                    Your program passed all test parameters. The <strong>{selectedProject.title}</strong> badge has been added to your profile!
                  </p>
                </div>

                <div className="pt-2">
                  <Button variant="secondary" onClick={() => setSelectedProject(null)}>
                    Return to projects
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
