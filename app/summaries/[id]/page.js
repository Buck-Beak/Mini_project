"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserAuth } from "../../context/AuthContextProvider";
import { useDarkMode } from "../../darkModeContext/page";
import { readDocument } from "../../functions/crud";

export default function SummaryDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = UserAuth() || {};
  const { darkMode } = useDarkMode();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!user?.uid) {
        router.push("/login");
        return;
      }

      setLoading(true);
      try {
        const summaryData = await readDocument("summaries", id);
        
        if (summaryData.user !== user.uid) {
          setError("You don't have permission to view this summary.");
          setLoading(false);
          return;
        }

        setSummary(summaryData);
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Failed to load summary. It may have been deleted or you don't have permission to view it.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSummary();
    }
  }, [id, user, router]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-blue-950 text-white"} min-h-screen p-8`}>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading summary...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-blue-950 text-white"} min-h-screen p-8`}>
        <div className={`max-w-3xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white text-gray-800"} rounded-xl shadow-lg p-6`}>
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-4">{error}</p>
          <button 
            onClick={handleGoBack}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-blue-950 text-white"} min-h-screen p-8`}>
        <div className={`max-w-3xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white text-gray-800"} rounded-xl shadow-lg p-6`}>
          <h1 className="text-2xl font-bold">Summary Not Found</h1>
          <p className="mt-4">The summary you're looking for doesn't exist or has been deleted.</p>
          <button 
            onClick={handleGoBack}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-blue-950 text-white"} min-h-screen p-8`}>
      <div className={`max-w-3xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white text-gray-800"} rounded-xl shadow-lg p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Summary Details</h1>
          <button 
            onClick={handleGoBack}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-400">
            {summary.timestamp?.toDate 
              ? `Created on ${summary.timestamp.toDate().toLocaleDateString()} at ${summary.timestamp.toDate().toLocaleTimeString()}` 
              : "Date unavailable"}
          </p>
        </div>

        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <h2 className="text-xl font-semibold mb-4">Summary Content</h2>
          {summary.summary && summary.summary.length > 0 ? (
            <div className="space-y-4">
              {summary.summary.map((paragraph, idx) => (
                <p key={idx} className="text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p>No content available for this summary.</p>
          )}
        </div>

        {/* Additional metadata if available */}
        {summary.title && (
          <div className="mt-6">
            <h3 className="font-semibold">Title</h3>
            <p>{summary.title}</p>
          </div>
        )}
        
        {summary.source && (
          <div className="mt-4">
            <h3 className="font-semibold">Source</h3>
            <p>{summary.source}</p>
          </div>
        )}
      </div>
    </div>
  );
}