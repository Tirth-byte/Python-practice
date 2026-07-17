import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { seedUsers } from "@/data/users";

const dbPath = path.join(process.cwd(), "src/data/users-db.json");

function getDbUsers() {
  try {
    if (!fs.existsSync(dbPath)) {
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

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const users = getDbUsers();
    const user = users.find(
      (u: any) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      // Exclude password in response
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
