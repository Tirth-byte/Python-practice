"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Koji } from "@/components/Koji";
import { getLocalProfile, saveLocalProfile, UserProfile } from "@/lib/user";
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Send,
  Plus,
  Compass,
  TrendingUp,
  UserPlus,
  Check,
  X,
  Search,
  Users,
  Award,
  Sparkles
} from "lucide-react";

interface CommunityPost {
  id: string;
  author: string;
  level: number;
  text: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

const seedPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "Shivam P.",
    level: 4,
    text: "Just completed the Python basics module. The custom separator in print statements (print('a', 'b', sep='-')) is super clean! Building a small text generator for my school project.",
    likes: 8,
    comments: 2,
    timeAgo: "2 hours ago",
  },
  {
    id: "post-2",
    author: "Aditi M.",
    level: 3,
    text: "Has anyone tried running mathematical functions in Pyodide? It's amazingly fast. I'm building a loan calculator with a clean UI inside the projects workspace. Let's collaborate!",
    likes: 12,
    comments: 4,
    timeAgo: "5 hours ago",
  },
];

export default function CommunityPage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPostText, setNewPostText] = useState("");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Searchable directory of other students
  const studentDirectory = [
    { name: "Shivam P.", level: 4, track: "graduate" },
    { name: "Karan D.", level: 3, track: "school" },
    { name: "Neha S.", level: 5, track: "graduate" },
    { name: "Aarav M.", level: 2, track: "school" },
    { name: "Aditi M.", level: 6, track: "graduate" },
    { name: "Riya S.", level: 3, track: "school" },
  ];

  // Load user profile & posts from local storage on mount
  useEffect(() => {
    const activeProfile = getLocalProfile(session?.user);
    setProfile(activeProfile);

    const savedPosts = localStorage.getItem("pylearn_community_posts");
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        setPosts(seedPosts);
      }
    } else {
      setPosts(seedPosts);
      localStorage.setItem("pylearn_community_posts", JSON.stringify(seedPosts));
    }
  }, [session]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim() || !profile) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: profile.name,
      level: profile.level,
      text: newPostText,
      likes: 0,
      comments: 0,
      timeAgo: "Just now",
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem("pylearn_community_posts", JSON.stringify(updated));
    setNewPostText("");
  };

  const handleLike = (id: string) => {
    const isLiked = !!likedPosts[id];
    const updated = posts.map((post) => {
      if (post.id === id) {
        return { ...post, likes: post.likes + (isLiked ? -1 : 1) };
      }
      return post;
    });

    setPosts(updated);
    localStorage.setItem("pylearn_community_posts", JSON.stringify(updated));
    setLikedPosts((prev) => ({ ...prev, [id]: !isLiked }));
  };

  // Connection handlers
  const handleAcceptRequest = (name: string) => {
    if (!profile) return;
    const updated = { ...profile };
    // Remove from incoming requests
    updated.incomingRequests = updated.incomingRequests.filter((r) => r !== name);
    // Add to connections if not already present
    if (!updated.connections.includes(name)) {
      updated.connections.push(name);
    }
    setProfile(updated);
    saveLocalProfile(updated);
  };

  const handleDeclineRequest = (name: string) => {
    if (!profile) return;
    const updated = { ...profile };
    updated.incomingRequests = updated.incomingRequests.filter((r) => r !== name);
    setProfile(updated);
    saveLocalProfile(updated);
  };

  const handleSendConnection = (name: string) => {
    if (!profile) return;
    const updated = { ...profile };
    
    // Simulating instant connection for testing ease
    if (!updated.connections.includes(name)) {
      updated.connections.push(name);
    }
    setProfile(updated);
    saveLocalProfile(updated);
  };

  // Filter student directory for search bar
  const filteredStudents = studentDirectory.filter((student) => {
    if (profile?.name === student.name) return false; // Don't show yourself
    return student.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 py-4 select-none">
      
      {/* LinkedIn-Style Dashboard Header */}
      <div className="border-b border-line pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
            Community Space
          </h1>
          <p className="text-scale-small text-ink-2 mt-1">
            Network with fellow developers, build joint projects, and collaborate in real-time.
          </p>
        </div>
      </div>

      {/* 3-Column LinkedIn Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMN 1: LEFT PROFILE CARD (Span 3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-surface border border-line rounded-lg overflow-hidden shadow-xs">
            {/* Branded Header Background */}
            <div className="h-16 bg-gradient-to-r from-[#A435F0]/20 to-[#5624D0]/10 border-b border-line relative flex items-center justify-center">
              <div className="absolute bottom-[-24px]">
                <div className="w-12 h-12 rounded-full bg-white border border-line flex items-center justify-center shadow-md">
                  <Koji width={32} height={32} expression="happy" />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-8 p-4 text-center space-y-4">
              <div>
                <h3 className="font-bold text-sm text-ink leading-tight">
                  {profile?.name || "Student"}
                </h3>
                <span className="text-[10px] text-ink-3 font-semibold uppercase tracking-wider block mt-0.5">
                  {profile?.track || "Graduate"} Track • Lvl {profile?.level || 1}
                </span>
              </div>

              {/* Progress bar inside profile card */}
              <div className="space-y-1.5 text-left border-t border-line pt-3">
                <div className="flex justify-between text-[10px] text-ink-3 font-semibold">
                  <span>Level {profile?.level}</span>
                  <span>{profile?.xp} XP</span>
                </div>
                <div className="w-full h-1.5 bg-surface-sink rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-300"
                    style={{ width: `${((profile?.xp || 0) % 150) / 1.5}%` }}
                  />
                </div>
              </div>

              {/* Connection stats */}
              <div className="border-t border-line pt-3 flex justify-between items-center text-xs text-ink-3">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-ink-3" />
                  Connections
                </span>
                <span className="font-bold text-ink">
                  {profile?.connections.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: CENTER POSTS FEED (Span 6) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Post Composer */}
          <div className="bg-surface border border-line rounded-lg p-4 space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold-soft border border-line flex items-center justify-center text-gold-ink font-bold text-xs select-none">
                {profile?.name.charAt(0) || "S"}
              </div>
              <span className="text-xs font-semibold text-ink-3">
                Start a post on what you coded today...
              </span>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <textarea
                rows={3}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Share your python code snippet or ask for helper feedback..."
                className="w-full p-3 text-xs bg-surface-sink border border-line rounded focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold placeholder:text-ink-3"
                required
              />

              <div className="flex justify-between items-center select-none">
                <span className="text-[10px] text-ink-3">
                  Markdown format and Python code snippets are supported.
                </span>
                <Button type="submit" variant="primary" size="sm" className="bg-ink hover:bg-black text-white text-xs h-8">
                  <Send className="w-3 h-3 mr-1.5" />
                  Post
                </Button>
              </div>
            </form>
          </div>

          {/* Posts list */}
          <div className="space-y-4">
            {posts.map((post) => {
              const isLiked = !!likedPosts[post.id];
              return (
                <div
                  key={post.id}
                  className="bg-surface border border-line rounded-lg p-4 space-y-3 shadow-xs hover:border-line-strong transition-colors"
                >
                  {/* Post Header */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gold-soft border border-line flex items-center justify-center text-gold-ink font-bold text-xs">
                      {post.author.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-ink leading-none">{post.author}</h4>
                        <span className="px-1.5 py-0.2 bg-gold-soft text-[9px] font-bold text-gold-ink rounded border border-line-strong">
                          Lvl {post.level}
                        </span>
                      </div>
                      <span className="text-[9px] text-ink-3 mt-0.5 block">{post.timeAgo}</span>
                    </div>
                  </div>

                  {/* Post text */}
                  <p className="text-xs text-ink-2 leading-relaxed whitespace-pre-wrap">
                    {post.text}
                  </p>

                  {/* Post Actions */}
                  <div className="flex items-center gap-6 pt-2.5 border-t border-line text-xs text-ink-3 select-none">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isLiked ? "text-gold font-semibold" : "hover:text-ink"
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? "fill-gold stroke-gold" : ""}`} />
                      <span>{post.likes} Likes</span>
                    </button>

                    <button className="flex items-center gap-1.5 hover:text-ink cursor-pointer">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.comments} Comments</span>
                    </button>

                    <button className="flex items-center gap-1.5 hover:text-ink ml-auto cursor-pointer">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* COLUMN 3: RIGHT CONNECTIONS MANAGER (Span 3) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Incoming Connections Invites */}
          {profile && profile.incomingRequests.length > 0 && (
            <div className="bg-surface border border-line rounded-lg p-4 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-gold-ink font-bold text-xs uppercase tracking-wider">
                <UserPlus className="w-4 h-4 text-gold" />
                <span>Pending Invites ({profile.incomingRequests.length})</span>
              </div>

              <div className="space-y-2.5">
                {profile.incomingRequests.map((name) => (
                  <div key={name} className="flex items-center justify-between gap-2 border-b border-line pb-2 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-gold-soft flex items-center justify-center text-gold-ink font-bold text-xs shrink-0">
                        {name.charAt(0)}
                      </div>
                      <h5 className="text-xs font-semibold text-ink truncate leading-none">
                        {name}
                      </h5>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleAcceptRequest(name)}
                        className="p-1 bg-[#EBF8F1] text-[#1C824E] border border-[#1C824E]/20 rounded hover:bg-[#1C824E] hover:text-white transition-colors cursor-pointer"
                        title="Accept Invite"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(name)}
                        className="p-1 bg-[#FDF1EE] text-[#C33B27] border border-[#C33B27]/20 rounded hover:bg-[#C33B27] hover:text-white transition-colors cursor-pointer"
                        title="Decline Invite"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Directory Search & Connect */}
          <div className="bg-surface border border-line rounded-lg p-4 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-ink font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4 text-ink-3" />
              <span>Connect with Peers</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-ink-3 absolute left-2.5 top-1/2 translate-y-[-50%]" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface-sink border border-line rounded focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div className="space-y-3">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((conn) => {
                  const isConnected = profile?.connections.includes(conn.name);
                  return (
                    <div key={conn.name} className="flex items-center justify-between gap-2 border-b border-line pb-2 last:border-b-0 last:pb-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-gold-soft flex items-center justify-center text-gold-ink font-bold text-xs shrink-0">
                          {conn.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-semibold text-ink truncate leading-none">
                            {conn.name}
                          </h5>
                          <span className="text-[9px] text-ink-3 block mt-0.5">
                            {conn.track} track • Lvl {conn.level}
                          </span>
                        </div>
                      </div>

                      {isConnected ? (
                        <span className="text-[10px] text-[#1C824E] font-bold flex items-center gap-0.5 select-none shrink-0">
                          <Check className="w-3 h-3" />
                          Connected
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSendConnection(conn.name)}
                          className="p-1 border border-line rounded hover:bg-surface-sink hover:border-line-strong transition-colors cursor-pointer text-ink-2 shrink-0"
                          title="Connect"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <span className="text-[10px] text-ink-3 italic block text-center py-2">
                  No other students match query.
                </span>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
