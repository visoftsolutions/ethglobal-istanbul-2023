"use client";

import { SideNav } from "@/components/SideNav";
import { Home } from "@/sections/Home";
import { Leaderboard } from "@/sections/Leaderboard";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-row gap-8">
      <SideNav />
      <div className="h-screen flex flex-col py-16 w-full">
        <Leaderboard />
      </div>
    </main>
  );
}
