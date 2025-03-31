"use client"
import React from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect,useState } from 'react';
import { useSearchParams } from "next/navigation";
import { useDarkMode } from "../darkModeContext/page";

    
export default function Question_paper() {
    const searchParams = useSearchParams();
    const {darkMode} = useDarkMode();
    const summary = decodeURIComponent(searchParams.get("summary") || "");
    const [questions,setQuestions] = useState([]);
    console.log(summary);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

    const generateQuestionPaper = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
            // Set the `responseMimeType` to output JSON
            generationConfig: { responseMimeType: "application/json" }});
        const result = await model.generateContent(
                `Generate a question paper for the following text: "${summary}". Return JSON with an array each containing a 'question' and 'answer' field.`
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

    useEffect(() => {
        generateQuestionPaper();
    }, []);   
  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-blue-950 text-black"} h-screen w-screen flex justify-center items-start pt-20`}>
      <div className="w-full max-w-4xl bg-white text-black p-8 rounded-lg shadow-lg flex flex-col overflow-y-auto max-h-[80vh]">
        <h1 className="text-2xl font-bold text-center mb-6">Generated Question Paper</h1>

        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={index} className="mb-6 p-4 border-b last:border-b-0">
              <h2 className="font-bold text-xl">Q{index + 1}: {q.question}</h2>
              <p className="text-lg mt-2"><strong>Answer:</strong> {q.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">Generating questions...</p>
        )}
      </div>
    </div>
  )
}
