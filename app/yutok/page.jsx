"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Send, Bot, User, ArrowLeft, Sparkles } from "lucide-react";

export default function YuTokPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm YuTok, your AI assistant. Ask me about Manu Maso Digital Solutions, our services, projects, or any technology questions.",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/yutok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.reply || "YuTok could not generate a response.",
        },
      ]);
    } catch (error) {
      console.error("YuTok error:", error);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "There was an error connecting to YuTok.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-hero relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute -left-20 top-32 h-64 w-64 rounded-full bg-emerald-500/4 blur-[100px] animate-float-gentle" />
      <div className="absolute -right-16 bottom-20 h-48 w-48 rounded-full bg-sky-500/3 blur-[80px] animate-float-slow" />

      <div className="relative mx-auto max-w-5xl px-6 py-8">
        <div className="hero-fade-up mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="animate-scale-bounce flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h1 className="hero-text-float text-2xl font-black tracking-tight">
                  YuTok <span className="text-emerald-400">AI</span>
                </h1>
                <p className="hero-fade-up-delay-2 text-sm text-slate-500">
                  Manu Maso Digital Solutions&apos;s smart assistant
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="hero-fade-up-delay-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-emerald-500/30 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        <div className="hero-fade-up-delay-3 flex h-[75vh] flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] shadow-2xl shadow-black/20">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] gap-3 rounded-2xl px-5 py-4 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "border border-white/8 bg-white/[0.04] text-slate-200"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {message.role === "user" ? (
                      <User size={18} />
                    ) : (
                      <Bot size={18} className="text-emerald-400" />
                    )}
                  </div>
                  <p className="text-sm leading-7">{message.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-4 text-sm text-slate-400">
                  <Bot size={18} className="animate-pulse text-emerald-400" />
                  <span className="flex items-center gap-1">
                    YuTok is thinking
                    <span className="animate-blink">...</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="flex gap-3 border-t border-white/8 p-4"
          >
            <input
              type="text"
              placeholder="Ask YuTok something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover:brightness-110 disabled:opacity-50"
            >
              <Send size={18} />
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
