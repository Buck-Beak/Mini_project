"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserAuth } from "../context/AuthContextProvider";
import { logout } from "../functions/auth";
import { useRouter } from "next/navigation";
import { useDarkMode } from "../darkModeContext/page";

export default function Home() {
  const { user } = UserAuth() || {};
  const router = useRouter();
  const {darkMode} = useDarkMode();

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-blue-950 text-black"} h-screen w-screen flex`}>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-start p-8 ml-20">
        {/* Welcome Section */}
        <div className={`w-full rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"}! 🎉</h1>
          <p className="mt-1">Here's what's happening today.</p>

          {/* Quick Actions */}
          <div className="flex gap-4 mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
              📚 Browse Courses
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md">
              ✍️ Create New Course
            </button>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Recent Activity */}
          <div className={`rounded-xl shadow-md p-5 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h3 className="text-xl font-semibold">Recent Activity</h3>
            <ul className="mt-2 text-sm">
              <li>✅ Completed "React Basics"</li>
              <li>📖 Started "Node.js Fundamentals"</li>
              <li>💬 Joined a discussion on "Next.js vs React"</li>
            </ul>
          </div>

          {/* Stats Overview */}
          <div className={`rounded-xl shadow-md p-5 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h3 className="text-xl font-semibold">Your Progress</h3>
            <p className="mt-2 text-sm">You’ve completed 3 out of 5 courses this month! 🎯</p>
          </div>
        </div>
      </main>
    </div>
  );
}

