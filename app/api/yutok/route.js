import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSiteAbout, getServices, getProjects, getPosts } from "@/lib/siteContent";

const client = new Anthropic();

async function buildSiteContext() {
  const [about, services, projects, posts] = await Promise.all([
    getSiteAbout(),
    getServices(),
    getProjects(),
    getPosts(),
  ]);

  const parts = [];

  const contact = about.contact || {};
  parts.push(`COMPANY: ${contact.companyName || "Manu Maso Digital Solutions"}`);
  parts.push(`LOCATION: ${contact.address || "Port Moresby, Papua New Guinea"}`);
  parts.push(`EMAIL: ${contact.email || "info@manumaso.com"}`);
  parts.push(`PHONE: ${contact.phone || "+675 78337326"}`);
  parts.push(`WHATSAPP: ${contact.whatsapp || "+675 78337326"}`);
  parts.push(`HOURS: ${contact.hours || "Monday to Friday, 8:00 AM to 5:00 PM"}`);

  if (about.mission) parts.push(`MISSION: ${about.mission}`);
  if (about.vision) parts.push(`VISION: ${about.vision}`);
  if (about.values?.length) parts.push(`VALUES: ${about.values.join(", ")}`);
  if (about.history?.text) parts.push(`HISTORY: ${about.history.text}`);

  if (about.team?.length) {
    const teamList = about.team
      .map((m) => `${m.name} - ${m.role}${m.bio ? `: ${m.bio}` : ""}`)
      .join("; ");
    parts.push(`TEAM: ${teamList}`);
  }

  if (services.length) {
    const serviceList = services
      .map((s) => `${s.title}: ${s.shortDescription || s.description || ""}`)
      .join("; ");
    parts.push(`SERVICES: ${serviceList}`);
  }

  if (projects.length) {
    const projectList = projects
      .map((p) => `${p.title}: ${p.description || ""}`)
      .join("; ");
    parts.push(`PROJECTS: ${projectList}`);
  }

  if (posts.length) {
    const postList = posts
      .slice(0, 5)
      .map((p) => `${p.title}: ${p.summary || ""}`)
      .join("; ");
    parts.push(`RECENT UPDATES: ${postList}`);
  }

  return parts.join("\n");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const history = body.messages;

    if (!Array.isArray(history) || history.length === 0) {
      return NextResponse.json(
        { reply: "Please send a message to get started." },
        { status: 400 }
      );
    }

    const siteContext = await buildSiteContext();

    const systemPrompt = `You are YuTok, the friendly AI assistant for Manu Maso Digital Solutions. You help visitors learn about the company, its services, projects, and team. You can also answer general technology and knowledge questions.

Here is the latest information about the company and website:

${siteContext}

Guidelines:
- Be friendly, helpful, and concise. Keep responses under 150 words unless the user asks for detail.
- When answering about the company, use the provided information above.
- For general knowledge questions, answer accurately and helpfully.
- If you don't know something specific about the company, say so honestly.
- Never make up company information that isn't provided above.
- Refer visitors to the contact page or provide contact details when appropriate.
- Use a professional but warm tone.`;

    const messages = history
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content }));

    const response = await client.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const reply = textBlock?.text || "I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("YuTok API error:", error);

    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { reply: "YuTok is not configured yet. Please contact the administrator." },
        { status: 500 }
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { reply: "YuTok is busy right now. Please try again in a moment." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { reply: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
