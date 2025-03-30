"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserAuth } from "../context/AuthContextProvider";
import { logout } from "../functions/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = UserAuth() || {};
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from local storage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/"); // Redirect to home after logout
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-blue-950 text-black"} h-screen w-screen flex`}>
      {/* Sidebar */}
      <nav className="w-20 flex flex-col items-center py-6 space-y-6 fixed h-full shadow-lg">
        {/* User Profile in Sidebar */}
        <div className="text-center">
          <Image src="/images/person.png" alt="User" width={40} height={40} />
          <p className="text-sm mt-1">{user?.name || "Guest"}</p>
        </div>

        {/* Navigation Links */}
        <Link href="/">
          <div className="p-2 rounded-lg hover:bg-yellow-300 transition duration-300 group">
            <Image src="/images/dashboards.png" alt="Dashboard" width={40} height={40} />
            <p className="text-xs opacity-0 group-hover:opacity-100">Dashboard</p>
          </div>
        </Link>
        <Link href="/courses">
          <div className="p-2 rounded-lg hover:bg-green-300 transition duration-300 group">
            <Image src="/images/courses.png" alt="Courses" width={40} height={40} />
            <p className="text-xs opacity-0 group-hover:opacity-100">Courses</p>
          </div>
        </Link>
        <Link href="/settings">
          <div className="p-2 rounded-lg hover:bg-purple-300 transition duration-300 group">
            <Image src="/images/settings.png" alt="Settings" width={40} height={40} />
            <p className="text-xs opacity-0 group-hover:opacity-100">Settings</p>
          </div>
        </Link>

        {/* Dark Mode Toggle */}
        <button className="p-2 rounded-lg hover:bg-gray-700 transition duration-300" onClick={toggleDarkMode}>
          {darkMode ? "🌞" : "🌙"}
        </button>

        {/* Logout Button */}
        <button className="mt-auto p-2 rounded-lg hover:bg-red-300 transition duration-300" onClick={handleLogout}>
          <Image src="/images/turn-off.png" alt="Logout" width={40} height={40} />
        </button>
      </nav>

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

