import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");

    if (!videoId) {
        return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
    }

    try {
        console.log(`Fetching transcript for videoId: ${videoId}`);

        const response = await axios.get(`https://serpapi.com/search.json`, {
            params: {
                engine: "youtube_transcript",
                video_id: videoId,
                api_key: process.env.SERPAPI_KEY, // Add your SerpAPI key in .env
            },
        });

        const transcriptText = response.data.transcript.map((item) => item.text).join(" ");
        console.log("Transcript fetched successfully:", transcriptText.slice(0, 100));

        return NextResponse.json({ transcript: transcriptText }, { status: 200 });
    } catch (error) {
        console.error("Transcript Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch transcript" }, { status: 500 });
    }
}
