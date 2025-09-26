import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // Get the API key from environment variables
    const apiKey = process.env.THIRDWEB_API_KEY;
    
    if (!apiKey) {
      console.error("THIRDWEB_API_KEY environment variable is not set");
      return NextResponse.json(
        { 
          error: "AI service not configured",
          response: "I'm sorry, but the AI service is not properly configured. Please contact the administrator."
        },
        { status: 500 }
      );
    }

    // Prepare the request to thirdweb AI
    const thirdwebResponse = await fetch("https://api.thirdweb.com/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": apiKey,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: message.trim(),
          },
        ],
        context: {
          chain_ids: [], // Base chain
        },
        stream: false,
      }),
    });

    if (!thirdwebResponse.ok) {
      const errorText = await thirdwebResponse.text();
      console.error("thirdweb AI API error:", errorText);
      
      return NextResponse.json(
        { 
          error: "AI service temporarily unavailable",
          response: "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again in a moment."
        },
        { status: 503 }
      );
    }

    const data = await thirdwebResponse.json();
    
    // Extract the response from thirdweb AI
    const aiResponse = data.message || data.response || "I received your message but couldn't generate a proper response. Please try rephrasing your question.";
    
    return NextResponse.json({
      response: aiResponse,
      usage: data.usage || null,
    });

  } catch (error) {
    console.error("Error in thirdweb AI API route:", error);
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        response: "I'm sorry, something went wrong while processing your request. Please try again."
      },
      { status: 500 }
    );
  }
}
