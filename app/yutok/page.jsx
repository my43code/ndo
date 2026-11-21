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
        body: JSON.stringify({ message: input }),
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
    <section className="page-hero min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  YuTok <span className="text-emerald-400">AI</span>
                </h1>
                <p className="text-sm text-slate-500">
                  Manu Maso Digital Solutions&apos;s smart assistant
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-emerald-500/30 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        <div className="flex h-[75vh] flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
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
