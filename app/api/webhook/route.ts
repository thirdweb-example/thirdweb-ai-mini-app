import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log webhook events for debugging
    console.log("Webhook received:", body);
    
    // Handle different webhook events
    switch (body.type) {
      case "user.connected":
        console.log("User connected:", body.data);
        break;
      case "user.disconnected":
        console.log("User disconnected:", body.data);
        break;
      default:
        console.log("Unknown webhook event:", body.type);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "thirdweb AI Mini App Webhook",
    status: "active" 
  });
}
