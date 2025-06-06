"use client"
import React from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect,useState } from 'react';
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import darkMode, { useDarkMode } from "../darkModeContext/page";
import { readLatestSummary } from '../functions/crud';
import { UserAuth } from "../context/AuthContextProvider";

    
export default function flashcard() {
    //const searchParams = useSearchParams();
    const { user } = UserAuth() || {};
    const {darkMode} = useDarkMode();
    //const summary = decodeURIComponent(searchParams.get("summary") || "");
    const [summary, setSummary] = useState("");
    const [questions,setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

    useEffect(() => {
      const fetchSummary = async () => {
        if (user?.uid) {
          const latestSummary = await readLatestSummary("summaries", user.uid);
          if (latestSummary) {
            setSummary(latestSummary);
            console.log("Summary",summary);
          }
        }
      };
  
      fetchSummary();
    }, [user?.uid]);

    useEffect(() => {
      if (summary) {
        generateFlashcards();
      }
    }, [summary]);

    const generateFlashcards = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
            // Set the `responseMimeType` to output JSON
            generationConfig: { responseMimeType: "application/json" }});
        const result = await model.generateContent(
                `Generate 5 flashcards from the following text: "${summary}". Return JSON with an array of flashcards, each containing a 'question' and 'answer' field.`
              );        
        console.log("Result:",result);
        const response = await result.response;
        const text = await response.text();
        console.log("Raw API Response:", text); // Check the exact response

        let parsedData;
        try {
            parsedData = JSON.parse(text);
        } catch (error) {
            console.error("JSON Parse Error:", error);
            return;
        }

        console.log("Parsed JSON:", parsedData);

        setQuestions(parsedData);
        console.log("Questions",questions);

    }

    const handleSwitch = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    }
  

    /*useEffect(() => {
        generateFlashcards();
    }, []);*/   
  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-blue-950 text-black"} h-screen w-screen flex`}>
      <main className="flex-1 flex justify-center items-center p-8">
      {questions.length > 0 && (
        <div className="ques-option relative border p-6 rounded-xl shadow-lg bg-white text-center w-3/4 h-3/4 flex flex-col justify-center items-center">
          <h2 className="font-bold text-2xl">{questions[currentIndex].question}</h2>
          <p className="text-xl">Answer: {questions[currentIndex].answer}</p>
          <button 
            onClick={handleSwitch} 
            className='absolute bottom-4 right-4'
          >
            <Image src="/images/next.png" alt="next" width={40} height={40} />
          </button>
        </div>
      )}
      </main>
    </div>
  )
}
