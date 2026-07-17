export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  track: "school" | "graduate";
  level: number;
  xp: number;
  streak: number;
  avatarUrl?: string;
  completedLessons: string[]; // lesson ids
  completedProjects: string[]; // project ids
}

export const seedUsers: User[] = [
  {
    id: "user-aditi",
    name: "Aditi M.",
    email: "aditi@pylearn.dev",
    password: "password",
    track: "school",
    level: 7,
    xp: 1420,
    streak: 12,
    completedLessons: ["c1-l1", "c1-l2", "c2-l1", "c2-l2"],
    completedProjects: ["tip-calculator"]
  },
  {
    id: "user-shivam",
    name: "Shivam P.",
    email: "shivam@pylearn.dev",
    password: "password",
    track: "graduate",
    level: 9,
    xp: 1180,
    streak: 24,
    completedLessons: ["c1-l1", "c1-l2", "c1-l3", "c1-l4", "c2-l1", "c2-l2", "c2-l3"],
    completedProjects: ["number-guessing", "rock-paper-scissors"]
  },
  {
    id: "user-riya",
    name: "Riya S.",
    email: "riya@pylearn.dev",
    password: "password",
    track: "school",
    level: 5,
    xp: 610,
    streak: 40,
    completedLessons: ["c1-l1", "c1-l2"],
    completedProjects: []
  },
  {
    id: "user-karan",
    name: "Karan D.",
    email: "karan@pylearn.dev",
    password: "password",
    track: "school",
    level: 4,
    xp: 540,
    streak: 4,
    completedLessons: ["c1-l1"],
    completedProjects: []
  },
  {
    id: "user-demo",
    name: "Demo User",
    email: "demo@pylearn.dev",
    password: "password",
    track: "graduate",
    level: 6,
    xp: 640,
    streak: 15,
    completedLessons: ["c1-l1", "c1-l2", "c2-l1"],
    completedProjects: []
  }
];

export interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  isCurrentUser: boolean;
}

export const seedLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Aditi M.", xp: 1420, isCurrentUser: false },
  { rank: 2, name: "Shivam P.", xp: 1180, isCurrentUser: false },
  { rank: 3, name: "Demo User", xp: 640, isCurrentUser: true },
  { rank: 4, name: "Riya S.", xp: 610, isCurrentUser: false },
  { rank: 5, name: "Karan D.", xp: 540, isCurrentUser: false }
];

export interface CommunityPost {
  id: string;
  author: string;
  level: number;
  text: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

export const seedPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "Aditi M.",
    level: 7,
    text: "Finished the Number Guessing project! Added a best-score tracker 🎯 feedback welcome.",
    likes: 12,
    comments: 3,
    timeAgo: "2h ago"
  },
  {
    id: "post-2",
    author: "Karan D.",
    level: 4,
    text: "Why does input() return a string even when I type a number? Took me an hour 😅",
    likes: 8,
    comments: 5,
    timeAgo: "5h ago"
  },
  {
    id: "post-3",
    author: "Shivam P.",
    level: 9,
    text: "Graduate track, Module 2 done. The strings section's f-string examples are gold.",
    likes: 20,
    comments: 2,
    timeAgo: "1d ago"
  }
];
