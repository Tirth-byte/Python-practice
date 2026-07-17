import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { seedUsers } from "@/data/users";

const dbPath = path.join(process.cwd(), "src/data/users-db.json");

function getDbUsers() {
  try {
    if (!fs.existsSync(dbPath)) {
      // Write initial seed data
      fs.writeFileSync(dbPath, JSON.stringify(seedUsers, null, 2));
      return seedUsers;
    }
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users db", err);
    return seedUsers;
  }
}

function saveDbUsers(users: any[]) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error writing users db", err);
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, password, track } = await request.json();

    if (!name || !email || !password || !track) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const users = getDbUsers();

    // Check if user already exists
    const existingUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password,
      track,
      level: 1,
      xp: 0,
      streak: 1,
      completedLessons: [],
      completedProjects: [],
    };

    users.push(newUser);
    saveDbUsers(users);

    return NextResponse.json(newUser, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
