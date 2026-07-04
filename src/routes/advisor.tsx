import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AIService } from "@/services";
import { agents } from "@/agents/registry";
import { PageHeader } from "@/components/wealth/PageHeader";
import { SectionCard } from "@/components/wealth/SectionCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Send } from "lucide-react";
import type { ChatMessage } from "@/types/wealth";

export const Route = createFileRoute("/advisor")({ component: Advisor });

const suggestions = [
  "Am I on track for retirement at 55?",
  "How should I invest my next $10k?",
  "Explain tax-loss harvesting like I'm 12.",
  "Is my portfolio too concentrated in tech?",
  "How much should I keep in an emergency fund?",
];

function Advisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "0", role: "assistant", agent: "WealthPilot", time: "now", content: "Hi Jordan — I'm your AI wealth advisor. Ask me anything about investing, saving, taxes, retirement, business, or real estate. I have context on your full financial picture." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);
  useEffect(() => { inputRef.current?.focus(); }, [loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content, time: "now" };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    const reply = await AIService.ask(content);
    setMessages((m) => [...m, { id: (Date.now() + 1).toString(), role: "assistant", content: reply, agent: "WealthPilot", time: "now" }]);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-[1600px]">
      <PageHeader eyebrow="AI Advisor" title="Your personal wealth strategist" description="A team of AI agents with full context on your finances." />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <SectionCard padded={false}>
            <div ref={scrollRef} className="h-[calc(100vh-340px)] overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                {messages.map((m) => (
                  <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      m.role === "user" ? "bg-secondary" : "bg-gradient-to-br from-primary to-accent"
                    }`}>
                      {m.role === "user" ? <span className="text-xs font-semibold">JD</span> : <Sparkles className="h-4 w-4 text-primary-foreground" />}
                    </div>
                    <div className={`max-w-2xl rounded-2xl px-4 py-3 text-sm ${
                      m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary/50"
                    }`}>
                      {m.role === "assistant" && m.agent && <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{m.agent}</div>}
                      <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl bg-secondary/50 px-4 py-3">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="border-t border-border/60 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">{s}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  rows={1}
                  placeholder="Ask about investing, taxes, retirement, business..."
                  className="min-h-[44px] flex-1 resize-none rounded-xl border border-border/60 bg-secondary/40 px-4 py-3 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button size="lg" onClick={() => send()} disabled={loading || !input.trim()}><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Your AI agents" subtitle="Specialized for each domain">
          <div className="space-y-3">
            {agents.map((a) => (
              <div key={a.id} className="rounded-lg border border-border/60 bg-secondary/30 p-3">
                <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /><span className="text-sm font-medium">{a.name}</span></div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">{a.domain}</div>
                <div className="mt-1 text-xs text-muted-foreground">{a.description}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
