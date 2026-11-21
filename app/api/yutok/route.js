import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message?.toLowerCase() || "";

    let reply = "Thanks for your message. YuTok is ready to assist you.";

    if (message.includes("service")) {
      reply =
        "Manu Maso Digital Solutions offers modern software and web development solutions tailored for business growth.";
    } else if (message.includes("project")) {
      reply =
        "Our projects section showcases completed and ongoing digital solutions delivered by Manu Maso Digital Solutions.";
    } else if (message.includes("company") || message.includes("about")) {
      reply =
        "Manu Maso Digital Solutions focuses on modern, scalable, and reliable digital solutions for organizations in Papua New Guinea and beyond.";
    } else if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      reply = "Hello! Welcome to YuTok. How can I assist you today?";
    } else if (message.includes("website")) {
      reply =
        "We build professional websites with modern technologies, performance, clean design, and scalable architecture.";
    } else if (message.includes("contact")) {
      reply =
        "You can add your contact page details so visitors can reach Manu Maso Digital Solutions easily.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("YuTok API error:", error);
    return NextResponse.json(
      { reply: "An error occurred while generating a response." },
      { status: 500 }
    );
  }
}
