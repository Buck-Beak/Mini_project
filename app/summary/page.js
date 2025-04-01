"use client"
import { useState,useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { createData } from "../functions/crud";
import { UserAuth } from "../context/AuthContextProvider";
import flashcard from "../flashcards/page";
import { useRouter } from "next/navigation";
import { darkMode, useDarkMode } from "../darkModeContext/page";

 export default function Summary(){

    const { user } = UserAuth() || {};
    const router = useRouter();
    const {darkMode} = useDarkMode();

    const [selectedFile, setSelectedFile] = useState(null);
    const [text,setText] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const HEADERS = { "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` };

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";
    }, []);

    const handleFileChange = async(event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setSummary("");
            extractTextFromPDF(file);
            //await createData("summaries", { text, summary: "Sustainability is ability to maintain or support a process over time.Sustainability is often broken into three core concepts: economic, environmental, and social.Many businesses and governments have committed to sustainable goals, such as reducing their environmental footprints and conserving resources.Some investors are actively embracing sustainability investments, known as green investments.Skeptics have accused some companies of greenwashing, the practice of misleading the public to make a business seem more environmentally friendly than it is.",user:user?.uid });
        }
    };

    const extractTextFromPDF = async (file) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
            const pdf = await pdfjs.getDocument({ data: reader.result }).promise;
            let extractedText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                extractedText += textContent.items.map((item) => item.str).join(" ") + " ";
            }

            console.log("Extracted Text:", extractedText);
            const cleanText = extractedText.replace(/\s+/g, ' ').trim();
            console.log("Extracted Cleaned Text:", cleanText);
            setText(cleanText);
        };
    };

    const chunkText = (text, chunkSize = 1500) => {
        let chunks = [];
        let words = text.split(" ");
        let chunk = [];

        words.forEach((word) => {
            if (chunk.join(" ").length + word.length <= chunkSize) {
                chunk.push(word);
            } else {
                chunks.push(chunk.join(" "));
                chunk = [word];
            }
        });

        if (chunk.length > 0) chunks.push(chunk.join(" "));

        return chunks;
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const countTokens = (text) => {
        return text.split(/\s+/).length;
    };

    const truncateText = (text, maxTokens) => {
        const tokens = text.split(/\s+/);
        return tokens.length > -maxTokens ? tokens.slice(0, maxTokens).join(" ") : text;
    };

    const checkAPIHealth = async () => {
        try {
            const response = await axios.get(API_URL, { headers: HEADERS });
            return response.status === 200;
        } catch {
            return false;
        }
    };

    const summarizeText = async () => {
        if (!text.trim()) {
            setError("Please extract text from a PDF first.");
            return;
        }

        setLoading(true);
        setError(null);
        setSummary("");

        const textChunks = chunkText(text, 1500);
        let summaries = [];

        try {
            for (const chunk of textChunks) {
                await delay(1000); // Prevent API rate limiting

                try {
                    const response = await axios.post(
                        API_URL,
                        { inputs: chunk },
                        { headers: HEADERS }
                    );

                    console.log("API Response:", response.data);

                    if (response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].generated_text) {
                        summaries.push(response.data[0].generated_text);
                    } else {
                        console.warn("Unexpected API response:", response.data);
                    }
                } catch (chunkError) {
                    console.error("Chunk API Error:", chunkError.response?.data || chunkError.message);
                    setError("Some chunks failed to summarize. Showing partial summary.");
                    break;
                }
            }

            if (summaries.length > 0) {
                setSummary(summaries.join(" "));
                await createData("summaries", { summary:summaries,timestamp: new Date(),user:user?.uid });
            } else {
                setError("No summary generated. API might not be returning expected data.");
            }
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            setError("Error contacting API.");
        }

        setLoading(false);
    };

    const handleGenerateFlashcards = () => {
        //router.push(`/flashcards?summary=${encodeURIComponent(summary)}`);
        router.push("/flashcards");
    }

    const handleGenerateQuestionPaper = () => {
        //router.push(`/question-paper?summary=${encodeURIComponent(summary)}`);
        router.push("/question-paper");
    }

    return(
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-blue-950 text-black"} h-screen w-screen flex`}>
            <main className="flex-1 flex justify-center items-center p-8">
            <div className="bg-white rounded-2xl shadow-lg w-[90%] h-[90%] p-6 flex flex-col gap-y-6">
                <h2 className="text-xl font-semibold mb-4 text-center">Share your work</h2>
                <p className="text-gray-500 text-sm mb-4 text-center">What have you been working on?</p>
                
                <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500">
                    <label className="cursor-pointer">
                    <input 
                        type="file" 
                        className="hidden" 
                        accept="application/pdf"
                        onChange={handleFileChange} 
                    />
                    <div className="flex flex-col items-center">
                        <p ><Image src="/images/cloud-computing.png" alt="Signup" width={40} height={40} /></p>
                    </div>

                    </label>
                    {selectedFile && (
                        <div className="mt-3 text-sm text-center text-gray-700">
                            <p className="font-medium">{selectedFile.name}</p>
                            <p className="text-xs text-gray-500">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</p>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <label className="text-sm text-gray-600">Summary</label>
                    <textarea 
                        value={loading?"Loading..":summary} 
                        placeholder="Summary will appear here..."
                        className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                    />
                    
                </div>

                <div className="mt-4 flex justify-between">
                    <button className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md">Save as draft</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={summarizeText}>Upload</button>
                    <button className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md" onClick ={handleGenerateFlashcards} >Generate Flashcards</button>
                    <button className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md" onClick ={handleGenerateQuestionPaper} >Generate Question paper</button>
                </div>
            </div>
            </main>
        </div>
    )
}