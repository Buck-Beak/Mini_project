"use client"
import React, { useState, useEffect } from "react";
import Signup from "./signup/page";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
/*
<p className="relative w-[max-content]
            before:absolute before:inset-0 before:animate-typewriter
            before:bg-white
            after:absolute after:inset-0 after:w-[0.125em] after:animate-caret
            after:bg-black">
              Summarize
            </p>
*/

const animations = [
  "/animations/flashcard_animation.json",
  "/animations/notes_animation.json"
];

export default function StartPage() {
  const [animationData, setAnimationData] = useState(null);
  const [animationIndex, setAnimationIndex] = useState(0);

  useEffect(() => {
    const loadAnimation = async () => {
      const response = await fetch(animations[animationIndex]);
      const data = await response.json();
      setAnimationData(data);
    };

    loadAnimation();
  }, [animationIndex]);

  const handleAnimationComplete = () => {
    setAnimationIndex((prevIndex) => (prevIndex + 1) % animations.length);
  };

  return (
    <div className="h-screen w-screen bg-blue-950 flex">
      <main className="flex-1 flex justify-center items-center p-8">
        <div className="w-[105%] h-[107%] bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-7xl">Learnify</h1>
          <div className="flex items-center justify-evenly">
            {animationData && (
              <div className="w-[32vw] h-[32vw]">
                <Lottie
                  animationData={animationData}
                  loop={false}
                  autoplay
                  onComplete={handleAnimationComplete} // Event when animation completes
                />
              </div>

            )}
            <Signup />
          </div>
        </div>
      </main>
    </div>




  )
}