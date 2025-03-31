"use client"
import React from 'react'
import { useState,useEffect} from 'react';
import { UserAuth } from '../context/AuthContextProvider';
import Image from "next/image";
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { logout } from '../functions/auth';
import { useDarkMode } from '../darkModeContext/page';

export default function Navbar() {
    const { user } = UserAuth() || {};
    const router = useRouter();
    const {darkMode, toggleDarkMode} = useDarkMode();

    const handleLogout = async () => {
        await logout();
        router.push("/"); // Redirect to home after logout
    };
  return (
      <div className="flex">
      {/* Sidebar */}
      <nav className={`${darkMode ? "bg-gray-900" : "bg-blue-950"} w-20 flex flex-col items-center py-6 space-y-6 fixed h-full shadow-lg`}>
        {/* User Profile in Sidebar */}
        <div className="text-center">
          <Image src="/images/person.png" alt="User" width={40} height={40} />
          <p className="text-sm mt-1 text-white">{user?.name || "Guest"}</p>
        </div>

        {/* Navigation Links */}
        <Link href="/home">
          <div className="w-50 h-50 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-purple-300 transition duration-300 group">
            <Image src="/images/dashboards.png" alt="Dashboard" width={40} height={40} />
            <p className="text-white text-xs opacity-0 group-hover:opacity-100">Dashboard</p>
          </div>
        </Link>
        <Link href="/courses">
          <div className="w-50 h-50 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-purple-300 transition duration-300 group">
            <Image src="/images/courses.png" alt="Courses" width={40} height={40} />
            <p className="text-white text-xs opacity-0 group-hover:opacity-100">Courses</p>
          </div>
        </Link>
        <Link href="/summary">
          <div className="w-50 h-50 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-purple-300 transition duration-300 group">
            <Image src="/images/summary.png" alt="Courses" width={40} height={40} />
            <p className="text-white text-xs opacity-0 group-hover:opacity-100">Summarise</p>
          </div>
        </Link>
        <Link href="/settings">
          <div className="w-50 h-50 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-purple-300 transition duration-300 group">
            <Image src="/images/settings.png" alt="Settings" width={40} height={40} />
            <p className="text-white text-xs opacity-0 group-hover:opacity-100">Settings</p>
          </div>
        </Link>

        {/* Dark Mode Toggle */}
        <button className="w-50 h-50 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-purple-300 transition duration-300" onClick={toggleDarkMode}>
          {darkMode ? "🌞" : "🌙"}
        </button>

        {/* Logout Button */}
        <button className="w-50 h-50 flex flex-col items-center gap-1 mt-auto p-2 rounded-lg hover:bg-purple-300 transition duration-300" onClick={handleLogout}>
          <Image src="/images/turn-off.png" alt="Logout" width={40} height={40} />
        </button>
      </nav>
    </div>
  )
}
