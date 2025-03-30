"use client"
import React, { useState, useEffect } from "react";
import Signup from "./signup/page";
import dynamic from "next/dynamic";
import InfiniteMovingCards from "./infinite_cards/page";
import './styles.css';

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const animations = [
  "/animations/flashcard_animation.json",
  "/animations/notes_animation.json",
  "/animations/question_paper.json",
];

const items = [
  {
    name: "Quickly convert key concepts from textbooks into interactive flashcards, making revision easier and more effective",
    quote: "Flash Card Generation",
    animation: "/animations/flashcard_animation.json",
  },
  {
    name: "Automatically generate concise and structured notes from lengthy study materials, helping you grasp essential information faster.",
    quote: "Notes Summarisation",
    animation: "/animations/notes_animation.json",
  }
  ,
  {
    name: "Create personalized question papers based on your study materials, allowing for targeted practice and better exam preparation.",
    quote: "Question Paper Generation",
    animation: "/animations/question_paper.json",
  }
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
          <h1 className="learnify-title text-7xl">Learnify</h1>
          <div className="flex items-center justify-evenly relative">
            {/*{animationData && (
              <div className="w-[32vw] h-[32vw]">
                <Lottie
                  animationData={animationData}
                  loop={false}
                  autoplay
                  onComplete={handleAnimationComplete} // Event when animation completes
                />
              </div>

            )}*/}
            <div className="absolute left-10 top-20"><InfiniteMovingCards items={items}/></div>
            <div className="absolute right-20 top-10"><Signup /></div>
          </div>
        </div>
      </main>
    </div>

  )
}