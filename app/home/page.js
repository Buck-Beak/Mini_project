"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserAuth } from "../context/AuthContextProvider";
import { logout } from "../functions/auth";
import { useRouter } from "next/navigation";
import { useDarkMode } from "../darkModeContext/page";
import { readAllData } from "../functions/crud";

export default function Home() {
  const { user } = UserAuth() || {};
  const router = useRouter();
  const {darkMode} = useDarkMode();
  const [recentSummaries, setRecentSummaries] = useState([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      if (!user?.uid) return; // Ensure user is logged in

      try {
        const allSummaries = await readAllData("summaries"); // Fetch all summaries
        const userSummaries = allSummaries
          .filter((summary) => summary.user === user.uid) // Filter by userId
          .sort((a, b) => b.timestamp - a.timestamp) // Sort by latest timestamp
          //.slice(0, 3); // Show only 3 latest summaries

        setRecentSummaries(userSummaries);
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    };

    fetchSummaries();
  }, [user]);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-blue-950 text-black"} h-screen w-screen flex`}>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-start p-8 ml-20 gap-8">
        {/* Welcome Section */}
        <div className={`w-full rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"}! 🎉</h1>
          {/*<p className="mt-1">Here's what's happening today.</p>*/}

          {/* Quick Actions */}
         {/* <div className="flex gap-4 mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
              📚 Browse Courses
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md">
              ✍️ Create New Course
            </button>
          </div>*/}
        </div>

        {/* Dashboard Widgets */}
        {/*<div className="grid grid-cols-2 mt-6">*/}
          {/* Recent Activity */}
          <div className={`rounded-xl shadow-md p-5 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <h3 className="text-xl font-semibold mb-4">Recent Summaries</h3>
            {recentSummaries.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {recentSummaries.map((summary, index) => (
                  <Link  key = {index} href={`/summary-details/${summary.id}`}>
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                    >
                      <p className="text-sm">
                      📖 {summary?.summary?.length ? summary.summary.join(" ").substring(0, 80) + "..." : "No summary available"}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                      {summary.timestamp?.toDate? summary.timestamp.toDate().toLocaleDateString(): "No Date Available"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No recent summaries found.</p>
            )}
          </div>

          {/* Stats Overview */}
          {/*<div className={`rounded-xl shadow-md p-5 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h3 className="text-xl font-semibold">Your Progress</h3>
            <p className="mt-2 text-sm">You’ve completed 3 out of 5 courses this month! 🎯</p>
          </div>*/}
        {/*</div>*/}
      </main>
    </div>
  );
}

