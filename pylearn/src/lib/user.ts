export interface UserProfile {
  id: string;
  name: string;
  email: string;
  track: "school" | "graduate";
  level: number;
  xp: number;
  streak: number;
  completedLessons: string[];
  completedProjects: string[];
  connections: string[]; // List of connected user names
  incomingRequests: string[]; // List of incoming pending request names
}

export const getLocalProfile = (sessionUser?: any): UserProfile => {
  if (typeof window === "undefined") {
    return {
      id: "demo",
      name: "Demo Student",
      email: "demo@pylearn.dev",
      track: "graduate",
      level: 1,
      xp: 0,
      streak: 1,
      completedLessons: [],
      completedProjects: [],
      connections: [],
      incomingRequests: [],
    };
  }

  const email = sessionUser?.email || "demo@pylearn.dev";
  const key = `pylearn_user_${email.toLowerCase()}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Sync track if session changed
      if (sessionUser?.track && parsed.track !== sessionUser.track) {
        parsed.track = sessionUser.track;
        localStorage.setItem(key, JSON.stringify(parsed));
      }
      // Ensure arrays exist
      if (!parsed.connections) parsed.connections = ["Shivam P.", "Karan D."];
      if (!parsed.incomingRequests) parsed.incomingRequests = ["Neha S.", "Aarav M."];
      return parsed;
    } catch (e) {
      console.error("Failed to parse user profile", e);
    }
  }
  
  const initial: UserProfile = {
    id: sessionUser?.id || `user-${Date.now()}`,
    name: sessionUser?.name || "Demo Student",
    email: email.toLowerCase(),
    track: sessionUser?.track || "graduate",
    level: 1,
    xp: 0,
    streak: 3, // Start with a nice streak for visual appeal
    completedLessons: [],
    completedProjects: [],
    connections: ["Shivam P.", "Karan D."], // Pre-seeded friends
    incomingRequests: ["Neha S.", "Aarav M."], // Pre-seeded incoming requests
  };
  localStorage.setItem(key, JSON.stringify(initial));
  return initial;
};

export const saveLocalProfile = (profile: UserProfile) => {
  if (typeof window === "undefined") return;
  const key = `pylearn_user_${profile.email.toLowerCase()}`;
  localStorage.setItem(key, JSON.stringify(profile));
  // Dispatch a custom event to notify all components to re-read localStorage
  window.dispatchEvent(new Event("pylearn_user_update"));
};

export const awardXp = (email: string, amount: number): { xp: number; level: number; leveledUp: boolean } => {
  const profile = getLocalProfile({ email });
  const oldLevel = profile.level;
  
  profile.xp += amount;
  // Calculate level: each level requires 150 XP
  profile.level = Math.floor(profile.xp / 150) + 1;
  const leveledUp = profile.level > oldLevel;
  
  saveLocalProfile(profile);
  return { xp: profile.xp, level: profile.level, leveledUp };
};

export const completeLesson = (email: string, lessonSlug: string): boolean => {
  const profile = getLocalProfile({ email });
  if (profile.completedLessons.includes(lessonSlug)) return false;
  profile.completedLessons.push(lessonSlug);
  saveLocalProfile(profile);
  awardXp(email, 30); // 30 XP for completing a lesson!
  return true;
};

export const completeProject = (email: string, projectSlug: string): boolean => {
  const profile = getLocalProfile({ email });
  if (profile.completedProjects.includes(projectSlug)) return false;
  profile.completedProjects.push(projectSlug);
  saveLocalProfile(profile);
  awardXp(email, 100); // 100 XP for completing a project!
  return true;
};
