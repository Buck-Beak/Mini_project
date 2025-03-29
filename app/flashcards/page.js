"use client"
import React from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect,useState } from 'react';
import { useSearchParams } from "next/navigation";

    
export default function flashcard() {
    const searchParams = useSearchParams();
    const summary = searchParams.get("summary");
    //const [flashcards, setFlashcards] = useState([]);
    const [questions,setQuestions] = useState([]);
    //const [answers,setAnswers] = useState('');
    console.log(summary);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

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
  

    useEffect(() => {
        generateFlashcards();
    }, []);   
  return (
    <div className="flex flex-wrap gap-4 p-4">
      
      {Array.isArray(questions) &&
        questions.map((flashcard, index) => (
            <div key={index} className="ques-option border p-4 rounded-lg shadow-md bg-white"> 
            <h2 className="font-bold">{flashcard.question}</h2> 
            <p>Answer: {flashcard.answer}</p> 
            </div> 
        ))
        }
      
    </div>
  )
}
