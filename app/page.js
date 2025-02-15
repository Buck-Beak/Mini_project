"use client"
import React, { useState } from "react";
import Signup from "./signup/page";

export default function StartPage() {
    return(
      <div className="h-screen w-screen bg-blue-950 flex">
        <main className="flex-1 flex justify-center items-center p-8">
          <div className="w-[105%] h-[107%] bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-7xl">Learnify</h1>
            <p className="relative w-[max-content]
            before:absolute before:inset-0 before:animate-typewriter
            before:bg-white
            after:absolute after:inset-0 after:w-[0.125em] after:animate-caret
            after:bg-black">
              Summarize
            </p>
            <div className="flex justify-end mt-20">
              <Signup/>
            </div>
          </div>
        </main>
      </div> 
    )
}