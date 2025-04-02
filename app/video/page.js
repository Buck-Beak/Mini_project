"use client";
import { useState } from "react";
import axios from "axios";
import YoutubeTranscript from "youtube-transcript-api"; 

export default function VideoSummarizer() {
    const [videoUrl, setVideoUrl] = useState("");
    const [transcript, setTranscript] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const HEADERS = { "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` };

    const extractVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const fetchTranscript = async () => {
        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            setError("Invalid YouTube URL");
            return;
        }
    
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.get(`../api/transcript?videoId=${videoId}`);
            if (response.data.transcript) {
                setTranscript(response.data.transcript);
            } else {
                setError("No transcript available.");
            }
        } catch (error) {
            setError("Failed to fetch transcript.");
            console.error(error);
        }
    
        setLoading(false);
    };
    
    
    

    const summarizeText = async () => {
        if (!transcript.trim()) {
            setError("Please fetch a transcript first.");
            return;
        }

        setLoading(true);
        setError(null);
        setSummary("");

        try {
            const response = await axios.post(API_URL, { inputs: transcript }, { headers: HEADERS });

            if (response.data && response.data.length > 0 && response.data[0].generated_text) {
                setSummary(response.data[0].generated_text);
            } else {
                setError("No summary generated.");
            }
        } catch (error) {
            console.error("API Error:", error);
            setError("Error summarizing transcript.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">🎥 YouTube Video Summarizer</h2>

            {/* Input Field */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter YouTube Video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Fetch Button */}
            <button 
                onClick={fetchTranscript} 
                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Fetch Transcript
            </button>

            {/* Loading & Error Messages */}
            {loading && <p className="text-center text-gray-600 mt-2">Loading...</p>}
            {error && <p className="text-center text-red-500 mt-2">{error}</p>}

            {/* Transcript Section */}
            {transcript && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700">📜 Transcript</h3>
                    <textarea 
                        value={transcript} 
                        readOnly 
                        className="w-full p-3 border border-gray-300 rounded-lg mt-2 h-40 bg-gray-100 focus:outline-none"
                    ></textarea>

                    {/* Summarize Button */}
                    <button 
                        onClick={summarizeText} 
                        className="w-full mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Summarize
                    </button>
                </div>
            )}

            {/* Summary Section */}
            {summary && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700">📝 Summary</h3>
                    <textarea 
                        value={summary} 
                        readOnly 
                        className="w-full p-3 border border-gray-300 rounded-lg mt-2 h-40 bg-gray-100 focus:outline-none"
                    ></textarea>
                </div>
            )}
        </div>
    );
}